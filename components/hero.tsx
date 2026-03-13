"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-vlaga-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-vlaga-accent" />
              <span className="text-sm font-medium text-vlaga-primary">
                Inovação em Automação
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vlaga-primary leading-tight">
              Lorem ipsum dolor sit amet consectetur
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae ultricies eget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#solucoes"
                className="inline-flex items-center justify-center px-8 py-4 bg-vlaga-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl font-medium group"
              >
                Conheça nossas soluções
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contato"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-vlaga-primary border-2 border-vlaga-primary rounded-lg hover:bg-vlaga-primary hover:text-white transition-all shadow-md font-medium"
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
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              <Image
                src="https://cdn.abacus.ai/images/5eec095e-556c-443d-a92f-f3eb97a579ed.png"
                alt="Vlaga Labs - Automação e IA"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-vlaga-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-vlaga-primary/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}