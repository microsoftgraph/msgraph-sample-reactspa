# Microsoft Graph sample React single-page app

This sample demonstrates how to use the Microsoft Graph JavaScript SDK to access data in Office 365 from React browser apps.

## Prerequisites

Before you start this tutorial, you should have [Node.js](https://nodejs.org) and [Yarn](https://classic.yarnpkg.com/) installed on your development machine. If you do not have Node.js or Yarn, visit the previous links for download options.

You should also have either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account. If you don't have a Microsoft account, there are a couple of options to get a free account:

- You can [sign up for a new personal Microsoft account](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=12&ct=1454618383&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https://mail.live.com/default.aspx&id=64855&cbcxt=mai&bk=1454618383&uiflavor=web&uaid=b213a65b4fdc484382b6622b3ecaa547&mkt=E-US&lc=1033&lic=1).
- You can [sign up for the Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) to get a free Microsoft 365 subscription.

## Running the sample

The code for this sample is in the [demo](demo) folder. Instructions to configure and run the sample can be found in the [README](demo/README.md) in that folder.

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

## Code of conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
