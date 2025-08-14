"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LandingCountdown() {
  // Data final: 7 dias a partir de agora
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 7)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-10 bg-[#150025]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-xl md:text-2xl font-medium text-white">Oferta especial termina em:</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-[#9200cf]/20 border border-[#9200cf]/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.days}</span>
              </div>
              <span className="text-xs md:text-sm text-white/70 mt-2">Dias</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-[#9200cf]/20 border border-[#9200cf]/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.hours}</span>
              </div>
              <span className="text-xs md:text-sm text-white/70 mt-2">Horas</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-[#9200cf]/20 border border-[#9200cf]/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.minutes}</span>
              </div>
              <span className="text-xs md:text-sm text-white/70 mt-2">Minutos</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-[#9200cf]/20 border border-[#9200cf]/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold text-white">{timeLeft.seconds}</span>
              </div>
              <span className="text-xs md:text-sm text-white/70 mt-2">Segundos</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
