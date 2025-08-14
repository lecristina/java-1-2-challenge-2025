"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, BarChart3, Search, Smartphone, Shield, Users } from "lucide-react"

export default function LandingBenefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-[#9200cf]" />,
      title: "Carregamento Ultrarrápido",
      description: "Sites que carregam em menos de 2 segundos, reduzindo a taxa de abandono em até 40%.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#9200cf]" />,
      title: "Otimizado para Conversão",
      description: "Layout e elementos estrategicamente posicionados para maximizar suas taxas de conversão.",
    },
    {
      icon: <Search className="w-6 h-6 text-[#9200cf]" />,
      title: "SEO Avançado",
      description: "Estrutura técnica otimizada para mecanismos de busca, aumentando sua visibilidade online.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#9200cf]" />,
      title: "100% Responsivo",
      description: "Experiência perfeita em todos os dispositivos, desde smartphones até desktops.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#9200cf]" />,
      title: "Segurança Reforçada",
      description: "Proteção contra ameaças cibernéticas e conformidade com as normas de privacidade.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#9200cf]" />,
      title: "Experiência do Usuário",
      description: "Interface intuitiva que guia seus visitantes até a conversão desejada.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="beneficios" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/5 via-transparent to-transparent opacity-70"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              Por que nossos sites vendem mais?
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Combinamos design atraente com estratégias avançadas de conversão para criar sites que não apenas
            impressionam, mas também geram resultados reais para o seu negócio.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#9200cf]/30 hover:bg-[#9200cf]/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#d896ff] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 transition-colors">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/5511983207820?text=Olá! Vi a landing page e gostaria de saber mais sobre como os benefícios se aplicam ao meu negócio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
          >
            Quero um site que converte
          </a>
        </motion.div>
      </div>
    </section>
  )
}
