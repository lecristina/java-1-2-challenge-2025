import type { Metadata } from "next"
import SobreClientPage from "./SobreClientPage"

export const metadata: Metadata = {
  title: "Sobre a Axolutions | Desenvolvimento de Software",
  description:
    "Conheça a história, missão e valores da Axolutions. Somos especialistas em desenvolvimento de software, aplicativos web e soluções digitais personalizadas.",
  openGraph: {
    title: "Sobre a Axolutions | Desenvolvimento de Software",
    description:
      "Conheça a história, missão e valores da Axolutions. Somos especialistas em desenvolvimento de software, aplicativos web e soluções digitais personalizadas.",
    url: "https://axolutions.com.br/sobre",
    siteName: "Axolutions",
    locale: "pt_BR",
    type: "website",
  },
}

export default function SobrePage() {
  return <SobreClientPage />
}
