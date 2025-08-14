import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import LandingPages from "@/components/landing-pages"
// import Projects from "@/components/projects"
import GlobalPresence from "@/components/global-presence"
import Stats from "@/components/stats"
import Technologies from "@/components/technologies"
import BlogSection from "@/components/blog-section"
import Testimonials from "@/components/testimonials"
import Cta from "@/components/cta"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles-background"
import ScrollIndicator from "@/components/scroll-indicator"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticlesBackground />
      <ScrollIndicator />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <LandingPages />
        {/* <Projects /> */}
        <GlobalPresence />
        <Stats />
        <Technologies />
        <BlogSection />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
