"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { CreateButton } from "@/components/dashboard/create-button"
import { Plus } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchColumn?: string
  deleteRow?: (id: string) => Promise<void>
  onCreateClick?: () => void
  createHref?: string
  createLabel?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  deleteRow,
  onCreateClick,
  createHref,
  createLabel = "Criar",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const { toast } = useToast()

  // Garantir que data seja sempre um array
  const safeData = Array.isArray(data) ? data : []

  const table = useReactTable({
    data: safeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const handleDelete = async () => {
    if (!deleteRow) return

    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (selectedRows.length === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: "Selecione pelo menos um item para excluir.",
        variant: "destructive",
      })
      return
    }

    if (confirm(`Tem certeza que deseja excluir ${selectedRows.length} item(s)?`)) {
      try {
        for (const row of selectedRows) {
          // Assume que cada linha tem um id
          const id = (row.original as any).id
          await deleteRow(id)
          // A revalidação deve ser feita dentro da função deleteRow no servidor
        }

        toast({
          title: "Sucesso",
          description: `${selectedRows.length} item(s) excluído(s) com sucesso.`,
        })

        // Limpa a seleção após a exclusão
        setRowSelection({})
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao excluir os itens.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2 items-center">
          {searchColumn && (
            <Input
              placeholder="Filtrar..."
              value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          )}
          {onCreateClick && (
            <Button variant="default" size="sm" onClick={onCreateClick} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Criar
            </Button>
          )}
          {createHref && !onCreateClick && <CreateButton href={createHref} label={createLabel} />}
        </div>
        {deleteRow && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          >
            Excluir Selecionados
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s)
          selecionada(s).
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próxima
        </Button>
      </div>
    </div>
  )
}
