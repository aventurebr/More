
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

interface AvatarUploadProps {
  currentUrl: string | null;
  userName: string;
  userEmail: string;
  onAvatarUpdated: (url: string) => void;
}

const AvatarUpload = ({ 
  currentUrl, 
  userName, 
  userEmail,
  onAvatarUpdated 
}: AvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { advertiser, updateAdvertiserProfile } = useAdvertiser();
  
  const getUserInitials = () => {
    if (!userName) return "?";
    return userName.split(" ").map(name => name[0]).join("").toUpperCase();
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('O arquivo deve ser uma imagem');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter menos de 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${advertiser?.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('advertiser-assets')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL for the uploaded image
      const { data } = supabase.storage
        .from('advertiser-assets')
        .getPublicUrl(filePath);
      
      // Update avatar URL in database
      await updateAdvertiserProfile({
        avatar_url: data.publicUrl
      });
      
      // Update local state via callback
      onAvatarUpdated(data.publicUrl);
      
      toast.success('Foto de perfil atualizada!');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(`Erro ao enviar imagem: ${error.message || 'Tente novamente'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 border-2 border-primary/20">
        <AvatarImage src={currentUrl || ''} alt={userName} />
        <AvatarFallback>{getUserInitials()}</AvatarFallback>
      </Avatar>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <label 
          htmlFor="avatar-upload" 
          className="w-full h-full flex items-center justify-center cursor-pointer rounded-full bg-black/0 group-hover:bg-black/30 transition-colors"
        >
          <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>
      
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
          <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
