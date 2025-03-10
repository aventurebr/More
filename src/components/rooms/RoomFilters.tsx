
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface RoomFiltersProps {
  activeFilters: {
    priceMin?: number;
    priceMax?: number;
    location?: string;
    features?: string[];
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    priceMin?: number;
    priceMax?: number;
    location?: string;
    features?: string[];
  }>>;
}

const locations = [
  "Barão Geraldo", 
  "Centro", 
  "Taquaral", 
  "Cambuí", 
  "Botafogo"
];

const features = [
  "Wi-Fi",
  "Ar-condicionado",
  "Suíte",
  "Mobiliado",
  "Garagem",
  "Cozinha compartilhada",
  "Lavanderia",
  "Academia",
  "Varanda"
];

const RoomFilters = ({ activeFilters, setActiveFilters }: RoomFiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    activeFilters.priceMin || 500, 
    activeFilters.priceMax || 1500
  ]);

  const handlePriceChange = (value: number[]) => {
    const [min, max] = value as [number, number];
    setPriceRange([min, max]);
    setActiveFilters(prev => ({
      ...prev,
      priceMin: min,
      priceMax: max
    }));
  };

  const handleLocationChange = (location: string) => {
    setActiveFilters(prev => ({
      ...prev,
      location: location
    }));
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setActiveFilters(prev => {
      const currentFeatures = prev.features || [];
      let newFeatures;
      
      if (checked) {
        newFeatures = [...currentFeatures, feature];
      } else {
        newFeatures = currentFeatures.filter(f => f !== feature);
      }
      
      return {
        ...prev,
        features: newFeatures.length ? newFeatures : undefined
      };
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Filtros</h2>
      
      <Accordion type="multiple" defaultValue={["price", "location", "features"]} className="space-y-2">
        {/* Price Filter */}
        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="text-base">Preço</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-1">
              <Slider
                value={priceRange}
                min={500}
                max={2000}
                step={50}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Label htmlFor="price-min">Mínimo</Label>
                  <Input
                    id="price-min"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
                <span className="px-2">-</span>
                <div className="space-y-2">
                  <Label htmlFor="price-max">Máximo</Label>
                  <Input
                    id="price-max"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location Filter */}
        <AccordionItem value="location" className="border-b">
          <AccordionTrigger className="text-base">Localização</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={activeFilters.location === location}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleLocationChange(location);
                      } else {
                        handleLocationChange("");
                      }
                    }}
                  />
                  <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Features Filter */}
        <AccordionItem value="features" className="border-b">
          <AccordionTrigger className="text-base">Características</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={(activeFilters.features || []).includes(feature)}
                    onCheckedChange={(checked) => 
                      handleFeatureToggle(feature, checked as boolean)
                    }
                  />
                  <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RoomFilters;
