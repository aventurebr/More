
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoogleMap from "@/components/maps/GoogleMap";

interface RoomDetailsTabsProps {
  description: string;
  additionalInfo?: string;
  rules: string[];
  locationDetails: string;
}

const RoomDetailsTabs = ({ description, additionalInfo, rules, locationDetails }: RoomDetailsTabsProps) => {
  return (
    <Tabs defaultValue="description" className="mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Descrição</TabsTrigger>
        <TabsTrigger value="rules">Regras</TabsTrigger>
        <TabsTrigger value="location">Localização</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-4">
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground">{description}</p>
          
          {additionalInfo && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3">Informações adicionais</h3>
              <p className="text-muted-foreground">{additionalInfo}</p>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="rules" className="mt-4">
        <h3 className="text-xl font-medium mb-3">Regras da casa</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="location" className="mt-4">
        <h3 className="text-xl font-medium mb-3">Localização</h3>
        <p className="text-muted-foreground mb-4">{locationDetails}</p>
        <GoogleMap address={locationDetails} />
      </TabsContent>
    </Tabs>
  );
};

export default RoomDetailsTabs;
