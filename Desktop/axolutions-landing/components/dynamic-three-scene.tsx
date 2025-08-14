"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Importação dinâmica do ThreeScene com SSR desativado
const ThreeScene = dynamic(() => import("./three-scene"), {
  ssr: false,
  loading: () => <ThreeSceneFallback />,
})

// Componente de fallback enquanto o ThreeScene está carregando
function ThreeSceneFallback() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-radial from-[#9200cf]/10 via-transparent to-transparent opacity-30"></div>
  )
}

export default function DynamicThreeScene() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <ThreeSceneFallback />
  }

  return (
    <Suspense fallback={<ThreeSceneFallback />}>
      <ThreeScene />
    </Suspense>
  )
}
