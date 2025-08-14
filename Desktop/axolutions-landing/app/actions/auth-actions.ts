"use server"

import { createClient } from "@/lib/supabase"

export async function createUserWithoutVerification(email: string, password: string, name: string) {
  const supabase = createClient()

  try {
    console.log("Criando usuário sem verificação:", email)

    // Criar o usuário diretamente
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Marca o email como já confirmado
      user_metadata: { name },
    })

    if (userError) {
      console.error("Erro ao criar usuário:", userError)
      return { success: false, error: userError.message }
    }

    console.log("Usuário criado com sucesso:", userData)

    // Verificar se o perfil foi criado automaticamente pelo trigger
    // Se não, podemos criar manualmente
    if (userData.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userData.user.id)
        .single()

      if (profileError || !profileData) {
        console.log("Perfil não encontrado, criando manualmente")

        // Criar perfil manualmente
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            user_id: userData.user.id,
            name: name || "Usuário",
            role: "user",
          },
        ])

        if (insertError) {
          console.error("Erro ao criar perfil:", insertError)
        }
      }
    }

    return { success: true, error: null }
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error)
    return { success: false, error: error.message || "Erro desconhecido ao criar usuário" }
  }
}
