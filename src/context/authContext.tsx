import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import type { AuthContextType, User } from "../types/types";

const API_BASE = "http://localhost:5000/api";

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Check if code is running in browser
  const isBrowser = typeof window !== "undefined";

  // Initialize user state safely for SSR
  const [user, setUser] = useState<User | null>(() => {
    if (!isBrowser) return null;
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Sync state with localStorage (only on client)
  useEffect(() => {
    if (!isBrowser) return;
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user, isBrowser]);

  // Sign in user
  const signin = async (email: string, password: string): Promise<User> => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    setUser(res.data.user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    return res.data.user;
  };

  // Sign up user
  const signup = async (name: string, email: string, password: string): Promise<User> => {
    const res = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
    setUser(res.data.user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    return res.data.user;
  };

  // Sign out
  const signout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
