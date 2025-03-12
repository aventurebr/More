
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2, CheckCircle, AlertCircle } from "lucide-react";
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
  const { updateAdvertiserProfile, advertiser } = useAdvertiser();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [userData, setUserData] = useState({
    name: initialData?.name || "Anunciante",
    email: initialData?.email || "anunciante@example.com",
    phone: initialData?.phone || "",
    avatar_url: initialData?.avatar_url || "/placeholder.svg",
  });

  // Update local state when advertiser data changes from context
  useEffect(() => {
    if (advertiser) {
      setUserData({
        name: advertiser.name || userData.name,
        email: advertiser.email || userData.email,
        phone: advertiser.phone || userData.phone,
        avatar_url: advertiser.avatar_url || userData.avatar_url,
      });
    }
  }, [advertiser]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image/")) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    setIsUploading(true);
    setUploadStatus("loading");
    
    try {
      console.log("Starting upload process for file:", file.name);
      
      // Create a unique filename using timestamp and original file extension
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}.${extension}`;
      
      const uploadPath = `advertiser-avatars/${userData.email}/${filename}`;
      console.log("Upload path:", uploadPath);
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(uploadPath, file);
      
      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      console.log("Upload successful:", data);
      
      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(uploadPath);
      
      const avatar_url = publicUrlData.publicUrl;
      console.log("Public URL generated:", avatar_url);
      
      // Update local state with the new avatar URL
      setUserData(prevState => ({ ...prevState, avatar_url }));
      
      // Update advertiser profile in database
      await updateAdvertiserProfile({ avatar_url });
      
      setUploadStatus("success");
      toast.success("Foto atualizada com sucesso!");
    } catch (error: any) {
      console.error("Upload error details:", error);
      setUploadStatus("error");
      toast.error(`Erro ao atualizar a foto: ${error.message || "Tente novamente."}`);
    } finally {
      setIsUploading(false);
      // Reset upload status after 3 seconds
      setTimeout(() => setUploadStatus("idle"), 3000);
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

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "loading":
        return <Loader2 className="h-4 w-4 text-white animate-spin" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-white" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-white" />;
      default:
        return <Camera className="h-4 w-4 text-white" />;
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case "success":
        return "bg-green-600 hover:bg-green-700";
      case "error":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-slate-700 hover:bg-slate-800";
    }
  };

  const avatarUrl = userData.avatar_url || "/placeholder.svg";
  console.log("Current avatar URL:", avatarUrl);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Perfil do Anunciante</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col md:flex-row items-center md:gap-6 w-full">
            <div className="relative mb-4 md:mb-0">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={avatarUrl} 
                  alt="Foto do perfil" 
                  onError={(e) => {
                    console.error("Error loading avatar image:", avatarUrl);
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-1 rounded-full cursor-pointer ${getStatusColor()}`}
              >
                {getStatusIcon()}
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
