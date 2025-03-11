import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

// Mock messages data
const mockMessages = [
  {
    id: "1",
    sender: {
      name: "João Silva",
      avatar: "/placeholder.svg",
    },
    roomTitle: "Quarto em Barão Geraldo",
    preview: "Olá, o quarto ainda está disponível?",
    date: "2024-01-15T10:30:00",
    unread: true,
  },
  {
    id: "2",
    sender: {
      name: "Maria Santos",
      avatar: "/placeholder.svg",
    },
    roomTitle: "Quarto Compartilhado no Centro",
    preview: "Gostaria de agendar uma visita para amanhã",
    date: "2024-01-14T15:45:00",
    unread: false,
  },
  {
    id: "3",
    sender: {
      name: "Pedro Oliveira",
      avatar: "/placeholder.svg",
    },
    roomTitle: "Suíte Mobiliada",
    preview: "Qual o valor das contas de água e luz?",
    date: "2024-01-14T09:15:00",
    unread: true,
  },
];

const Messages = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mensagens</h2>
          <p className="text-muted-foreground">Gerencie suas conversas com interessados</p>
        </div>

        <div className="grid gap-4">
          {mockMessages.map((message) => (
            <Card key={message.id} className={message.unread ? "border-blue-200 bg-blue-50" : ""}>
              <CardContent className="flex items-start space-x-4 pt-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{message.sender.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.roomTitle}</p>
                  <p className="text-sm">{message.preview}</p>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Responder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;