"use client"

import { useRef } from "react"
import { Globe, Users, Flag } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"
import { WorldMap } from "./ui/world-map"
import { useTranslations } from "@/hooks/use-translations"

export default function GlobalPresence() {
  const ref = useRef(null)
  const { t } = useTranslations()

  // Dados sobre a presença global
  const globalStats = [
    {
      value: "20+",
      label: t("global.countries"),
      icon: <Flag className="w-6 h-6 text-[#9200cf]" />,
    },
    {
      value: "165+",
      label: t("global.clients"),
      icon: <Globe className="w-6 h-6 text-[#9200cf]" />,
    },
    {
      value: "40+",
      label: t("global.languages"),
      icon: <Users className="w-6 h-6 text-[#9200cf]" />,
    },
  ]

  return (
    <section ref={ref} className="py-16 md:py-24 relative bg-[#0a0013] overflow-hidden">
      {/* Background stars - reduzidas para melhor performance */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-300 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a0082]/30 border border-[#9200cf]/30 mb-4 md:mb-6">
            <Globe className="w-4 h-4 text-[#d896ff]" />
            <span className="text-sm font-medium text-white/90">{t("global.subtitle")}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("global.title.main")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-base md:text-lg mb-8 md:mb-12">
            {t("global.description.full")}
          </p>
        </div>

        {/* World Map - Estático, sem animações */}
        <div className="mb-10 md:mb-16 rounded-xl overflow-hidden border border-[#9200cf]/20 shadow-[0_0_25px_rgba(146,0,207,0.2)]">
          <WorldMap lineColor="#9200cf" />
        </div>

        <div className="flex justify-center">
          <WhatsAppButton variant="secondary" text={t("global.button")} href="#contact" />
        </div>
      </div>
    </section>
  )
}
