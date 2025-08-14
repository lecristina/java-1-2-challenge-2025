"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Search, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { useTranslations } from "@/hooks/use-translations"

export default function BlogList({ posts: initialPosts = [] }) {
  const { t, formatDate } = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(!initialPosts.length)
  const [error, setError] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)

  // Buscar posts do Supabase apenas se não houver posts iniciais
  useEffect(() => {
    async function fetchPosts() {
      if (initialPosts && initialPosts.length > 0) {
        setPosts(initialPosts)
        setFilteredPosts(initialPosts)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Erro ao buscar posts:", error)
          setError(error.message)
        } else {
          setPosts(data || [])
          setFilteredPosts(data || [])
        }
      } catch (err: any) {
        console.error("Erro ao buscar posts:", err)
        setError(err.message || t("blog.error"))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [initialPosts, t])

  // Filtrar posts quando a busca mudar
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query),
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchQuery, posts])

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex justify-end"
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/0 to-[#9200cf]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative">
            <input
              type="text"
              placeholder={t("blog.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-3 pl-10 bg-[#150025] border border-[#9200cf]/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#9200cf]/50 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9200cf]" size={16} />
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#9200cf]/20 border-t-[#9200cf] rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#9200cf]/40 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          </div>
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-[#150025]/50 rounded-xl border border-[#9200cf]/20"
        >
          <p className="text-white/70 mb-4">
            {t("blog.error.message")}: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#9200cf]/20 text-white rounded-full hover:bg-[#9200cf]/30 transition-colors border border-[#9200cf]/30"
          >
            {t("blog.retry")}
          </button>
        </motion.div>
      ) : filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-[#150025]/50 rounded-xl border border-[#9200cf]/20"
        >
          <p className="text-white/70">{t("blog.empty")}</p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9200cf]/0 to-[#9200cf]/0 rounded-xl blur opacity-0 group-hover:opacity-100 group-hover:from-[#9200cf]/20 group-hover:to-[#9200cf]/5 transition duration-700"></div>
              <div className="relative bg-[#150025] border border-[#9200cf]/20 rounded-xl overflow-hidden group-hover:border-[#9200cf]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9200cf]/10">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image_url || "/placeholder.svg?height=600&width=800"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150025] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#9200cf]/80 text-white text-xs rounded-full backdrop-blur-sm">
                      {post.category || t("blog.category.general")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d896ff] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#9200cf] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      {t("blog.readMore")}{" "}
                      <ArrowRight
                        size={16}
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </Link>
                    <div className="flex items-center gap-1 text-white/60 text-xs">
                      <Calendar size={12} />
                      <span>
                        {formatDate(post.created_at, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
