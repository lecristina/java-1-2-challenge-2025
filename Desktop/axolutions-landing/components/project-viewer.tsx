"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ProjectViewerProps = {
  project: any
}

export function ProjectViewer({ project }: ProjectViewerProps) {
  const [imageStates, setImageStates] = useState<Record<string, { loading: boolean; error: boolean }>>({})

  useEffect(() => {
    // Inicializar estado de imagens quando o projeto mudar
    const newImageStates: Record<string, { loading: boolean; error: boolean }> = {}

    if (project?.pages) {
      project.pages.forEach((page: any) => {
        if (page.sections) {
          page.sections.forEach((section: any) => {
            const key = `${page.id}-${section.id}`
            newImageStates[key] = { loading: true, error: false }
          })
        }
      })
    }

    setImageStates(newImageStates)

    // Log para debug
    console.log("ProjectViewer - Projeto:", project)
    if (project?.pages) {
      project.pages.forEach((page: any) => {
        console.log(`Página ${page.title}:`, page)
        if (page.sections) {
          page.sections.forEach((section: any) => {
            console.log(`Seção ${section.id} - URL:`, section.image_url)
          })
        }
      })
    }
  }, [project])

  const handleImageLoad = (pageId: string, sectionId: string) => {
    const key = `${pageId}-${sectionId}`
    setImageStates((prev) => ({
      ...prev,
      [key]: { loading: false, error: false },
    }))
  }

  const handleImageError = (pageId: string, sectionId: string, src: string) => {
    console.error(`Erro ao carregar imagem: ${src} para página ${pageId}, seção ${sectionId}`)
    const key = `${pageId}-${sectionId}`
    setImageStates((prev) => ({
      ...prev,
      [key]: { loading: false, error: true },
    }))
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg text-gray-500">Projeto não encontrado</p>
      </div>
    )
  }

  const pages = project.pages || []
  const landingPage = pages.find((p: any) => p.type === "landing") || pages[0]
  const otherPages = pages.filter((p: any) => p !== landingPage)

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Landing page em destaque */}
      {landingPage && (
        <div className="bg-[#22004a] rounded-xl border border-[#9200cf]/30 p-4 mb-8 w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{landingPage.title || "Landing page"}</h2>
          <div className="w-full max-h-[70vh] overflow-y-auto rounded-lg border border-[#9200cf]/10 bg-[#150025]">
            <ScrollArea className="w-full h-full">
              <div className="flex flex-col gap-0">
                {landingPage.sections && landingPage.sections.length > 0 ? (
                  landingPage.sections.map((section: any) => (
                    <div key={section.id} className="w-full mb-0">
                      <img
                        src={section.image_url || "/placeholder.svg"}
                        alt={landingPage.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 bg-[#150025] rounded-lg p-4">
                    <p className="text-lg text-gray-400">Nenhuma imagem para a landing page</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Outras páginas empilhadas verticalmente, mesma largura da landing */}
      {otherPages.length > 0 && (
        <div className="w-full flex flex-col gap-8">
          {otherPages.map((page: any) => (
            <div key={page.id} className="bg-[#22004a] rounded-xl border border-[#9200cf]/30 p-4 flex flex-col w-full">
              <h3 className="text-2xl font-bold text-white mb-4">{page.title}</h3>
              <div className="w-full max-h-[60vh] overflow-y-auto rounded-lg border border-[#9200cf]/10 bg-[#150025]">
                <ScrollArea className="w-full h-full">
                  <div className="flex flex-col gap-0">
                    {page.sections && page.sections.length > 0 ? (
                      page.sections.map((section: any) => (
                        <div key={section.id} className="w-full mb-0">
                          <img
                            src={section.image_url || "/placeholder.svg"}
                            alt={page.title}
                            className="w-full h-auto rounded-lg shadow"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 bg-[#150025] rounded-lg p-4">
                        <p className="text-lg text-gray-400">Nenhuma imagem para esta página</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Descrição do projeto */}
      <div className="mt-6 p-4 bg-[#1a0033] rounded-lg border border-[#9200cf]/30">
        <h3 className="text-lg font-semibold mb-2 text-white">Descrição</h3>
        <p className="text-gray-300">{project.description || "Sem descrição"}</p>
        {project.url && (
          <div className="mt-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9200cf] hover:text-[#b44dff] underline"
            >
              Visitar projeto
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
