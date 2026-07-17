"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

const companyLegalName =
  "O. DE CARVALHO TRINDADE CONSULTORIA EM TECNOLOGIA LTDA";
const companyDocument = "64.286.928/0001-67";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="sobre" className="bg-vlaga-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div id="contato" className="md:col-span-2 scroll-mt-24">
            <Image
              src="/logo.svg"
              alt="Vlaga Labs"
              width={122}
              height={173}
              className="h-20 w-auto mb-5"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Automação de processos, agentes de IA e softwares sob medida para empresas que querem operar melhor.
            </p>
            <div className="space-y-3">
              <div className="text-sm leading-relaxed text-gray-300">
                <p>{companyLegalName}</p>
                <p>CNPJ {companyDocument}</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+55 (11) 5104-2299</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contato@vlagalabs.com.br</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-bold mb-4">Soluções</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Agentes de IA
                </Link>
              </li>
              <li>
                <Link href="/#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Automação de processos
                </Link>
              </li>
              <li>
                <Link href="/#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Prospecção automática
                </Link>
              </li>
              <li>
                <Link href="/#solucoes" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Softwares sob medida
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#depoimentos" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-gray-300 hover:text-vlaga-accent transition-colors">
                  Termos de Uso
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
