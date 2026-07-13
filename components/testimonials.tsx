"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Operação Comercial",
    role: "Vendas e pré-vendas",
    content: "Automatizações bem desenhadas reduzem o tempo de resposta, qualificam oportunidades e deixam o time focado nas conversas que realmente avançam.",
  },
  {
    name: "Atendimento ao Cliente",
    role: "Suporte e relacionamento",
    content: "Agentes de IA ajudam a responder dúvidas frequentes, organizar solicitações e manter uma experiência consistente em diferentes canais.",
  },
  {
    name: "Gestão de Processos",
    role: "Backoffice e liderança",
    content: "Integrações entre ferramentas eliminam retrabalho, centralizam informações e dão mais previsibilidade para a tomada de decisão.",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-vlaga-primary mb-4">
            O Que Dizem Sobre Nós
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologia aplicada com foco no que importa: operação fluida, atendimento melhor e decisões mais rápidas.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-vlaga-accent opacity-20" />
              
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden bg-vlaga-primary">
                  <Image
                    src="/brand-profile.png"
                    alt="Vlaga Labs"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-vlaga-primary mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {testimonial.role}
                </p>
                
                <p className="text-gray-600 leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
