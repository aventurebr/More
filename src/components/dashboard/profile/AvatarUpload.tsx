
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

interface AvatarUploadProps {
  currentUrl?: string;
  userName: string;
  userEmail: string;
  onAvatarUpdated: (url: string) => void;
}

type UploadStatus = "idle" | "loading" | "success" | "error";

const AvatarUpload = ({ currentUrl, userName, userEmail, onAvatarUpdated }: AvatarUploadProps) => {
  const { updateAdvertiserProfile } = useAdvertiser();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

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
      
      const uploadPath = `advertiser-avatars/${userEmail}/${filename}`;
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
      
      // Update advertiser profile in database
      await updateAdvertiserProfile({ avatar_url });
      
      // Notify parent component about the updated URL
      onAvatarUpdated(avatar_url);
      
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

  const avatarUrl = currentUrl || "/placeholder.svg";
  console.log("Current avatar URL:", avatarUrl);

  return (
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
        <AvatarFallback>{userName[0]}</AvatarFallback>
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
  );
};

export default AvatarUpload;
