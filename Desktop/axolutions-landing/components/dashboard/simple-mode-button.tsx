"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SimpleModeButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.push("/dashboard/projects/simple/new")} variant="outline">
      Modo Simples
    </Button>
  )
}
