// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <AppContextSnippet>
import React, {
  useContext,
  createContext,
  useState,
  MouseEventHandler } from 'react';
import InteractiveBrowserCredential from '@azure/identity';

export interface AppUser {
  displayName: string,
  email: string,
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
}

const appContext = createContext<AppContext>({
  user: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  displayError: undefined,
  clearError: undefined
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

function useProvideAppContext() {
  const [user, setUser] = useState<AppUser | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);

  const signIn = async () => {
    // TEMPORARY
    setUser({ displayName: "Test User", email: "test@contoso.com" });
  };

  const signOut = async () => {
    // TEMPORARY
    setUser(undefined);
  };

  const displayError = (message: string, debug?: string) => {
    setError({message, debug});
  }

  const clearError = () => {
    setError(undefined);
  }

  return {
    user,
    error,
    signIn,
    signOut,
    displayError,
    clearError
  };
}
