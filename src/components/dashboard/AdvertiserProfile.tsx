import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

interface AdvertiserProfileProps {
  initialData?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const AdvertiserProfile = ({ initialData }: AdvertiserProfileProps) => {
  const { updateAdvertiserProfile } = useAdvertiser();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userData, setUserData] = useState({
    name: initialData?.name || "Anunciante",
    email: initialData?.email || "anunciante@example.com",
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
      // Create a unique filename using timestamp and original file extension
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}.${extension}`;
      
      // In a real-world scenario, we would upload the file to a server or cloud storage
      // For this implementation, we'll simulate saving to the public folder
      // by creating a URL that points to where the file would be stored
      
      // The path where the image would be stored on the server
      const serverPath = `/lovable-uploads/${filename}`;
      
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real implementation with a backend:
      // 1. Create a FormData object
      // const formData = new FormData();
      // formData.append('file', file, filename);
      // 2. Send to server
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      // 3. Get the URL from the response
      // const { imageUrl } = await response.json();
      
      // For now, we'll use URL.createObjectURL for preview purposes only
      // This creates a temporary URL that will be lost when the page refreshes
      const tempPreviewUrl = URL.createObjectURL(file);
      
      // In a real implementation, we would use the server path
      // For this demo, we'll store both - the temp URL for immediate display
      // and the server path that would be used in a real implementation
      
      // Update local state with the temporary URL for immediate display
      setUserData({ ...userData, avatar: tempPreviewUrl });
      
      // Update advertiser profile in context and storage with the server path
      // This is what would be persisted in a real implementation
      updateAdvertiserProfile({ 
        avatar: serverPath 
      });
      
      toast.success("Foto atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a foto. Tente novamente.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      // Update advertiser profile in context and storage
      updateAdvertiserProfile({
        name: userData.name,
        email: userData.email
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

export default AdvertiserProfile;