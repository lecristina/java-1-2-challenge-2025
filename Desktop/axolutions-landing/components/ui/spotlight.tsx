"use client"
import { useRef, useState, useCallback, useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type SpotlightProps = {
  className?: string
  size?: number
  springOptions?: any
  color?: string
  opacity?: number
  zIndex?: number
  offset?: { x: number; y: number }
}

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0, damping: 25, stiffness: 300 },
  color = "purple",
  opacity = 0.8,
  zIndex = -1,
  offset = { x: 0, y: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null)

  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2 + offset.x}px`)
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2 + offset.y}px`)

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement
      if (parent) {
        if (window.getComputedStyle(parent).position === "static") {
          parent.style.position = "relative"
        }
        parent.style.overflow = "hidden"
        setParentElement(parent)
      }
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return
      const { left, top } = parentElement.getBoundingClientRect()
      const x = event.clientX - left
      const y = event.clientY - top

      // Aplicar diretamente para evitar atraso
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY, parentElement],
  )

  useEffect(() => {
    if (!parentElement) return

    parentElement.addEventListener("mousemove", handleMouseMove)
    parentElement.addEventListener("mouseenter", () => setIsHovered(true))
    parentElement.addEventListener("mouseleave", () => setIsHovered(false))

    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove)
      parentElement.removeEventListener("mouseenter", () => setIsHovered(true))
      parentElement.removeEventListener("mouseleave", () => setIsHovered(false))
    }
  }, [parentElement, handleMouseMove])

  const gradientClasses =
    {
      purple: "from-[#9200cf] via-[#b44dff] to-[#d896ff]",
      blue: "from-blue-400 via-blue-500 to-blue-600",
      green: "from-green-400 via-green-500 to-green-600",
    }[color] || "from-[#9200cf] via-[#b44dff] to-[#d896ff]"

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200",
        gradientClasses,
        isHovered ? "opacity-100" : "opacity-70",
        className,
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        zIndex: zIndex,
        opacity: opacity,
      }}
    />
  )
}
