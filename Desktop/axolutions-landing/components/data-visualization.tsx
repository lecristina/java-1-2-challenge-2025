"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface DataPoint {
  value: number
  label: string
  color: string
}

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data: DataPoint[] = [
    { value: 65, label: "Web Apps", color: "#9200cf" },
    { value: 85, label: "Mobile", color: "#7a00cf" },
    { value: 75, label: "AI/ML", color: "#6200cf" },
    { value: 90, label: "Cloud", color: "#4a00cf" },
    { value: 70, label: "IoT", color: "#3200cf" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
    }> = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const createParticles = () => {
      particles = []
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: data[Math.floor(Math.random() * data.length)].color,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    createParticles()

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [data])

  return (
    <div className="relative w-full h-[300px] md:h-[400px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 w-full h-full flex items-end justify-around px-4">
        {data.map((item, index) => {
          const isHovered = hoveredIndex === index

          return (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="relative w-full"
                initial={{ height: 0 }}
                animate={{ height: `${item.value * 0.7}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute bottom-0 w-12 md:w-16 rounded-t-lg"
                  style={{ backgroundColor: item.color, height: `${item.value * 0.7}%` }}
                  initial={{ opacity: 0.7 }}
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                    boxShadow: isHovered ? `0 0 20px ${item.color}` : "none",
                  }}
                />

                {isHovered && (
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-white text-sm whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {item.value}%
                  </motion.div>
                )}
              </motion.div>

              <motion.p
                className="mt-2 text-sm text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {item.label}
              </motion.p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
