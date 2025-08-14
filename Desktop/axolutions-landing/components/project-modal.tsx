"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { ProjectViewer } from "@/components/project-viewer"
import type { Project } from "@/lib/supabase"

type ProjectModalProps = {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Log para debug
  console.log("ProjectModal - Projeto recebido:", project)
  console.log("ProjectModal - Páginas:", project.pages?.length)

  if (project.pages && project.pages.length > 0) {
    console.log("ProjectModal - Primeira página:", project.pages[0].title)
    console.log("ProjectModal - Seções da primeira página:", project.pages[0].sections?.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[99vw] max-h-[98vh] overflow-y-auto bg-gradient-to-br from-[#1a0033] via-[#22004a] to-[#2d0066] border-2 border-[#b44dff]/40 shadow-2xl shadow-[#9200cf]/30 p-0 rounded-2xl animate-fade-in">
        {/* Imagem de capa grande no topo */}
        {project.image_url && (
          <div className="w-full bg-[#1a0033]/80 flex justify-center items-center p-0 md:p-8 rounded-t-2xl border-b-2 border-[#b44dff]/30">
            <img
              src={project.image_url}
              alt="Capa do projeto"
              className="w-full max-h-[340px] object-cover rounded-t-2xl shadow-xl border-b-4 border-[#b44dff]/30 animate-fade-in"
              style={{ objectPosition: 'center' }}
            />
          </div>
        )}
        <DialogHeader className="flex flex-col items-center justify-center gap-2 pt-8 pb-0">
          <DialogTitle className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b44dff] via-[#9200cf] to-[#4a0082] text-center tracking-tight drop-shadow-lg animate-fade-in">
            {project.title}
          </DialogTitle>
          {project.url && (
            <Button variant="outline" size="sm" asChild className="gap-1 border-[#b44dff]/40 hover:bg-[#b44dff]/10 mt-4 animate-fade-in delay-100">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Visitar Site
              </a>
            </Button>
          )}
        </DialogHeader>
        <div className="w-full px-2 md:px-12 pb-12 animate-fade-in delay-200">
          <ProjectViewer project={project} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
