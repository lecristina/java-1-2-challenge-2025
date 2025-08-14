import { getPublishedProjects } from "@/app/actions/project-actions"
import { ProjectsPageClient } from "./ProjectsPageClient"

export const metadata = {
  title: "Projetos | Axolutions",
  description: "Conheça os projetos desenvolvidos pela Axolutions",
}

export default async function ProjectsPage() {
  const { projects, error } = await getPublishedProjects()

  if (error) {
    console.error("Erro ao buscar projetos:", error)
  }

  return <ProjectsPageClient projects={projects || []} />
}
