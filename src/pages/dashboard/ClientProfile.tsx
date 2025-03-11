import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserProfile from "@/components/dashboard/UserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";

const ClientProfile = () => {
  const { user } = useUser();

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Meu Perfil</h2>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e visualize seus favoritos</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <UserProfile initialData={user} />
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Imóveis Salvos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Você ainda não salvou nenhum imóvel.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Visitas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nenhuma visita agendada.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;