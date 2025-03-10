
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";
import RoomGallery from "@/components/rooms/RoomGallery";
import { mockRoomData, RoomData } from "@/data/roomData";
import RoomBreadcrumb from "@/components/navigation/RoomBreadcrumb";
import RoomHeader from "@/components/rooms/RoomHeader";
import RoomTags from "@/components/rooms/RoomTags";
import RoomFeatures from "@/components/rooms/RoomFeatures";
import RoomDetailsTabs from "@/components/rooms/RoomDetailsTabs";
import RoomAvailability from "@/components/rooms/RoomAvailability";
import RoomHostCard from "@/components/rooms/RoomHostCard";
import RoomActions from "@/components/rooms/RoomActions";
import { useToast } from "@/components/ui/use-toast";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
    
    // Simulate fetching data
    const fetchRoom = () => {
      setLoading(true);
      try {
        // Find room by ID
        const foundRoom = mockRoomData.find(room => room.id === id);
        if (foundRoom) {
          setRoom(foundRoom);
        } else {
          toast({
            title: "Quarto não encontrado",
            description: "O quarto solicitado não está disponível.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os detalhes do quarto.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id, toast]);
  
  // If still loading, show a simple loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center mt-16">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-3xl font-medium mb-4">Carregando detalhes...</h1>
              <p className="text-muted-foreground">Aguarde um momento enquanto carregamos as informações.</p>
            </div>
          </FadeIn>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If room not found, show a message
  if (!room) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 mt-16">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-3xl font-medium mb-4">Quarto não encontrado</h1>
              <p className="text-muted-foreground mb-6">
                O quarto que você está procurando não existe ou foi removido.
              </p>
              <Link to="/">
                <Button>Voltar para página inicial</Button>
              </Link>
            </div>
          </FadeIn>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle gallery state change
  const handleGalleryStateChange = (isOpen: boolean) => {
    setIsGalleryOpen(isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Only show the container content when gallery is not open */}
        {!isGalleryOpen && (
          <>
            {/* Breadcrumb and actions */}
            <div className="container mx-auto px-4 mb-6">
              <FadeIn>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center">
                    <RoomBreadcrumb roomTitle={room.title} className="mb-2 sm:mb-0" />
                  </div>
                  <RoomActions />
                </div>
              </FadeIn>
            </div>
          </>
        )}
      
        {/* Gallery - Always visible */}
        <div className="container mx-auto px-4 mb-8">
          <FadeIn>
            <RoomGallery 
              images={room.galleryImages} 
              onGalleryStateChange={handleGalleryStateChange}
            />
          </FadeIn>
        </div>
        
        {/* Room info and contact - Only visible when gallery is not open */}
        {!isGalleryOpen && (
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Room details */}
              <div className="lg:col-span-2">
                <RoomHeader 
                  title={room.title} 
                  location={room.location} 
                  price={room.price} 
                  priceUnit={room.priceUnit} 
                  bills={room.bills}
                />
                
                <RoomTags tags={room.tags} />
                
                <FadeIn delay={200}>
                  <RoomFeatures features={room.features} />
                </FadeIn>
                
                <FadeIn delay={300}>
                  <RoomDetailsTabs
                    description={room.description}
                    additionalInfo={room.additionalInfo}
                    rules={room.rules}
                    locationDetails={room.locationDetails}
                  />
                </FadeIn>
                
                <FadeIn delay={400}>
                  <RoomAvailability 
                    availableFrom={room.availableFrom} 
                    minimumStay={room.minimumStay}
                  />
                </FadeIn>
              </div>
              
              {/* Right column - Host info and contact */}
              <div>
                <div className="sticky top-24">
                  <FadeIn delay={500}>
                    <RoomHostCard host={room.host} />
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {!isGalleryOpen && <Footer />}
    </div>
  );
};

export default RoomDetails;
