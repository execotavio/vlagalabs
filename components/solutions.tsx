"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Search,
  TrendingUp,
  Workflow,
} from "lucide-react";

const solutions = [
  {
    icon: TrendingUp,
    title: "Agentes de IA e Chatbots",
    eyebrow: "Atendimento inteligente",
    description:
      "Atende, qualifica leads e agenda automaticamente pelo WhatsApp, Instagram, site ou CRM, mantendo sua operação ativa mesmo fora do horário comercial.",
  },
  {
    icon: Bot,
    title: "Automação de Processos",
    eyebrow: "Menos trabalho manual",
    description:
      "Conecta sistemas, planilhas, CRMs e ERPs para eliminar digitação repetitiva, reduzir erros e deixar o time focado no que realmente move o negócio.",
  },
  {
    icon: Search,
    title: "Prospecção Automática",
    eyebrow: "Mais oportunidades",
    description:
      "Busca leads qualificados, organiza contatos e dispara mensagens automaticamente para acelerar conversas comerciais com mais consistência.",
  },
  {
    icon: Workflow,
    title: "Softwares Sob Medida",
    eyebrow: "Ferramentas próprias",
    description:
      "Cria fluxos, painéis e ferramentas personalizadas para a rotina real da sua empresa, sem depender de adaptações forçadas em sistemas genéricos.",
  },
];

export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const activeSolution = solutions[activeIndex];
  const ActiveIcon = activeSolution.icon;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % solutions.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? solutions.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % solutions.length);
  };

  return (
    <section id="solucoes" className="bg-vlaga-primary py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-vlaga-accent">
            Nossos serviços
          </p>
          <h2 className="mx-auto max-w-4xl text-3xl font-bold text-white md:text-5xl">
            Onde a IA faz diferença para a sua operação
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Criamos automações, agentes de IA e sistemas personalizados para
            tornar vendas, atendimento e processos internos mais rápidos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20"
        >
          <div className="grid min-h-[430px] overflow-hidden rounded-t-lg lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-vlaga-accent/30 bg-vlaga-accent/15">
                <ActiveIcon className="h-7 w-7 text-vlaga-accent" />
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-vlaga-accent">
                {activeSolution.eyebrow}
              </p>
              <h3 className="max-w-xl text-3xl font-bold text-white md:text-4xl">
                {activeSolution.title}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                {activeSolution.description}
              </p>

              <a
                href="#contato"
                className="mt-8 inline-flex w-fit items-center rounded-lg bg-vlaga-accent px-6 py-3 font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-white hover:text-vlaga-primary"
              >
                Conversar sobre este serviço
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            <div className="relative min-h-[320px] border-t border-white/10 bg-vlaga-accent/5 p-8 lg:border-l lg:border-t-0 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22px_22px,rgba(234,234,234,0.12)_1.5px,transparent_1.5px)] bg-[length:34px_34px] opacity-45" />
              <div className="relative flex h-full items-center justify-center">
                <div className="relative h-72 w-full max-w-md">
                  <div className="absolute left-0 top-2 w-[78%] rounded-lg border border-white/15 bg-white/[0.05] p-6 shadow-xl shadow-black/20">
                    <div className="mb-5 h-3 w-28 rounded-full bg-vlaga-accent" />
                    <div className="space-y-3">
                      <div className="h-3 w-full rounded-full bg-white/30" />
                      <div className="h-3 w-3/4 rounded-full bg-white/20" />
                      <div className="h-3 w-1/2 rounded-full bg-white/15" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-0 w-[76%] rounded-lg border border-vlaga-accent/25 bg-vlaga-accent/10 p-6 shadow-xl shadow-black/20">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vlaga-accent text-white">
                        <ActiveIcon className="h-5 w-5" />
                      </div>
                      <div className="h-3 w-32 rounded-full bg-white/35" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full rounded-full bg-white/25" />
                      <div className="h-3 w-2/3 rounded-full bg-white/20" />
                    </div>
                  </div>

                  <div className="absolute right-8 top-6 grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-3 w-3 rounded-sm bg-white/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-4">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={solution.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group flex min-h-24 items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      isActive
                        ? "border-vlaga-accent bg-vlaga-accent/15 text-white"
                        : "border-white/10 bg-white/[0.04] text-vlaga-accent/75 hover:border-vlaga-accent/50 hover:text-vlaga-accent"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-vlaga-accent text-white"
                          : "bg-vlaga-accent/10 text-vlaga-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                      {solution.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={goToPrevious}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-vlaga-accent/40 bg-vlaga-primary text-vlaga-accent shadow-lg shadow-black/20 transition-colors hover:bg-vlaga-accent hover:text-white"
            aria-label="Serviço anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-vlaga-accent/40 bg-vlaga-primary text-vlaga-accent shadow-lg shadow-black/20 transition-colors hover:bg-vlaga-accent hover:text-white"
            aria-label="Próximo serviço"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
