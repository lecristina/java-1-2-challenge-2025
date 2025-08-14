"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, Code, Lightbulb, Users, ArrowRight } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useTranslations()

  const features = [
    {
      icon: <Lightbulb className="w-6 h-6 text-[#9200cf]" />,
      title: t("about.feature.1.title"),
      description: t("about.feature.1.description"),
    },
    {
      icon: <Code className="w-6 h-6 text-[#9200cf]" />,
      title: t("about.feature.2.title"),
      description: t("about.feature.2.description"),
    },
    {
      icon: <Users className="w-6 h-6 text-[#9200cf]" />,
      title: t("about.feature.3.title"),
      description: t("about.feature.3.description"),
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#9200cf]" />,
      title: t("about.feature.4.title"),
      description: t("about.feature.4.description"),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: 30,
      x: i % 2 === 0 ? -20 : 20,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  }

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 relative overflow-hidden">
      {/* Background elements with improved gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

      {/* Animated background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#9200cf]/5 blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#9200cf]/5 blur-[100px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a0082]/30 border border-[#9200cf]/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#9200cf]"></span>
            <span className="text-sm font-medium text-white/90">{t("about.badge")}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("about.title")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">{t("about.description")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 lg:gap-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(146, 0, 207, 0.1), 0 10px 10px -5px rgba(146, 0, 207, 0.04)",
                transition: { duration: 0.2 },
              }}
              className="flex gap-6 p-6 rounded-xl bg-gradient-to-br from-white/8 via-white/5 to-transparent border border-white/10 hover:border-[#9200cf]/50 transition-all group relative overflow-hidden"
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#9200cf]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Animated icon container */}
              <motion.div
                className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#9200cf]/20 transition-all relative z-10"
                whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
              >
                {feature.icon}
              </motion.div>

              <div className="relative z-10">
                <motion.h3
                  className="text-xl font-semibold mb-3 group-hover:text-[#d896ff] transition-colors"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="https://wa.me/11983207820?text=Olá! Gostaria de saber mais sobre os serviços da Axolutions."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all group relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#b44dff] to-[#9200cf] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{t("about.cta")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
