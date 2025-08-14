"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

export default function LandingHero() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/20 via-transparent to-transparent opacity-70"></div>

      {/* Animated gradient */}
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

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#9200cf]/30 mb-6"
          >
            <span className="text-sm font-medium text-[#d896ff]">Oferta por tempo limitado: 30% OFF</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="block text-white">Transforme seu site em uma</span>
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              máquina de vendas
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Sites otimizados para conversão que transformam visitantes em clientes. Aumente suas vendas com uma presença
            digital que realmente funciona.
          </motion.p>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col md:flex-row justify-center gap-4 mb-10 text-left md:text-center"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#9200cf] flex-shrink-0" />
              <span className="text-white/80">Design otimizado para conversão</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#9200cf] flex-shrink-0" />
              <span className="text-white/80">Carregamento ultrarrápido</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#9200cf] flex-shrink-0" />
              <span className="text-white/80">Otimizado para SEO</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/5511983207820?text=Olá! Vi a landing page e gostaria de aproveitar a oferta de 30% de desconto."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium text-lg hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Garantir 30% de desconto</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#beneficios"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/20 transition-all"
            >
              Saiba mais
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
