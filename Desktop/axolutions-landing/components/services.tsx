"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Laptop, Globe, LineChart, Database, Smartphone, ShoppingCart } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useTranslations()

  const services = [
    {
      icon: <Laptop className="w-8 h-8" />,
      title: t("services.1.title"),
      description: t("services.1.description"),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("services.2.title"),
      description: t("services.2.description"),
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: t("services.3.title"),
      description: t("services.3.description"),
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t("services.4.title"),
      description: t("services.4.description"),
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t("services.5.title"),
      description: t("services.5.description"),
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: t("services.6.title"),
      description: t("services.6.description"),
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="services" ref={ref} className="py-20 md:py-32 relative bg-[#0a0013]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9200cf]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9200cf]/30 to-transparent"></div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#9200cf]/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#9200cf]/5 blur-3xl"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("services.title")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">{t("services.description")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group cursor-pointer"
              onClick={() => {
                window.open(
                  `https://wa.me/11983207820?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service.title}`)}`,
                  "_blank",
                )
              }}
            >
              <div className="relative z-10 h-full p-8 rounded-2xl bg-[#150025] border border-[#9200cf]/20 overflow-hidden">
                {/* Icon with glow effect */}
                <div className="w-12 h-12 mb-6 text-[#9200cf] relative">
                  {service.icon}
                  <div className="absolute inset-0 bg-[#9200cf] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#9200cf] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Animated corner gradient */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#9200cf]/20 via-[#9200cf]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full"></div>

                {/* Animated line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9200cf] group-hover:w-full transition-all duration-500 ease-out"></div>

                {/* Particle effect on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-[#9200cf]"
                      initial={{
                        x: Math.random() * 100 + 50,
                        y: Math.random() * 100 + 50,
                        opacity: 0,
                      }}
                      animate={{
                        x: [null, Math.random() * 200],
                        y: [null, Math.random() * 200 - 100],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/0 to-[#9200cf]/0 group-hover:from-[#9200cf]/20 group-hover:to-[#9200cf]/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <a
            href={`https://wa.me/11983207820?text=${encodeURIComponent(t("services.whatsapp.message"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
          >
            {t("services.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
