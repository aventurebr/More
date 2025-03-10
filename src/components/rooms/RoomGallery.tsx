
import React, { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import GridGallery from "./gallery/GridGallery";
import FullscreenGallery from "./gallery/FullscreenGallery";

interface RoomGalleryProps {
  images: string[];
  onGalleryStateChange?: (isOpen: boolean) => void;
}

const RoomGallery: React.FC<RoomGalleryProps> = ({ images, onGalleryStateChange }) => {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openGallery = () => {
    setShowFullGallery(true);
    // Prevent body scrolling when gallery is open
    document.body.style.overflow = 'hidden';
    // Notify parent component that gallery is open
    onGalleryStateChange?.(true);
  };

  const closeGallery = () => {
    setShowFullGallery(false);
    // Re-enable body scrolling when gallery is closed
    document.body.style.overflow = 'auto';
    // Notify parent component that gallery is closed
    onGalleryStateChange?.(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!showFullGallery) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        closeGallery();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullGallery]);

  // Gallery overlay for fullscreen view
  if (showFullGallery) {
    return (
      <FullscreenGallery
        images={images}
        currentImageIndex={currentImageIndex}
        onClose={closeGallery}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onThumbnailClick={handleThumbnailClick}
      />
    );
  }

  // Regular gallery display
  return (
    <FadeIn>
      <GridGallery images={images} onOpenGallery={openGallery} />
    </FadeIn>
  );
};

export default RoomGallery;
