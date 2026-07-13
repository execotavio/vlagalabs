import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

const siteUrl = "https://vlagalabs.com.br";
const companyLegalName =
  "O. DE CARVALHO TRINDADE CONSULTORIA EM TECNOLOGIA LTDA";
const companyTradeName = "VLAGA LABS";
const companyDocument = "64.286.928/0001-67";
const companyAddress =
  "Avenida Paulista, 1636, Cond Paulista Corporate, Conj. 4, Pav. 15, Bela Vista, São Paulo/SP, CEP 01.310-200";

export const metadata: Metadata = {
  title: "Termos de Uso | Vlaga Labs",
  description:
    "Conheça as condições gerais de uso do site, conteúdos e canais digitais da Vlaga Labs.",
  alternates: {
    canonical: "/termos-de-uso",
  },
  openGraph: {
    title: "Termos de Uso | Vlaga Labs",
    description:
      "Conheça as condições gerais de uso do site, conteúdos e canais digitais da Vlaga Labs.",
    url: `${siteUrl}/termos-de-uso`,
    siteName: "Vlaga Labs",
    images: ["/og-image.png"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-gradient-to-br from-white via-[#fff7f1] to-vlaga-light pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-vlaga-accent">
            Condições de uso
          </p>
          <h1 className="mt-3 text-4xl font-bold text-vlaga-primary md:text-5xl">
            Termos de Uso
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            Estes termos regulam o acesso e uso do site, conteúdos e canais
            digitais da Vlaga Labs.
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Última atualização: 13 de julho de 2026.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-lg leading-relaxed text-gray-700 sm:px-6 lg:px-8 [&_a]:font-semibold [&_a]:text-vlaga-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-vlaga-primary [&_li]:mb-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <h2>1. Aceitação dos termos</h2>
          <p>
            Ao acessar ou utilizar este site, você declara que leu, entendeu e
            concorda com estes Termos de Uso e com a Política de Privacidade da
            Vlaga Labs.
          </p>

          <h2>2. Sobre o site</h2>
          <p>
            Este site é mantido por {companyLegalName}, inscrita no CNPJ sob o
            nº {companyDocument}, com nome fantasia {companyTradeName} e sede em{" "}
            {companyAddress}.
          </p>
          <p>
            O site apresenta informações institucionais, conteúdos educativos,
            artigos, soluções em automação, agentes de Inteligência Artificial e
            canais de contato comercial.
          </p>
          <p>
            O conteúdo disponibilizado tem finalidade informativa e não constitui
            proposta comercial vinculante, consultoria jurídica, contábil,
            financeira ou garantia de resultado.
          </p>

          <h2>3. Uso permitido</h2>
          <p>Você se compromete a utilizar o site de forma lícita, ética e segura.</p>
          <p>É proibido:</p>
          <ul>
            <li>violar leis, direitos de terceiros ou direitos da Vlaga Labs;</li>
            <li>tentar acessar áreas, sistemas ou dados sem autorização;</li>
            <li>interferir no funcionamento, segurança ou disponibilidade do site;</li>
            <li>copiar, reproduzir ou explorar conteúdos sem autorização;</li>
            <li>enviar informações falsas, ofensivas, abusivas ou maliciosas.</li>
          </ul>

          <h2>4. Propriedade intelectual</h2>
          <p>
            Marcas, logotipos, textos, imagens, layouts, códigos, materiais e
            demais elementos do site pertencem à Vlaga Labs ou a terceiros
            licenciantes. O uso não autorizado desses elementos é vedado.
          </p>

          <h2>5. Links e serviços de terceiros</h2>
          <p>
            O site pode conter links ou integrações com serviços de terceiros,
            como WhatsApp, GitHub, sistemas de atendimento ou ferramentas de
            hospedagem. A Vlaga Labs não controla as práticas, políticas ou
            conteúdos desses terceiros.
          </p>

          <h2>6. Disponibilidade do site</h2>
          <p>
            Empregamos esforços razoáveis para manter o site disponível e seguro,
            mas não garantimos funcionamento ininterrupto, livre de erros,
            indisponibilidades temporárias ou falhas causadas por terceiros.
          </p>

          <h2>7. Contratação de serviços</h2>
          <p>
            A contratação de projetos, automações, agentes de IA ou softwares
            sob medida depende de proposta comercial, alinhamento de escopo,
            prazos, responsabilidades e condições específicas acordadas entre as
            partes.
          </p>

          <h2>8. Privacidade e proteção de dados</h2>
          <p>
            O tratamento de dados pessoais relacionado ao uso do site é descrito
            na{" "}
            <a href="/politica-de-privacidade">Política de Privacidade</a>.
          </p>

          <h2>9. Alterações nos termos</h2>
          <p>
            Podemos atualizar estes Termos de Uso a qualquer momento para
            refletir mudanças no site, nos serviços ou em obrigações legais. A
            versão vigente será sempre publicada nesta página.
          </p>

          <h2>10. Contato</h2>
          <p>
            Para dúvidas sobre estes termos, entre em contato pelo e-mail{" "}
            <a href="mailto:contato@vlagalabs.com.br">
              contato@vlagalabs.com.br
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
