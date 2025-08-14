"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Definir como false por padrão para evitar problemas de hidratação
    setMatches(false)

    // Verificar apenas no cliente
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Definir o valor inicial
      setMatches(media.matches)

      // Configurar o listener
      const listener = () => setMatches(media.matches)
      media.addEventListener("change", listener)

      // Limpar o listener
      return () => media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}
