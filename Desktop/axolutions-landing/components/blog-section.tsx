"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import WhatsAppButton from "./whatsapp-button"
import { useTranslations } from "@/hooks/use-translations"

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { t, formatDate } = useTranslations()

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      setError(null)

      try {
        // Modificar a consulta para não usar a relação profiles
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(3)

        if (error) {
          console.error("Erro ao buscar posts:", error.message)
          setError(error.message)
        } else {
          setPosts(data || [])
        }
      } catch (err) {
        console.error("Erro ao buscar posts:", err)
        setError("Falha ao carregar posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section id="blog" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold mb-6 relative"
          >
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("blog.title")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            {t("blog.description")}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9200cf]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-white/70 mb-4">{t("blog.error")}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#9200cf]/20 text-white rounded-md hover:bg-[#9200cf]/30 transition-colors"
            >
              {t("blog.retry")}
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70">{t("blog.empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-[#150025] border border-[#9200cf]/20 rounded-xl overflow-hidden group hover:border-[#9200cf]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9200cf]/10"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image_url || "/placeholder.svg?height=600&width=800"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150025] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-[#9200cf]/80 text-white text-xs rounded-full backdrop-blur-sm">
                      {post.category || t("blog.category.general")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#9200cf] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      {t("blog.readMore")} <ArrowRight size={16} />
                    </Link>
                    <span className="text-white/60 text-xs">
                      {formatDate(post.created_at, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add the WhatsApp button next to the "Ver todos os artigos" link */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all group"
          >
            <span>{t("blog.viewAll")}</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <WhatsAppButton variant="outline" text={t("blog.questions")} href="#contact" />
        </div>
      </div>
    </section>
  )
}
