"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

interface CreateButtonProps {
  href: string
  label?: string
}

// Exportação nomeada para compatibilidade com importações existentes
export function CreateButton({ href, label = "Criar" }: CreateButtonProps) {
  const router = useRouter()

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="default"
        size="sm"
        onClick={() => router.push(href)}
        className="bg-gradient-to-r from-[#9200cf] to-[#6a00cf] hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
      >
        <Plus className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </motion.div>
  )
}

// Exportação padrão para compatibilidade com importações que usam default
export default CreateButton
