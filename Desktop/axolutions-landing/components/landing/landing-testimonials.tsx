"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function LandingTestimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Carlos Silva",
      position: "CEO, TechCorp",
      image: "/diverse-group-city.png",
      content:
        "Desde que implementamos o novo site da Axolutions, nossas conversões aumentaram em 137%. O retorno sobre o investimento foi alcançado em apenas 2 meses. Recomendo fortemente!",
      rating: 5,
    },
    {
      name: "Ana Ferreira",
      position: "Diretora de Marketing, Inovare",
      image: "/contemplative-artist.png",
      content:
        "A equipe da Axolutions entendeu perfeitamente nossas necessidades. O site não apenas ficou visualmente impressionante, mas também começou a gerar leads qualificados desde o primeiro dia.",
      rating: 5,
    },
    {
      name: "Roberto Mendes",
      position: "Proprietário, Global Tech",
      image: "/confident-city-leader.png",
      content:
        "Após três agências diferentes que não entregaram resultados, a Axolutions finalmente criou um site que realmente converte. Nossas vendas online aumentaram 85% no primeiro trimestre.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="depoimentos" ref={ref} className="py-20 bg-[#0a0013] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9200cf]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9200cf]/30 to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              O que nossos clientes dizem
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Veja como nossos sites têm ajudado empresas como a sua a aumentar vendas e conquistar mais clientes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[300px] md:h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
            <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="mb-6 md:mb-0 flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#9200cf]/30">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#9200cf] text-[#9200cf]" />
                  ))}
                </div>
                <p className="text-lg italic text-white/90 mb-4">"{testimonials[currentIndex].content}"</p>
                <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
                <p className="text-white/70">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#9200cf]/20 hover:border-[#9200cf] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#9200cf]/20 hover:border-[#9200cf] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#9200cf]" : "bg-white/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
