import Header from "@/components/header";
import Hero from "@/components/hero";
import Solutions from "@/components/solutions";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vlaga Labs",
    url: "https://vlagalabs.com.br",
    logo: "https://vlagalabs.com.br/logo.png",
    sameAs: [],
    description:
      "Soluções em automação e inteligência artificial para área de vendas e suporte ao cliente",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vlaga Labs",
    url: "https://vlagalabs.com.br",
    inLanguage: "pt-BR",
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <Hero />
      <Solutions />
      <Testimonials />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
