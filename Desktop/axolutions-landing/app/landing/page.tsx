import LandingHero from "@/components/landing/landing-hero"
import LandingBenefits from "@/components/landing/landing-benefits"
import LandingTestimonials from "@/components/landing/landing-testimonials"
import LandingFaq from "@/components/landing/landing-faq"
import LandingCta from "@/components/landing/landing-cta"
import LandingHeader from "@/components/landing/landing-header"
import LandingCountdown from "@/components/landing/landing-countdown"
import FloatingWhatsApp from "@/components/floating-whatsapp"

export const metadata = {
  title: "Axolutions | Transforme seu negócio com soluções digitais personalizadas",
  description:
    "Aumente suas vendas com um site otimizado para conversão. Oferta por tempo limitado: 30% de desconto em projetos iniciados este mês.",
  openGraph: {
    title: "Axolutions | Transforme seu negócio com soluções digitais personalizadas",
    description:
      "Aumente suas vendas com um site otimizado para conversão. Oferta por tempo limitado: 30% de desconto em projetos iniciados este mês.",
    images: [{ url: "/og-image.jpg" }],
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingCountdown />
        <LandingBenefits />
        <LandingTestimonials />
        <LandingFaq />
        <LandingCta />
      </main>
      <FloatingWhatsApp />
    </div>
  )
}
