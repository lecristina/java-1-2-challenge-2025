import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type BlogPostProps = {
  post: any
}

export default function BlogPost({ post }: BlogPostProps) {
  // Função para processar o conteúdo e renderizar subtítulos e imagens
  const renderContent = (content: string) => {
    if (!content) return null

    // Dividir o conteúdo por linhas
    const lines = content.split("\n")

    return lines.map((line, index) => {
      // Verificar se é um subtítulo (começa com ## ou ###)
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-[#b44dff]">
            {line.substring(3)}
          </h2>
        )
      }

      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-[#d896ff]">
            {line.substring(4)}
          </h3>
        )
      }

      // Verificar se é uma imagem (formato: ![alt](url))
      const imageRegex = /!\[(.*?)\]$$(.*?)$$/g
      const imageMatch = imageRegex.exec(line)

      if (imageMatch) {
        const alt = imageMatch[1]
        const src = imageMatch[2]
        return (
          <div key={index} className="my-6">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={800}
              height={450}
              className="rounded-lg w-full object-cover"
            />
            {alt && alt !== "" && <p className="text-sm text-center mt-2 text-gray-400">{alt}</p>}
          </div>
        )
      }

      // Verificar se é uma lista (começa com - ou *)
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={index} className="ml-6 mb-2">
            {line.trim().substring(2)}
          </li>
        )
      }

      // Verificar se é um parágrafo vazio
      if (line.trim() === "") {
        return <div key={index} className="h-4"></div>
      }

      // Parágrafo normal
      return (
        <p key={index} className="mb-4 text-white/80 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-[#b44dff] hover:text-[#d896ff] mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para o blog
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.category && (
            <span className="px-3 py-1 bg-[#4a0082]/30 text-[#d896ff] text-sm rounded-full">{post.category}</span>
          )}
          <span className="px-3 py-1 bg-[#4a0082]/30 text-white/70 text-sm rounded-full">
            {formatDate(post.created_at)}
          </span>
          <span className="px-3 py-1 bg-[#4a0082]/30 text-white/70 text-sm rounded-full">
            {post.view_count || 0} visualizações
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

        {post.excerpt && <p className="text-xl text-white/80 mb-8 leading-relaxed">{post.excerpt}</p>}

        {post.image_url && (
          <div className="mb-10">
            <Image
              src={post.image_url || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={630}
              className="rounded-lg w-full object-cover"
              priority
            />
          </div>
        )}
      </div>

      <article className="prose prose-invert prose-lg max-w-none">{renderContent(post.content)}</article>
    </div>
  )
}
