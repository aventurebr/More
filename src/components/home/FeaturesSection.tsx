
import React from "react";
import FadeIn from "@/components/animations/FadeIn";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              Como funciona
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-muted-foreground">
              Encontrar o quarto perfeito em Campinas nunca foi tão fácil. Siga os passos abaixo e comece sua jornada.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FadeIn delay={200}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 mb-5">
                <span className="text-3xl font-medium text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Busque quartos</h3>
              <p className="text-muted-foreground">
                Utilize nossa ferramenta de busca avançada para encontrar quartos que atendam às suas necessidades.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 mb-5">
                <span className="text-3xl font-medium text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Entre em contato</h3>
              <p className="text-muted-foreground">
                Converse diretamente com os anunciantes para esclarecer dúvidas e agendar visitas.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 mb-5">
                <span className="text-3xl font-medium text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Mude-se</h3>
              <p className="text-muted-foreground">
                Após encontrar o quarto ideal, finalize o acordo diretamente com o anunciante e mude-se.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
