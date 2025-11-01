import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("sofia_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - In production, this would call your Django backend
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        role: "admin",
      };
      setUser(mockUser);
      localStorage.setItem("sofia_user", JSON.stringify(mockUser));
      
      // Store session info
      const session = {
        userId: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        loginTime: new Date().toISOString(),
        ipAddress: "192.168.1.1", // Mock IP
        device: navigator.userAgent,
        browser: navigator.userAgent.includes("Chrome") ? "Chrome" : "Other",
        status: "online",
      };
      
      const sessions = JSON.parse(localStorage.getItem("sofia_sessions") || "[]");
      sessions.push(session);
      localStorage.setItem("sofia_sessions", JSON.stringify(sessions));
      
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock registration - In production, this would call your Django backend
    if (name && email && password.length >= 8) {
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: "user",
      };
      setUser(mockUser);
      localStorage.setItem("sofia_user", JSON.stringify(mockUser));
      
      // Store session info
      const session = {
        userId: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        loginTime: new Date().toISOString(),
        ipAddress: "192.168.1.1",
        device: navigator.userAgent,
        browser: navigator.userAgent.includes("Chrome") ? "Chrome" : "Other",
        status: "online",
      };
      
      const sessions = JSON.parse(localStorage.getItem("sofia_sessions") || "[]");
      sessions.push(session);
      localStorage.setItem("sofia_sessions", JSON.stringify(sessions));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sofia_user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
