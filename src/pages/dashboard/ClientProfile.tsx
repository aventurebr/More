
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserProfile from "@/components/dashboard/UserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockRoomData } from "@/data/roomData";
import { Heart, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ClientProfile = () => {
  const { user } = useUser();

  // Mock data for visit history
  const visitHistory = [
    { id: 1, roomName: "Quarto Superior em Copacabana", date: "15/05/2023", status: "Concluída" },
    { id: 2, roomName: "Apartamento na Zona Sul", date: "23/07/2023", status: "Concluída" },
    { id: 3, roomName: "Suíte Luxo em Ipanema", date: "10/08/2023", status: "Cancelada" }
  ];

  // Mock data for favorite rooms (using the first 2 rooms from mockRoomData)
  const favoriteRooms = mockRoomData.slice(0, 2);

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Minha Conta</h2>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e acompanhe suas atividades</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <UserProfile initialData={user} />
          
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <CardTitle>Imóveis Favoritos</CardTitle>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/quartos">Ver todos</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {favoriteRooms.length > 0 ? (
                  <div className="space-y-4">
                    {favoriteRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center space-x-4 rounded-md border p-4"
                      >
                        <div
                          className="h-16 w-16 rounded-md bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${room.imageUrl})` }}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">{room.title}</p>
                          <p className="text-sm text-muted-foreground">{room.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {room.price}</p>
                          <p className="text-sm text-muted-foreground">{room.priceUnit}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/room/${room.id}`}>Ver</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Você ainda não salvou nenhum imóvel.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <CardTitle>Histórico de Visitas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {visitHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imóvel</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visitHistory.map((visit) => (
                        <TableRow key={visit.id}>
                          <TableCell className="font-medium">{visit.roomName}</TableCell>
                          <TableCell>{visit.date}</TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-1 ${visit.status === 'Concluída' ? 'text-green-600' : 'text-red-600'}`}>
                              {visit.status === 'Concluída' ? 
                                <CalendarCheck className="h-4 w-4" /> : 
                                <Clock className="h-4 w-4" />
                              }
                              <span>{visit.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">Nenhuma visita agendada ou realizada.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;
