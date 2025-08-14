"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createProject, updateProject } from "@/app/actions/project-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Upload, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { uploadProjectImage } from "@/lib/upload-project-image"

type ProjectFormProps = {
  initialData?: any
  isEditing?: boolean
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // Estados básicos do formulário
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [url, setUrl] = useState(initialData?.url || "")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [status, setStatus] = useState(initialData?.status || "draft")
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "")

  // Estado para páginas
  const [pages, setPages] = useState<
    {
      id?: string
      title: string
      type: string
      images: { url: string; isUploading?: boolean }[]
    }[]
  >([
    {
      title: "Página Principal",
      type: "landing",
      images: [],
    },
  ])

  // Carregar dados iniciais se estiver editando
  useEffect(() => {
    if (initialData?.pages && initialData.pages.length > 0) {
      setPages(
        initialData.pages.map((page: any) => ({
          id: page.id,
          title: page.title,
          type: page.type,
          images: page.sections
            ? page.sections.map((section: any) => ({
                url: section.image_url,
                isUploading: false,
              }))
            : [],
        })),
      )
    }
  }, [initialData])

  // Função para adicionar nova página
  const addPage = () => {
    setPages((prevPages) => {
      const newPages = [
        ...prevPages,
        {
          title: `Nova Página ${prevPages.length + 1}`,
          type: "custom",
          images: [],
        },
      ]
      setActiveTab(`page-${newPages.length - 1}`)
      return newPages
    })
  }

  // Função para remover página
  const removePage = (index: number) => {
    if (pages.length <= 1) {
      toast({
        title: "Erro",
        description: "É necessário ter pelo menos uma página.",
        variant: "destructive",
      })
      return
    }

    const newPages = [...pages]
    newPages.splice(index, 1)
    setPages(newPages)

    // Mudar para a primeira aba se a atual foi removida
    if (activeTab === `page-${index}`) {
      setActiveTab("details")
    }
  }

  // Função para remover imagem individual
  const removeImage = (pageIndex: number, imgIdx: number) => {
    setPages((prevPages) => {
      const newPages = [...prevPages]
      newPages[pageIndex].images.splice(imgIdx, 1)
      return newPages
    })
  }

  // Função para upload de múltiplas imagens
  const handleImagesChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    pageIndex: number,
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      isUploading: true,
      file,
    }))

    // Atualiza estado para mostrar previews
    const newPages = [...pages]
    newPages[pageIndex].images.push(...newImages)
    setPages(newPages)

    // Faz upload de cada imagem
    for (let i = 0; i < newImages.length; i++) {
      const file = newImages[i].file
      const result = await uploadProjectImage(file)
      const updatedPages = [...newPages]
      if (result.url) {
        updatedPages[pageIndex].images[
          newPages[pageIndex].images.length - newImages.length + i
        ] = { url: result.url, isUploading: false }
      } else {
        updatedPages[pageIndex].images[
          newPages[pageIndex].images.length - newImages.length + i
        ] = { url: "", isUploading: false }
      }
      setPages(updatedPages)
    }
  }

  // Função para upload da imagem de capa
  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await uploadProjectImage(file)
    if (result.url) setImageUrl(result.url)
  }

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submit')

    // Validação básica
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "O título do projeto é obrigatório.",
        variant: "destructive",
      })
      return
    }

    // Validar se todas as páginas têm título
    for (const page of pages) {
      if (!page.title.trim()) {
        toast({
          title: "Erro",
          description: "Todas as páginas precisam ter um título.",
          variant: "destructive",
        })
        return
      }
    }

    // Verificar se há pelo menos uma imagem
    let hasImages = false
    for (const page of pages) {
      if (page.images.some((img) => img.url && !img.url.startsWith("blob:"))) {
        hasImages = true
        break
      }
    }

    if (!hasImages) {
      toast({
        title: "Aviso",
        description: "Você não adicionou nenhuma imagem ao projeto. Deseja continuar mesmo assim?",
        variant: "default",
        action: (
          <Button
            onClick={() => {
              toast.dismiss()
              submitForm()
            }}
            variant="outline"
            className="bg-[#9200cf] hover:bg-[#7b00af] text-white"
          >
            Continuar
          </Button>
        ),
      })
      return
    }

    await submitForm()
  }

  const submitForm = async () => {
    setIsLoading(true)

    try {
      console.log("Iniciando " + (isEditing ? "atualização" : "criação") + " de projeto")

      // Dados do projeto para envio
      const projectData: any = {
        title,
        description,
        url,
        featured,
        status,
        image_url: imageUrl,
        pages: pages.map((page) => ({
          id: page.id,
          title: page.title,
          type: page.type,
          sections: page.images
            .filter((img) => img.url && !img.url.startsWith("blob:"))
            .map((img) => ({
              image_url: img.url,
            })),
        })),
      }

      console.log("Enviando dados para " + (isEditing ? "atualização" : "criação") + ":", projectData)

      // Chamar a função de criação ou atualização
      const result = isEditing ? await updateProject(initialData.id, projectData) : await createProject(projectData)

      if (result.error) {
        throw result.error
      }

      console.log("Projeto " + (isEditing ? "atualizado" : "criado") + " com sucesso:", result.project)

      toast({
        title: isEditing ? "Projeto atualizado" : "Projeto criado",
        description: isEditing ? "O projeto foi atualizado com sucesso." : "O projeto foi criado com sucesso.",
      })

      // Redirecionar após sucesso
      router.push("/dashboard/projects")
      router.refresh()
    } catch (error: any) {
      console.error("Erro ao " + (isEditing ? "atualizar" : "criar") + " projeto:", error, error?.message)
      toast({
        title: "Erro",
        description: error?.message || JSON.stringify(error) || "Ocorreu um erro ao " + (isEditing ? "atualizar" : "criar") + " o projeto.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para atualizar título da página
  const updatePageTitle = (index: number, newTitle: string) => {
    const newPages = [...pages]
    newPages[index].title = newTitle
    setPages(newPages)
  }

  // Função para atualizar tipo da página
  const updatePageType = (index: number, newType: string) => {
    const newPages = [...pages]
    newPages[index].type = newType
    setPages(newPages)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="details" className="mr-2 mb-2">
            Detalhes do Projeto
          </TabsTrigger>
          {pages.map((page, index) => (
            <TabsTrigger key={`page-tab-${index}`} value={`page-${index}`} className="mr-2 mb-2">
              {page.title || `Página ${index + 1}`}
            </TabsTrigger>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPage}
            className="ml-2 flex items-center gap-1 border-dashed border-[#9200cf]/30 hover:border-[#9200cf] hover:bg-[#9200cf]/10"
          >
            <Plus size={12} />
            Nova Página
          </Button>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
              className="border-[#9200cf]/30 focus:border-[#9200cf] focus:ring-[#9200cf]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isLoading}
              className="resize-none border-[#9200cf]/30 focus:border-[#9200cf] focus:ring-[#9200cf]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL do Projeto</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="border-[#9200cf]/30 focus:border-[#9200cf] focus:ring-[#9200cf]"
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem de Capa</Label>
            {imageUrl && (
              <div className="mb-2">
                <img src={imageUrl} alt="Capa" className="w-full max-w-xs rounded-lg border border-[#9200cf]/30" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleCoverImageChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-row items-center justify-between p-4 border border-[#9200cf]/30 rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">Destaque</Label>
                <p className="text-sm text-muted-foreground">Marque para destacar este projeto na página inicial.</p>
              </div>
              <Switch checked={featured} onCheckedChange={setFeatured} disabled={isLoading} />
            </div>

            <div className="flex flex-row items-center justify-between p-4 border border-[#9200cf]/30 rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">Publicar</Label>
                <p className="text-sm text-muted-foreground">Ative para publicar o projeto no site.</p>
              </div>
              <Switch
                checked={status === "published"}
                onCheckedChange={(checked) => setStatus(checked ? "published" : "draft")}
                disabled={isLoading}
              />
            </div>
          </div>
        </TabsContent>

        {pages.map((page, pageIndex) => (
          <TabsContent key={`page-content-${pageIndex}`} value={`page-${pageIndex}`} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-1/3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`page-title-${pageIndex}`}>Título da Página</Label>
                  <Input
                    id={`page-title-${pageIndex}`}
                    value={page.title}
                    onChange={(e) => updatePageTitle(pageIndex, e.target.value)}
                    disabled={isLoading}
                    className="border-[#9200cf]/30 focus:border-[#9200cf] focus:ring-[#9200cf]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`page-type-${pageIndex}`}>Tipo da Página</Label>
                  <select
                    id={`page-type-${pageIndex}`}
                    value={page.type}
                    onChange={(e) => updatePageType(pageIndex, e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-md border border-[#9200cf]/30 bg-background px-3 py-2 text-sm focus:border-[#9200cf] focus:ring-[#9200cf]"
                  >
                    <option value="landing">Landing Page</option>
                    <option value="about">Sobre</option>
                    <option value="blog">Blog</option>
                    <option value="system">Sistema</option>
                    <option value="custom">Personalizada</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePage(pageIndex)}
                    className="text-red-500 border-red-500 hover:bg-red-500/10"
                    disabled={pages.length <= 1 || isLoading}
                  >
                    Remover Página
                  </Button>
                </div>
              </div>
              <div className="lg:w-2/3">
                <div className="p-4 border border-[#9200cf]/30 rounded-lg bg-[#150025]">
                  <h3 className="text-lg font-semibold mb-4">Imagens da Página</h3>
                  <div className="flex flex-col gap-0 w-full">
                    {page.images.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[#9200cf]/30 rounded-lg p-4">
                        <p className="text-gray-400 mb-2 text-center">
                          Nenhuma imagem adicionada. Faça upload das imagens para montar o print da página.
                        </p>
                      </div>
                    )}
                    {page.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="relative w-full min-h-[200px]">
                        {/* Botão de remover imagem */}
                        <button
                          type="button"
                          onClick={() => removeImage(pageIndex, imgIdx)}
                          className="absolute top-2 right-2 z-20 bg-black/60 rounded-full p-1 hover:bg-red-600 transition-colors"
                          title="Remover imagem"
                          style={{ lineHeight: 0 }}
                        >
                          <X size={18} className="text-white" />
                        </button>
                        {img.isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                          </div>
                        )}
                        {img.url && (
                          <Image
                            src={img.url}
                            alt={`Imagem ${imgIdx + 1}`}
                            width={1200}
                            height={800}
                            className="w-full object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <input
                    id={`page-images-${pageIndex}`}
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-4"
                    onChange={(e) => handleImagesChange(e, pageIndex)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/projects")}
          disabled={isLoading}
          className="border-[#9200cf]/30 text-white hover:bg-[#9200cf]/10"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#9200cf] hover:bg-[#7b00af] text-white font-medium px-8 py-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : isEditing ? (
            "Atualizar Projeto"
          ) : (
            "Criar Projeto"
          )}
        </Button>
      </div>
    </form>
  )
}
