import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { CreateButton } from "@/components/dashboard/create-button"
import SimpleModeButton from "@/components/dashboard/simple-mode-button"

export default async function ProjectsSimplePage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle>Projetos</CardTitle>
          <CardDescription>Gerencie os projetos do portfólio</CardDescription>
        </div>
        <div className="flex gap-2">
          <SimpleModeButton />
          <CreateButton href="/dashboard/projects/new" label="Novo Projeto" />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={projects || []} />
      </CardContent>
    </Card>
  )
}
