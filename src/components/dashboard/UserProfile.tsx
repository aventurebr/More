
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";

interface UserProfileProps {
  initialData?: {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
  };
}

const UserProfile = ({ initialData }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: initialData?.name || "Usuário",
    email: initialData?.email || "usuario@example.com",
    avatar: initialData?.avatar || "/placeholder.svg",
    phone: initialData?.phone || "",
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
      if (!initialData?.id) {
        throw new Error("ID do usuário não encontrado");
      }
      
      // Upload the file to Supabase Storage
      const fileName = `avatar-${initialData.id}-${Date.now()}`;
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // Update the client record with the new avatar URL
      const { error: updateError } = await supabase
        .from('client')
        .update({ Url_avatar_client: publicUrl })
        .eq('id', initialData.id);
        
      if (updateError) throw updateError;
      
      // Update local state
      setUserData({ ...userData, avatar: publicUrl });
      
      // Update localStorage/sessionStorage if they exist
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        localStorage.setItem("user", JSON.stringify({...parsedUser, avatar: publicUrl}));
      }
      
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser);
        sessionStorage.setItem("user", JSON.stringify({...parsedUser, avatar: publicUrl}));
      }
      
      toast.success("Foto atualizada com sucesso!");
    } catch (error: any) {
      console.error("Error updating avatar:", error);
      toast.error("Erro ao atualizar a foto. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!initialData?.id) {
      toast.error("ID do usuário não encontrado");
      return;
    }
    
    setIsSaving(true);
    try {
      // Update the client record in Supabase
      const { error } = await supabase
        .from('client')
        .update({
          Nome: userData.name,
          Email: userData.email,
          telefone: userData.phone || null
        })
        .eq('id', initialData.id);
        
      if (error) throw error;
      
      // Update localStorage/sessionStorage if they exist
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        localStorage.setItem("user", JSON.stringify({
          ...parsedUser, 
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        }));
      }
      
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser);
        sessionStorage.setItem("user", JSON.stringify({
          ...parsedUser, 
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        }));
      }
      
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    } finally {
      setIsSaving(false);
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
              {userData.phone && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {userData.phone}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique no ícone da câmera para atualizar sua foto
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Nome</Label>
            <Input
              id="profile-name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              placeholder="Seu nome"
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder="Seu e-mail"
              type="email"
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profile-phone">Telefone</Label>
            <Input
              id="profile-phone"
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
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-slate-700 hover:bg-slate-800"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar"
                  )}
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
