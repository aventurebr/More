
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-300 ${scrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-3 bg-[#e9ebec]"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" className="text-blue-500 font-medium p-0 mr-6">
              More
            </Button>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/quartos">
            <Button 
              variant="ghost" 
              className={`font-medium ${isActive('/quartos') ? 'bg-muted text-foreground' : ''}`}
            >
              Quartos
            </Button>
          </Link>
          <Button variant="ghost" className="font-medium" onClick={scrollToAbout}>
            Sobre
          </Button>
          <Link to="/contato">
            <Button 
              variant="ghost" 
              className={`font-medium ${isActive('/contato') ? 'bg-muted text-foreground' : ''}`}
            >
              Contato
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/login">
            <Button variant="ghost" size="sm" className="px-4 font-medium bg-white rounded-xl">
              Entrar
            </Button>
          </Link>
          
          <Link to="/register">
            <Button size="sm" className="bg-slate-700 hover:bg-slate-800 rounded-xl">
              Cadastrar
            </Button>
          </Link>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <Link to="/quartos">
                  <DropdownMenuItem className={isActive('/quartos') ? 'bg-muted' : ''}>
                    Quartos
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={scrollToAbout}>Sobre</DropdownMenuItem>
                <Link to="/contato">
                  <DropdownMenuItem className={isActive('/contato') ? 'bg-muted' : ''}>
                    Contato
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
