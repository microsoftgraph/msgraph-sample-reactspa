<!-- markdownlint-disable MD002 MD041 -->

In this section you will add the ability to create events on the user's calendar.

## Add method to GraphService

1. Open **./src/GraphService.ts** and add the following function to create a new event.

    :::code language="typescript" source="../demo/graph-tutorial/src/GraphService.ts" id="createEventSnippet":::

## Create new event form

1. Create a new file in the **./src** directory named **NewEvent.tsx** and add the following code.

    :::code language="typescript" source="../demo/graph-tutorial/src/NewEvent.tsx" id="NewEventSnippet":::

1. Open **./src/App.tsx** and add the following `import` statement to the top of the file.

    ```typescript
    import NewEvent from './NewEvent';
    ```

1. Add a new route to the new event form. Add the following code just after the other `Route` elements.

    ```typescript
    <Route exact path="/newevent"
      render={(props) =>
        this.props.isAuthenticated ?
          <NewEvent {...props} /> :
          <Redirect to="/" />
      } />
    ```

    The full `return` statement should now look like this.

    :::code language="typescript" source="../demo/graph-tutorial/src/App.tsx" id="renderSnippet" highlight="23-28":::

1. Refresh the app and browse to the calendar view. Click the **New event** button. Fill in the fields and click **Create**.

    ![A screenshot of the new event form](./images/create-event-01.png)
