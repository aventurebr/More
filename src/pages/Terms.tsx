import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#F1F0FB] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
          >
            <Link to="/">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Voltar para a página inicial</span>
            </Link>
          </Button>
        </div>

        <FadeIn>
          <div className="bg-white rounded-xl shadow-sm border border-[#e1e1e1] p-8">
            <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e usar o More, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Descrição do Serviço</h2>
                <p>
                  O More é uma plataforma que conecta pessoas que buscam alugar quartos com proprietários que desejam anunciar seus espaços em Campinas. Nosso serviço facilita a busca, comunicação e processo de aluguel, mas não somos parte do contrato de locação entre usuários e anunciantes.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Elegibilidade</h2>
                <p>
                  Para usar o More, você deve ter pelo menos 18 anos de idade e capacidade legal para celebrar contratos. Ao criar uma conta, você confirma que atende a esses requisitos.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Contas de Usuário</h2>
                <p>
                  Você é responsável por manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrem sob sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta ou qualquer outra violação de segurança.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Conteúdo do Usuário</h2>
                <p>
                  Ao publicar conteúdo no More, você garante que possui os direitos necessários sobre esse conteúdo e concede ao More uma licença não exclusiva para usar, modificar, exibir e distribuir esse conteúdo em conexão com nossos serviços.
                </p>
                <p className="mt-2">
                  Reservamo-nos o direito de remover qualquer conteúdo que viole estes termos ou que consideremos inadequado.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Conduta do Usuário</h2>
                <p>
                  Você concorda em não usar o More para:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Violar leis ou regulamentos aplicáveis</li>
                  <li>Publicar conteúdo falso, enganoso, difamatório ou fraudulento</li>
                  <li>Assediar, ameaçar ou intimidar outros usuários</li>
                  <li>Interferir na operação do serviço ou contornar medidas de segurança</li>
                  <li>Coletar informações de usuários sem consentimento</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Anúncios e Transações</h2>
                <p>
                  Os anunciantes são responsáveis pela precisão das informações fornecidas sobre seus quartos. O More não garante a qualidade, segurança ou legalidade dos quartos anunciados.
                </p>
                <p className="mt-2">
                  Recomendamos que os usuários verifiquem pessoalmente os quartos antes de finalizar qualquer acordo e que documentem adequadamente os termos do aluguel.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Taxas e Pagamentos</h2>
                <p>
                  O More pode cobrar taxas por determinados serviços, que serão claramente comunicadas antes do uso. Você concorda em pagar todas as taxas aplicáveis e autoriza o More a cobrar o método de pagamento designado.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Propriedade Intelectual</h2>
                <p>
                  O conteúdo do More, incluindo logotipos, textos, gráficos, imagens e software, é propriedade do More ou de seus licenciadores e é protegido por leis de propriedade intelectual. Você não pode usar, copiar ou distribuir esse conteúdo sem autorização prévia.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">10. Limitação de Responsabilidade</h2>
                <p>
                  O More é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo. Não seremos responsáveis por danos indiretos, incidentais, especiais ou consequentes resultantes do uso ou incapacidade de usar nossos serviços.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">11. Indenização</h2>
                <p>
                  Você concorda em indenizar e isentar o More e seus diretores, funcionários e agentes de qualquer reclamação, responsabilidade, dano ou despesa decorrente de sua violação destes Termos ou do uso indevido do serviço.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">12. Modificações dos Termos</h2>
                <p>
                  Podemos modificar estes Termos a qualquer momento, publicando os termos revisados em nosso site. Seu uso continuado do More após tais modificações constitui aceitação dos novos termos.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">13. Lei Aplicável</h2>
                <p>
                  Estes Termos são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais de Campinas, SP.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">14. Contato</h2>
                <p>
                  Se você tiver dúvidas sobre estes Termos, entre em contato conosco pelo e-mail: contato@more.com.br
                </p>
              </section>
              
              <p className="text-sm mt-8">
                Última atualização: 10 de Julho de 2023
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Terms;