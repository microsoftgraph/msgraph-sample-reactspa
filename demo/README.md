# How to run the completed project

## Prerequisites

To run the completed project in this folder, you need the following:

- [Node.js](https://nodejs.org) installed on your development machine. If you do not have Node.js, visit the previous link for download options. (**Note:** This tutorial was written with Node version 12.16.1. The steps in this guide may work with other versions, but that has not been tested.)
- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.

If you don't have a Microsoft account, there are a couple of options to get a free account:

- You can [sign up for a new personal Microsoft account](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=12&ct=1454618383&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https://mail.live.com/default.aspx&id=64855&cbcxt=mai&bk=1454618383&uiflavor=web&uaid=b213a65b4fdc484382b6622b3ecaa547&mkt=E-US&lc=1033&lic=1).
- You can [sign up for the Office 365 Developer Program](https://developer.microsoft.com/office/dev-program) to get a free Office 365 subscription.

## Register a web application with the Azure Active Directory admin center

1. Open a browser and navigate to the [Azure Active Directory admin center](https://aad.portal.azure.com). Login using a **personal account** (aka: Microsoft Account) or **Work or School Account**.

1. Select **Azure Active Directory** in the left-hand navigation, then select **App registrations** under **Manage**.

    ![A screenshot of the App registrations ](/tutorial/images/aad-portal-app-registrations.png)

    > **Note:** Azure AD B2C users may only see **App registrations (legacy)**. In this case, please go directly to [https://aka.ms/appregistrations](https://aka.ms/appregistrations).

1. Select **New registration**. On the **Register an application** page, set the values as follows.

    - Set **Name** to `React Graph Tutorial`.
    - Set **Supported account types** to **Accounts in any organizational directory and personal Microsoft accounts**.
    - Under **Redirect URI**, set the first drop-down to `Single-page application (SPA)` and set the value to `http://localhost:3000`.

    ![A screenshot of the Register an application page](/tutorial/images/aad-register-an-app.png)

1. Choose **Register**. On the **Angular Graph Tutorial** page, copy the value of the **Application (client) ID** and save it, you will need it in the next step.

    ![A screenshot of the application ID of the new app registration](/tutorial/images/aad-application-id.png)

## Configure the sample

1. Rename the `./graph-tutorial/src/Config.example.ts` file to `./graph-tutorial/src/Config.ts`.
1. Edit the `./graph-tutorial/src/Config.ts` file and make the following changes.
    1. Replace `YOUR_APP_ID_HERE` with the **Application Id** you got from the App Registration Portal.
1. In your command-line interface (CLI), navigate to the `graph-tutorial` directory and run the following command to install requirements.

    ```Shell
    npm install
    ```

## Run the sample

1. Run the following command in your CLI to start the application.

    ```Shell
    npm start
    ```

1. Open a browser and browse to `http://localhost:3000`.
