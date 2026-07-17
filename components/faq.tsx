"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é a Vlaga Labs?",
    plainAnswer:
      "A Vlaga Labs é uma empresa especialista em automação de processos e desenvolvimento de agentes de Inteligência Artificial para negócios. Ajudamos empresas de diversos portes a eliminar tarefas manuais, otimizar a operação e acelerar o atendimento e as vendas através de soluções tecnológicas sob medida.",
    answer: (
      <>
        <strong>
          A Vlaga Labs é uma empresa especialista em automação de processos e
          desenvolvimento de agentes de Inteligência Artificial para negócios.
        </strong>{" "}
        Ajudamos empresas de diversos portes a eliminar tarefas manuais,
        otimizar a operação e acelerar o atendimento e as vendas através de
        soluções tecnológicas sob medida.
      </>
    ),
  },
  {
    question: "O que é automação de processos?",
    plainAnswer:
      "É o uso de tecnologia para executar tarefas repetitivas, garantindo que sua agência funcione sem erros humanos e com maior velocidade.",
    answer:
      "É o uso de tecnologia para executar tarefas repetitivas, garantindo que sua agência funcione sem erros humanos e com maior velocidade.",
  },
  {
    question: "O que é automação com IA?",
    plainAnswer:
      "Diferente da automação comum, a IA consegue entender contextos, ler mensagens e tomar decisões baseadas em dados, simulando o raciocínio humano.",
    answer:
      "Diferente da automação comum, a IA consegue entender contextos, ler mensagens e tomar decisões baseadas em dados, simulando o raciocínio humano.",
  },
  {
    question: "Agentes substituem humanos?",
    plainAnswer:
      "Eles substituem o trabalho braçal e repetitivo, permitindo que seus humanos foquem no que realmente importa: estratégia e fechamento.",
    answer:
      "Eles substituem o trabalho braçal e repetitivo, permitindo que seus humanos foquem no que realmente importa: estratégia e fechamento.",
  },
  {
    question: "Quais tipos de projetos e automações vocês desenvolvem?",
    plainAnswer:
      "Desenvolvemos soluções sob medida em automação de processos e IA, incluindo agentes de IA e chatbots para atendimento, qualificação de leads e agendamento automático via WhatsApp, Instagram ou CRM; automação de processos internos com integração entre sistemas, planilhas, CRMs e ERPs; análise de dados com IA para extração automática de dados de PDFs, e-mails e documentos complexos; e softwares sob medida para fluxos e ferramentas personalizadas.",
    answer: (
      <>
        <p className="mb-3">
          Desenvolvemos soluções sob medida em automação de processos e IA,
          incluindo:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Agentes de IA e Chatbots:</strong> Para atendimento,
            qualificação de leads e agendamento automático via WhatsApp,
            Instagram ou CRM.
          </li>
          <li>
            <strong>Automação de Processos Internos:</strong> Integração entre
            sistemas, planilhas, CRMs e ERPs para eliminar a digitação manual de
            dados.
          </li>
          <li>
            <strong>Análise de Dados com IA:</strong> Extração automática de
            dados de PDFs, e-mails e documentos complexos.
          </li>
          <li>
            <strong>Softwares Sob Medida:</strong> Criação de fluxos e
            ferramentas personalizadas para a necessidade da sua operação.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Quanto tempo leva para desenvolver uma solução de IA?",
    plainAnswer:
      "O prazo depende da complexidade do projeto. Projetos e automações pontuais costumam ser entregues entre 5 a 10 dias úteis. Já implementações mais complexas ou softwares sob medida passam por uma etapa de alinhamento e costumam levar de 2 a 4 semanas. Trabalhamos com prazos ágeis para que sua empresa veja resultados no menor tempo possível.",
    answer:
      "O prazo depende da complexidade do projeto. Projetos e automações pontuais costumam ser entregues entre 5 a 10 dias úteis. Já implementações mais complexas ou softwares sob medida passam por uma etapa de alinhamento e costumam levar de 2 a 4 semanas. Trabalhamos com prazos ágeis para que sua empresa veja resultados no menor tempo possível.",
  },
  {
    question: "A Vlaga Labs oferece suporte e manutenção após a entrega?",
    plainAnswer:
      "Sim. Oferecemos suporte contínuo, monitoramento e manutenção para garantir que todas as automações e IAs funcionem sem interrupções. Além disso, realizamos treinamentos com a sua equipe para garantir que todos saibam utilizar as ferramentas de forma simples e eficiente.",
    answer:
      "Sim. Oferecemos suporte contínuo, monitoramento e manutenção para garantir que todas as automações e IAs funcionem sem interrupções. Além disso, realizamos treinamentos com a sua equipe para garantir que todos saibam utilizar as ferramentas de forma simples e eficiente.",
  },
  {
    question:
      "Qual é o valor do investimento para implementar IA na minha empresa?",
    plainAnswer:
      "O investimento varia conforme o escopo e as necessidades do seu negócio. Trabalhamos com projetos sob medida que se adaptam desde pequenas empresas até grandes operações. Oferecemos planos flexíveis com taxa de implementação e opção de manutenção contínua. Entre em contato conosco para passar o diagnóstico da sua empresa e receber um orçamento personalizado.",
    answer:
      "O investimento varia conforme o escopo e as necessidades do seu negócio. Trabalhamos com projetos sob medida que se adaptam desde pequenas empresas até grandes operações. Oferecemos planos flexíveis com taxa de implementação e opção de manutenção contínua. Entre em contato conosco para passar o diagnóstico da sua empresa e receber um orçamento personalizado.",
  },
  {
    question:
      "Minha empresa precisa ter sistemas avançados para usar as automações da Vlaga Labs?",
    plainAnswer:
      "Não. Nossas automações e agentes de IA podem ser integrados aos sistemas e ferramentas que sua empresa já utiliza no dia a dia, como WhatsApp, Google Workspace, Excel, RD Station, HubSpot ou Trello. Caso sua empresa não utilize nenhum sistema, desenvolvemos uma estrutura do zero.",
    answer:
      "Não. Nossas automações e agentes de IA podem ser integrados aos sistemas e ferramentas que sua empresa já utiliza no dia a dia, como WhatsApp, Google Workspace, Excel, RD Station, HubSpot ou Trello. Caso sua empresa não utilize nenhum sistema, desenvolvemos uma estrutura do zero.",
  },
  {
    question:
      "Por que contratar a Vlaga Labs em vez de usar ferramentas de IA prontas?",
    plainAnswer:
      "Ferramentas genéricas exigem configurações complexas, não se conectam perfeitamente aos seus sistemas internos e muitas vezes não entendem as regras específicas do seu negócio. A Vlaga Labs entrega uma solução pronta para usar, personalizada para a sua realidade, treinada com o tom da sua marca e integrada aos seus processos.",
    answer:
      "Ferramentas genéricas exigem configurações complexas, não se conectam perfeitamente aos seus sistemas internos e muitas vezes não entendem as regras específicas do seu negócio. A Vlaga Labs entrega uma solução pronta para usar, personalizada para a sua realidade, treinada com o tom da sua marca e integrada aos seus processos.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.plainAnswer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-vlaga-primary py-14 md:py-16" ref={ref}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-7 text-center md:mb-8"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-vlaga-accent">
            Dúvidas
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="border-b border-white/12"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-2.5 text-left md:py-3"
              >
                <span className="text-sm font-semibold leading-snug text-vlaga-accent md:text-[15px]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-vlaga-accent transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 pr-8 text-sm leading-relaxed text-white">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
