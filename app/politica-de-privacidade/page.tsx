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
  title: "Política de Privacidade | Vlaga Labs",
  description:
    "Saiba como a Vlaga Labs trata dados pessoais, cookies e solicitações relacionadas à LGPD.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    title: "Política de Privacidade | Vlaga Labs",
    description:
      "Saiba como a Vlaga Labs trata dados pessoais, cookies e solicitações relacionadas à LGPD.",
    url: `${siteUrl}/politica-de-privacidade`,
    siteName: "Vlaga Labs",
    images: ["/og-image.png"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-gradient-to-br from-white via-[#fff7f1] to-vlaga-light pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-vlaga-accent">
            LGPD e privacidade
          </p>
          <h1 className="mt-3 text-4xl font-bold text-vlaga-primary md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            Esta política explica como a Vlaga Labs coleta, utiliza, armazena e
            protege dados pessoais em suas interações digitais.
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Última atualização: 13 de julho de 2026.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-lg leading-relaxed text-gray-700 sm:px-6 lg:px-8 [&_a]:font-semibold [&_a]:text-vlaga-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-vlaga-primary [&_li]:mb-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <h2>1. Quem somos</h2>
          <p>
            A {companyTradeName} é o nome fantasia de {companyLegalName},
            pessoa jurídica de direito privado, inscrita no CNPJ sob o nº{" "}
            {companyDocument}, com sede em {companyAddress}.
          </p>
          <p>
            Somos uma empresa especializada em automação de processos, agentes
            de Inteligência Artificial e soluções digitais sob medida. Para fins
            desta política, atuamos como controladora dos dados pessoais
            tratados em nossos canais digitais.
          </p>

          <h2>2. Dados que podemos coletar</h2>
          <p>
            Podemos coletar dados fornecidos diretamente por você, como nome,
            e-mail, telefone, empresa, cargo, mensagens enviadas, informações
            comerciais compartilhadas em formulários, WhatsApp, e-mail ou outros
            canais de contato.
          </p>
          <p>
            Também podemos coletar dados técnicos básicos de navegação, como
            endereço IP, tipo de dispositivo, navegador, páginas acessadas,
            data, hora e preferências de cookies.
          </p>

          <h2>3. Finalidades do tratamento</h2>
          <p>Os dados podem ser tratados para:</p>
          <ul>
            <li>responder solicitações de contato e orçamento;</li>
            <li>entender necessidades comerciais e propor soluções;</li>
            <li>prestar suporte e dar continuidade a atendimentos;</li>
            <li>melhorar a experiência, segurança e desempenho do site;</li>
            <li>cumprir obrigações legais, regulatórias ou contratuais;</li>
            <li>enviar comunicações relacionadas aos serviços, quando aplicável.</li>
          </ul>

          <h2>4. Bases legais</h2>
          <p>
            O tratamento de dados pode se apoiar em bases legais previstas na
            LGPD, incluindo consentimento, execução de contrato ou procedimentos
            preliminares, cumprimento de obrigação legal, exercício regular de
            direitos e legítimo interesse, sempre observando os princípios de
            finalidade, necessidade, transparência e segurança.
          </p>

          <h2>5. Cookies e tecnologias semelhantes</h2>
          <p>
            Utilizamos cookies essenciais para o funcionamento do site. Recursos
            não essenciais, como scripts externos de atendimento ou melhoria de
            experiência, somente devem ser carregados após sua autorização no
            aviso de cookies.
          </p>
          <p>
            Você pode recusar cookies não essenciais no banner exibido no site.
            Caso deseje alterar sua escolha depois, limpe os dados do site no
            navegador para que o banner seja exibido novamente.
          </p>

          <h2>6. Compartilhamento de dados</h2>
          <p>
            Podemos compartilhar dados com fornecedores necessários para operar
            o site, hospedar conteúdo, viabilizar atendimento, comunicação,
            segurança, analytics ou automações. Esses terceiros devem tratar os
            dados conforme instruções, contratos e padrões adequados de
            segurança.
          </p>

          <h2>7. Armazenamento e segurança</h2>
          <p>
            Mantemos dados pessoais pelo tempo necessário para cumprir as
            finalidades informadas, obrigações legais, contratuais ou exercício
            regular de direitos. Adotamos medidas técnicas e administrativas
            razoáveis para proteger dados contra acessos não autorizados,
            perda, alteração ou uso indevido.
          </p>

          <h2>8. Direitos dos titulares</h2>
          <p>
            Nos termos da LGPD, você pode solicitar confirmação de tratamento,
            acesso, correção, anonimização, bloqueio, eliminação, portabilidade,
            informação sobre compartilhamento, revogação de consentimento e
            oposição a tratamentos realizados em desconformidade com a lei.
          </p>

          <h2>9. Contato sobre privacidade</h2>
          <p>
            Para exercer direitos ou tirar dúvidas sobre privacidade, entre em
            contato com {companyTradeName} pelo e-mail{" "}
            <a href="mailto:contato@vlagalabs.com.br">
              contato@vlagalabs.com.br
            </a>
            .
          </p>

          <h2>10. Atualizações desta política</h2>
          <p>
            Esta política pode ser atualizada para refletir mudanças legais,
            operacionais ou tecnológicas. A versão vigente será sempre publicada
            nesta página.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
