"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"
import type * as THREE from "three"

function Model({ scrollY }: { scrollY: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    if (!mesh.current) return

    // Rotate based on time
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15

    // Scale based on scroll
    const scale = 1 + scrollY * 0.001
    mesh.current.scale.set(scale, scale, scale)
  })

  return (
    <motion.mesh
      ref={mesh}
      scale={[1, 1, 1]}
      animate={{
        y: [0, 0.5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color="#9200cf"
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.2}
        distort={0.3}
        speed={1.5}
      />
    </motion.mesh>
  )
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [
      number,
      number,
      number,
    ],
    size: Math.random() * 0.2 + 0.1,
  }))

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={4}>
          <mesh position={particle.position}>
            <sphereGeometry args={[particle.size, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#9200cf" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export default function ThreeScene() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return null // Não renderiza nada no servidor ou durante a hidratação inicial
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <MotionConfig transition={{ duration: 0.5 }}>
          <Model scrollY={scrollY} />
          <FloatingParticles />
        </MotionConfig>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
