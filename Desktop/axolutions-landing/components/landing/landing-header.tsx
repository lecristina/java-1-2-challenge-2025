"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
            Axolutions
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#beneficios" className="text-white/80 hover:text-white transition-colors">
            Benefícios
          </a>
          <a href="#depoimentos" className="text-white/80 hover:text-white transition-colors">
            Depoimentos
          </a>
          <a href="#faq" className="text-white/80 hover:text-white transition-colors">
            FAQ
          </a>
          <a
            href="https://wa.me/5511983207820?text=Olá! Vi a landing page e gostaria de saber mais sobre a oferta especial."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
          >
            Fale Conosco
          </a>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col py-4">
              <a
                href="#beneficios"
                className="px-6 py-3 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefícios
              </a>
              <a
                href="#depoimentos"
                className="px-6 py-3 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Depoimentos
              </a>
              <a
                href="#faq"
                className="px-6 py-3 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="https://wa.me/5511983207820?text=Olá! Vi a landing page e gostaria de saber mais sobre a oferta especial."
                target="_blank"
                rel="noopener noreferrer"
                className="mx-6 my-3 px-5 py-2 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Fale Conosco
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
