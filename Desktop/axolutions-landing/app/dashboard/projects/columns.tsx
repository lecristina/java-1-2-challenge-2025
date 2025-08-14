"use client"

import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Star, Eye, EyeOff, StarOff } from "lucide-react"
import { toggleProjectFeatured, toggleProjectStatus, deleteProject } from "@/app/actions/project-actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type Project = {
  id: string
  title: string
  description: string
  featured: boolean
  status: "published" | "draft"
  created_at: string
  slug: string
}

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      const featured = row.getValue("featured") as boolean
      return (
        <div className="flex items-center">
          {featured && <Star className="mr-2 h-4 w-4 text-yellow-500" />}
          <span className="font-medium">{row.getValue("title")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "published" ? "default" : "secondary"}>
          {status === "published" ? "Publicado" : "Rascunho"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "featured",
    header: "Destaque",
    cell: ({ row }) => {
      const featured = row.getValue("featured") as boolean
      return (
        <Badge variant={featured ? "default" : "outline"} className={featured ? "bg-yellow-500" : ""}>
          {featured ? "Destaque" : "Normal"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return <div>{date.toLocaleDateString("pt-BR")}</div>
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const project = row.original

      return (
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/projects/edit/${project.id}`}>Editar</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-[#9200cf] to-[#b44dff] text-white font-semibold shadow-md hover:from-[#b44dff] hover:to-[#9200cf] transition-all px-4 py-2 rounded-md">
            <Link href="/projects">Visualizar</Link>
          </Button>
        </div>
      )
    },
  },
]

function ActionCell({ project }: { project: Project }) {
  const { toast } = useToast()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleToggleFeatured = async () => {
    try {
      const { error } = await toggleProjectFeatured(project.id, !project.featured)
      if (error) throw new Error(error)

      toast({
        title: "Sucesso",
        description: `Projeto ${project.featured ? "removido dos destaques" : "adicionado aos destaques"}.`,
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível alterar o destaque do projeto.",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async () => {
    try {
      const newStatus = project.status === "published" ? "draft" : "published"
      const { error } = await toggleProjectStatus(project.id, newStatus)
      if (error) throw new Error(error)

      toast({
        title: "Sucesso",
        description: `Projeto ${newStatus === "published" ? "publicado" : "movido para rascunhos"}.`,
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível alterar o status do projeto.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    try {
      const { error } = await deleteProject(project.id)
      if (error) throw new Error(error)

      toast({
        title: "Sucesso",
        description: "Projeto excluído com sucesso.",
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o projeto.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/projects/edit/${project.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleFeatured}>
            {project.featured ? (
              <>
                <StarOff className="mr-2 h-4 w-4" />
                <span>Remover destaque</span>
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                <span>Destacar</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus}>
            {project.status === "published" ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                <span>Despublicar</span>
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                <span>Publicar</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
