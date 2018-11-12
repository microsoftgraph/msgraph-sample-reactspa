# How to run the completed project

## Prerequisites

To run the completed project in this folder, you need the following:

- [Visual Studio](https://visualstudio.microsoft.com/vs/) installed on your development machine. If you do not have Visual Studio, visit the previous link for download options. (**Note:** This tutorial was written with Visual Studio 2017 version 15.81. The steps in this guide may work with other versions, but that has not been tested.)
- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.

If you don't have a Microsoft account, there are a couple of options to get a free account:

- You can [sign up for a new personal Microsoft account](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=12&ct=1454618383&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https://mail.live.com/default.aspx&id=64855&cbcxt=mai&bk=1454618383&uiflavor=web&uaid=b213a65b4fdc484382b6622b3ecaa547&mkt=E-US&lc=1033&lic=1).
- You can [sign up for the Office 365 Developer Program](https://developer.microsoft.com/office/dev-program) to get a free Office 365 subscription.

## Register a web application with the Application Registration Portal

1. Open a browser and navigate to the [Application Registration Portal](https://apps.dev.microsoft.com). Login using a **personal account** (aka: Microsoft Account) or **Work or School Account**.

1. Select **Add an app** at the top of the page.

    > **Note:** If you see more than one **Add an app** button on the page, select the one that corresponds to the **Converged apps** list.

1. On the **Register your application** page, set the **Application Name** to **React Graph Tutorial** and select **Create**.

    ![Screenshot of creating a new app in the App Registration Portal website](/tutorial/images/arp-create-app-01.png)

1. On the **React Graph Tutorial Registration** page, under the **Properties** section, copy the **Application Id** as you will need it later.

    ![Screenshot of newly created application's ID](/tutorial/images/arp-create-app-02.png)

1. Scroll down to the **Platforms** section.

    1. Select **Add Platform**.
    1. In the **Add Platform** dialog, select **Web**.

        ![Screenshot creating a platform for the app](/tutorial/images/arp-create-app-03.png)

    1. In the **Web** platform box, enter `http://localhost:3000` for the **Redirect URLs**.

        ![Screenshot of the newly added Web platform for the application](/tutorial/images/arp-create-app-04.png)

1. Scroll to the bottom of the page and select **Save**.

## Configure the sample

1. Rename the `./graph-tutorial/src/Config.js.example` file to `./graph-tutorial/src/Config.js`.
1. Edit the `./graph-tutorial/src/Config.js` file and make the following changes.
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