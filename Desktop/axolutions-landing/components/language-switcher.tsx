"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === "pt-BR" ? "en-US" : "pt-BR"
    setLanguage(newLanguage)
    localStorage.setItem("axolutions-language", newLanguage)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="rounded-full p-2"
      aria-label={language === "pt-BR" ? "Switch to English" : "Mudar para Português"}
    >
      {language === "pt-BR" ? (
        <Image src="/images/brasil.png" alt="Português" width={24} height={24} className="rounded-sm" />
      ) : (
        <Image src="/images/estados-unidos.png" alt="English" width={24} height={24} className="rounded-sm" />
      )}
    </Button>
  )
}
