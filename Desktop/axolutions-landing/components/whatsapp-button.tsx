"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface WhatsAppButtonProps {
  variant?: "primary" | "secondary"
  text: string
  className?: string
  href?: string
}

export default function WhatsAppButton({
  variant = "primary",
  text,
  className = "",
  href = "https://wa.me/5511983207820?text=Olá! Gostaria de saber mais sobre os serviços da Axolutions.",
}: WhatsAppButtonProps) {
  const isPrimary = variant === "primary"

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(146, 0, 207, 0.6)" }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 text-lg rounded-full ${
        isPrimary
          ? "bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white"
          : "bg-white text-[#9200cf] border border-[#9200cf]"
      } font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all flex items-center justify-center gap-2 group ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="relative">
        {text}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#d896ff] to-[#9200cf] opacity-50 blur-xl group-hover:opacity-100 transition-opacity"></span>
      </span>
    </motion.a>
  )
}
