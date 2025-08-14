"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Users, Target, TrendingUp, Award, CheckCircle, Clock } from "lucide-react"

// Importando o componente de serviços da página principal
import Services from "@/components/services"

export default function SobreClientPage() {
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
    { id: "historia", label: "Nossa História" },
    { id: "missao", label: "Missão & Visão" },
    { id: "servicos", label: "Nossos Serviços" },
    { id: "impacto", label: "Nosso Impacto" },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero da página Sobre */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#9200cf]/10 via-transparent to-transparent opacity-70"></div>

        {/* Gradiente estático */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#9200cf]/10 to-transparent blur-[100px] opacity-50"></div>

        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar para Home</span>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                Sobre a Axolutions
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl">
              Somos a startup líder em desenvolvimento de softwares inovadores, construímos uma reputação sólida pela
              excelência dos nossos sistemas e compromisso com resultados.
            </p>
          </div>
        </div>
      </section>

      {/* Navegação por tabs */}
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

      {/* Conteúdo das tabs */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Tab: Nossa História */}
        {activeTab === "historia" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                Nossa História
              </span>
            </h2>

            <div className="relative border-l-2 border-[#9200cf]/30 pl-8 pb-8">
              {/* Timeline items */}
              <div className="mb-12">
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-[#9200cf] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">2021: O início da jornada</h3>
                <p className="text-white/70 mb-4">
                  A Axolutions começou como um grupo de desenvolvedores apaixonados por tecnologia que acreditavam que o
                  desenvolvimento web poderia ser mais eficiente, mais rápido e mais orientado a resultados.
                  Inicialmente focados em projetos freelance, começamos a construir nossa reputação entregando soluções
                  de alta qualidade.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Users className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Formação da Equipe</h4>
                    <p className="text-white/70">
                      Reunimos um time de talentos excepcionais com habilidades complementares em desenvolvimento,
                      design e estratégia de negócios.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Target className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Primeiros Projetos</h4>
                    <p className="text-white/70">
                      Começamos com projetos de e-commerce e landing pages de alta conversão, estabelecendo nossa
                      reputação por qualidade e resultados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-[#9200cf] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">2022: Crescimento e Expansão</h3>
                <p className="text-white/70 mb-4">
                  Com o sucesso dos primeiros projetos, expandimos nossa atuação para desenvolvimento de aplicações web
                  complexas, sistemas de gestão e plataformas digitais inovadoras. Nossa equipe cresceu e começamos a
                  atender clientes de diferentes segmentos.
                </p>
                <div className="bg-gradient-to-r from-[#9200cf]/10 to-transparent p-6 rounded-xl border border-[#9200cf]/20 mt-6">
                  <h4 className="text-xl font-semibold mb-2">Expansão de Serviços</h4>
                  <p className="text-white/70">
                    Ampliamos nosso portfólio para incluir desenvolvimento de sistemas ERP, CRM e automações
                    personalizadas, atendendo às necessidades crescentes de nossos clientes.
                  </p>
                </div>
              </div>

              <div>
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-[#9200cf] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">2023: Consolidação e Reconhecimento</h3>
                <p className="text-white/70 mb-4">
                  Fundamos oficialmente a Axolutions como empresa, consolidando nossa presença no mercado. Hoje, somos
                  reconhecidos pela nossa capacidade de entregar soluções tecnológicas que não apenas atendem, mas
                  superam as expectativas dos nossos clientes, sempre com foco em performance, segurança e experiência
                  do usuário.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Award className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Reconhecimento</h4>
                    <p className="text-white/70">
                      Conquistamos reconhecimento no mercado por nossas soluções inovadoras e resultados excepcionais
                      para nossos clientes.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <TrendingUp className="w-8 h-8 text-[#9200cf] mb-4" />
                    <h4 className="text-xl font-semibold mb-2">Crescimento Contínuo</h4>
                    <p className="text-white/70">
                      Continuamos a crescer, expandindo nossa equipe e portfólio de serviços para atender às demandas do
                      mercado em constante evolução.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: Missão & Visão */}
        {activeTab === "missao" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                Missão & Visão
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#9200cf]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#9200cf]/5 rounded-full blur-3xl"></div>

                <h3 className="text-2xl font-bold mb-6 relative">
                  Nossa Missão
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#9200cf] to-transparent"></div>
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
                  Ajudar empresas de todos os portes com soluções tecnológicas que otimizam a eficiência operacional e
                  aprimoram a gestão de recursos.
                </p>

                <p className="text-white/80 text-lg leading-relaxed relative z-10">
                  Transformamos ideias em soluções digitais inovadoras que impulsionam o crescimento dos negócios de
                  nossos clientes, sempre com foco em qualidade, performance e resultados mensuráveis.
                </p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9200cf]/80 via-[#9200cf]/20 to-transparent"></div>
              </div>

              <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#9200cf]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#9200cf]/5 rounded-full blur-3xl"></div>

                <h3 className="text-2xl font-bold mb-6 relative">
                  Nossa Visão
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#9200cf] to-transparent"></div>
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
                  Ser reconhecida como referência em desenvolvimento de soluções tecnológicas inovadoras e de alta
                  performance, contribuindo para a transformação digital de empresas em todo o Brasil.
                </p>

                <p className="text-white/80 text-lg leading-relaxed relative z-10">
                  Buscamos constantemente a excelência técnica e a satisfação dos nossos clientes, estabelecendo
                  parcerias duradouras baseadas em confiança e resultados.
                </p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9200cf]/80 via-[#9200cf]/20 to-transparent"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9200cf]/5 rounded-full blur-3xl"></div>

              <h3 className="text-2xl font-bold mb-6 relative">
                Nossos Valores
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#9200cf] to-transparent"></div>
              </h3>

              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold mb-3 text-[#d896ff]">Inovação</h4>
                  <p className="text-white/70">
                    Buscamos constantemente novas tecnologias e abordagens para oferecer soluções inovadoras que tragam
                    vantagem competitiva aos nossos clientes.
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold mb-3 text-[#d896ff]">Excelência</h4>
                  <p className="text-white/70">
                    Comprometemo-nos com os mais altos padrões de qualidade em tudo o que fazemos, desde o código que
                    escrevemos até o atendimento ao cliente.
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold mb-3 text-[#d896ff]">Transparência</h4>
                  <p className="text-white/70">
                    Mantemos uma comunicação clara e honesta com nossos clientes, parceiros e colaboradores, construindo
                    relações baseadas em confiança.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: Nossos Serviços */}
        {activeTab === "servicos" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                Nossos Serviços
              </span>
            </h2>

            <p className="text-white/70 max-w-3xl mx-auto text-center text-lg mb-12">
              Oferecemos uma gama completa de serviços de altíssima qualidade, desde consultoria estratégica até
              desenvolvimento, implementação e suporte contínuo.
            </p>

            {/* Aqui estamos reutilizando o componente Services da página principal */}
            <Services />
          </motion.div>
        )}

        {/* Tab: Nosso Impacto */}
        {activeTab === "impacto" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
                Nosso Impacto
              </span>
            </h2>

            <p className="text-white/80 text-lg mb-12">
              Ao longo dos anos, temos ajudado empresas de diversos segmentos a transformar seus negócios através da
              tecnologia. Nosso impacto vai além do desenvolvimento de software - criamos soluções que geram resultados
              reais e mensuráveis.
            </p>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">Resultados que Entregamos</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#9200cf]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Aumento de Produtividade</h4>
                      <p className="text-white/70">
                        Nossas soluções de automação e sistemas integrados aumentam a produtividade das equipes em até
                        40%, reduzindo tarefas manuais e eliminando processos redundantes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#9200cf]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Redução de Custos</h4>
                      <p className="text-white/70">
                        Clientes relatam economia de até 30% em custos operacionais após a implementação de nossas
                        soluções de gestão e automação de processos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#9200cf]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Aumento de Conversão</h4>
                      <p className="text-white/70">
                        Nossas landing pages e sites otimizados para conversão apresentam taxas de conversão até 3x
                        maiores que a média do mercado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#150025] to-black p-6 sm:p-8 rounded-2xl border border-[#9200cf]/20">
                <h3 className="text-2xl font-bold mb-4 sm:mb-6 text-white">Nossos Números</h3>
                <p className="text-white/80 text-base sm:text-lg mb-6">
                  Resultados que comprovam nossa excelência e compromisso com a qualidade.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">350+</div>
                    <p className="text-white/70 text-sm sm:text-base">Projetos Concluídos</p>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">98%</div>
                    <p className="text-white/70 text-sm sm:text-base">Satisfação dos Clientes</p>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">25+</div>
                    <p className="text-white/70 text-sm sm:text-base">Especialistas</p>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-[#9200cf] mb-1 sm:mb-2">4+</div>
                    <p className="text-white/70 text-sm sm:text-base">Anos de Experiência</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#150025] to-black p-8 rounded-2xl border border-[#9200cf]/20 mt-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Tempo Médio de Desenvolvimento</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">Landing Pages</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>2 dias</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">Sites Institucionais</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>5 dias</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">E-commerce</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>10 dias</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9200cf]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">Sistemas Personalizados</h4>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] h-full rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/60 mt-1">
                      <span>15 a 30 dias</span>
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
                Vamos transformar suas ideias em realidade
              </span>
            </h2>

            <p className="text-white/70 mb-10 max-w-2xl mx-auto">
              Entre em contato conosco hoje mesmo e descubra como podemos ajudar sua empresa a alcançar novos patamares
              com soluções tecnológicas de ponta.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://wa.me/11983207820?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Axolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-xl font-medium shadow-xl shadow-[#9200cf]/30 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">Fale Conosco</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#d896ff] to-[#9200cf] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
              <Link
                href="/projects"
                className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-[#333333] to-[#4a4a4a] text-white font-medium hover:bg-gradient-to-r hover:from-[#9200cf] hover:to-[#6a00cf] hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-[#9200cf] group-hover:text-white transition-colors">Conheça Nossos Projetos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
