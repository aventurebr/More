
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileFormProps {
  userData: {
    name: string;
    email: string;
    phone?: string;
  };
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const ProfileForm = ({ 
  userData, 
  isEditing, 
  onInputChange, 
  onSave, 
  onCancel, 
  onEdit 
}: ProfileFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          value={userData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
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
          onChange={(e) => onInputChange('phone', e.target.value)}
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
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={onSave}
              className="bg-slate-700 hover:bg-slate-800"
            >
              Salvar
            </Button>
          </>
        ) : (
          <Button
            onClick={onEdit}
            variant="outline"
          >
            Editar Perfil
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
