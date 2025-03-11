import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Advertiser {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AdvertiserContextType {
  advertiser: Advertiser | null;
  setAdvertiser: (advertiser: Advertiser | null) => void;
  updateAdvertiserProfile: (data: Partial<Advertiser>) => void;
  logout: () => void;
  isLoading: boolean;
}

const AdvertiserContext = createContext<AdvertiserContextType | undefined>(undefined);

export function AdvertiserProvider({ children }: { children: React.ReactNode }) {
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved advertiser data in localStorage first (persistent login)
    const savedAdvertiser = localStorage.getItem("advertiser");
    if (savedAdvertiser) {
      setAdvertiser(JSON.parse(savedAdvertiser));
      return;
    }
    
    // If not in localStorage, check sessionStorage (session-only login)
    const sessionAdvertiser = sessionStorage.getItem("advertiser");
    if (sessionAdvertiser) {
      setAdvertiser(JSON.parse(sessionAdvertiser));
    }
  }, []);

  // Update advertiser profile data and persist changes
  const updateAdvertiserProfile = (data: Partial<Advertiser>) => {
    if (!advertiser) return;

    const updatedAdvertiser = { ...advertiser, ...data };
    
    // Update state
    setAdvertiser(updatedAdvertiser);
    
    // Persist to storage
    // Check if the user was stored in localStorage (persistent) or sessionStorage
    if (localStorage.getItem("advertiser")) {
      localStorage.setItem("advertiser", JSON.stringify(updatedAdvertiser));
    } else if (sessionStorage.getItem("advertiser")) {
      sessionStorage.setItem("advertiser", JSON.stringify(updatedAdvertiser));
    }
  };

  const logout = () => {
    localStorage.removeItem("advertiser");
    sessionStorage.removeItem("advertiser");
    setAdvertiser(null);
    navigate("/");
  };

  return (
    <AdvertiserContext.Provider
      value={{
        advertiser,
        setAdvertiser,
        updateAdvertiserProfile,
        logout,
        isLoading,
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