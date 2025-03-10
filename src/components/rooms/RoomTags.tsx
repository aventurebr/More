
import React from "react";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/animations/FadeIn";

interface RoomTagsProps {
  tags: string[];
  delay?: number;
}

const RoomTags = ({ tags, delay = 100 }: RoomTagsProps) => {
  return (
    <FadeIn delay={delay}>
      <div className="flex flex-wrap gap-2 my-4">
        {tags.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="font-normal px-2 py-1 bg-gray-100 text-gray-600"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </FadeIn>
  );
};

export default RoomTags;
