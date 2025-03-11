import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { mockRoomData } from "@/data/roomData";
import { Link } from "react-router-dom";

const DashboardRooms = () => {
  const handleDeleteRoom = (roomId: string) => {
    // TODO: Implement room deletion
    console.log("Delete room:", roomId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Meus Quartos</h2>
            <p className="text-muted-foreground">Gerencie seus anúncios de quartos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Quarto
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRoomData.map((room) => (
            <Card key={room.id}>
              <div
                className="aspect-video w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${room.imageUrl})` }}
              />
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{room.title}</h3>
                    <p className="text-sm text-muted-foreground">{room.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">R$ {room.price}</p>
                    <p className="text-sm text-muted-foreground">{room.priceUnit}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                  <Link
                    to={`/room/${room.id}`}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Ver anúncio
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRooms;