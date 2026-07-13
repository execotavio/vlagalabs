"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const storageKey = "vlaga_cookie_consent";

type ConsentStatus = "accepted" | "rejected";

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(storageKey);

    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsent(savedConsent);
    }

    setIsLoaded(true);
  }, []);

  const saveConsent = (status: ConsentStatus) => {
    window.localStorage.setItem(storageKey, status);
    setConsent(status);
  };

  return (
    <>
      {consent === "accepted" && (
        <Script
          src="https://apps.abacus.ai/chatllm/appllm-lib.js"
          strategy="afterInteractive"
        />
      )}

      {isLoaded && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-vlaga-primary text-white shadow-2xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="text-base font-semibold">Usamos cookies</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-200">
                Utilizamos cookies essenciais para o funcionamento do site e,
                com sua autorização, recursos externos para melhorar a
                experiência de atendimento. Você pode aceitar ou recusar os
                cookies não essenciais.
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <Link
                  href="/politica-de-privacidade"
                  className="text-vlaga-accent underline-offset-4 hover:underline"
                >
                  Política de Privacidade
                </Link>
                <Link
                  href="/termos-de-uso"
                  className="text-vlaga-accent underline-offset-4 hover:underline"
                >
                  Termos de Uso
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="rounded-lg bg-vlaga-accent px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-vlaga-primary"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
