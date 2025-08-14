"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Importação dinâmica do CustomCursor com SSR desativado
const CustomCursor = dynamic(() => import("./custom-cursor"), {
  ssr: false,
})

export default function DynamicCustomCursor() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <CustomCursor />
}
