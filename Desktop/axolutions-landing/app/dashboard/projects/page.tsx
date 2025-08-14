import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/app/actions/project-actions"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import Link from "next/link"
import { Plus } from "lucide-react"
import { deleteProject } from "@/app/actions/project-actions"

export default async function ProjectsPage() {
  // Buscar projetos do Supabase
  const { projects, error } = await getProjects()

  if (error) {
    console.error("Erro ao buscar projetos:", error)
  }

  return (
    <div>
      <Header title="Gerenciar Projetos">
        <Button
          asChild
          className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
        >
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Link>
        </Button>
      </Header>
      <div className="p-6">
        <DataTable
          columns={columns}
          data={projects || []}
          searchColumn="title"
          deleteRow={deleteProject}
          createHref="/dashboard/projects/new"
          createLabel="Novo Projeto"
        />
      </div>
    </div>
  )
}
