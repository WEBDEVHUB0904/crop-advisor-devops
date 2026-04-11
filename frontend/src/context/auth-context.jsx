import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, clearAccessToken, setAccessToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    const payload = await apiRequest("/api/v1/auth/refresh/", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (payload?.access) {
      setAccessToken(payload.access);
    }

    return payload;
  };

  const loadCurrentUser = async () => {
    try {
      const data = await apiRequest("/api/v1/auth/me/");
      setUser(data);
    } catch {
      try {
        await refreshAccessToken();
        const data = await apiRequest("/api/v1/auth/me/");
        setUser(data);
      } catch {
        clearAccessToken();
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const login = async ({ email, password }) => {
    const data = await apiRequest("/api/v1/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data?.access) {
      setAccessToken(data.access);
      const profile = await apiRequest("/api/v1/auth/me/");
      setUser(profile);
    }

    return data;
  };

  const register = async ({ email, password, full_name }) => {
    return apiRequest("/api/v1/auth/register/", {
      method: "POST",
      body: JSON.stringify({ email, password, full_name }),
    });
  };

  const logout = async () => {
    try {
      await apiRequest("/api/v1/auth/logout/", {
        method: "POST",
      });
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser: loadCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}