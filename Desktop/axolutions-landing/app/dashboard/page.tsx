"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { FolderKanban, FileText, LogOut, TrendingUp, Users, Calendar, Activity, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
  })
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!data.session) {
          // If no session, redirect to login
          router.push("/dashboard/login-simple")
          return
        }

        setUserEmail(data.session.user.email)
        setUserName(data.session.user.user_metadata?.name || "Usuário")

        // Fetch stats
        await fetchStats()
      } catch (error) {
        console.error("Error fetching user:", error)
        router.push("/dashboard/login-simple")
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [router, supabase])

  const fetchStats = async () => {
    try {
      // Get project count
      const { count: projectCount, error: projectError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })

      // Get post count
      const { count: postCount, error: postError } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })

      if (projectError) console.error("Error fetching projects:", projectError)
      if (postError) console.error("Error fetching posts:", postError)

      setStats({
        projects: projectCount || 0,
        posts: postCount || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/dashboard/login-simple")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#9200cf]/20 border-t-[#9200cf] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-[#9200cf]/40 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" description="Bem-vindo ao seu painel de controle">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9200cf] to-[#6a00cf] flex items-center justify-center text-white font-medium">
                {userName?.charAt(0) || "U"}
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">{userName}</p>
                <p className="text-xs text-white/60">{userEmail}</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </Header>

      <div className="flex-1 p-6">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          {/* Welcome Section */}
          <motion.div variants={item} className="mb-8">
            <Card className="bg-gradient-to-r from-[#9200cf]/10 to-[#6a00cf]/5 border-white/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Olá, {userName}</h2>
                    <p className="text-white/70">
                      Bem-vindo ao seu painel de controle. Aqui você pode gerenciar seus projetos e conteúdos.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] hover:from-[#a020f0] hover:to-[#7a20cf] text-white border-none"
                  >
                    <Link href="/">Visitar Site</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={item}>
            <h3 className="text-lg font-medium text-white/90 mb-4">Visão Geral</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Total de Projetos</CardTitle>
                  <FolderKanban className="h-4 w-4 text-[#9200cf]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.projects}</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/dashboard/projects" className="text-xs text-[#9200cf] hover:underline flex items-center">
                    Ver detalhes
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Total de Posts</CardTitle>
                  <FileText className="h-4 w-4 text-[#9200cf]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.posts}</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/dashboard/blog" className="text-xs text-[#9200cf] hover:underline flex items-center">
                    Ver detalhes
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Visitantes</CardTitle>
                  <Users className="h-4 w-4 text-[#9200cf]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,234</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <span className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% este mês
                  </span>
                </CardFooter>
              </Card>

              <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Atividade</CardTitle>
                  <Activity className="h-4 w-4 text-[#9200cf]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">Ativo</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <span className="text-xs text-white/60">Última atualização: {new Date().toLocaleDateString()}</span>
                </CardFooter>
              </Card>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item} className="mt-8">
            <h3 className="text-lg font-medium text-white/90 mb-4">Ações Rápidas</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/dashboard/projects/new">
                <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center mb-4">
                      <FolderKanban className="h-5 w-5 text-[#9200cf]" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Novo Projeto</h3>
                    <p className="text-sm text-white/60 flex-grow">Crie um novo projeto para seu portfólio.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/blog/new">
                <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center mb-4">
                      <FileText className="h-5 w-5 text-[#9200cf]" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Novo Post</h3>
                    <p className="text-sm text-white/60 flex-grow">Crie um novo post para o blog.</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/">
                <Card className="bg-black/30 border-white/5 hover:border-[#9200cf]/30 transition-all hover:shadow-lg hover:shadow-[#9200cf]/5 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-[#9200cf]/20 flex items-center justify-center mb-4">
                      <Calendar className="h-5 w-5 text-[#9200cf]" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Visitar Site</h3>
                    <p className="text-sm text-white/60 flex-grow">Veja como seu site está para os visitantes.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
