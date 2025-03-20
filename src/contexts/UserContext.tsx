import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

    // Set up auth state listener to keep user state in sync with Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && session.user) {
          // Fetch user data from the client table
          const { data, error } = await supabase
            .from('client')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (data) {
            const userData = {
              id: session.user.id,
              name: data.Nome,
              email: data.Email,
              avatar: data.Url_avatar_client
            };
            setUser(userData);
          } else if (error && error.code !== 'PGRST116') {
            // PGRST116 is the error code for "no rows returned"
            console.error("Error fetching user data:", error);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      // Actual authentication with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Fetch user data from client table
        const { data: clientData, error: clientError } = await supabase
          .from('client')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (clientError && clientError.code !== 'PGRST116') {
          console.error("Error fetching client data:", clientError);
        }
        
        // Create user object with data from database
        const userData = {
          id: data.user.id,
          name: clientData?.Nome || email.split("@")[0],
          email: data.user.email || email,
          avatar: clientData?.Url_avatar_client || "/placeholder.svg"
        };
        
        // Save user data based on rememberMe preference
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
        
        setUser(userData);
        navigate("/dashboard/client-profile");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (credential: any, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      // Will be implemented with Supabase Google Auth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard/client-profile'
        }
      });
      
      if (error) throw error;
      
      // The actual user data will be processed in the onAuthStateChange listener
      // after the OAuth redirect completes
    } catch (error: any) {
      console.error("Google login error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
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
