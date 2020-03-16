<!-- markdownlint-disable MD002 MD041 -->

In this exercise you will extend the application from the previous exercise to support authentication with Azure AD. This is required to obtain the necessary OAuth access token to call the Microsoft Graph. In this step you will integrate the [Microsoft Authentication Library](https://github.com/AzureAD/microsoft-authentication-library-for-js) library into the application.

1. Create a new file in the `./src` directory named `Config.js` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/Config.ts.example":::

    Replace `YOUR_APP_ID_HERE` with the application ID from the Application Registration Portal.

    > [!IMPORTANT]
    > If you're using source control such as git, now would be a good time to exclude the `Config.ts` file from source control to avoid inadvertently leaking your app ID.

1. Open `./src/App.tsx` and add the following `import` statements to the top of the file.

```js
import { config } from './Config';
import { UserAgentApplication } from 'msal';
```

## Implement sign-in

In this section you'll implement sign-in and sign-out.

1. Add the following property to the `App` class.

    ```typescript
    private userAgentApplication: UserAgentApplication;
    ```

1. Replace the existing `constructor` with the following.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="constructorSnippet":::

    This code initializes the `UserAgentApplication` class with your application ID and checks for the presence of a user. If there is a user, it sets `isAuthenticated` to true. The `getUserProfile` method isn't implemented yet. You will implement this a bit later.

1. Add a function to the `App` class to do the login. Add the following function to the `App` class.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="loginSnippet":::

    This method calls the `loginPopup` function to do the login, then calls the `getUserProfile` function.

1. Add a function to logout. Add the following function to the `App` class.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="logoutSnippet":::

1. Update the `NavBar` and `Welcome` elements in the `render` method of the `App` class to pass the `login` and `logout` methods to the `authButtonMethod`. Replace the existing `return` statement in the `render` method with the following.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="renderSnippet" highlight="6,15":::

1. Implement the `getUserProfile` function. Add the following function to the `App` class.

    ```typescript
    async getUserProfile() {
      try {
        // Get the access token silently
        // If the cache contains a non-expired token, this function
        // will just return the cached token. Otherwise, it will
        // make a request to the Azure OAuth endpoint to get a token

        var accessToken = await this.userAgentApplication.acquireTokenSilent({
            scopes: config.scopes
          });

        if (accessToken) {
          // TEMPORARY: Display the token in the error flash
          this.setState({
            isAuthenticated: true,
            error: { message: "Access token:", debug: accessToken.accessToken }
          });
        }
      }
      catch(err) {
        var error = {};
        if (typeof(err) === 'string') {
          var errParts = err.split('|');
          error = errParts.length > 1 ?
            { message: errParts[1], debug: errParts[0] } :
            { message: err };
        } else {
          error = {
            message: err.message,
            debug: JSON.stringify(err)
          };
        }

        this.setState({
          isAuthenticated: false,
          user: {},
          error: error
        });
      }
    }
    ```

    This code calls `acquireTokenSilent` to get an access token, then just outputs the token as an error.

1. Save your changes and refresh the browser. Click the sign-in button and you should be redirected to `https://login.microsoftonline.com`. Login with your Microsoft account and consent to the requested permissions. The app page should refresh, showing the token.

### Get user details

In this section you will get the user's details from Microsoft Graph.

1. Create a new file in the `./src` directory called `GraphService.ts` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/GraphService.ts" id="graphServiceSnippet1":::

    This implements the `getUserDetails` function, which uses the Microsoft Graph SDK to call the `/me` endpoint and return the result.

1. Open `./src/App.tsx` and add the following `import` statement to the top of the file.

    ```typescript
    import { getUserDetails } from './GraphService';
    ```

1. Replace the existing `getUserProfile` function with the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="getUserProfileSnippet" highlight="13-22":::

Now if you save your changes and start the app, after sign-in you should end up back on the home page, but the UI should change to indicate that you are signed-in.

![A screenshot of the home page after signing in](./images/add-aad-auth-01.png)

Click the user avatar in the top right corner to access the **Sign Out** link. Clicking **Sign Out** resets the session and returns you to the home page.

![A screenshot of the dropdown menu with the Sign Out link](./images/add-aad-auth-02.png)

## Storing and refreshing tokens

At this point your application has an access token, which is sent in the `Authorization` header of API calls. This is the token that allows the app to access the Microsoft Graph on the user's behalf.

However, this token is short-lived. The token expires an hour after it is issued. This is where the refresh token becomes useful. The refresh token allows the app to request a new access token without requiring the user to sign in again.

Because the app is using the MSAL library, you do not have to implement any token storage or refresh logic. The `UserAgentApplication` method caches the token in the browser session. The `acquireTokenSilent` method first checks the cached token, and if it is not expired, it returns it. If it is expired, it uses the cached refresh token to obtain a new one. You'll use this method more in the following module.
