"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const token = Cookies.get("skillswap_token");
    if (token) {
      api.get("/api/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          Cookies.remove("skillswap_token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    Cookies.set("skillswap_token", token, { expires: 7 });
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("skillswap_token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
