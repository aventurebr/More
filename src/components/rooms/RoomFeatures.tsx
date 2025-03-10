import React from "react";
import { Wifi, Bed, Users, Wind } from "lucide-react";
import { Feature } from "@/data/roomData";
interface RoomFeaturesProps {
  features: Feature[];
}
const RoomFeatures = ({
  features
}: RoomFeaturesProps) => {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 mb-8">
      {features.map((feature, index) => <div key={index} className="flex items-center">
          {feature.icon === 'wifi' && <Wifi className="h-5 w-5 mr-2 text-blue-500" />}
          {feature.icon === 'bed' && <Bed className="h-5 w-5 mr-2 text-blue-500" />}
          {feature.icon === 'users' && <Users className="h-5 w-5 mr-2 text-blue-500" />}
          {feature.icon === 'wind' && <Wind className="h-5 w-5 mr-2 text-blue-500" />}
          <span className="text-sm">{feature.label}</span>
        </div>)}
    </div>;
};
export default RoomFeatures;