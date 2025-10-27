import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import ClientAvatarUpload from "./profile/ClientAvatarUpload";

interface UserProfileProps {
  initialData?: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
}

const UserProfile = ({ initialData }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateUserProfile } = useUser();
  const [userData, setUserData] = useState({
    name: initialData?.name || "Usuário",
    email: initialData?.email || "usuario@example.com",
    phone: initialData?.phone || "",
    avatar: initialData?.avatar || "",
  });

  const handleAvatarUpdate = (newUrl: string) => {
    setUserData({ ...userData, avatar: newUrl });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: userData.avatar,
      });
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Seu Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-6">
            <ClientAvatarUpload
              currentUrl={userData.avatar}
              userName={userData.name}
              onAvatarUpdated={handleAvatarUpdate}
            />
            <div className="text-left">
              <h3 className="text-lg font-medium">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique no ícone da câmera para atualizar sua foto (JPG ou PNG, máx 5MB)
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              placeholder="Seu nome"
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Input
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder="Seu e-mail"
              type="email"
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Input
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              placeholder="Seu telefone"
              type="tel"
              disabled={!isEditing}
            />
          </div>
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-slate-700 hover:bg-slate-800"
                >
                  Salvar
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Editar Perfil
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;