"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, AlertCircle, LockKeyhole, Mail, Sparkles, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"

export default function LoginSimplePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    setMounted(true)

    // Implement particle animation for background
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.color = `#9200cf`
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > width) this.x = 0
        if (this.x < 0) this.x = width
        if (this.y > height) this.y = 0
        if (this.y < 0) this.y = height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const particleCount = Math.min(70, Math.floor((width * height) / 12000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(146, 0, 207, ${0.15 - distance / 750})`
            ctx.lineWidth = 0.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!emailRef.current || !passwordRef.current) return

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email || !password) {
      setError("Email e senha são obrigatórios")
      setIsLoading(false)
      return
    }

    try {
      console.log("Tentando fazer login com:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Erro ao fazer login:", error.message)
        setError(error.message)
        setIsLoading(false)
        return
      }

      console.log("Login bem-sucedido:", data)

      // Use window.location for a hard redirect
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error("Erro inesperado no login:", error)
      setError(error.message || "Ocorreu um erro inesperado. Tente novamente mais tarde.")
      setIsLoading(false)
    }
  }

  const inputVariants = {
    focus: { scale: 1.01, borderColor: "#9200cf", boxShadow: "0 0 0 2px rgba(146, 0, 207, 0.25)" },
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen overflow-hidden relative">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#150025]/80 to-black/90 z-0"></div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#9200cf]/10 blur-[100px] z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#9200cf]/10 blur-[100px] z-0"></div>

      {/* Content */}
      <div className="w-full flex flex-col md:flex-row z-10">
        {/* Left Panel: Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#150025] to-black p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/amethyst-flow.png')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
          </div>

          <div className="relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl font-bold">
                <span className="text-white">AXO</span>
                <span className="bg-gradient-to-r from-[#9200cf] to-[#d896ff] text-transparent bg-clip-text">
                  LUTIONS
                </span>
              </h1>
              <p className="text-white/60 mt-2">Transformando ideias em realidade digital</p>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Bem-vindo à nossa plataforma</h2>
              <p className="text-white/70 text-lg">
                Acesse o dashboard e gerencie seu conteúdo com nossa interface intuitiva e poderosa.
              </p>

              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center text-[#d896ff]">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Tecnologia de ponta</h3>
                    <p className="text-sm text-white/60">Soluções inovadoras para seu negócio</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center text-[#d896ff]">
                    <LockKeyhole size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Ambiente seguro</h3>
                    <p className="text-sm text-white/60">Proteção de dados e privacidade garantidas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} Axolutions. Todos os direitos reservados.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8 md:hidden">
              <h1 className="text-3xl font-bold">
                <span className="text-white">AXO</span>
                <span className="bg-gradient-to-r from-[#9200cf] to-[#d896ff] text-transparent bg-clip-text">
                  LUTIONS
                </span>
              </h1>
              <p className="text-white/60 mt-1">Transformando ideias em realidade digital</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Acesso ao Dashboard</h2>
                <p className="text-white/60 mt-1">Entre com suas credenciais para continuar</p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-red-200">Erro</AlertTitle>
                    <AlertDescription className="text-red-200/80">{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white/80">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-white/30" />
                    </div>
                    <motion.input
                      whileFocus="focus"
                      variants={inputVariants}
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#9200cf]/50 transition-all"
                      placeholder="seu@email.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-white/80">
                      Senha
                    </label>
                    <a href="#" className="text-xs text-[#d896ff] hover:text-[#9200cf] transition-colors">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockKeyhole className="h-5 w-5 text-white/30" />
                    </div>
                    <motion.input
                      whileFocus="focus"
                      variants={inputVariants}
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#9200cf]/50 transition-all"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(146, 0, 207, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-[#9200cf]/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Entrando...</span>
                      </>
                    ) : (
                      <>
                        <span>Entrar</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-white/50">
                Não tem uma conta?{" "}
                <Link href="#" className="text-[#d896ff] hover:text-[#9200cf] transition-colors">
                  Entre em contato
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/30 text-xs">
                © {new Date().getFullYear()} Axolutions. Todos os direitos reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
