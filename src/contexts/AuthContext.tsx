import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { mockUser } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial y auto-login para debug
    const timer = setTimeout(() => {
      try {
        const savedUser = localStorage.getItem("inspira_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Auto-login con usuario mock para debug
          setUser(mockUser);
          localStorage.setItem("inspira_user", JSON.stringify(mockUser));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading user:", error);
        // En caso de error, usar usuario mock
        setUser(mockUser);
        setLoading(false);
      }
    }, 500); // Reducir tiempo de carga

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, _password: string) => {
    setLoading(true);

    // Simular autenticación Microsoft
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock user basado en email
    const userData = {
      ...mockUser,
      email,
      name: email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    };

    setUser(userData);
    localStorage.setItem("inspira_user", JSON.stringify(userData));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("inspira_user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
