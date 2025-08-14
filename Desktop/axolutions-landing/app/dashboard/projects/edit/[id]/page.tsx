import { Header } from "@/components/dashboard/header"
import { ProjectForm } from "../../project-form"
import { getProjectById } from "@/app/actions/project-actions"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  console.log("Edit project page - Project ID:", params.id)

  const { data: project, error } = await getProjectById(params.id)

  console.log("Project data:", project)
  console.log("Error:", error)

  if (error || !project) {
    console.error("Project not found or error:", error)
    notFound()
  }

  return (
    <div>
      <Header title="Editar Projeto" />
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Editar Projeto</h2>
          <p className="text-muted-foreground">Atualize as informações do projeto.</p>
        </div>
        <ProjectForm initialData={project} isEditing />
      </div>
    </div>
  )
}
