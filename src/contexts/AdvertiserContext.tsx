
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Advertiser {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string | null;
}

interface AdvertiserContextType {
  advertiser: Advertiser | null;
  setAdvertiser: (advertiser: Advertiser | null) => void;
  updateAdvertiserProfile: (data: Partial<Advertiser>) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const AdvertiserContext = createContext<AdvertiserContextType | undefined>(undefined);

export function AdvertiserProvider({ children }: { children: React.ReactNode }) {
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch advertiser profile data
  const fetchAdvertiserProfile = async () => {
    try {
      console.log("Fetching advertiser profile...");
      const { data: session } = await supabase.auth.getSession();
      
      if (session && session.session) {
        console.log("Session found, fetching advertiser data...");
        // Get advertiser profile from database
        const { data: advertiserData, error } = await supabase
          .from('advertisers')
          .select('*')
          .eq('id', session.session.user.id)
          .single();
        
        if (error) {
          console.error("Error fetching advertiser profile:", error);
          return null;
        }
        
        console.log("Advertiser data fetched:", advertiserData);
        return advertiserData;
      } else {
        console.log("No session found");
        return null;
      }
    } catch (error) {
      console.error("Error checking auth session:", error);
      return null;
    }
  };

  // Function to refresh profile that can be called from components
  const refreshProfile = async () => {
    setIsLoading(true);
    const profile = await fetchAdvertiserProfile();
    if (profile) {
      setAdvertiser(profile);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Check for current Supabase session
    const initializeAdvertiser = async () => {
      try {
        setIsLoading(true);
        const profile = await fetchAdvertiserProfile();
        if (profile) {
          setAdvertiser(profile);
        }
      } catch (error) {
        console.error("Error initializing advertiser:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAdvertiser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        if (event === 'SIGNED_IN' && session) {
          console.log("User signed in, fetching profile...");
          setIsLoading(true);
          const profile = await fetchAdvertiserProfile();
          if (profile) {
            setAdvertiser(profile);
          }
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setAdvertiser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Update advertiser profile data and persist changes
  const updateAdvertiserProfile = async (data: Partial<Advertiser>) => {
    if (!advertiser || !advertiser.id) {
      console.error("Cannot update profile: No advertiser data or ID");
      return;
    }

    try {
      console.log("Updating advertiser profile with:", data);
      const { error } = await supabase
        .from('advertisers')
        .update(data)
        .eq('id', advertiser.id);
      
      if (error) {
        console.error("Error in supabase update:", error);
        throw error;
      }
      
      // Update state with new data
      setAdvertiser((prev) => {
        if (!prev) return null;
        const updated = { ...prev, ...data };
        console.log("Updated advertiser state:", updated);
        return updated;
      });
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setAdvertiser(null);
      navigate("/");
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  return (
    <AdvertiserContext.Provider
      value={{
        advertiser,
        setAdvertiser,
        updateAdvertiserProfile,
        logout,
        isLoading,
        refreshProfile,
      }}
    >
      {children}
    </AdvertiserContext.Provider>
  );
}

export function useAdvertiser() {
  const context = useContext(AdvertiserContext);
  if (context === undefined) {
    throw new Error("useAdvertiser must be used within an AdvertiserProvider");
  }
  return context;
}
