import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  loginWithGoogle: (credential: any, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user data in localStorage first (persistent login)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      return;
    }
    
    // If not in localStorage, check sessionStorage (session-only login)
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      // Simulate API call - Replace with actual authentication
      const mockUser = {
        id: "1",
        name: email.split("@")[0],
        email,
        avatar: "/placeholder.svg",
      };
      
      // Save user data based on rememberMe preference
      if (rememberMe) {
        // Save to localStorage for persistent login across sessions
        localStorage.setItem("user", JSON.stringify(mockUser));
      } else {
        // Save to sessionStorage for current session only
        sessionStorage.setItem("user", JSON.stringify(mockUser));
      }
      
      setUser(mockUser);
      navigate("/dashboard/client-profile");
    } catch (error) {
      throw new Error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (credential: any, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      // Simulate API call - Replace with actual Google auth verification
      const mockUser = {
        id: "2",
        name: "Google User",
        email: "user@gmail.com",
        avatar: "/placeholder.svg",
      };
      
      // Save user data based on rememberMe preference
      if (rememberMe) {
        // Save to localStorage for persistent login across sessions
        localStorage.setItem("user", JSON.stringify(mockUser));
      } else {
        // Save to sessionStorage for current session only
        sessionStorage.setItem("user", JSON.stringify(mockUser));
      }
      
      setUser(mockUser);
      navigate("/dashboard/client-profile");
    } catch (error) {
      throw new Error("Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        loginWithGoogle,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}