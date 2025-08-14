"use client"

import { useState } from "react"
import { ProjectModal } from "@/components/project-modal"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { getProjectById } from "@/app/actions/project-actions"

type ProjectsListProps = {
  projects: any[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingProject, setLoadingProject] = useState(false)

  const handleOpenProject = async (project: any) => {
    setLoadingProject(true)
    try {
      const { data: fullProject } = await getProjectById(project.id)
      setSelectedProject(fullProject || project)
      setIsModalOpen(true)
    } finally {
      setLoadingProject(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">Nenhum projeto encontrado</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          // Usar a imagem de capa se existir, senão a primeira imagem da primeira página, senão placeholder
          const thumbnailUrl = project.image_url
            || (project.pages && project.pages[0] && project.pages[0].sections && project.pages[0].sections[0] && project.pages[0].sections[0].image_url)
            || "/abstract-geometric-shapes.png"

          console.log(`Projeto ${project.title} - Thumbnail URL:`, thumbnailUrl)

          return (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg border border-[#9200cf]/30 bg-[#1a0033] transition-all hover:shadow-lg"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    console.error("Erro ao carregar thumbnail:", thumbnailUrl)
                    ;(e.target as HTMLImageElement).src = "/abstract-geometric-shapes.png"
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white/20"
                    onClick={() => handleOpenProject(project)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                {project.featured && (
                  <div className="mt-2">
                    <span className="inline-block bg-[#9200cf]/20 text-[#9200cf] text-xs px-2 py-1 rounded">
                      Destaque
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}
