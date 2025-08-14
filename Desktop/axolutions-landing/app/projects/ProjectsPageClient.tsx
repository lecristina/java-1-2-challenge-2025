"use client"

import { useState, useEffect } from "react"
import { ProjectsList } from "@/components/projects-list"
import type { Project } from "@/lib/supabase"
import { useTranslations } from "@/hooks/use-translations"

interface ProjectsPageClientProps {
  projects: Project[]
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { t, locale } = useTranslations()

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#b44dff] via-[#9200cf] to-[#4a0082] drop-shadow-lg tracking-tight animate-fade-in">
          {locale === "pt" ? "Nossos Projetos" : "Our Projects"}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light mb-2 animate-fade-in delay-100">
          {locale === "pt"
            ? "Conheça alguns dos projetos que desenvolvemos para nossos clientes."
            : "Discover some of the projects we've developed for our clients."}
        </p>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-[#9200cf] via-[#b44dff] to-[#4a0082] rounded-full mt-6 animate-fade-in delay-200"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9200cf]"></div>
        </div>
      ) : projects.length > 0 ? (
        <ProjectsList projects={projects} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white/70">
            {locale === "pt" ? "Nenhum projeto encontrado" : "No projects found"}
          </h3>
        </div>
      )}
    </div>
  )
}
