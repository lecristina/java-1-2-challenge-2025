import type { Metadata } from "next"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { notFound } from "next/navigation"
import ProjectFormSimple from "../../../project-form-simple"

export const metadata: Metadata = {
  title: "Editar Projeto",
  description: "Editar um projeto existente",
}

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: project, error } = await supabase.from("projects").select("*").eq("id", params.id).single()

  if (error || !project) {
    console.error("Erro ao buscar projeto:", error)
    notFound()
  }

  return (
    <div className="container py-8">
      <ProjectFormSimple project={project} />
    </div>
  )
}
