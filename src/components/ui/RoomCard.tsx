
import React, { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit?: string;
  imageUrl: string;
  tags?: string[];
  isNew?: boolean;
  isHighlighted?: boolean;
  rating?: number;
  reviewCount?: number;
  host?: {
    imageUrl: string;
  };
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  title,
  location,
  price,
  priceUnit = "/noite",
  imageUrl,
  tags = [],
  isNew = false,
  isHighlighted = false,
  rating,
  reviewCount,
  host,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 h-full group">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4/3}>
          <div className={`absolute inset-0 bg-muted/30 ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-[2px]'} group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </AspectRatio>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:text-red-500"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>

        {isNew && (
          <Badge className="absolute top-3 left-3 bg-blue-500 text-white hover:bg-blue-600">
            Novo
          </Badge>
        )}
        
        {isHighlighted && (
          <Badge className="absolute top-3 left-3 bg-orange-500 text-white hover:bg-orange-600">
            Destaque
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg leading-tight text-slate-800">{title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 inline" />
              <span>{location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-blue-600">R$ {price}{priceUnit}</p>
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-3">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="font-normal text-xs px-2 py-0.5 bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium text-sm">{rating}</span>
              {reviewCount && (
                <span className="text-muted-foreground text-xs ml-1">
                  ({reviewCount} avaliações)
                </span>
              )}
            </div>
          )}
          
          {host && (
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-2">Anunciante</span>
              <img 
                src={host.imageUrl} 
                alt="Host" 
                className="w-7 h-7 rounded-full object-cover border border-gray-200" 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
