// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import React, {
  useContext,
  createContext,
  useState,
  MouseEventHandler,
  useEffect} from 'react';

import config from './Config';
import { AuthProvider, AuthProviderCallback } from '@microsoft/microsoft-graph-client';
import { useMsal } from '@azure/msal-react';
import { getUser } from './GraphService';

// <AppContextSnippet>
export interface AppUser {
  displayName?: string,
  email?: string,
  avatar?: string,
  timeZone?: string,
  timeFormat?: string
};

export interface AppError {
  message: string,
  debug?: string
};

type AppContext = {
  user?: AppUser;
  error?: AppError;
  signIn?: MouseEventHandler<HTMLElement>;
  signOut?: MouseEventHandler<HTMLElement>;
  displayError?: Function;
  clearError?: Function;
  authProvider?: AuthProvider;
}

const appContext = createContext<AppContext>({
  user: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  displayError: undefined,
  clearError: undefined,
  authProvider: undefined
});

export function useAppContext(): AppContext {
  return useContext(appContext);
}

interface ProvideAppContextProps {
  children: React.ReactNode;
}

export default function ProvideAppContext({ children }: ProvideAppContextProps) {
  const auth = useProvideAppContext();
  return (
    <appContext.Provider value={auth}>
      {children}
    </appContext.Provider>
  );
}
// </AppContextSnippet>

// Check an error returned by MSAL to see
// if the error indicates an interactive auth prompt
// is needed
function isInteractionRequired(error: Error): boolean  {
  if (!error.message || error.message.length <= 0) {
    return false;
  }

  return (
    error.message.indexOf('consent_required') > -1 ||
    error.message.indexOf('interaction_required') > -1 ||
    error.message.indexOf('login_required') > -1 ||
    error.message.indexOf('no_account_in_silent_request') > -1
  );
}

function useProvideAppContext() {
  const [user, setUser] = useState<AppUser | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);

  const msal = useMsal();

  const displayError = (message: string, debug?: string) => {
    setError({message, debug});
  }

  const clearError = () => {
    setError(undefined);
  }

  // Used by the Graph SDK to authenticate API calls
  const authProvider = async (done: AuthProviderCallback) => {
    try {
      // First attempt a silent access token request
      const account = msal.instance.getActiveAccount();
      if (!account) {
        throw new Error('login_required');
      }

      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token
      const silentResult = await msal.instance.acquireTokenSilent({
        scopes: config.scopes,
        account: account
      });

      done (null, silentResult.accessToken);
    } catch (err) {
      // If a silent request fails, it may be because the user needs
      // to login or grant consent to one or more of the requested scopes
      if (isInteractionRequired(err)) {
        const interactiveResult = await msal.instance
          .acquireTokenPopup({
            scopes: config.scopes
          });

        done(null, interactiveResult.accessToken);
      } else {
        done (err, null);
      }
    }
  };

  // <UseEffectSnippet>
  useEffect(() => {
    const checkUser = async() => {
      if (!user) {
        try {
          // Check if user is already signed in
          const account = msal.instance.getActiveAccount();
          if (account) {
            // Get the user from Microsoft Graph
            const user = await getUser(authProvider);

            setUser({
              displayName: user.displayName || '',
              email: user.mail || user.userPrincipalName || '',
              timeFormat: user.mailboxSettings?.timeFormat || '',
              timeZone: user.mailboxSettings?.timeZone || 'UTC'
            });
          }
        } catch (err) {
          displayError(err.message);
        }
      }
    };
    checkUser();
  });
  // </UseEffectSnippet>

  // <SignInSnippet>
  const signIn = async () => {
    await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: 'select_account'
    });

    // Get the user from Microsoft Graph
    const user = await getUser(authProvider);

    setUser({
      displayName: user.displayName || '',
      email: user.mail || user.userPrincipalName || '',
      timeFormat: user.mailboxSettings?.timeFormat || '',
      timeZone: user.mailboxSettings?.timeZone || 'UTC'
    });
  };
  // </SignInSnippet>

  // <SignOutSnippet>
  const signOut = async () => {
    await msal.instance.logoutPopup();
    setUser(undefined);
  };
  // </SignOutSnippet>

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
