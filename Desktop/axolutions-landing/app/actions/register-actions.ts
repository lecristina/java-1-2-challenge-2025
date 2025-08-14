"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function registerUser(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password || !name) {
    return { success: false, error: "Todos os campos são obrigatórios" }
  }

  try {
    // Criar o usuário diretamente
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Marca o email como já confirmado
      user_metadata: { name },
    })

    if (error) {
      console.error("Erro ao criar usuário:", error)
      return { success: false, error: error.message }
    }

    console.log("Usuário criado com sucesso:", data)
    revalidatePath("/dashboard/login-simple")

    return { success: true, error: null }
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error)
    return { success: false, error: error.message || "Erro desconhecido ao criar usuário" }
  }
}
