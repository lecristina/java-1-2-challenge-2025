"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createPost, updatePost } from "@/app/actions/blog-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PostFormProps = {
  post?: any
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image_url: "/placeholder.svg?height=600&width=800",
    category: "",
    featured: false,
    status: "draft",
  })

  // Set initial form data when post changes
  useEffect(() => {
    if (post) {
      console.log("Setting initial post form data:", post)
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        image_url: post.image_url || "/placeholder.svg?height=600&width=800",
        category: post.category || "",
        featured: post.featured || false,
        status: post.status || "draft",
      })
    }
  }, [post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, status: checked ? "published" : "draft" }))
  }

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim()

    setFormData((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Form submission - isEditing:", !!post?.id)
      console.log("Form data:", formData)

      if (post?.id) {
        console.log("Updating post with ID:", post.id)
        const result = await updatePost(post.id, formData)

        if (result.error) {
          throw new Error(result.error)
        }

        toast({
          title: "Post atualizado",
          description: "O post foi atualizado com sucesso.",
        })
      } else {
        console.log("Creating new post")
        const result = await createPost(formData)

        if (result.error) {
          throw new Error(result.error)
        }

        toast({
          title: "Post criado",
          description: "O post foi criado com sucesso.",
        })
      }

      router.push("/dashboard/blog")
      router.refresh()
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao salvar o post.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    "Desenvolvimento Web",
    "Design UI/UX",
    "Mobile",
    "Tecnologia",
    "Marketing Digital",
    "Inteligência Artificial",
  ]

  const contentPlaceholder = `# Título Principal

## Subtítulo H2

Escreva o conteúdo do seu post aqui usando Markdown.

### Subtítulo H3

Você pode usar **negrito**, *itálico*, ou ***ambos***.

- Lista de itens
- Outro item
- Mais um item

1. Item numerado
2. Segundo item
3. Terceiro item

[Link para exemplo](https://exemplo.com)

> Este é um bloco de citação.

\`\`\`
// Bloco de código
const exemplo = "Olá, Markdown!";
console.log(exemplo);
\`\`\`

Código inline: \`const valor = 42;\`

![Descrição da imagem](https://exemplo.com/imagem.jpg)
`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={() => !formData.slug && generateSlug()}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={generateSlug}
              disabled={isLoading || !formData.title}
              className="mb-0.5"
            >
              Gerar
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Conteúdo (Markdown)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <div className="space-y-2 p-2">
                  <p className="font-medium">Formatação Markdown:</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>
                      <code># Título</code>, <code>## Subtítulo</code>, <code>### SubSubtítulo</code>
                    </li>
                    <li>
                      <code>**texto**</code> - <strong>negrito</strong>
                    </li>
                    <li>
                      <code>*texto*</code> - <em>itálico</em>
                    </li>
                    <li>
                      <code>[texto](url)</code> - link
                    </li>
                    <li>
                      <code>![alt](url)</code> - imagem
                    </li>
                    <li>
                      <code>- item</code> ou <code>1. item</code> - listas
                    </li>
                    <li>
                      <code>`código`</code> - código inline
                    </li>
                    <li>
                      <code>```código```</code> - bloco de código
                    </li>
                    <li>
                      <code>&gt; texto</code> - citação
                    </li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={15}
          required
          disabled={isLoading}
          placeholder={contentPlaceholder}
          className="font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="image_url">URL da Imagem</Label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
            disabled={isLoading}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-row items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label className="text-base">Destaque</Label>
            <p className="text-sm text-muted-foreground">Marque para destacar este post na página inicial.</p>
          </div>
          <Switch
            checked={formData.featured}
            onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-row items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label className="text-base">Publicar</Label>
            <p className="text-sm text-muted-foreground">Ative para publicar o post no site.</p>
          </div>
          <Switch checked={formData.status === "published"} onCheckedChange={handleStatusChange} disabled={isLoading} />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/blog")} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post?.id ? "Atualizar" : "Criar"} Post
        </Button>
      </div>
    </form>
  )
}
