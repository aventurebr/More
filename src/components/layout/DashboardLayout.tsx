
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Home,
  MessageSquare,
  Settings,
  Star,
  LogOut,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Meus Quartos", href: "/dashboard/rooms", icon: Home },
  { name: "Mensagens", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Avaliações", href: "/dashboard/reviews", icon: Star },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, advertiser } = useAdvertiser();

  const handleLogout = () => {
    logout();
  };

  const NavContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile navigation */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-4 border-b bg-white">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <NavContent />
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-2">
          <UserMenu onLogout={handleLogout} avatar={advertiser?.avatar_url} name={advertiser?.name} />
        </div>
      </div>

      <div className="flex">
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-1 min-h-screen border-r bg-white">
            <div className="flex-1">
              <div className="flex items-center justify-center h-16 px-4 border-b">
                <h1 className="text-xl font-semibold">More</h1>
              </div>
              <NavContent />
            </div>
            <div className="p-4 border-t">
              <UserMenu onLogout={handleLogout} avatar={advertiser?.avatar_url} name={advertiser?.name} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:pl-64">
          <div className="py-6 px-4 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface UserMenuProps {
  onLogout: () => void;
  avatar?: string;
  name?: string;
}

const UserMenu = ({ onLogout, avatar, name }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={`${name || 'User'} avatar`} />
            <AvatarFallback>{name ? name[0].toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardLayout;
