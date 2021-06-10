// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthProvider, Client } from '@microsoft/microsoft-graph-client';
import { User } from 'microsoft-graph';

let graphClient: Client | undefined = undefined;

// <GraphClientInitSnippet>
function ensureClient(authProvider: AuthProvider) {
  if (!graphClient) {
    graphClient = Client.init({
      authProvider: authProvider
    });
  }

  return graphClient;
}
// </GraphClientInitSnippet>

// <AuthenticateUserSnippet>
export async function getUser(authProvider: AuthProvider): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!.api('/me')
    // Only retrieve the specific fields needed
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}
// </AuthenticateUserSnippet>

// <SignOutSnippet>
export function signOutUser() {
  graphClient = undefined;
}
// </SignOutSnippet>
