
import React from "react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GridGalleryProps {
  images: string[];
  onOpenGallery: () => void;
}

const GridGallery: React.FC<GridGalleryProps> = ({ images, onOpenGallery }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[450px]">
        {/* Main large image */}
        <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-lg group cursor-pointer" onClick={onOpenGallery}>
          <img 
            src={images[0]} 
            alt="Vista principal do quarto" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Secondary images */}
        {images.slice(1, 5).map((image, index) => (
          <div 
            key={index} 
            className="hidden md:block relative overflow-hidden rounded-lg group cursor-pointer"
            onClick={onOpenGallery}
          >
            <img 
              src={image} 
              alt={`Vista do quarto ${index + 2}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
        
        {/* Mobile view secondary images (show only 1 extra) */}
        {images.length > 1 && (
          <div 
            className="relative md:hidden overflow-hidden rounded-lg cursor-pointer group"
            onClick={onOpenGallery}
          >
            <img 
              src={images[1]} 
              alt="Vista secundária do quarto" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        
        {/* Show all images button */}
        <Button 
          variant="secondary" 
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm font-medium transition-all duration-300 hover:scale-105"
          onClick={onOpenGallery}
        >
          <Image className="h-4 w-4 mr-2" />
          Ver todas as fotos ({images.length})
        </Button>
      </div>
    </div>
  );
};

export default GridGallery;
