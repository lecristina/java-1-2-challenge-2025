import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { getPosts } from "@/app/actions/blog-actions"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function BlogPage() {
  // Buscar posts do Supabase
  const { posts, error } = await getPosts()

  if (error) {
    console.error("Erro ao buscar posts:", error)
  }

  return (
    <div>
      <Header title="Blog">
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Post
          </Link>
        </Button>
      </Header>
      <div className="p-6">
        <DataTable
          columns={columns}
          data={posts || []}
          searchColumn="title"
          createHref="/dashboard/blog/new"
          createLabel="Novo Post"
        />
      </div>
    </div>
  )
}
