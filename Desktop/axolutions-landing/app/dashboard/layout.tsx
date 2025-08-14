"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { LayoutDashboard, FolderKanban, FileText, LogOut, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClientComponentClient()

  // Skip authentication check on login pages
  const isAuthPage = pathname?.includes("/login-simple") || pathname?.includes("/register")

  useEffect(() => {
    async function checkAuth() {
      if (isAuthPage) {
        setIsLoading(false)
        return
      }

      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push("/dashboard/login-simple")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [isAuthPage, router, supabase])

  // Update the handleSignOut function to ensure it redirects to login-simple
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/dashboard/login-simple")
  }

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0013] to-black">
        {children}
        <Toaster />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0013] to-black">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#9200cf]/20 border-t-[#9200cf] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#9200cf]/40 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      </div>
    )
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projetos", href: "/dashboard/projects", icon: FolderKanban },
    { label: "Blog", href: "/dashboard/blog", icon: FileText },
  ]

  const sidebarVariants = {
    hidden: { x: -280 },
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0a0013] to-black text-white">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link
          href="/dashboard"
          className="text-xl font-bold bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-transparent bg-clip-text"
        >
          AXOLUTIONS
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:block md:w-72 bg-black/50 backdrop-blur-md border-r border-white/10 md:min-h-screen"
      >
        <div className="p-6 border-b border-white/10">
          <Link
            href="/dashboard"
            className="text-2xl font-bold bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-transparent bg-clip-text"
          >
            AXOLUTIONS
          </Link>
        </div>
        <div className="p-4">
          <nav className="space-y-1 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#9200cf]/20 to-[#6a00cf]/10 text-white border-l-2 border-[#9200cf]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#9200cf]" : "text-white/70"}`} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#9200cf]" />}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-16 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
          >
            <div className="p-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#9200cf]/20 to-[#6a00cf]/10 text-white border-l-2 border-[#9200cf]"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "text-[#9200cf]" : "text-white/70"}`} />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 text-[#9200cf]" />}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 md:overflow-auto">
        {children}
        <Toaster />
      </div>
    </div>
  )
}
