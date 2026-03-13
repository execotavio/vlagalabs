"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lorem Ipsum",
    role: "CEO, Empresa A",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa.",
    image: "https://cdn.abacus.ai/images/e05d9649-6a47-4927-84eb-a4425e431c00.png",
  },
  {
    name: "Dolor Sit Amet",
    role: "Diretor, Empresa B",
    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos.",
    image: "https://cdn.abacus.ai/images/5c01161f-a31f-447f-b83f-82a6fb1bc16e.png",
  },
  {
    name: "Consectetur Elit",
    role: "CTO, Empresa C",
    content: "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil.",
    image: "https://cdn.abacus.ai/images/5d02f842-3bcb-43e6-ab94-2e37604d2478.png",
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
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
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
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
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
                  "{testimonial.content}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}