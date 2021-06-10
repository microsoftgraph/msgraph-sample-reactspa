// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <GetUserSnippet>
import { AuthProvider, Client } from '@microsoft/microsoft-graph-client';
import { User } from 'microsoft-graph';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthProvider) {
  if (!graphClient) {
    graphClient = Client.init({
      authProvider: authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider: AuthProvider): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!.api('/me')
    // Only retrieve the specific fields needed
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}
// </GetUserSnippet>
