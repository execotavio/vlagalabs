import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import CookieConsent from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://vlagalabs.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vlaga Labs - Automações e IA para Vendas",
  description: "Soluções em automação e inteligência artificial para área de vendas e suporte ao cliente",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/brand-profile.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vlaga Labs - Automações e IA para Vendas",
    description: "Soluções em automação e inteligência artificial para área de vendas e suporte ao cliente",
    url: siteUrl,
    siteName: "Vlaga Labs",
    images: ["/og-image.png"],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlaga Labs - Automações e IA para Vendas",
    description: "Soluções em automação e inteligência artificial para área de vendas e suporte ao cliente",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
