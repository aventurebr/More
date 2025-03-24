
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session, User } from "@supabase/supabase-js";

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
  user: User | null;
  session: Session | null;
}

const AdvertiserContext = createContext<AdvertiserContextType | undefined>(undefined);

export function AdvertiserProvider({ children }: { children: React.ReactNode }) {
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession) {
          try {
            console.log("User signed in, fetching profile...");
            const { data, error } = await supabase
              .from('advertisers')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();
            
            if (error) {
              console.error("Error fetching advertiser profile:", error);
              return;
            }
            
            if (data) {
              console.log("Profile data:", data);
              setAdvertiser(data);
            }
          } catch (profileError) {
            console.error("Error in profile fetch:", profileError);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setAdvertiser(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        try {
          const { data, error } = await supabase
            .from('advertisers')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();
          
          if (error) {
            console.error("Error fetching advertiser profile:", error);
            setIsLoading(false);
            return;
          }
          
          if (data) {
            console.log("Initial session profile data:", data);
            setAdvertiser(data);
          }
        } catch (error) {
          console.error("Error in initial profile fetch:", error);
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Update advertiser profile data
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
      
      toast.success("Perfil atualizado com sucesso!");
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
      setUser(null);
      setSession(null);
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
        user,
        session
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
