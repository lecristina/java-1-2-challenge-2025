"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import CountUp from "react-countup"
import WhatsAppButton from "./whatsapp-button"
import { useTranslations } from "@/hooks/use-translations"

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useTranslations()

  const stats = [
    { value: 350, label: t("stats.projects.completed"), suffix: "+" },
    { value: 98, label: t("stats.client.satisfaction"), suffix: "%" },
    { value: 25, label: t("stats.specialists"), suffix: "+" },
    { value: 4, label: t("stats.years.experience"), suffix: "+" },
  ]

  const entry = useIntersectionObserver(ref, {
    threshold: 0.5,
    freezeOnceVisible: true,
  })

  const isVisible = !!entry?.isIntersecting

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("stats.title")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto">{t("stats.description")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-[#150025]/80 to-black/40 backdrop-blur-sm border border-[#9200cf]/20 h-full flex flex-col items-center justify-center text-center shadow-lg">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-[#f0c080] via-[#b44dff] to-[#4a0082] text-transparent bg-clip-text drop-shadow-sm">
                  {isVisible ? (
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f0c080]/20 via-[#9200cf]/20 to-[#4a0082]/20 rounded-2xl blur-lg opacity-70"></div>
            </motion.div>
          ))}
        </div>
        {/* Add the WhatsApp button after the stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <WhatsAppButton text={t("stats.cta")} href="#contact" />
        </motion.div>
      </div>
    </section>
  )
}
