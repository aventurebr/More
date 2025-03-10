
import React, { useState, useEffect } from "react";

interface BackgroundImageSliderProps {
  images: string[];
  interval?: number;
  children?: React.ReactNode;
}

const BackgroundImageSlider: React.FC<BackgroundImageSliderProps> = ({ 
  images, 
  interval = 15000,
  children 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 2000); // Increased from 1000ms to 2000ms for a smoother transition
    }, interval);

    return () => clearInterval(intervalId);
  }, [images, interval, nextImageIndex]);

  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={images[0]} 
          alt="Background" 
          className="h-full w-full object-cover"
        />
        {children}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Current image */}
      <div
        className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Background ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Next image (for smooth transition) */}
      <div
        className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={images[nextImageIndex]}
          alt={`Background ${nextImageIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      
      {children}
    </div>
  );
};

export default BackgroundImageSlider;
