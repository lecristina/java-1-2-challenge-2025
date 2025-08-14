"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { createProject, updateProject } from "@/app/actions/project-actions"
import ImageUpload from "@/components/image-upload"

const projectSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
  url: z.string().url({ message: "URL inválida" }).optional().or(z.literal("")),
  github_url: z.string().url({ message: "URL do GitHub inválida" }).optional().or(z.literal("")),
  featured: z.boolean().default(false),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: {
    id: string
    title: string
    description: string
    url?: string
    github_url?: string
    featured: boolean
    thumbnail_url?: string
  }
}

export default function ProjectFormSimple({ project }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(project?.thumbnail_url || "")
  const router = useRouter()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      url: project?.url || "",
      github_url: project?.github_url || "",
      featured: project?.featured || false,
    },
  })

  function onSubmit(data: ProjectFormValues) {
    setError(null)

    startTransition(async () => {
      try {
        const formData = {
          ...data,
          thumbnail_url: thumbnailUrl,
        }

        if (project?.id) {
          await updateProject(project.id, formData)
        } else {
          await createProject(formData)
        }

        router.push("/dashboard/projects")
        router.refresh()
      } catch (err) {
        console.error("Erro ao salvar projeto:", err)
        setError("Ocorreu um erro ao salvar o projeto. Tente novamente.")
      }
    })
  }

  function handleImageUploaded(url: string) {
    setThumbnailUrl(url)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{project ? "Editar Projeto" : "Novo Projeto"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descrição do projeto" className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Projeto</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Destaque</FormLabel>
                        <div className="text-sm text-muted-foreground">Mostrar este projeto na página inicial</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <FormLabel className="block mb-2">Thumbnail</FormLabel>
                  <ImageUpload onImageUploaded={handleImageUploaded} existingImageUrl={thumbnailUrl} className="h-64" />
                </div>
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">{error}</div>}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/projects")}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
