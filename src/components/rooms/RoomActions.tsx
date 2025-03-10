
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RoomActionsProps {
  className?: string;
}

const RoomActions = ({ className }: RoomActionsProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: liked ? "Este quarto foi removido da sua lista de favoritos." : "Este quarto foi adicionado à sua lista de favoritos.",
    });
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleLike}
        className={liked ? "text-red-500" : ""}
      >
        <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-red-500" : ""}`} />
        {liked ? "Favoritado" : "Favoritar"}
      </Button>
      <Button variant="outline" size="sm">
        <Image className="h-4 w-4 mr-2" />
        Compartilhar
      </Button>
    </div>
  );
};

export default RoomActions;
