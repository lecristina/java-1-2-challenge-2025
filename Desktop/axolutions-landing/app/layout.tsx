import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import LoadingScreen from "@/components/loading-screen"
import { LanguageProvider } from "@/contexts/language-context"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Axolutions - Soluções Digitais Personalizadas",
  description: "Transforme seu negócio com soluções digitais personalizadas. Desenvolvimento web, mobile e sistemas.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LanguageProvider>
          <Header />
          <LoadingScreen>{children}</LoadingScreen>
          {/* Exibe o WhatsApp exceto no dashboard */}
          {!(pathname.startsWith("/dashboard")) && <FloatingWhatsApp />}
        </LanguageProvider>
      </body>
    </html>
  )
}
