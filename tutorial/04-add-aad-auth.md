<!-- markdownlint-disable MD002 MD041 -->

In this exercise you will extend the application from the previous exercise to support authentication with Azure AD. This is required to obtain the necessary OAuth access token to call the Microsoft Graph. In this step you will integrate the [Microsoft Authentication Library](https://github.com/AzureAD/microsoft-authentication-library-for-js) library into the application.

1. Create a new file in the **./src** directory named **Config.ts** and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/Config.example.ts":::

    Replace `YOUR_APP_ID_HERE` with the application ID from the Application Registration Portal.

    > [!IMPORTANT]
    > If you're using source control such as git, now would be a good time to exclude the `Config.ts` file from source control to avoid inadvertently leaking your app ID.

## Implement sign-in

In this section you'll implement an authentication provider, sign-in, and sign-out.

1. Open **./src/index.tsx** and add the following `import` statements at the top of the file.

    ```typescript
    import {
      PublicClientApplication,
      EventType,
      EventMessage,
      AuthenticationResult } from '@azure/msal-browser';

    import config from './Config';
    ```

1. Add the following code before the `ReactDOM.render` line.

    :::code language="typescript" source="../demo/graph-tutorial/src/index.tsx" id="MsalInstanceSnippet":::

    This code creates an instance of the MSAL library's `PublicClientApplication` object, checks for any cached accounts, and registers a callback to set the active account after a successful login.

1. Update the `App` element in the `ReactDOM.render` call to pass the `msalInstance` in a property named `pca`.

    :::code language="typescript" source="../demo/graph-tutorial/src/index.tsx" id="RenderSnippet" highlight="3":::

1. Open **./src/App.tsx** and add the following code after the last `import` statement.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="AppPropsSnippet":::

1. Replace the existing `App` function with the following.

    ```typescript
    export default function App({ pca }: AppProps) {
      return(
        <MsalProvider instance={ pca }>
          <ProvideAppContext>
            <Router>
              <div>
                <NavBar />
                <Container>
                  <ErrorMessage />
                  <Route exact path="/"
                    render={(props) =>
                      <Welcome {...props} />
                    } />
                </Container>
              </div>
            </Router>
          </ProvideAppContext>
        </MsalProvider>
      );
    }
    ```

    This wraps all of the other elements with the `MsalProvider` element, making authentication state and token acquisition available.

1. Open **./src/AppContext.tsx** and add the following line at the top of the `useProvideAppContext` function.

    ```typescript
    const msal = useMsal();
    ```

1. Replace the existing `signIn` function with the following.

    ```typescript
    const signIn = async () => {
      const result = await msal.instance.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });

      // TEMPORARY: Show the access token
      displayError('Access token retrieved', result.accessToken);
    };
    ```

1. Save your changes and refresh the browser. Click the sign-in button and you should see a pop-up window that loads `https://login.microsoftonline.com`. Login with your Microsoft account and consent to the requested permissions. The app page should refresh, showing the token.

### Get user details

In this section you will modify the `signIn` function to get the user's details from Microsoft Graph.

1. Create a new file in the **./src** directory named **GraphService.ts** and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/GraphService.ts" id="GetUserSnippet":::

    This implements the `getUser` function, which initializes the Microsoft Graph client with the provided `AuthProvider`, and gets the user's profile.

1. Open **./src/AppContext.tsx** and replace the existing `signIn` function with the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/AppContext.tsx" id="SignInSnippet":::

1. Replace the existing `signOut` function with the following.

    :::code language="typescript" source="../demo/graph-tutorial/src/AppContext.tsx" id="SignOutSnippet":::

1. Add the following `useEffect` call inside `useProvideAppContext`.

    :::code language="typescript" source="../demo/graph-tutorial/src/AppContext.tsx" id="UseEffectSnippet":::

1. Save your changes and start the app, after sign-in you should end up back on the home page, but the UI should change to indicate that you are signed-in.

    ![A screenshot of the home page after signing in](./images/add-aad-auth-01.png)

1. Click the user avatar in the top right corner to access the **Sign Out** link. Clicking **Sign Out** resets the session and returns you to the home page.

    ![A screenshot of the dropdown menu with the Sign Out link](./images/add-aad-auth-02.png)

## Storing and refreshing tokens

At this point your application has an access token, which is sent in the `Authorization` header of API calls. This is the token that allows the app to access the Microsoft Graph on the user's behalf.

However, this token is short-lived. The token expires an hour after it is issued. This is where the refresh token becomes useful. The refresh token allows the app to request a new access token without requiring the user to sign in again.

Because the app is using the MSAL library, you do not have to implement any token storage or refresh logic. The `PublicClientApplication` caches the token in the browser session. The `acquireTokenSilent` method first checks the cached token, and if it is not expired, it returns it. If it is expired, it uses the cached refresh token to obtain a new one. You'll use this method more in the following module.
