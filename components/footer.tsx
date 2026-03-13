"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="sobre" className="bg-vlaga-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Vlaga Labs</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Lorem ipsum dolor sit amet, 123</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contato@vladlabs.com</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-bold mb-4">Soluções</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Dolor Sit
                </Link>
              </li>
              <li>
                <Link href="#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Consectetur
                </Link>
              </li>
              <li>
                <Link href="#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Adipiscing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#sobre" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-gray-300">
          <p>&copy; {currentYear} Vlaga Labs. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}