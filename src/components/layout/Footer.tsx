import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
  return <footer className="bg-background border-t border-border/50 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">More</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Aluguel de quartos simples, seguro e direto em Campinas.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm mb-2">Explorar</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Buscar quartos
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Destaques
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Bairros
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Moradia Estudantil
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm mb-2">Anfitrião</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Anuncie seu quarto
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Diretrizes para anfitriões
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Hospedagem responsável
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Recursos e dicas
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm mb-2">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Central de Ajuda
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Centro de Segurança
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Opções de cancelamento
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Fale conosco
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">© 2025 More. Todos os direitos reservados.</div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
              Privacidade
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
              Termos
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
              Mapa do site
            </Button>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;