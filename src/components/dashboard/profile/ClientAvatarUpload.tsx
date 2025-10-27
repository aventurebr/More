import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

interface ClientAvatarUploadProps {
  currentUrl: string | null;
  userName: string;
  onAvatarUpdated: (url: string) => void;
}

const ClientAvatarUpload = ({ 
  currentUrl, 
  userName,
  onAvatarUpdated 
}: ClientAvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { user } = useUser();
  
  const getUserInitials = () => {
    if (!userName) return "?";
    return userName.split(" ").map(name => name[0]).join("").toUpperCase().slice(0, 2);
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('O arquivo deve ser uma imagem (JPG ou PNG)');
      return;
    }

    // Validate specific image types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Apenas arquivos JPG ou PNG são permitidos');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter menos de 5MB');
      return;
    }

    if (!user?.id) {
      toast.error('Usuário não autenticado');
      return;
    }

    setIsUploading(true);
    setUploadStatus('uploading');

    try {
      // Create a unique file name with user ID
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `users/${user.id}/${fileName}`;
      
      // Delete old avatar if exists
      if (currentUrl) {
        const oldPath = currentUrl.split('/avatars/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([oldPath]);
        }
      }
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL for the uploaded image
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      // Update avatar URL in profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: data.publicUrl })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // Update local state via callback
      onAvatarUpdated(data.publicUrl);
      
      setUploadStatus('success');
      toast.success('Foto de perfil atualizada com sucesso!');
      
      // Reset status after 2 seconds
      setTimeout(() => setUploadStatus('idle'), 2000);
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      setUploadStatus('error');
      toast.error(`Erro ao enviar imagem: ${error.message || 'Tente novamente'}`);
      
      // Reset status after 2 seconds
      setTimeout(() => setUploadStatus('idle'), 2000);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <Loader2 className="h-5 w-5 text-white animate-spin" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Camera className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-primary/80 hover:bg-primary';
    }
  };

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 border-2 border-primary/20">
        <AvatarImage src={currentUrl || ''} alt={userName} />
        <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
      </Avatar>
      
      <label 
        htmlFor="client-avatar-upload" 
        className={`absolute bottom-0 right-0 p-2 rounded-full ${getStatusColor()} cursor-pointer transition-all shadow-lg`}
      >
        {getStatusIcon()}
        <input
          id="client-avatar-upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={uploadAvatar}
          className="hidden"
          disabled={isUploading}
        />
      </label>
      
      {uploadStatus === 'uploading' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-xs text-muted-foreground">Enviando...</p>
        </div>
      )}
      
      {uploadStatus === 'success' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-xs text-green-600">Upload completo!</p>
        </div>
      )}
    </div>
  );
};

export default ClientAvatarUpload;
