
import React from "react";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4 md:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="rounded-2xl overflow-hidden">
              <img 
                alt="Quarto limpo e minimalista em Campinas" 
                className="w-full h-auto aspect-[4/3] object-cover" 
                src="/lovable-uploads/fc0327fd-a04e-4eed-bc23-5c6949e3615f.jpg" 
              />
            </div>
          </FadeIn>
          
          <div className="space-y-6">
            <FadeIn>
              <span className="text-sm font-medium px-3 py-1 bg-primary/10 rounded-full">Sobre o More</span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Simplifique Sua Busca</h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-muted-foreground">
                O More é construído com a ideia de que encontrar um quarto deve ser simples e transparente. 
                Desenvolvemos uma plataforma que remove a complexidade e foca no que realmente importa: 
                ajudar você a encontrar o lugar perfeito para morar em Campinas.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="pt-4">
                <Button size="lg" className="rounded-xl text-slate-100 bg-slate-700 hover:bg-slate-600">Saiba mais</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
