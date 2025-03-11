
import React from "react";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/ui/RoomCard";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockRoomData } from "@/data/roomData";

const FeaturedListings = () => {
  // Use the first 4 rooms from our mock data
  const featuredRooms = mockRoomData.slice(0, 4);

  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-800 mb-2">Quartos em destaque</h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-muted-foreground max-w-2xl">
                Descubra as melhores opções de quartos para alugar em Campinas, selecionadas com base na 
                qualidade, localização e avaliações de nossos usuários.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <Link to="/quartos" className="mt-4 md:mt-0 text-blue-500 font-medium group inline-flex items-center">
              Ver todos os quartos <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRooms.map((room, index) => (
            <FadeIn key={room.id} delay={300 + index * 100}>
              <Link to={`/room/${room.id}`} className="block h-full">
                <RoomCard {...room} />
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
