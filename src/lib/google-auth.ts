// Google OAuth configuration

// This is the client ID from Google OAuth
// Using the environment variable set in .env file
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-actual-google-client-id";

// Instructions to get a valid Google OAuth client ID:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select an existing one
// 3. Navigate to APIs & Services > Credentials
// 4. Click on "Create Credentials" and select "OAuth client ID"
// 5. Configure the OAuth consent screen if prompted
// 6. Select "Web application" as the application type
// 7. Add authorized JavaScript origins (e.g., http://localhost:8080)
// 8. Add authorized redirect URIs if needed
// 9. Click "Create" and copy the generated client ID

// Function to handle Google login success
export const handleGoogleLoginSuccess = async (response: any) => {
  try {
    // Get the ID token from the response
    const { credential } = response;
    
    // In a real application, you would send this token to your backend
    // to verify and create a session
    console.log("Google login successful", credential);
    
    return {
      success: true,
      credential,
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