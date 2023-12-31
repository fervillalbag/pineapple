import { useState, createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks";
import {
  SURA_AUTH_TOKEN,
  SURA_CREDENTIALS,
} from "../utils/constants/auth";
import { useGetUser } from "../hooks/user";
import { getDataFromToken } from "../helpers";

export const AuthenticatedContext = createContext<any>(null);

interface AuthenticatedProps {
  children?: React.ReactNode;
}

export default function AuthenticatedProvider({
  children,
}: AuthenticatedProps) {
  const [value] = useLocalStorageState({
    key: SURA_AUTH_TOKEN,
  });

  const [localUser] = useLocalStorageState({
    key: SURA_CREDENTIALS,
    value: {},
  });

  const user = localUser.id ? useGetUser("_id", localUser.id) : null;

  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean | null
  >(value?.token ? true : false);

  useEffect(() => {
    setIsAuthenticated(value?.token ? true : false);
    if (!value?.token) return;
    const response = getDataFromToken(value.token);
    localStorage.setItem(SURA_CREDENTIALS, JSON.stringify(response));
  }, [value]);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(SURA_AUTH_TOKEN);
  };

  return (
    <AuthenticatedContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
}
