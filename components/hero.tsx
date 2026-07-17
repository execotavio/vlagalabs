"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-vlaga-primary pt-32 pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,32,26,1)_0%,rgba(0,32,26,1)_72%,rgba(255,107,26,0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <Sparkles className="w-4 h-4 text-vlaga-accent" />
              <span className="text-sm font-medium text-white">
                Inovação em Automação
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Automação e IA para empresas que querem operar melhor
            </h1>

            <p className="text-lg text-white/75 leading-relaxed">
              Desenvolvemos agentes de Inteligência Artificial, automações de
              processos e softwares sob medida para acelerar vendas, atendimento
              e rotinas internas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#solucoes"
                className="inline-flex items-center justify-center px-8 py-4 bg-vlaga-accent text-white rounded-lg hover:bg-white hover:text-vlaga-primary transition-all shadow-lg shadow-black/20 hover:shadow-xl font-medium group"
              >
                Conheça nossas soluções
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contato"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg hover:border-vlaga-accent hover:bg-white hover:text-vlaga-primary transition-all shadow-md font-medium"
              >
                Fale conosco
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-vlaga-primary shadow-2xl shadow-black/30">
              <Image
                src="/brand-profile.png"
                alt="Logo oficial Vlaga Labs"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 h-5 rounded-b-2xl bg-vlaga-accent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
