import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { mockRoomData } from "@/data/roomData";

const Reviews = () => {
  // Mock reviews data
  const mockReviews = [
    {
      id: "1",
      reviewer: {
        name: "Ana Costa",
        avatar: "/placeholder.svg",
      },
      roomTitle: "Quarto em Barão Geraldo",
      rating: 5,
      comment: "Ótimo quarto, bem localizado e limpo. A anfitriã é muito atenciosa!",
      date: "2024-01-10T14:30:00",
    },
    {
      id: "2",
      reviewer: {
        name: "Lucas Mendes",
        avatar: "/placeholder.svg",
      },
      roomTitle: "Suíte Mobiliada",
      rating: 4,
      comment: "Quarto confortável e bem equipado. Apenas o Wi-Fi que às vezes falha.",
      date: "2024-01-08T09:15:00",
    },
    {
      id: "3",
      reviewer: {
        name: "Carla Santos",
        avatar: "/placeholder.svg",
      },
      roomTitle: "Quarto Compartilhado no Centro",
      rating: 5,
      comment: "Excelente experiência! O quarto é exatamente como nas fotos.",
      date: "2024-01-05T16:45:00",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Avaliações</h2>
          <p className="text-muted-foreground">Gerencie as avaliações dos seus quartos</p>
        </div>

        <div className="grid gap-4">
          {mockReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                    <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">{review.reviewer.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.roomTitle}</p>
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm mt-2">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;