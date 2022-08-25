import React, {
    useContext,
    createContext,
    useState,
    MouseEventHandler,
    useEffect} from 'react';
  
  import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
  import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
  import { useMsal } from '@azure/msal-react';

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
    authProvider?: AuthCodeMSALBrowserAuthenticationProvider;
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

  function useProvideAppContext() {
    const [user, setUser] = useState<AppUser | undefined>(undefined);
    const [error, setError] = useState<AppError | undefined>(undefined);
  
    const displayError = (message: string, debug?: string) => {
      setError({message, debug});
    }
  
    const clearError = () => {
      setError(undefined);
    }
  
    const authProvider = undefined;
  
    const signIn = async () => {
      // TODO
    };
  
    const signOut = async () => {
      // TODO
    };
  
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