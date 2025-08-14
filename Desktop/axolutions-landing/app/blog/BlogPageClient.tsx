"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogList from "@/components/blog-list"
import { useTranslations } from "@/hooks/use-translations"

interface BlogPageClientProps {
  initialPosts: any[]
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const { t } = useTranslations()

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#9200cf]/10 via-[#9200cf]/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-[#9200cf]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-[#9200cf]/5 blur-3xl pointer-events-none"></div>

      <main className="container mx-auto px-6 pt-32 pb-20 relative">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#150025] border border-[#9200cf]/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#9200cf]"></span>
            <span className="text-sm font-medium text-white/90">{t("blog.title")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-300 to-[#9200cf] text-transparent bg-clip-text"
          >
            {t("blog.insights")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-[#9200cf] to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            {t("blog.description")}
          </motion.p>
        </div>

        <BlogList posts={initialPosts} />
      </main>
      <Footer />
    </div>
  )
}
