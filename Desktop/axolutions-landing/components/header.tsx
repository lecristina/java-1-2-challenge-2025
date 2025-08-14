"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useTranslations } from "@/hooks/use-translations"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslations()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          <span className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-transparent bg-clip-text">AXOLUTIONS</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
            } transition-colors`}
          >
            {t("header.home")}
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${
              pathname === "/about" ? "text-white" : "text-gray-400 hover:text-white"
            } transition-colors`}
          >
            {t("header.about")}
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-medium ${
              pathname === "/projects" ? "text-white" : "text-gray-400 hover:text-white"
            } transition-colors`}
          >
            {t("header.projects")}
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium ${
              pathname === "/blog" ? "text-white" : "text-gray-400 hover:text-white"
            } transition-colors`}
          >
            {t("header.blog")}
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href={`https://wa.me/11983207820?text=${encodeURIComponent(t("header.whatsapp.message"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
            >
              {t("header.contact")}
            </a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-black/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className={`text-sm font-medium ${
                pathname === "/" ? "text-white" : "text-gray-400"
              } hover:text-white transition-colors py-2`}
            >
              {t("header.home")}
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                pathname === "/about" ? "text-white" : "text-gray-400"
              } hover:text-white transition-colors py-2`}
            >
              {t("header.about")}
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium ${
                pathname === "/projects" ? "text-white" : "text-gray-400"
              } hover:text-white transition-colors py-2`}
            >
              {t("header.projects")}
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium ${
                pathname === "/blog" ? "text-white" : "text-gray-400"
              } hover:text-white transition-colors py-2`}
            >
              {t("header.blog")}
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <a
                href={`https://wa.me/11983207820?text=${encodeURIComponent(t("header.whatsapp.message"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all inline-block w-fit"
              >
                {t("header.contact")}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
