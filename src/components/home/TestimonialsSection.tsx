
import React from "react";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              O que dizem nossos usuários
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-muted-foreground">
              Centenas de estudantes e profissionais encontraram o quarto perfeito através do More. 
              Confira algumas das experiências.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={200}>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Encontrei meu quarto perfeito em menos de uma semana usando o More. A plataforma é muito intuitiva e os filtros me ajudaram a encontrar exatamente o que eu precisava próximo à Unicamp."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                    JP
                  </div>
                  <div>
                    <p className="font-medium">João Pedro</p>
                    <p className="text-sm text-muted-foreground">Estudante de Engenharia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={300}>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Como profissional que acabou de se mudar para Campinas, o More foi fundamental para encontrar uma acomodação de qualidade rapidamente. A comunicação direta com os proprietários facilitou muito o processo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                    MF
                  </div>
                  <div>
                    <p className="font-medium">Mariana Ferreira</p>
                    <p className="text-sm text-muted-foreground">Analista de Marketing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={400}>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Consegui alugar meu quarto vago em apenas 3 dias depois de publicar no More. A plataforma me conectou com ótimos inquilinos e tornou o processo de aluguel muito mais simples do que eu esperava."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                    CS
                  </div>
                  <div>
                    <p className="font-medium">Carlos Silva</p>
                    <p className="text-sm text-muted-foreground">Proprietário</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
