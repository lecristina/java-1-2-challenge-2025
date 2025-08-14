import type { Metadata } from "next"
import ProjectFormSimple from "../../project-form-simple"

export const metadata: Metadata = {
  title: "Novo Projeto",
  description: "Criar um novo projeto",
}

export default function NewProjectPage() {
  return (
    <div className="container py-8">
      <ProjectFormSimple />
    </div>
  )
}
