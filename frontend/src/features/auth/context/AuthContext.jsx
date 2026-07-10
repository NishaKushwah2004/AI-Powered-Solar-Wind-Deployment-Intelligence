import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { STORAGE_KEYS } from "@/constants/storageKeys";
import { DEFAULT_USER } from "@/types/user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  );

  const [user, setUser] = useState(DEFAULT_USER);

  const [loading, setLoading] = useState(false);

  const login = (accessToken) => {
    localStorage.setItem(
      STORAGE_KEYS.ACCESS_TOKEN,
      accessToken
    );

    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );

    setToken(null);

    setUser(DEFAULT_USER);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,

      isAuthenticated: !!token,

      login,
      logout,

      setUser,
      setLoading,
      setToken,
    }),
    [token, user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider."
    );
  }

  return context;
}