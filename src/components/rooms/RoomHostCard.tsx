
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RoomHostCardProps {
  host: {
    name: string;
    imageUrl: string;
    rating?: number;
    reviewCount?: number;
  };
}

const RoomHostCard = ({ host }: RoomHostCardProps) => {
  const { toast } = useToast();

  const handleContact = (type: 'whatsapp' | 'chat') => {
    if (type === 'whatsapp') {
      toast({
        title: "Redirecionando para WhatsApp",
        description: "Abrindo conversa com o anunciante.",
      });
      // In a real app, this would redirect to WhatsApp
    } else {
      toast({
        title: "Iniciando chat",
        description: "Abrindo janela de chat com o anunciante.",
      });
      // In a real app, this would open a chat window
    }
  };

  return (
    <Card className="border border-gray-200 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <img 
              src={host.imageUrl} 
              alt={host.name} 
              className="w-16 h-16 rounded-full object-cover" 
            />
          </div>
          <div>
            <h3 className="font-medium">{host.name}</h3>
            <p className="text-sm text-muted-foreground">Anunciante</p>
            {host.rating && (
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-sm font-medium">{host.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({host.reviewCount} avaliações)
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <h4 className="font-medium">Entre em contato</h4>
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => handleContact('whatsapp')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Contato via WhatsApp
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg"
            onClick={() => handleContact('chat')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Conversa via Chat
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            Ao entrar em contato, informe que viu o anúncio no <strong>More</strong> para 
            agilizar o atendimento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomHostCard;
