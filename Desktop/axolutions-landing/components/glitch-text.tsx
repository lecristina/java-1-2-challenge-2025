"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startGlitchEffect = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    let count = 0
    intervalRef.current = setInterval(() => {
      const randomChars = "!<>-_\\/[]{}—=+*^?#________"

      const randomText = text
        .split("")
        .map((char, idx) => {
          if (Math.random() < 0.1) {
            return randomChars[Math.floor(Math.random() * randomChars.length)]
          }
          return char
        })
        .join("")

      controls.start({
        text: randomText,
        transition: { duration: 0.05 },
      })

      count++
      if (count > 10) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        controls.start({
          text,
          transition: { duration: 0.05 },
        })
      }
    }, 50)
  }

  useEffect(() => {
    controls.start({ text })

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [controls, text])

  useEffect(() => {
    if (isHovered) {
      startGlitchEffect()
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      controls.start({ text })
    }
  }, [isHovered, controls, text])

  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={startGlitchEffect}
    />
  )
}
