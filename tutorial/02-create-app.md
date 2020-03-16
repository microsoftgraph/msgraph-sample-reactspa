<!-- markdownlint-disable MD002 MD041 -->

In this section you'll create a new React app.

1. Open your command-line interface (CLI), navigate to a directory where you have rights to create files, and run the following commands to create a new React app.

    ```Shell
    npx create-react-app@3.4.0 graph-tutorial --template typescript
    ```

1. Once the command finishes, change to the `graph-tutorial` directory in your CLI and run the following command to start a local web server.

    ```Shell
    npm start
    ```

Your default browser opens to [https://localhost:3000/](https://localhost:3000) with a default React page. If your browser doesn't open, open it and browse to [https://localhost:3000/](https://localhost:3000) to verify that the new app works.

## Add Node packages

Before moving on, install some additional packages that you will use later:

- [react-router-dom](https://github.com/ReactTraining/react-router) for declarative routing inside the React app.
- [bootstrap](https://github.com/twbs/bootstrap) for styling and common components.
- [reactstrap](https://github.com/reactstrap/reactstrap) for React components based on Bootstrap.
- [fontawesome-free](https://github.com/FortAwesome/Font-Awesome) for icons.
- [moment](https://github.com/moment/moment) for formatting dates and times.
- [msal](https://github.com/AzureAD/microsoft-authentication-library-for-js) for authenticating to Azure Active Directory and retrieving access tokens.
- [microsoft-graph-client](https://github.com/microsoftgraph/msgraph-sdk-javascript) for making calls to Microsoft Graph.

Run the following command in your CLI.

```Shell
npm install react-router-dom@5.1.2 @types/react-router-dom@5.1.3 bootstrap@4.4.1 reactstrap@8.4.1 @types/reactstrap@8.4.2
npm install @fortawesome/fontawesome-free@5.12.1 moment@2.24.0 msal@1.2.1 @microsoft/microsoft-graph-client@2.0.0
```

## Design the app

Start by creating a navbar for the app.

1. Create a new file in the `./src` directory named `NavBar.tsx` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/NavBar.tsx" id="NavBarSnippet":::

1. Create a home page for the app. Create a new file in the `./src` directory named `Welcome.tsx` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/Welcome.tsx" id="WelcomeSnippet":::

1. Create an error message display to display messages to the user. Create a new file in the `./src` directory named `ErrorMessage.tsx` and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/ErrorMessage.tsx" id="ErrorMessageSnippet":::

1. Open the `./src/index.css` file and replace its entire contents with the following.

    :::code language="css" source="../demo/graph-tutorial/src/index.css":::

1. Open `./src/App.tsx` and replace its entire contents with the following.

    ```TSX
    import React, { Component } from 'react';
    import { BrowserRouter as Router, Route } from 'react-router-dom';
    import { Container } from 'reactstrap';
    import NavBar from './NavBar';
    import ErrorMessage from './ErrorMessage';
    import Welcome from './Welcome';
    import 'bootstrap/dist/css/bootstrap.css';

    class App extends Component {
      constructor(props) {
        super(props);

        this.state = {
          isAuthenticated: false,
          user: {},
          error: null
        };
      }

      render() {
        let error = null;
        if (this.state.error) {
          error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />;
        }

        return (
          <Router>
            <div>
              <NavBar
                isAuthenticated={this.state.isAuthenticated}
                authButtonMethod={null}
                user={this.state.user}/>
              <Container>
                {error}
                <Route exact path="/"
                  render={(props) =>
                    <Welcome {...props}
                      isAuthenticated={this.state.isAuthenticated}
                      user={this.state.user}
                      authButtonMethod={null} />
                  } />
              </Container>
            </div>
          </Router>
        );
      }

      setErrorMessage(message, debug) {
        this.setState({
          error: {message: message, debug: debug}
        });
      }
    }

    export default App;
    ```

Save all of your changes and refresh the page. Now, the app should look very different.

![A screenshot of the redesigned home page](images/create-app-01.png)
