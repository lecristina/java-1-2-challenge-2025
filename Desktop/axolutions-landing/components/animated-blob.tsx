"use client"

import { motion } from "framer-motion"

interface AnimatedBlobProps {
  className?: string
}

export default function AnimatedBlob({ className = "" }: AnimatedBlobProps) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: [1, 1.1, 1.05, 1.1, 1],
          borderRadius: [
            "40% 60% 60% 40% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#9200cf]/30 to-[#4a0082]/10 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] blur-xl"></div>
      </motion.div>
    </div>
  )
}
