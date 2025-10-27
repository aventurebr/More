
import React, { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdvertiserProfile from "@/components/dashboard/AdvertiserProfile";
import { useAdvertiser } from "@/contexts/AdvertiserContext";
import UserSettings from "@/components/dashboard/UserSettings";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const { advertiser, isLoading: advertiserLoading } = useAdvertiser();
  const { user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Sessão expirada. Por favor, faça login novamente.");
        navigate("/advertiser/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Function to check auth status for debugging
  const checkAuthStatus = async () => {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      toast.error("Erro ao verificar sessão: " + error.message);
      return;
    }
    
    if (data.session) {
      toast.success("Usuário autenticado!");
      console.log("Auth session:", data.session);
      
      // Refresh profile data from database
      const { data: advertiserData, error: advertiserError } = await (supabase as any)
        .from('advertisers')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
      
      if (advertiserError) {
        console.error("Error fetching refreshed advertiser data:", advertiserError);
      } else {
        console.log("Refreshed advertiser data:", advertiserData);
      }
      
    } else {
      toast.error("Usuário não autenticado!");
      navigate("/advertiser/login");
    }
  };

  // Show loading state while checking authentication
  if (advertiser && advertiserLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando informações do perfil...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (user && userLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando informações do perfil...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Handle not authenticated state
  if (!advertiser && !user) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <p className="text-lg text-red-500">Usuário não autenticado</p>
          <Button 
            onClick={() => navigate("/login")} 
            className="mt-4"
          >
            Ir para login
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">Gerencie suas informações de perfil</p>
        </div>

        {advertiser ? (
          <AdvertiserProfile initialData={advertiser} />
        ) : (
          <UserSettings initialData={user || undefined} />
        )}
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Outras Configurações</h3>
          
          <div className="space-y-2">
            <h4 className="font-medium">Notificações</h4>
            <p className="text-sm text-muted-foreground">
              Configure como deseja receber notificações sobre novos contatos.
            </p>
            <Button variant="outline" disabled>
              Configurar Notificações (Em breve)
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Integrações</h4>
            <p className="text-sm text-muted-foreground">
              Conecte suas redes sociais e outros serviços à sua conta.
            </p>
            <Button variant="outline" disabled>
              Gerenciar Integrações (Em breve)
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Verificação de Conta</h4>
            <p className="text-sm text-muted-foreground">
              Verifique sua identidade para aumentar a confiança dos usuários.
            </p>
            <Button variant="outline" disabled>
              Verificar Conta (Em breve)
            </Button>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="outline" 
              onClick={checkAuthStatus}
              className="text-sm"
            >
              Verificar Status da Autenticação
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
