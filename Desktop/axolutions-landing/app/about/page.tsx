import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Axolutions | Software Development",
  description:
    "Learn about the history, mission, and values of Axolutions. We are specialists in software development, web applications, and custom digital solutions.",
  openGraph: {
    title: "About Axolutions | Software Development",
    description:
      "Learn about the history, mission, and values of Axolutions. We are specialists in software development, web applications, and custom digital solutions.",
    url: "https://axolutions.com.br/about",
    siteName: "Axolutions",
    locale: "en_US",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
