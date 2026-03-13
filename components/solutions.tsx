"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BarChart3, Bot, TrendingUp, Workflow } from "lucide-react";

const solutions = [
  {
    icon: TrendingUp,
    title: "Lorem Ipsum Dolor",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
    image: "https://cdn.abacus.ai/images/cf7d8437-0e7c-445e-891c-8e337d5534f8.png",
  },
  {
    icon: Bot,
    title: "Consectetur Adipiscing",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://cdn.abacus.ai/images/79b7a240-3b23-4b2e-bd08-a34e91a56464.png",
  },
  {
    icon: BarChart3,
    title: "Excepteur Sint Occaecat",
    description: "Cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis.",
    image: "https://cdn.abacus.ai/images/4ab6fcbb-724b-4b1d-b1d3-71e4fe3fc245.png",
  },
  {
    icon: Workflow,
    title: "Nemo Enim Ipsam",
    description: "Voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.",
    image: "https://cdn.abacus.ai/images/d7be3658-c2d5-4cc4-b463-7fc809377bbb.png",
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
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur
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
                <div className="relative aspect-video bg-gray-200">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-vlaga-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-vlaga-primary" />
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