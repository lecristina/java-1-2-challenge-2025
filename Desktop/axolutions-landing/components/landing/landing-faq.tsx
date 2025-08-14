"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function LandingFaq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Quanto tempo leva para desenvolver um site que converte?",
      answer:
        "O tempo de desenvolvimento varia de acordo com a complexidade do projeto, mas geralmente entregamos sites otimizados para conversão em 2 a 4 semanas. Nosso processo é ágil e focado em resultados rápidos para o seu negócio.",
    },
    {
      question: "Como vocês garantem que o site vai realmente converter?",
      answer:
        "Utilizamos metodologias comprovadas de CRO (Conversion Rate Optimization), realizamos testes A/B e aplicamos princípios de psicologia do consumidor. Além disso, analisamos constantemente os dados para otimizar os elementos que mais impactam na conversão.",
    },
    {
      question: "O que está incluído na oferta com 30% de desconto?",
      answer:
        "A oferta inclui o desenvolvimento completo do site otimizado para conversão, incluindo design personalizado, implementação técnica, otimização para SEO, integração com ferramentas de análise e um mês de suporte gratuito após o lançamento.",
    },
    {
      question: "Vocês oferecem suporte após o lançamento do site?",
      answer:
        "Sim, oferecemos planos de suporte contínuo para garantir que seu site continue performando bem. O primeiro mês de suporte está incluído na oferta, e depois você pode escolher o plano que melhor atende às suas necessidades.",
    },
    {
      question: "Como posso medir o retorno sobre o investimento?",
      answer:
        "Implementamos ferramentas de análise que permitem acompanhar métricas importantes como taxa de conversão, valor médio de pedido, taxa de rejeição e tempo de permanência. Com esses dados, você consegue calcular precisamente o ROI do seu investimento.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={ref} className="py-20 relative">
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
              Perguntas Frequentes
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e como podemos ajudar seu negócio a crescer.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all ${
                  openIndex === index
                    ? "bg-[#9200cf]/20 border border-[#9200cf]/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white/5 border-x border-b border-white/10 rounded-b-lg text-white/70">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
