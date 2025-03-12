
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdvertiser } from "@/contexts/AdvertiserContext";
import { supabase } from "@/integrations/supabase/client";

interface AdvertiserProfileProps {
  initialData?: {
    name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
}

const AdvertiserProfile = ({ initialData }: AdvertiserProfileProps) => {
  const { updateAdvertiserProfile } = useAdvertiser();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userData, setUserData] = useState({
    name: initialData?.name || "Anunciante",
    email: initialData?.email || "anunciante@example.com",
    phone: initialData?.phone || "",
    avatar_url: initialData?.avatar_url || "/placeholder.svg",
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
      // Create a unique filename using timestamp and original file extension
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}.${extension}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`advertiser-avatars/${initialData?.email}/${filename}`, file);
      
      if (error) {
        console.error("Upload error:", error);
        throw error;
      }
      
      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(`advertiser-avatars/${initialData?.email}/${filename}`);
      
      const avatar_url = publicUrlData.publicUrl;
      
      // Update local state with the new avatar URL
      setUserData({ ...userData, avatar_url });
      
      // Update advertiser profile in database
      await updateAdvertiserProfile({ avatar_url });
      
      toast.success("Foto atualizada com sucesso!");
    } catch (error: any) {
      console.error("Upload error details:", error);
      toast.error(`Erro ao atualizar a foto: ${error.message || "Tente novamente."}`);
    } finally {
      setIsUploading(false);
    }
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
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar_url} alt="Foto do perfil" />
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
                <p className="text-sm text-muted-foreground">{userData.phone}</p>
              )}
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
              placeholder="Seu e-mail"
              type="email"
              disabled={true} // Email can't be changed
            />
          </div>
          <div className="space-y-2">
            <Input
              value={userData.phone || ""}
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

export default AdvertiserProfile;
