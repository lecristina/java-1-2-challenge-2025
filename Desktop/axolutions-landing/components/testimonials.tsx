"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"
import { useTranslations } from "@/hooks/use-translations"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useTranslations()

  const testimonials = [
    {
      name: t("testimonials.1.name"),
      position: t("testimonials.1.position"),
      image: "/placeholder.svg?height=100&width=100",
      content: t("testimonials.1.content"),
    },
    {
      name: t("testimonials.2.name"),
      position: t("testimonials.2.position"),
      image: "/placeholder.svg?height=100&width=100",
      content: t("testimonials.2.content"),
    },
    {
      name: t("testimonials.3.name"),
      position: t("testimonials.3.position"),
      image: "/placeholder.svg?height=100&width=100",
      content: t("testimonials.3.content"),
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    nextTestimonial()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevTestimonial()
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 md:py-32 relative bg-gradient-to-b from-black via-[#0a0013] to-black"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9200cf]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9200cf]/30 to-transparent"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("testimonials.title")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto">{t("testimonials.description")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[400px] md:h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
              >
                <div className="mb-6 flex justify-center md:justify-start">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf] flex items-center justify-center">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-lg md:text-xl italic text-white/90 mb-6">"{testimonials[currentIndex].content}"</p>
                  <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
                  <p className="text-white/70">{testimonials[currentIndex].position}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#9200cf]/20 hover:border-[#9200cf] transition-all"
              aria-label={t("testimonials.prev")}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#9200cf]/20 hover:border-[#9200cf] transition-all"
              aria-label={t("testimonials.next")}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#9200cf]" : "bg-white/30"
                }`}
                aria-label={`${t("testimonials.goto")} ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <WhatsAppButton text={t("testimonials.success.story")} href="#contact" />
          </div>
        </div>
      </div>
    </section>
  )
}
