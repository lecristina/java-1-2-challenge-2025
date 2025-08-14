"use client"

import { useRef, useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"
import Link from "next/link"
import Typewriter from "typewriter-effect"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SplineScene } from "./ui/splite"
import VisualEffect from "./visual-effect"
import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [robotLoaded, setRobotLoaded] = useState(false)
  const [contentLoaded, setContentLoaded] = useState(false)
  const { t } = useTranslations()

  const handleRobotLoad = () => {
    setRobotLoaded(true)
  }

  // Verificar se a página está totalmente carregada
  useEffect(() => {
    // Verificamos se estamos no navegador
    if (typeof window === "undefined") return

    // Função para marcar o conteúdo como carregado
    const markAsLoaded = () => {
      setContentLoaded(true)
    }

    // Se o documento já estiver carregado
    if (document.readyState === "complete") {
      markAsLoaded()
    } else {
      // Caso contrário, aguardamos o evento load
      window.addEventListener("load", markAsLoaded)

      // Fallback: se após 3 segundos ainda não estiver carregado, mostramos o conteúdo
      const timer = setTimeout(markAsLoaded, 3000)

      return () => {
        window.removeEventListener("load", markAsLoaded)
        clearTimeout(timer)
      }
    }
  }, [])

  // Se o conteúdo não estiver carregado, não renderizamos nada
  if (!contentLoaded) {
    return null
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/20 via-transparent to-transparent opacity-70"></div>

      {/* Visual Effect - apenas em desktop */}
      {isDesktop && <VisualEffect />}

      {/* Animated circles - apenas em desktop */}
      {isDesktop && (
        <>
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#b44dff]/30 to-transparent blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-[#4a0082]/20 to-transparent blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </>
      )}

      <div className="container mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className={`${isDesktop ? "text-left" : "text-center"} max-w-2xl mx-auto lg:mx-0`}>
            {isDesktop ? (
              // Desktop version - mantém o layout atual
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a0082]/30 border border-[#b44dff]/30 mb-6">
                  <Sparkles className="w-4 h-4 text-[#d896ff]" />
                  <span className="text-sm font-medium text-white/90">{t("hero.badge")}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 neon-text">
                  <span className="block">{t("hero.title.transforming")}</span>
                  <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                    {t("hero.title.ideasInto")}
                  </span>
                  <span className="block text-[#b44dff] h-[1.2em]">
                    <Typewriter
                      options={{
                        strings: [
                          t("hero.typewriter.1"),
                          t("hero.typewriter.2"),
                          t("hero.typewriter.3"),
                          t("hero.typewriter.4"),
                          t("hero.typewriter.5"),
                          t("hero.typewriter.6"),
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 80,
                        deleteSpeed: 50,
                        wrapperClassName: "inline-block min-w-[200px] lg:min-w-[300px]",
                        cursor: "",
                      }}
                    />
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/80 mb-10">{t("hero.description")}</p>
              </>
            ) : (
              // Mobile version - simplificada conforme a imagem de referência
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h1 className="text-4xl font-bold mb-6">
                  <span className="block text-white">{t("hero.mobile.title.1")}</span>
                  <span className="block text-white">{t("hero.mobile.title.2")}</span>
                  <span className="block text-[#b44dff] text-5xl mt-2">Axolutions</span>
                </h1>
              </motion.div>
            )}

            {/* Descrição simplificada para mobile */}
            {!isDesktop && (
              <motion.p
                className="text-lg text-white/90 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t("hero.mobile.description")}
              </motion.p>
            )}

            <motion.div
              className={`flex ${isDesktop ? "flex-row justify-start" : "flex-col items-center"} gap-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <WhatsAppButton
                variant="primary"
                text={t("hero.cta.contact")}
                href="https://wa.me/11983207820?text=Olá! Gostaria de saber mais sobre os serviços da Axolutions."
              />
              {isDesktop && (
                <Link
                  href="/projects"
                  className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-[#333333] to-[#4a4a4a] text-white font-medium hover:bg-gradient-to-r hover:from-[#9200cf] hover:to-[#6a00cf] hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles size={20} className="text-[#9200cf] group-hover:text-white transition-colors" />
                  {t("hero.cta.projects")}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right side - 3D Robot - Apenas em telas grandes */}
          {isDesktop && (
            <div className="relative h-[500px] lg:h-[600px] bg-black/[0.96] rounded-2xl overflow-hidden border border-[#b44dff]/20 shadow-xl shadow-[#9200cf]/20">
              {/* Spotlight fixo no fundo */}
              <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/10 via-transparent to-transparent opacity-50 z-0"></div>

              {/* Robô 3D */}
              <div className="relative z-10 w-full h-full">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className={`w-full h-full ${robotLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={handleRobotLoad}
                />
                {!robotLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#9200cf"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset="251.2"
                          className="animate-[dash_1.5s_ease-in-out_infinite]"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-20"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
