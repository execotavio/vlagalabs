import Header from "@/components/header";
import Hero from "@/components/hero";
import Solutions from "@/components/solutions";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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