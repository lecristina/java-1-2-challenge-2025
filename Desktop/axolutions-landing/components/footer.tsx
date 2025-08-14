"use client"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function Footer() {
  const { t } = useTranslations()
  const currentYear = new Date().getFullYear()

  const contactInfo = [
    { icon: <Mail size={18} />, text: "contato@axolutions.com" },
    { icon: <Phone size={18} />, text: "+55 (11) 98320-7820" },
    { icon: <MapPin size={18} />, text: "São Paulo, SP - Brasil" },
  ]

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={18} />, href: "https://x.com/axolutions", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/axolutions/", label: "Instagram" },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/company/axolutions/?viewAsMember=true",
      label: "LinkedIn",
    },
  ]

  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-300 to-[#9200cf] text-transparent bg-clip-text">
                AXO<span className="text-[#9200cf]">LUTIONS</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">{t("footer.description")}</p>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9200cf]">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.company")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  {t("header.home")}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/70 hover:text-white transition-colors">
                  {t("header.about")}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.services")}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.resources")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
                  {t("header.blog")}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.projects")}
                </Link>
              </li>
              <li>
                <Link href="#technologies" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.technologies")}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.testimonials")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex justify-center items-center">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} Axolutions. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
