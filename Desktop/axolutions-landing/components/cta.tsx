"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, Send, Check } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useTranslations()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and show success message
    setFormState({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/20 via-transparent to-transparent opacity-80"></div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#9200cf]/30 to-transparent blur-3xl"></div>

      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#4a0082]/20 to-transparent blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9200cf] via-[#d896ff] to-[#9200cf] opacity-40 blur-md animate-pulse"></div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#9200cf]/40 to-transparent blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-[#9200cf]/40 to-transparent blur-2xl"></div>

            {/* Main content container */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-black/90 via-[#150025]/90 to-black/80 backdrop-blur-md border border-white/10">
              <div className="text-center mb-8 md:mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#9200cf]/30 to-[#4a0082]/20 border border-[#9200cf]/40 mb-6 shadow-lg shadow-[#9200cf]/10"
                >
                  <Sparkles className="w-4 h-4 text-[#d896ff]" />
                  <span className="text-sm font-medium text-white/90">{t("cta.badge")}</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-6 relative"
                >
                  <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                    {t("cta.title")}
                  </span>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/70 max-w-2xl mx-auto text-lg"
                >
                  {t("cta.description")}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-3xl mx-auto relative"
              >
                {/* Decorative form background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9200cf]/5 to-transparent rounded-2xl"></div>

                <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-[#9200cf]/20">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9200cf] to-[#4a0082] flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{t("cta.form.success.title")}</h3>
                      <p className="text-white/70 text-center max-w-md">{t("cta.form.success.description")}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                            {t("cta.form.name")}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-[#9200cf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9200cf]/50 text-white placeholder-white/30"
                            placeholder={t("cta.form.placeholder.name")}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                            {t("cta.form.email")}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-[#9200cf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9200cf]/50 text-white placeholder-white/30"
                            placeholder={t("cta.form.placeholder.email")}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                          {t("cta.form.message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-white/5 border border-[#9200cf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9200cf]/50 text-white placeholder-white/30 resize-none"
                          placeholder={t("cta.form.placeholder.message")}
                        ></textarea>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-10 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-xl font-medium shadow-xl shadow-[#9200cf]/30 flex items-center justify-center gap-3 mx-auto relative overflow-hidden group disabled:opacity-70"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            <span className="text-lg">
                              {isSubmitting ? t("cta.form.submitting") : t("cta.form.submit")}
                            </span>
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-[#d896ff] to-[#9200cf] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                          {/* Animated shine effect */}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 shine-effect"></span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-[#150025]/20 to-black/40 opacity-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
