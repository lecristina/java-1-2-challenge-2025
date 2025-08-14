"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

interface LoadingScreenProps {
  children: React.ReactNode
  minLoadingTime?: number
}

export default function LoadingScreen({ children, minLoadingTime = 2000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const text = "AXOLUTIONS"
  const pathname = usePathname()

  // Verificar se é a primeira visita - apenas no lado do cliente
  useEffect(() => {
    // Verificamos se estamos no navegador
    if (typeof window === "undefined") return

    // Verificamos se estamos na página inicial e se é a primeira visita
    const isFirstVisit = pathname === "/" && !sessionStorage.getItem("hasVisitedBefore")

    // Se for a primeira visita e estivermos na página inicial, mostramos o loading
    if (isFirstVisit) {
      setIsLoading(true)
      // Marcamos que o usuário já visitou o site
      sessionStorage.setItem("hasVisitedBefore", "true")
    } else {
      // Caso contrário, não mostramos o loading
      setIsLoading(false)
    }
  }, [pathname])

  // Efeito de digitação
  useEffect(() => {
    if (textIndex < text.length && isLoading) {
      const timeout = setTimeout(() => {
        setTextIndex(textIndex + 1)
      }, 120) // velocidade da digitação

      return () => clearTimeout(timeout)
    }
  }, [textIndex, isLoading, text.length])

  // Efeito para finalizar o loading após o tempo mínimo
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, minLoadingTime)

      return () => clearTimeout(timer)
    }
  }, [isLoading, minLoadingTime])

  // Se não estiver carregando, apenas renderize o conteúdo
  if (!isLoading) {
    return <>{children}</>
  }

  // Renderiza a tela de loading
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fundo com gradiente animado */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 loading-gradient"></div>

        {/* Partículas/linhas de fundo */}
        <div className="absolute inset-0 loading-grid"></div>

        {/* Círculos de luz */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full loading-orb opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full loading-orb opacity-10 delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full loading-orb opacity-15 delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Efeito de máquina de escrever */}
        <div className="relative mb-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider">
            {text.substring(0, textIndex)}
            <span className="inline-block w-1 h-10 md:h-14 bg-[#9200cf] animate-blink ml-1"></span>
          </h1>

          {/* Linha de sublinhado */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#9200cf] to-[#d896ff]"
            initial={{ width: 0 }}
            animate={{ width: textIndex >= text.length ? "100%" : "0%" }}
            transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
          />
        </div>

        {/* Texto de status */}
        <motion.p
          className="text-white/70 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: textIndex >= text.length ? 1 : 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Carregando experiência digital...
        </motion.p>
      </div>
    </motion.div>
  )
}
