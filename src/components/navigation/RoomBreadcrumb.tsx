
import React from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomBreadcrumbProps {
  roomTitle: string;
  className?: string;
}

const RoomBreadcrumb = ({ roomTitle, className }: RoomBreadcrumbProps) => {
  return (
    <nav className={cn("flex items-center text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Início</span>
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1" aria-hidden="true" />
        </li>
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Quartos
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1" aria-hidden="true" />
        </li>
        <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
          {roomTitle}
        </li>
      </ol>
    </nav>
  );
};

export default RoomBreadcrumb;
