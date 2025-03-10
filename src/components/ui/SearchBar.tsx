
import React, { useState } from "react";
import { Calendar, MapPin, Search } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-2 p-1 rounded-2xl bg-white shadow-sm border border-border w-full max-w-3xl mx-auto">
      <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2 rounded-xl transition-colors hover:bg-secondary">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Campinas, SP"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto bg-transparent"
        />
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
              {date ? format(date, "PPP") : "Select date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <Button 
        className="rounded-xl h-12 px-5 transition-all duration-300 hover:shadow-md" 
        type="submit"
      >
        <Search className="h-5 w-5 mr-2" />
        <span>Search</span>
      </Button>
    </div>
  );
};

export default SearchBar;
