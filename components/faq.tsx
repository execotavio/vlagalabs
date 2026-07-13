"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, HelpCircle } from "lucide-react";

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
    <section className="py-20 bg-gray-50" ref={ref}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-vlaga-primary/10 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-vlaga-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-vlaga-primary mb-4">
            Perguntas Frequentes
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-vlaga-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-vlaga-primary transition-transform flex-shrink-0 ${
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
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
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
