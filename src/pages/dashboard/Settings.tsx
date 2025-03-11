import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdvertiserProfile from "@/components/dashboard/AdvertiserProfile";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

const Settings = () => {
  const { advertiser } = useAdvertiser();

  if (!advertiser) {
    return null; // Or redirect to login
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">Gerencie suas informações de perfil</p>
        </div>

        <AdvertiserProfile initialData={advertiser} />
      </div>
    </DashboardLayout>
  );
};

export default Settings;