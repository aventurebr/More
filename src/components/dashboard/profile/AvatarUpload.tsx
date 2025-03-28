
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

interface AvatarUploadProps {
  currentUrl?: string | null;
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
      
      const uploadPath = `avatars/${filename}`;
      console.log("Upload path:", uploadPath);
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('advertiser-assets')
        .upload(uploadPath, file);
      
      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      console.log("Upload successful:", data);
      
      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('advertiser-assets')
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

  // Get user's initials for the avatar fallback
  const getInitials = () => {
    if (!userName) return "U";
    return userName.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Safely check if we have a valid avatar URL
  const hasValidAvatarUrl = currentUrl && currentUrl !== "" && currentUrl !== null;
  
  console.log("Avatar rendering with URL:", currentUrl, "Valid?", hasValidAvatarUrl);

  return (
    <div className="relative mb-4 md:mb-0">
      <Avatar className="h-24 w-24">
        {hasValidAvatarUrl ? (
          <AvatarImage 
            src={currentUrl} 
            alt="Foto do perfil" 
            onError={(e) => {
              console.error("Error loading avatar image:", currentUrl);
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        ) : (
          <AvatarFallback className="bg-slate-200 text-slate-700 text-xl font-semibold">
            {getInitials()}
          </AvatarFallback>
        )}
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
