import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UserProfileProps {
  initialData?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserProfile = ({ initialData }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userData, setUserData] = useState({
    name: initialData?.name || "Usuário",
    email: initialData?.email || "usuario@example.com",
    avatar: initialData?.avatar || "/placeholder.svg",
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image/")) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Implement actual image upload logic
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, avatar: imageUrl });
      toast.success("Foto atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a foto. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      // TODO: Implement actual save logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar} alt="Foto do perfil" />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-1 rounded-full bg-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 text-white animate-spin" />
                ) : (
                  <Camera className="h-4 w-4 text-white" />
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique no ícone da câmera para atualizar sua foto
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