"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Users, Target, TrendingUp, Award, CheckCircle, Clock } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

// Importando o componente de serviços da página principal
import Services from "@/components/services"

export default function AboutClientPage() {
  const { t } = useTranslations()
  const [activeTab, setActiveTab] = useState("historia")
  const tabsRef = useRef<HTMLDivElement>(null)
  const [isTabsSticky, setIsTabsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsPosition = tabsRef.current.getBoundingClientRect().top
        setIsTabsSticky(tabsPosition <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tabs = [
    { id: "historia", label: t("about.tabs.history") },
    { id: "missao", label: t("about.tabs.mission") },
    { id: "servicos", label: t("about.tabs.services") },
    { id: "impacto", label: t("about.tabs.impact") },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#9200cf]/10 via-transparent to-transparent opacity-70"></div>

        {/* Static gradient */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#9200cf]/10 to-transparent blur-[100px] opacity-50"></div>

        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{t("about.back.home")}</span>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                {t("about.title")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl">{t("about.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Tab navigation */}
      <div
        ref={tabsRef}
        className={`bg-black/80 backdrop-blur-lg z-30 transition-all duration-300 w-full ${
          isTabsSticky ? "sticky top-0 shadow-lg shadow-[#9200cf]/10" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar py-4 gap-2 sm:gap-4 justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white font-medium"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Tab: Our History */}
        {activeTab === "historia" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                {t("about.history.title")}
              </span>
            </h2>

            <div className="relative border-l-2 border-[#9200cf]/30 pl-8 pb-8">
              {/* Timeline items */}
              <div className="mb-12">
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-[#9200cf] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t("about.history.start")}</h3>
                <p className="text-white/70 mb-4">{t("about.history.start.description")}</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Users className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{t("about.history.team")}</h4>
                    <p className="text-white/70">{t("about.history.team.description")}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Target className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{t("about.history.projects")}</h4>
                    <p className="text-white/70">{t("about.history.projects.description")}</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-[#9200cf] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t("about.history.growth")}</h3>
                <p className="text-white/70 mb-4">{t("about.history.growth.description")}</p>
                <div className="bg-gradient-to-r from-[#9200cf]/10 to-transparent p-6 rounded-xl border border-[#9200cf]/20 mt-6">
                  <h4 className="text-xl font-semibold mb-2">{t("about.history.expansion")}</h4>
                  <p className="text-white/70">{t("about.history.expansion.description")}</p>
                </div>
              </div>

              <div>
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-[#9200cf] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t("about.history.consolidation")}</h3>
                <p className="text-white/70 mb-4">{t("about.history.consolidation.description")}</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Award className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{t("about.history.recognition")}</h4>
                    <p className="text-white/70">{t("about.history.recognition.description")}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <TrendingUp className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{t("about.history.continuous")}</h4>
                    <p className="text-white/70">{t("about.history.continuous.description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: Mission & Vision */}
        {activeTab === "missao" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                {t("about.mission.title")}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#9200cf]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#9200cf]/5 rounded-full blur-3xl"></div>

                <h3 className="text-2xl font-bold mb-6 relative">
                  {t("about.mission.our")}
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#9200cf] to-transparent"></div>
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
                  {t("about.mission.description1")}
                </p>

                <p className="text-white/80 text-lg leading-relaxed relative z-10">{t("about.mission.description2")}</p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9200cf]/80 via-[#9200cf]/20 to-transparent"></div>
              </div>

              <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#9200cf]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#9200cf]/5 rounded-full blur-3xl"></div>

                <h3 className="text-2xl font-bold mb-6 relative">
                  {t("about.vision.our")}
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#9200cf] to-transparent"></div>
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
                  {t("about.vision.description1")}
                </p>

                <p className="text-white/80 text-lg leading-relaxed relative z-10">{t("about.vision.description2")}</p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9200cf]/80 via-[#9200cf]/20 to-transparent"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9200cf]/5 rounded-full blur-3xl"></div>

              <h3 className="text-2xl font-bold mb-6 relative">
                {t("about.values.our")}
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#9200cf] to-transparent"></div>
              </h3>

              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold mb-3 text-[#d896ff]">{t("about.values.innovation")}</h4>
                  <p className="text-white/70">{t("about.values.innovation.description")}</p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold mb-3 text-[#d896ff]">{t("about.values.excellence")}</h4>
                  <p className="text-white/70">{t("about.values.excellence.description")}</p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold mb-3 text-[#d896ff]">{t("about.values.transparency")}</h4>
                  <p className="text-white/70">{t("about.values.transparency.description")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: Our Services */}
        {activeTab === "servicos" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Services />
          </motion.div>
        )}

        {/* Tab: Our Impact */}
        {activeTab === "impacto" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                {t("about.impact.title")}
              </span>
            </h2>

            <p className="text-white/80 text-lg mb-12">{t("about.impact.description")}</p>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">{t("about.impact.results")}</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#9200cf]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{t("about.impact.productivity")}</h4>
                      <p className="text-white/70">{t("about.impact.productivity.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#9200cf]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{t("about.impact.cost")}</h4>
                      <p className="text-white/70">{t("about.impact.cost.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#9200cf]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{t("about.impact.conversion")}</h4>
                      <p className="text-white/70">{t("about.impact.conversion.description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#150025] to-black p-6 sm:p-8 rounded-2xl border border-[#9200cf]/20">
                <h3 className="text-2xl font-bold mb-4 sm:mb-6 text-white">{t("about.impact.numbers")}</h3>
                <p className="text-white/80 text-base sm:text-lg mb-6">{t("about.impact.numbers.description")}</p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">350+</div>
                    <p className="text-white/70 text-sm sm:text-base">{t("about.impact.projects")}</p>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">98%</div>
                    <p className="text-white/70 text-sm sm:text-base">{t("about.impact.satisfaction")}</p>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">25+</div>
                    <p className="text-white/70 text-sm sm:text-base">{t("about.impact.specialists")}</p>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">4+</div>
                    <p className="text-white/70 text-sm sm:text-base">{t("about.impact.experience")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 mt-8">
              <h3 className="text-2xl font-bold mb-6 text-white">{t("about.impact.development")}</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{t("about.impact.landing")}</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>{t("about.impact.landing.time")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{t("about.impact.websites")}</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>{t("about.impact.websites.time")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{t("about.impact.ecommerce")}</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>{t("about.impact.ecommerce.time")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{t("about.impact.systems")}</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>{t("about.impact.systems.time")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0010] to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                {t("about.cta.title")}
              </span>
            </h2>

            <p className="text-white/70 mb-10 max-w-2xl mx-auto">{t("about.cta.description")}</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={`https://wa.me/11983207820?text=${encodeURIComponent(t("header.whatsapp.message"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-xl font-medium shadow-xl shadow-[#9200cf]/30 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">{t("about.cta.contact")}</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#d896ff] to-[#9200cf] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
              <Link
                href="/projects"
                className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-[#333333] to-[#4a4a4a] text-white font-medium hover:bg-gradient-to-r hover:from-[#9200cf] hover:to-[#6a00cf] hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-[#9200cf] group-hover:text-white transition-colors">
                  {t("about.cta.projects")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
