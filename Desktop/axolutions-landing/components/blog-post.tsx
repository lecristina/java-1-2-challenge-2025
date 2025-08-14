"use client"

import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { translateMarkdown } from "@/lib/translation-service"

type BlogPostProps = {
  post: any
}

export default function BlogPost({ post }: BlogPostProps) {
  const { t, formatDate } = useTranslations()
  const { language } = useLanguage()
  const [content, setContent] = useState(post?.content || "")
  const [title, setTitle] = useState(post?.title || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    // Resetar para o conteúdo original quando o post muda
    if (post) {
      setContent(post.content || "")
      setTitle(post.title || "")
      setExcerpt(post.excerpt || "")
    }
  }, [post])

  useEffect(() => {
    // Traduzir conteúdo quando o idioma mudar para inglês
    async function translateContent() {
      if (!post || language === "pt-BR") {
        // Se o idioma for português, usar o conteúdo original
        setContent(post?.content || "")
        setTitle(post?.title || "")
        setExcerpt(post?.excerpt || "")
        return
      }

      try {
        setIsTranslating(true)

        // Traduzir título, resumo e conteúdo
        const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
          translateMarkdown(post.title, "en", "pt"),
          translateMarkdown(post.excerpt, "en", "pt"),
          translateMarkdown(post.content, "en", "pt"),
        ])

        setTitle(translatedTitle)
        setExcerpt(translatedExcerpt)
        setContent(translatedContent)
      } catch (error) {
        console.error("Erro ao traduzir conteúdo:", error)
      } finally {
        setIsTranslating(false)
      }
    }

    translateContent()
  }, [language, post])

  if (!post) return null

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-[#b44dff] hover:text-[#d896ff] mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("blog.backToBlog")}
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
            {post.view_count || 0} {t("blog.views")}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {isTranslating ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-6 w-6" />
              <span className="opacity-70">{t("blog.translating")}</span>
            </div>
          ) : (
            title
          )}
        </h1>

        {excerpt && <p className="text-xl text-white/80 mb-8 leading-relaxed">{excerpt}</p>}

        {post.image_url && (
          <div className="mb-10">
            <Image
              src={post.image_url || "/placeholder.svg"}
              alt={title}
              width={1200}
              height={630}
              className="rounded-lg w-full object-cover"
              priority
            />
          </div>
        )}
      </div>

      {isTranslating ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-[#b44dff] mb-4" />
          <p className="text-lg text-white/80">{t("blog.translatingContent")}</p>
        </div>
      ) : (
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-[#b44dff]" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-[#b44dff]" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#d896ff]" {...props} />,
              h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-5 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-white/80 leading-relaxed" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-[#b44dff] hover:text-[#d896ff] transition-colors" {...props} />
              ),
              ul: ({ node, ...props }) => <ul className="mb-4 ml-6 list-disc" {...props} />,
              ol: ({ node, ...props }) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="pl-4 border-l-4 border-[#b44dff] italic my-4" {...props} />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code className="bg-[#4a0082]/30 px-1 py-0.5 rounded text-white" {...props} />
                ) : (
                  <code className="block bg-[#4a0082]/30 p-4 rounded-lg overflow-auto text-white my-4" {...props} />
                ),
              img: ({ node, ...props }) => (
                <div className="my-6">
                  <Image
                    src={props.src || "/placeholder.svg"}
                    alt={props.alt || ""}
                    width={800}
                    height={450}
                    className="rounded-lg w-full object-cover"
                  />
                  {props.alt && <p className="text-sm text-center mt-2 text-gray-400">{props.alt}</p>}
                </div>
              ),
            }}
          >
            {content || ""}
          </ReactMarkdown>
        </article>
      )}
    </div>
  )
}
