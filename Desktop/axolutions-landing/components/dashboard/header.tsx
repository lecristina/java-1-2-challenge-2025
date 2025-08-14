"use client"

import type React from "react"
import { motion } from "framer-motion"

interface HeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function Header({ title, description, children }: HeaderProps) {
  return (
    <div className="flex flex-col border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          <h1 className="text-xl font-semibold bg-gradient-to-r from-white to-[#d896ff] bg-clip-text text-transparent">
            {title}
          </h1>
          {description && <p className="text-sm text-white/60">{description}</p>}
        </motion.div>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </div>
  )
}
