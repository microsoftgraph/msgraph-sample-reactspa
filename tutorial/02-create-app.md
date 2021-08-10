<!-- markdownlint-disable MD002 MD041 -->

In this section you'll create a new React app.

1. Open your command-line interface (CLI), navigate to a directory where you have rights to create files, and run the following commands to create a new React app.

    ```Shell
    yarn create react-app graph-tutorial --template typescript
    ```

1. Once the command finishes, change to the **graph-tutorial**`** directory in your CLI and run the following command to start a local web server.

    ```Shell
    yarn start
    ```

    > [!NOTE]
    > If you do not have [Yarn](https://yarnpkg.com/) installed, you can use `npm start` instead.

Your default browser opens to [https://localhost:3000/](https://localhost:3000) with a default React page. If your browser doesn't open, open it and browse to [https://localhost:3000/](https://localhost:3000) to verify that the new app works.

## Add Node packages

Before moving on, install some additional packages that you will use later:

- [react-router-dom](https://github.com/ReactTraining/react-router) for declarative routing inside the React app.
- [bootstrap](https://github.com/twbs/bootstrap) for styling and common components.
- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) for React components based on Bootstrap.
- [date-fns](https://github.com/date-fns/date-fns) for formatting dates and times.
- [windows-iana](https://github.com/rubenillodo/windows-iana) for translating Windows time zones to IANA format.
- [msal-react](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react) for authenticating to Azure Active Directory and retrieving access tokens.
- [microsoft-graph-client](https://github.com/microsoftgraph/msgraph-sdk-javascript) for making calls to Microsoft Graph.

Run the following command in your CLI.

```Shell
yarn add react-router-dom@5.2.0 bootstrap@5.0.1 react-bootstrap@2.0.0-beta.4 windows-iana@5.0.2
yarn add date-fns@2.22.1 date-fns-tz@1.1.4 @azure/msal-react@1.0.1 @azure/msal-browser@2.16.1 @microsoft/microsoft-graph-client@3.0.0
yarn add -D @types/react-router-dom@5.1.8 @types/microsoft-graph
```

## Design the app

Start by creating a [context](https://reactjs.org/docs/context.html) for the app.

1. Create a new file in the **./src** directory named **AppContext.tsx** and add the following `import` statements.

    ```typescript
    import React, {
      useContext,
      createContext,
      useState,
      MouseEventHandler,
      useEffect} from 'react';

    import config from './Config';
    import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
    import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
    import { useMsal } from '@azure/msal-react';
    ```

1. Add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/AppContext.tsx" id="AppContextSnippet":::

1. Add the following function at the end of **./src/AppContext.tsx**.

    ```typescript
    function useProvideAppContext() {
      const [user, setUser] = useState<AppUser | undefined>(undefined);
      const [error, setError] = useState<AppError | undefined>(undefined);

      const displayError = (message: string, debug?: string) => {
        setError({message, debug});
      }

      const clearError = () => {
        setError(undefined);
      }

      const authProvider = undefined;

      const signIn = async () => {
        // TODO
      };

      const signOut = async () => {
        // TODO
      };

      return {
        user,
        error,
        signIn,
        signOut,
        displayError,
        clearError,
        authProvider
      };
    }
    ```

    You will complete the implementation of this context in later sections.

1. Create a navbar for the app. Create a new file in the `./src` directory named `NavBar.tsx` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/NavBar.tsx" id="NavBarSnippet":::

1. Create a home page for the app. Create a new file in the `./src` directory named `Welcome.tsx` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/Welcome.tsx" id="WelcomeSnippet":::

1. Create an error message display to display messages to the user. Create a new file in the `./src` directory named `ErrorMessage.tsx` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/ErrorMessage.tsx" id="ErrorMessageSnippet":::

1. Open the `./src/index.css` file and replace its entire contents with the following.

    :::code language="css" source="../demo/graph-tutorial/src/index.css":::

1. Open `./src/App.tsx` and replace its entire contents with the following.

    ```typescript
    import { BrowserRouter as Router, Route } from 'react-router-dom';
    import { Container } from 'react-bootstrap';
    import { MsalProvider } from '@azure/msal-react'
    import { IPublicClientApplication } from '@azure/msal-browser';

    import ProvideAppContext from './AppContext';
    import ErrorMessage from './ErrorMessage';
    import NavBar from './NavBar';
    import Welcome from './Welcome';
    import 'bootstrap/dist/css/bootstrap.css';

    export default function App() {
      return(
        <ProvideAppContext>
          <Router>
            <NavBar />
            <Container>
              <ErrorMessage />
              <Route exact path="/"
                render={(props) =>
                  <Welcome {...props} />
                } />
            </Container>
          </Router>
        </ProvideAppContext>
      );
    }
    ```

1. Add an image file of your choosing named **no-profile-photo.png** in the **./public/images** directory. This image will be used as the user's photo when the user has no photo in Microsoft Graph.

1. Save all of your changes and restart the app. Now, the app should look very different.

    ![A screenshot of the redesigned home page](images/create-app-01.png)
