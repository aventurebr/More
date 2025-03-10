
import React from "react";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Pronto para encontrar seu quarto perfeito?
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-muted-foreground mb-8">
            Junte-se a milhares de estudantes e profissionais que encontraram seu 
            espaço de vida ideal em Campinas através do More.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Começar a buscar
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Anunciar meu quarto
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CtaSection;
