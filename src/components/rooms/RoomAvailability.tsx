
import React from "react";
import { Calendar } from "lucide-react";

interface RoomAvailabilityProps {
  availableFrom: string;
  minimumStay?: string;
}

const RoomAvailability = ({ availableFrom, minimumStay }: RoomAvailabilityProps) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-medium mb-4">Disponibilidade</h3>
      <div className="flex items-center text-muted-foreground mb-2">
        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
        <span>Disponível a partir de {availableFrom}</span>
      </div>
      {minimumStay && (
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          <span>Permanência mínima de {minimumStay}</span>
        </div>
      )}
    </div>
  );
};

export default RoomAvailability;
