"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, MousePointer, BarChart3, Rocket, Check } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"
import { useTranslations } from "@/hooks/use-translations"

export default function LandingPages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useTranslations()

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: t("landing.feature.1.title"),
      description: t("landing.feature.1.description"),
    },
    {
      icon: <MousePointer className="w-6 h-6 text-white" />,
      title: t("landing.feature.2.title"),
      description: t("landing.feature.2.description"),
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: t("landing.feature.3.title"),
      description: t("landing.feature.3.description"),
    },
  ]

  const benefits = [t("landing.benefit.1"), t("landing.benefit.2"), t("landing.benefit.3"), t("landing.benefit.4")]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-32 relative bg-[#0a0013] overflow-hidden">
      {/* Background stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-300 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#d896ff] uppercase tracking-wider font-medium mb-3">{t("landing.badge")}</p>
          <h2 className="text-4xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("landing.title")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">{t("landing.description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white">{t("landing.why")}</h3>

            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#3b0064] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-[#150025] border border-[#9200cf]/20 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-5 h-5 text-[#9200cf]" />
                <h3 className="text-xl font-bold text-white">{t("landing.offer")}</h3>
              </div>
              <p className="text-white/70 mb-6">{t("landing.offer.description")}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{t("landing.offer.price")}</span>
                <span className="text-white/70 ml-2">{t("landing.offer.period")}</span>
              </div>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#9200cf]" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              <WhatsAppButton text={t("landing.cta")} className="w-full" href="#contact" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
