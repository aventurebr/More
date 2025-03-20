
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";

interface AuthPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthPageLayout = ({ title, description, children }: AuthPageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F0FB] px-4">
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Voltar para a página inicial</span>
        </Button>
      </div>
      
      <FadeIn>
        <Card className="w-full max-w-md shadow-sm border-[#e1e1e1] bg-white rounded-xl my-8">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-medium">{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default AuthPageLayout;
