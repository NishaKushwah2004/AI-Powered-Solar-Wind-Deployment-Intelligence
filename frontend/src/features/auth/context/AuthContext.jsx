import {
  createContext,
  useMemo,
  useState,
  useCallback,
} from "react";

import { STORAGE_KEYS } from "@/constants/storageKeys";
import { DEFAULT_USER } from "@/types/user";

export const AuthContext = createContext(null);

const getStoredToken = () =>
  localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

const storeToken = (token) =>
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

const removeStoredToken = () =>
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken);

  const [user, setUser] = useState(DEFAULT_USER);

  const [loading, setLoading] = useState(false);

  const login = useCallback((accessToken) => {
    storeToken(accessToken);
    setToken(accessToken);
  }, []);

  const logout = useCallback(() => {
    removeStoredToken();
    setToken(null);
    setUser(DEFAULT_USER);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,

      isAuthenticated: Boolean(token),

      login,
      logout,

      setUser,
      setLoading,
    }),
    [token, user, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

