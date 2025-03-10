
import React from "react";

interface GalleryThumbnailsProps {
  images: string[];
  currentImageIndex: number;
  onThumbnailClick: (index: number) => void;
}

const GalleryThumbnails: React.FC<GalleryThumbnailsProps> = ({
  images,
  currentImageIndex,
  onThumbnailClick
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 max-w-full no-scrollbar">
      {images.map((image, index) => (
        <div 
          key={index} 
          className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
            index === currentImageIndex 
              ? 'ring-2 ring-white scale-105' 
              : 'opacity-60 hover:opacity-100 hover:scale-105'
          }`}
          onClick={() => onThumbnailClick(index)}
        >
          <img 
            src={image} 
            alt={`Miniatura ${index + 1}`} 
            className="h-16 w-24 object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryThumbnails;
