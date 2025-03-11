import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BackgroundImageSlider from "@/components/animations/BackgroundImageSlider";
import { useNavigate } from "react-router-dom";
import { mockRoomData } from "@/data/roomData";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const backgroundImages = ["https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80", "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80"];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/quartos?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLocationClick = (location: string) => {
    setSearchQuery(location);
    navigate(`/quartos?search=${encodeURIComponent(location)}`);
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <BackgroundImageSlider images={backgroundImages} />
      
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 w-full z-10">
        <div className="max-w-3xl">
          <FadeIn>
            <div className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm inline-block mb-4">
              Quartos em Campinas
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-tight mb-6 text-white">
              Encontre o quarto perfeito para você em Campinas
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg text-white/90 mb-10 md:mb-12">
              As melhores opções de aluguel de quartos com segurança e 
              confiabilidade para estudantes e profissionais.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="text" 
                placeholder="Digite um bairro ou universidade..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="h-12 bg-white rounded-md focus-visible:ring-0 text-base flex-1 py-[8px]" 
              />
              <Button 
                type="submit" 
                className="h-12 px-6 bg-slate-700 hover:bg-slate-800"
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar
              </Button>
            </form>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Centro", "Barão Geraldo", "Próximo à Unicamp", "Taquaral"].map((location, index) => (
                <Button 
                  key={index} 
                  variant="secondary" 
                  className="text-white rounded-full border-0 bg-[#484848]/[0.57] hover:bg-[#484848]/[0.77]"
                  onClick={() => handleLocationClick(location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Animação de scroll */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <button onClick={scrollToContent} className="animate-bounce flex flex-col items-center text-white hover:text-blue-300 transition-colors" aria-label="Rolar para baixo">
          <div className="w-8 h-12 rounded-full border-2 border-white/60 flex justify-center pt-2 mb-2">
            <div className="w-1.5 h-2.5 bg-white/80 rounded-full animate-[pulse_2s_infinite]"></div>
          </div>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>;
};

export default Hero;