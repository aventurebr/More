
import React, { useState, useCallback, useEffect, KeyboardEvent } from "react";
import { Calendar, MapPin, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { mockRoomData } from "@/data/roomData";

// Extract unique locations and features from room data
const allLocations = Array.from(new Set(mockRoomData.map(room => room.location.split(',')[0].trim())));
const allFeatures = Array.from(new Set(mockRoomData.flatMap(room => room.tags)));

const popularLocations = [
  "Barão Geraldo",
  "Taquaral",
  "Cambuí",
  "Centro",
  "Mansões Santo Antônio",
  "Cidade Universitária"
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const handleLocationChange = useCallback((value: string) => {
    setLocation(value);
    setActiveSuggestionIndex(-1);
    
    if (value.length > 0) {
      const searchTerm = value.toLowerCase();
      
      // Search in locations
      const locationMatches = allLocations.filter(loc =>
        loc.toLowerCase().includes(searchTerm)
      );
      
      // Search in features
      const featureMatches = allFeatures.filter(feature =>
        feature.toLowerCase().includes(searchTerm)
      ).map(feature => `Característica: ${feature}`);
      
      // Search in room titles
      const titleMatches = Array.from(new Set(
        mockRoomData
          .filter(room => room.title.toLowerCase().includes(searchTerm))
          .map(room => `Título: ${room.title}`)
      ));
      
      // Combine all matches, prioritizing locations
      const allMatches = [
        ...locationMatches,
        ...featureMatches,
        ...titleMatches
      ].slice(0, 8); // Limit to 8 suggestions
      
      setSuggestions(allMatches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // If no suggestions or not showing suggestions, do nothing
    if (!showSuggestions || suggestions.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prevIndex => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prevIndex => 
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    }
    // Enter key
    else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!location) {
      // Show error toast or validation message
      return;
    }

    setIsLoading(true);
    try {
      // Construct search params
      const params = new URLSearchParams();
      if (location) params.set("location", location);
      if (date) params.set("date", date.toISOString());

      // Navigate to rooms page with search params
      navigate(`/quartos?${params.toString()}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-stretch gap-2 p-1 rounded-2xl bg-white shadow-sm border border-border w-full max-w-3xl mx-auto">
        <div className="relative flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors hover:bg-secondary">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por bairro em Campinas"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto bg-transparent"
              aria-label="Localização"
              aria-expanded={showSuggestions}
              role="combobox"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-activedescendant={activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : undefined}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-border z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <ul id="search-suggestions" className="py-2" role="listbox">
                {suggestions.map((suggestion, index) => (
                  <li
                    id={`suggestion-${index}`}
                    key={suggestion}
                    role="option"
                    aria-selected={index === activeSuggestionIndex}
                    className={cn(
                      "px-4 py-2 cursor-pointer transition-colors",
                      index === activeSuggestionIndex ? "bg-secondary text-foreground" : "hover:bg-secondary"
                    )}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="w-px h-auto bg-border hidden md:block" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex-1 min-w-[200px] flex justify-start items-center gap-2 px-4 py-2 h-auto rounded-xl hover:bg-secondary"
            >
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-left text-sm font-normal">
                {date ? format(date, "PPP") : "Selecionar data"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        
        <Button 
          className={cn(
            "rounded-xl h-12 px-5 transition-all duration-300 hover:shadow-md",
            isLoading && "opacity-80 cursor-not-allowed"
          )}
          onClick={handleSearch}
          disabled={isLoading || !location}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              <span>Buscar</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
