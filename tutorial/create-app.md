<!-- markdownlint-disable MD002 MD041 -->

Open your command-line interface (CLI), navigate to a directory where you have rights to create files, and run the following commands to install the [create-react-app](https://www.npmjs.com/package/create-react-app) tool and create a new React app.

```Shell
npm install create-react-app@2.1.0 -g
create-react-app graph-tutorial
```

Once the command finishes, change to the `graph-tutorial` directory in your CLI and run the following command to start a local web server.

```Shell
npm start
```

Your default browser opens to [https://localhost:3000/](https://localhost:3000) with a default React page. If your browser doesn't open, open it and browse to [https://localhost:3000/](https://localhost:3000) to verify that the new app works.

Before moving on, install some additional packages that you will use later:

- [react-router-dom](https://github.com/ReactTraining/react-router) for declarative routing inside the React app.
- [bootstrap](https://github.com/twbs/bootstrap) for styling and common components.
- [reactstrap](https://github.com/reactstrap/reactstrap) for React components based on Bootstrap.
- [fontawesome-free](https://github.com/FortAwesome/Font-Awesome) for icons.
- [msal](https://github.com/AzureAD/microsoft-authentication-library-for-js) for authenticating to Azure Active Directory and retrieving access tokens.
- [microsoft-graph-client](https://github.com/microsoftgraph/msgraph-sdk-javascript) for making calls to Microsoft Graph.

Run the following command in your CLI.

```Shell
npm install react-router-dom@4.3.1 bootstrap@4.1.3 reactstrap@6.5.0 @fortawesome/fontawesome-free@5.4.2 msal@0.2.3 @microsoft/microsoft-graph-client@1.3.0
```

## Design the app

Start by creating a navbar for the app. Create a new file in the `./src` directory named `Navbar.js` and add the following code.