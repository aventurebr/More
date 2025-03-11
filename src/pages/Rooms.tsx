
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import RoomFilters from "@/components/rooms/RoomFilters";
import { mockRoomData, RoomData } from "@/data/roomData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import RoomCard from "@/components/ui/RoomCard";
import { Link, useSearchParams } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";

const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState<RoomData[]>(mockRoomData);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [activeFilters, setActiveFilters] = useState<{
    priceMin?: number;
    priceMax?: number;
    location?: string;
    features?: string[];
  }>({});

  // Update URL when search term changes
  useEffect(() => {
    if (searchTerm) {
      searchParams.set("search", searchTerm);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, [searchTerm]);

  // Filter rooms based on search term and active filters
  useEffect(() => {
    let filteredRooms = [...mockRoomData];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const searchTerms = searchLower.split(/\s+/).filter(term => term.length > 0);
      
      filteredRooms = filteredRooms.filter(room => {
        const roomText = [
          room.title.toLowerCase(),
          room.location.toLowerCase(),
          ...room.tags.map(tag => tag.toLowerCase()),
          room.description.toLowerCase()
        ].join(" ");
        
        return searchTerms.every(term => roomText.includes(term));
      });
    }

    // Apply price filters
    if (activeFilters.priceMin !== undefined) {
      filteredRooms = filteredRooms.filter(room => room.price >= (activeFilters.priceMin || 0));
    }

    if (activeFilters.priceMax !== undefined) {
      filteredRooms = filteredRooms.filter(room => room.price <= (activeFilters.priceMax || 5000));
    }

    // Apply location filter
    if (activeFilters.location) {
      filteredRooms = filteredRooms.filter(room => 
        room.location.toLowerCase().includes(activeFilters.location!.toLowerCase())
      );
    }

    // Apply feature filters
    if (activeFilters.features && activeFilters.features.length > 0) {
      filteredRooms = filteredRooms.filter(room => 
        activeFilters.features!.every(feature => 
          room.tags.some(tag => tag.toLowerCase() === feature.toLowerCase())
        )
      );
    }

    setRooms(filteredRooms);
  }, [searchTerm, activeFilters]);

  const clearFilters = () => {
    setActiveFilters({});
    setSearchTerm("");
  };

  const hasActiveFilters = searchTerm || 
    activeFilters.priceMin || 
    activeFilters.priceMax || 
    activeFilters.location || 
    (activeFilters.features && activeFilters.features.length > 0);

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-800">Quartos disponíveis</h1>
              <p className="text-muted-foreground mt-2">
                Encontre o quarto perfeito para alugar em Campinas
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-1/4">
            <FadeIn delay={100}>
              <div className="sticky top-24 bg-white rounded-xl border border-gray-200 overflow-hidden">
                <RoomFilters 
                  activeFilters={activeFilters} 
                  setActiveFilters={setActiveFilters} 
                />
              </div>
            </FadeIn>
          </div>

          {/* Room listings */}
          <div className="w-full lg:w-3/4">
            <FadeIn delay={200}>
              <div className="flex flex-col space-y-6">
                {/* Search bar */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por localização, características..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="shrink-0"
                    >
                      <FilterX className="h-4 w-4 mr-2" />
                      Limpar filtros
                    </Button>
                  )}
                </div>

                {/* Results count */}
                <div className="text-sm text-muted-foreground">
                  {rooms.length} {rooms.length === 1 ? 'quarto encontrado' : 'quartos encontrados'}
                </div>

                {/* Room cards grid */}
                {rooms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {rooms.map((room, index) => (
                      <FadeIn key={room.id} delay={300 + index * 100}>
                        <Link to={`/room/${room.id}`} className="block h-full">
                          <RoomCard {...room} />
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-gray-500">Nenhum quarto encontrado com os filtros atuais.</p>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="mt-4"
                    >
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;
