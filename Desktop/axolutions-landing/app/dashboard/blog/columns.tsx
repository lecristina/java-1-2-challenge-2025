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
import { togglePostFeatured, togglePostStatus, deletePost } from "@/app/actions/blog-actions"
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

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  status: "published" | "draft"
  featured: boolean
  created_at: string
  views: number
}

export const columns: ColumnDef<Post>[] = [
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
      const post = row.original
      return (
        <div className="flex items-center">
          {post.featured && <Star className="mr-2 h-4 w-4 text-yellow-500" />}
          <span className="font-medium">{post.title}</span>
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
    accessorKey: "views",
    header: "Visualizações",
    cell: ({ row }) => {
      const views = row.getValue("views") as number
      return <div className="text-center">{views || 0}</div>
    },
  },
  {
    accessorKey: "created_at",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string)
      return <div>{date.toLocaleDateString("pt-BR")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell post={row.original} />,
  },
]

function ActionCell({ post }: { post: Post }) {
  const { toast } = useToast()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFeatured = async () => {
    try {
      setIsLoading(true)
      const { error } = await togglePostFeatured(post.id, !post.featured)
      if (error) throw new Error(error)

      toast({
        title: "Sucesso",
        description: `Post ${post.featured ? "removido dos destaques" : "adicionado aos destaques"}.`,
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível alterar o destaque do post.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async () => {
    try {
      setIsLoading(true)
      const newStatus = post.status === "published" ? "draft" : "published"
      const { error } = await togglePostStatus(post.id, newStatus)
      if (error) throw new Error(error)

      toast({
        title: "Sucesso",
        description: `Post ${newStatus === "published" ? "publicado" : "movido para rascunhos"}.`,
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível alterar o status do post.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const { error } = await deletePost(post.id)
      if (error) throw new Error(error)

      toast({
        title: "Sucesso",
        description: "Post excluído com sucesso.",
      })
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o post.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/blog/${post.slug}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/blog/edit/${post.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleFeatured} disabled={isLoading}>
            {post.featured ? (
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
          <DropdownMenuItem onClick={handleToggleStatus} disabled={isLoading}>
            {post.status === "published" ? (
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
            disabled={isLoading}
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
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
