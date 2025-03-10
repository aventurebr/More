
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GalleryThumbnails from "./GalleryThumbnails";

interface FullscreenGalleryProps {
  images: string[];
  currentImageIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onThumbnailClick: (index: number) => void;
}

const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  images,
  currentImageIndex,
  onClose,
  onPrevious,
  onNext,
  onThumbnailClick,
}) => {
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timer = setTimeout(() => setShowControls(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className={`p-4 flex justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="text-white hover:bg-white/20 rounded-full flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only md:not-sr-only text-sm font-medium">Voltar</span>
        </Button>
        
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="text-white hover:bg-white/20 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute left-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onClick={onPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <img 
          src={images[currentImageIndex]} 
          alt={`Imagem ${currentImageIndex + 1} de ${images.length}`}
          className="max-h-[80vh] max-w-[90vw] object-contain shadow-lg transition-transform duration-300 select-none"
          onClick={onNext}
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute right-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Image counter */}
      <div className={`absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {currentImageIndex + 1} / {images.length}
      </div>
      
      {/* Thumbnails */}
      <div className={`p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <GalleryThumbnails 
          images={images} 
          currentImageIndex={currentImageIndex}
          onThumbnailClick={onThumbnailClick}
        />
      </div>
    </div>
  );
};

export default FullscreenGallery;
