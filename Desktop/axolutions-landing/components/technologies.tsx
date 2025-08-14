"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"

export default function Technologies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useTranslations()

  const technologies = [
    {
      name: "React",
      subtitle: t("tech.frontend"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-[#61DAFB]"
        >
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            opacity="0"
          />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" transform="rotate(120 12 12)" />
        </svg>
      ),
    },
    {
      name: "Next.js",
      subtitle: "Framework",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
          className="w-12 h-12"
          alt="Next.js"
        />
      ),
    },
    {
      name: "Vue.js",
      subtitle: t("tech.frontend"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-12 h-12">
          <path d="M19.197 3.406h2.403L12 20.593 2.4 3.406h4.613L12 10.785l4.948-7.38h2.249z" fill="#41B883" />
          <path d="M2.4 3.406l9.6 17.187 9.6-17.187h-2.403L12 14.564 4.764 3.406H2.4z" fill="#41B883" />
          <path d="M4.764 3.406L12 14.603l7.197-11.197h-2.249L12 10.785l-4.987-7.38H4.764z" fill="#35495E" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      subtitle: "Styling",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
          className="w-12 h-12"
          alt="Tailwind CSS"
        />
      ),
    },
    {
      name: "Node.js",
      subtitle: t("tech.backend"),
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
          className="w-12 h-12"
          alt="Node.js"
        />
      ),
    },
    {
      name: "Python",
      subtitle: t("tech.backend"),
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          className="w-12 h-12"
          alt="Python"
        />
      ),
    },
    {
      name: "AWS",
      subtitle: "Cloud",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
          className="w-12 h-12"
          alt="AWS"
        />
      ),
    },
    {
      name: "TypeScript",
      subtitle: "Language",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          className="w-12 h-12"
          alt="TypeScript"
        />
      ),
    },
    {
      name: "Docker",
      subtitle: t("tech.devops"),
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
          className="w-12 h-12"
          alt="Docker"
        />
      ),
    },
    {
      name: "MySQL",
      subtitle: t("tech.database"),
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
          className="w-12 h-12"
          alt="MySQL"
        />
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="technologies" ref={ref} className="py-20 md:py-32 relative bg-[#0a000f]">
      <div className="absolute inset-0 bg-gradient-radial from-[#9200cf]/5 via-transparent to-transparent opacity-70"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#d896ff] uppercase tracking-wider font-medium mb-3">{t("tech.specialties")}</p>
          <h2 className="text-4xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-[#d896ff] to-[#9200cf] text-transparent bg-clip-text">
              {t("tech.mastered")}
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#9200cf]/80 to-[#4a0082]/30 rounded-full"></div>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto">{t("tech.description.full")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="relative p-6 rounded-xl bg-[#10001a] border border-[#9200cf]/10 group-hover:border-[#9200cf]/30 transition-all flex flex-col items-center h-full">
                <div className="relative w-16 h-16 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-center font-medium text-white mb-1 group-hover:text-[#9200cf] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-center text-xs text-white/50 group-hover:text-white/70 transition-colors">
                  {tech.subtitle}
                </p>

                {/* Animated glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9200cf]/10 to-transparent rounded-xl blur-md"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-white/70 max-w-4xl mx-auto text-sm md:text-base">{t("tech.team.description")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <a
            href="https://wa.me/5511983207820?text=Olá! Gostaria de saber mais sobre as tecnologias que vocês utilizam."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
          >
            {t("tech.consult.specialists")}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
