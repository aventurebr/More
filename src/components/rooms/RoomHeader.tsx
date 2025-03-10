import React from "react";
import { MapPin } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
interface RoomHeaderProps {
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  bills?: string;
}
const RoomHeader = ({
  title,
  location,
  price,
  priceUnit,
  bills
}: RoomHeaderProps) => {
  return <FadeIn>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="font-medium text-slate-800 text-2xl">{title}</h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-blue-600">R$ {price}{priceUnit}</div>
          {bills && <div className="text-sm text-muted-foreground mt-1">{bills}</div>}
        </div>
      </div>
    </FadeIn>;
};
export default RoomHeader;