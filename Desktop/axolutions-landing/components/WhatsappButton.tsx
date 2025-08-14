"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useMediaQuery } from "../hooks/use-media-query"

interface WhatsAppButtonProps {
  className?: string
  text?: string
  showIcon?: boolean
  variant?: "primary" | "secondary" | "outline"
  type?: "button" | "submit"
  onClick?: () => void
  message?: string
  href?: string // Novo parâmetro para links de âncora
}

export default function WhatsAppButton({
  className = "",
  text = "Fale com um especialista",
  showIcon = true,
  variant = "primary",
  type = "button",
  onClick,
  message = "Olá! Estou interessado em conhecer como a Axolutions pode impulsionar meu negócio. Podemos conversar?",
  href, // Novo parâmetro
}: WhatsAppButtonProps) {
  const phoneNumber = "5511983207820" // Format: country code + number without special chars
  const [isPulsing, setIsPulsing] = useState(false)

  // Iniciar a animação de pulsação após um tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Preparar a URL do WhatsApp com a mensagem codificada
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  const getButtonClasses = () => {
    const baseClasses =
      "flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 group"

    if (variant === "primary") {
      return `${baseClasses} px-6 py-3 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white hover:shadow-lg hover:shadow-[#9200cf]/30`
    } else if (variant === "secondary") {
      return `${baseClasses} px-6 py-3 bg-white text-[#9200cf] hover:bg-[#9200cf]/10 border border-[#9200cf]`
    } else {
      return `${baseClasses} px-6 py-3 bg-transparent border border-[#9200cf] text-[#9200cf] hover:bg-[#9200cf]/10`
    }
  }

  const pulseAnimation = {
    scale: isPulsing ? [1, 1.05, 1] : 1,
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop" as const,
    },
  }

  // Detectar se é dispositivo móvel
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Texto adaptado para mobile
  const displayText = isMobile ? "Fale conosco" : text

  // Se tiver um href, criar um link de âncora em vez de abrir o WhatsApp
  if (href) {
    return type === "submit" ? (
      <motion.button
        type="submit"
        className={`${getButtonClasses()} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        animate={pulseAnimation}
        aria-label={`Enviar mensagem via WhatsApp para falar com um especialista`}
      >
        {showIcon && <MessageCircle className="w-5 h-5" />}
        {displayText}
        <span className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/40 via-[#b44dff]/30 to-[#9200cf]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
      </motion.button>
    ) : (
      <motion.a
        href={href}
        className={`${getButtonClasses()} ${className} relative overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        animate={pulseAnimation}
        aria-label={`Navegar para falar com um especialista`}
      >
        {showIcon && <MessageCircle className="w-5 h-5" />}
        {displayText}
        <span className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/40 via-[#b44dff]/30 to-[#9200cf]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
      </motion.a>
    )
  }

  // Comportamento original para botões WhatsApp
  return type === "submit" ? (
    <motion.button
      type="submit"
      className={`${getButtonClasses()} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={pulseAnimation}
      aria-label={`Enviar mensagem via WhatsApp para falar com um especialista`}
    >
      {showIcon && <MessageCircle className="w-5 h-5" />}
      {displayText}
      <span className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/40 via-[#b44dff]/30 to-[#9200cf]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
    </motion.button>
  ) : (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${getButtonClasses()} ${className} relative overflow-hidden`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={pulseAnimation}
      aria-label={`Abrir WhatsApp para falar com um especialista`}
    >
      {showIcon && <MessageCircle className="w-5 h-5" />}
      {displayText}
      <span className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/40 via-[#b44dff]/30 to-[#9200cf]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
    </motion.a>
  )
}
