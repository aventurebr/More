
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, MessageSquare, Star, TrendingUp, DollarSign, Calendar, Users, Clock } from "lucide-react";
import { mockRoomData } from "@/data/roomData";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

// Mock data for charts
const occupancyData = [
  { name: "Seg", rate: 65 },
  { name: "Ter", rate: 70 },
  { name: "Qua", rate: 75 },
  { name: "Qui", rate: 80 },
  { name: "Sex", rate: 85 },
  { name: "Sab", rate: 90 },
  { name: "Dom", rate: 85 },
];

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Fev", value: 4500 },
  { name: "Mar", value: 5000 },
  { name: "Abr", value: 4800 },
  { name: "Mai", value: 5200 },
  { name: "Jun", value: 5500 },
];

const stats = [
  {
    name: "Receita Total",
    value: "R$ 15.500",
    icon: DollarSign,
    description: "Mês atual",
  },
  {
    name: "Taxa de Ocupação",
    value: "78%",
    icon: Calendar,
    description: "Média mensal",
  },
  {
    name: "Reservas Confirmadas",
    value: "24",
    icon: Users,
    description: "Últimos 30 dias",
  },
  {
    name: "Tempo de Resposta",
    value: "2h",
    icon: Clock,
    description: "Média por consulta",
  },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const recentRooms = mockRoomData.slice(0, 3);
  const { advertiser } = useAdvertiser();

  // This dashboard is for advertisers only
  if (!advertiser) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Visão geral dos seus anúncios e atividades</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Ocupação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#3b82f6" name="Taxa de Ocupação (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" name="Receita (R$)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rooms with Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Propriedades Ativas</CardTitle>
            <Button variant="outline" size="sm">
              <Link to="/dashboard/rooms">Ver todas</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRooms.map((room) => (
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
                  <div className="ml-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Disponível
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
