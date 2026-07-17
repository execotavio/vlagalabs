"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bot, Search, TrendingUp, Workflow } from "lucide-react";

const solutions = [
  {
    icon: TrendingUp,
    title: "Agentes de IA e Chatbots",
    description: "Atendimento, qualificação de leads e agendamento automático via WhatsApp, Instagram, site ou CRM.",
  },
  {
    icon: Bot,
    title: "Automação de Processos",
    description: "Integrações entre sistemas, planilhas, CRMs e ERPs para eliminar tarefas manuais e retrabalho.",
  },
  {
    icon: Search,
    title: "Prospecção Automática",
    description: "Busca de leads qualificados e disparo automático de mensagens para acelerar a geração de oportunidades.",
  },
  {
    icon: Workflow,
    title: "Softwares Sob Medida",
    description: "Fluxos, painéis e ferramentas personalizadas para a necessidade real da sua operação.",
  },
];

export default function Solutions() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="solucoes" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-vlaga-primary mb-4">
            Soluções que Temos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Criamos automações, agentes de IA e sistemas personalizados para tornar operações mais rápidas, integradas e inteligentes.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-video bg-vlaga-primary">
                  <Image
                    src="/logo.svg"
                    alt="Vlaga Labs"
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-vlaga-accent/10 rounded-lg">
                      <Icon className="w-6 h-6 text-vlaga-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-vlaga-primary">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
