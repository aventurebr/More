import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  HomeIcon,
  Menu,
  MessageSquare,
  Settings,
  Star,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { advertiser } = useAdvertiser();
  const [open, setOpen] = useState(false);

  // Determine if the user is in advertiser mode or client mode
  const isAdvertiser = location.pathname.includes("advertiser");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const clientLinks = [
    {
      href: "/dashboard/client-profile",
      label: "Minha Conta",
      icon: <UserIcon className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard" || location.pathname === "/dashboard/client-profile",
    },
    {
      href: "/dashboard/rooms",
      label: "Meus Quartos",
      icon: <HomeIcon className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/rooms",
    },
    {
      href: "/dashboard/messages",
      label: "Mensagens",
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/messages",
    },
    {
      href: "/dashboard/reviews",
      label: "Avaliações",
      icon: <Star className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/reviews",
    },
    {
      href: "/dashboard/settings",
      label: "Configurações",
      icon: <Settings className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/settings",
    },
  ];

  const advertiserLinks = [
    {
      href: "/dashboard/advertiser-profile",
      label: "Meu Perfil",
      icon: <UserIcon className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/advertiser-profile",
    },
    {
      href: "/dashboard/rooms",
      label: "Meus Imóveis",
      icon: <HomeIcon className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/rooms",
    },
    {
      href: "/dashboard/messages",
      label: "Mensagens",
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/messages",
    },
    {
      href: "/dashboard/reviews",
      label: "Avaliações",
      icon: <Star className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/reviews",
    },
    {
      href: "/dashboard/settings",
      label: "Configurações",
      icon: <Settings className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard/settings",
    },
  ];

  const links = isAdvertiser ? advertiserLinks : clientLinks;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={advertiser?.avatar_url || user?.avatar} 
                  alt={advertiser?.name || user?.name} 
                />
                <AvatarFallback>
                  {(advertiser?.name || user?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">{advertiser?.name || user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {advertiser?.email || user?.email}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    link.active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sair
              </Button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 bg-white border-r">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4 mb-6">
              <Link to="/" className="flex items-center">
                <Building2 className="w-8 h-8 text-slate-700" />
                <span className="ml-2 text-xl font-bold">More</span>
              </Link>
            </div>
            <div className="px-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={advertiser?.avatar_url || user?.avatar} 
                    alt={advertiser?.name || user?.name} 
                  />
                  <AvatarFallback>
                    {(advertiser?.name || user?.name || "U").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium">{advertiser?.name || user?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {advertiser?.email || user?.email}
                  </p>
                </div>
              </div>
            </div>
            <nav className="flex-1 px-2 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    link.active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
