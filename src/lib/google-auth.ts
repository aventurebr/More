
import { supabase } from "@/integrations/supabase/client";

// This is the client ID from Google OAuth
// Using the environment variable set in .env file
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-actual-google-client-id";

// Function to handle Google login success
export const handleGoogleLoginSuccess = async (tokenResponse: any) => {
  try {
    // Get the ID token or access token from the response
    const { access_token } = tokenResponse;
    
    if (!access_token) {
      console.error("No token received from Google");
      return { success: false, error: "No token received" };
    }
    
    console.log("Google token received, signing in with Supabase");
    
    // Sign in with Google using Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
        queryParams: {
          access_token
        }
      }
    });
    
    if (error) {
      console.error("Google login error:", error);
      throw error;
    }
    
    console.log("Google login successful", data);
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Google login error:", error);
    return {
      success: false,
      error,
    };
  }
};

// Function to handle Google login failure
export const handleGoogleLoginError = () => {
  console.error("Google login failed");
  return {
    success: false,
    error: "Login failed",
  };
};
