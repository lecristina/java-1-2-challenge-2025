"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

export default function LandingCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/20 via-transparent to-transparent opacity-80"></div>

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#9200cf]/30 to-transparent blur-3xl"
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9200cf] via-[#d896ff] to-[#9200cf] opacity-40 blur-md animate-pulse"></div>

            {/* Main content container */}
            <div className="relative z-10 p-8 md:p-12 bg-gradient-to-br from-black/90 via-[#150025]/90 to-black/80 backdrop-blur-md border border-white/10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#9200cf]/30 to-[#4a0082]/20 border border-[#9200cf]/40 mb-6 shadow-lg shadow-[#9200cf]/10"
                >
                  <span className="text-sm font-medium text-white/90">Oferta por tempo limitado</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                    Garanta 30% de desconto agora
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/70 max-w-2xl mx-auto text-lg mb-8"
                >
                  Não perca esta oportunidade de transformar seu site em uma poderosa ferramenta de vendas com condições
                  especiais.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#9200cf] mt-1 flex-shrink-0" />
                    <p className="text-white/80 text-left">Design personalizado otimizado para conversão</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#9200cf] mt-1 flex-shrink-0" />
                    <p className="text-white/80 text-left">Otimização técnica para SEO e performance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#9200cf] mt-1 flex-shrink-0" />
                    <p className="text-white/80 text-left">Integração com ferramentas de análise</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#9200cf] mt-1 flex-shrink-0" />
                    <p className="text-white/80 text-left">1 mês de suporte técnico gratuito</p>
                  </div>
                </div>

                <motion.a
                  href="https://wa.me/5511983207820?text=Olá! Vi a landing page e gostaria de aproveitar a oferta de 30% de desconto."
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium text-lg hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all group"
                >
                  <span>Quero garantir meu desconto</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
