import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const Privacy = () => {
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
            <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Introdução</h2>
                <p>
                  O More valoriza sua privacidade e está comprometido em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nossa plataforma.
                </p>
                <p className="mt-2">
                  Ao usar o More, você concorda com a coleta e uso de informações de acordo com esta política. Recomendamos que você leia este documento com atenção.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Informações que Coletamos</h2>
                <p>
                  Podemos coletar os seguintes tipos de informações:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    <span className="font-medium">Informações de Cadastro:</span> Nome, e-mail, número de telefone, endereço e outros dados fornecidos durante o registro.
                  </li>
                  <li>
                    <span className="font-medium">Informações de Perfil:</span> Fotos, preferências, histórico de busca e outras informações que você compartilha em seu perfil.
                  </li>
                  <li>
                    <span className="font-medium">Informações de Uso:</span> Dados sobre como você interage com nossa plataforma, incluindo páginas visitadas, tempo gasto e ações realizadas.
                  </li>
                  <li>
                    <span className="font-medium">Informações do Dispositivo:</span> Tipo de dispositivo, sistema operacional, endereço IP e identificadores únicos.
                  </li>
                  <li>
                    <span className="font-medium">Informações de Localização:</span> Dados de localização quando você permite acesso a essa informação.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Como Usamos Suas Informações</h2>
                <p>
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Fornecer, manter e melhorar nossos serviços</li>
                  <li>Processar transações e gerenciar sua conta</li>
                  <li>Personalizar sua experiência e mostrar conteúdo relevante</li>
                  <li>Comunicar-nos com você sobre atualizações, promoções e novidades</li>
                  <li>Garantir a segurança e integridade de nossa plataforma</li>
                  <li>Cumprir obrigações legais e resolver disputas</li>
                  <li>Analisar tendências e comportamentos dos usuários</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Compartilhamento de Informações</h2>
                <p>
                  Podemos compartilhar suas informações com:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    <span className="font-medium">Outros Usuários:</span> Quando você interage com outros usuários na plataforma ou quando necessário para facilitar o processo de aluguel.
                  </li>
                  <li>
                    <span className="font-medium">Prestadores de Serviços:</span> Empresas que nos ajudam a operar, fornecer e melhorar nossos serviços.
                  </li>
                  <li>
                    <span className="font-medium">Parceiros Comerciais:</span> Empresas com as quais colaboramos para oferecer serviços complementares.
                  </li>
                  <li>
                    <span className="font-medium">Autoridades Legais:</span> Quando exigido por lei, ordem judicial ou para proteger direitos e segurança.
                  </li>
                </ul>
                <p className="mt-2">
                  Não vendemos suas informações pessoais a terceiros.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies e Tecnologias Semelhantes</h2>
                <p>
                  Utilizamos cookies e tecnologias semelhantes para coletar informações sobre sua atividade, navegador e dispositivo. Esses dados nos ajudam a personalizar sua experiência, analisar o uso da plataforma e melhorar nossos serviços.
                </p>
                <p className="mt-2">
                  Você pode configurar seu navegador para recusar cookies, mas isso pode limitar sua capacidade de usar alguns recursos de nossa plataforma.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Segurança de Dados</h2>
                <p>
                  Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Seus Direitos</h2>
                <p>
                  Dependendo da sua localização, você pode ter direitos relacionados às suas informações pessoais, incluindo:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Acessar e receber uma cópia de suas informações</li>
                  <li>Corrigir informações imprecisas ou incompletas</li>
                  <li>Excluir suas informações em determinadas circunstâncias</li>
                  <li>Restringir ou opor-se ao processamento de suas informações</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                  <li>Apresentar uma reclamação a uma autoridade de proteção de dados</li>
                </ul>
                <p className="mt-2">
                  Para exercer esses direitos, entre em contato conosco através dos canais indicados no final desta política.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Retenção de Dados</h2>
                <p>
                  Mantemos suas informações pelo tempo necessário para fornecer nossos serviços, cumprir obrigações legais, resolver disputas e fazer cumprir nossos acordos. Quando não precisamos mais de suas informações, as excluímos ou anonimizamos.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Transferências Internacionais</h2>
                <p>
                  Suas informações podem ser transferidas e processadas em servidores localizados fora do seu país de residência, onde as leis de proteção de dados podem ser diferentes. Tomamos medidas para garantir que suas informações recebam um nível adequado de proteção.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">10. Crianças</h2>
                <p>
                  Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente informações de crianças. Se descobrirmos que coletamos informações de uma criança, tomaremos medidas para excluí-las.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">11. Alterações nesta Política</h2>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas publicando a nova política em nossa plataforma ou enviando uma notificação direta.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">12. Contato</h2>
                <p>
                  Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou nossas práticas de dados, entre em contato conosco pelo e-mail: privacidade@more.com.br
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

export default Privacy;