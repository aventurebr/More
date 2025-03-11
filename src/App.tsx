
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext";
import { AdvertiserProvider } from "./contexts/AdvertiserContext";
// Use environment variable for Google OAuth client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-actual-google-client-id";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import AdvertiserRegister from "./pages/AdvertiserRegister";
import AdvertiserLogin from "./pages/AdvertiserLogin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardRooms from "./pages/dashboard/Rooms";
import DashboardMessages from "./pages/dashboard/Messages";
import DashboardReviews from "./pages/dashboard/Reviews";
import ClientProfile from "./pages/dashboard/ClientProfile";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <AdvertiserProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/quartos" element={<Rooms />} />
                <Route path="/room/:id" element={<RoomDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/advertiser/register" element={<AdvertiserRegister />} />
                <Route path="/advertiser/login" element={<AdvertiserLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/rooms" element={<DashboardRooms />} />
                <Route path="/dashboard/messages" element={<DashboardMessages />} />
                <Route path="/dashboard/reviews" element={<DashboardReviews />} />
                <Route path="/dashboard/client-profile" element={<ClientProfile />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AdvertiserProvider>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
