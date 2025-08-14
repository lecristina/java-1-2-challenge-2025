"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt-BR" | "en-US"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isOutsideBrazil: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR")
  const [isOutsideBrazil, setIsOutsideBrazil] = useState<boolean>(false)

  useEffect(() => {
    // Função para detectar se o usuário está fora do Brasil
    const detectLocation = async () => {
      try {
        // Usando o serviço ipapi.co para obter a localização baseada no IP
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        // Verificar se o país não é Brasil
        const outsideBrazil = data.country_code !== "BR"
        setIsOutsideBrazil(outsideBrazil)

        // Se estiver fora do Brasil, definir o idioma como inglês
        if (outsideBrazil) {
          setLanguage("en-US")
        }

        // Salvar a preferência no localStorage
        localStorage.setItem("axolutions-language", outsideBrazil ? "en-US" : "pt-BR")
      } catch (error) {
        console.error("Erro ao detectar localização:", error)

        // Fallback: verificar o idioma do navegador
        const browserLang = navigator.language
        const isBrazilian = browserLang.startsWith("pt")

        if (!isBrazilian) {
          setIsOutsideBrazil(true)
          setLanguage("en-US")
        }
      }
    }

    // Verificar se já existe uma preferência salva
    const savedLanguage = localStorage.getItem("axolutions-language") as Language | null

    if (savedLanguage) {
      setLanguage(savedLanguage)
      setIsOutsideBrazil(savedLanguage === "en-US")
    } else {
      // Se não houver preferência salva, detectar localização
      detectLocation()
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isOutsideBrazil }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
