
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAdvertiser } from "@/contexts/AdvertiserContext";
import AvatarUpload from "./profile/AvatarUpload";
import ProfileForm from "./profile/ProfileForm";

interface AdvertiserProfileProps {
  initialData?: {
    name: string;
    email: string;
    phone?: string;
    avatar_url?: string | null;
  };
}

const AdvertiserProfile = ({ initialData }: AdvertiserProfileProps) => {
  const { updateAdvertiserProfile, advertiser, refreshProfile } = useAdvertiser();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: initialData?.name || "Anunciante",
    email: initialData?.email || "anunciante@example.com",
    phone: initialData?.phone || "",
    avatar_url: initialData?.avatar_url || null,
  });

  // Update local state when advertiser data changes from context
  useEffect(() => {
    if (advertiser) {
      console.log("Updating profile component with data:", advertiser);
      setUserData({
        name: advertiser.name || userData.name,
        email: advertiser.email || userData.email,
        phone: advertiser.phone || userData.phone,
        avatar_url: advertiser.avatar_url || userData.avatar_url,
      });
    }
  }, [advertiser]);

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpdated = (url: string) => {
    setUserData(prev => ({ ...prev, avatar_url: url }));
    // Refresh advertiser profile data from database to ensure everything is in sync
    setTimeout(() => {
      refreshProfile();
    }, 1000);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      // Update advertiser profile in database
      await updateAdvertiserProfile({
        name: userData.name,
        phone: userData.phone
      });
      
      toast.success("Perfil atualizado com sucesso!");
      // Refresh profile data from database to ensure everything is in sync
      refreshProfile();
    } catch (error) {
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Perfil do Anunciante</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col md:flex-row items-center md:gap-6 w-full">
            <AvatarUpload 
              currentUrl={userData.avatar_url}
              userName={userData.name}
              userEmail={userData.email}
              onAvatarUpdated={handleAvatarUpdated}
            />
            <div className="text-center md:text-left w-full">
              <h3 className="text-lg font-medium">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              {userData.phone && (
                <p className="text-sm text-muted-foreground">{userData.phone}</p>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique no ícone da câmera para atualizar sua foto
          </p>
        </div>

        <ProfileForm 
          userData={userData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          onEdit={() => setIsEditing(true)}
        />
      </CardContent>
    </Card>
  );
};

export default AdvertiserProfile;
