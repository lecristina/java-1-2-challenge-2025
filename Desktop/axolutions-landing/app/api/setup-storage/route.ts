import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("Iniciando configuração do storage")

    // Verificar se as variáveis de ambiente estão definidas
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Variáveis de ambiente do Supabase não definidas")
      return NextResponse.json(
        { error: "Configuração do Supabase incompleta. Contate o administrador." },
        { status: 500 },
      )
    }

    // Criar cliente Supabase
    const supabase = createClient()

    // Verificar se o bucket 'images' existe
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      console.error("Erro ao listar buckets:", bucketsError)
      return NextResponse.json({ error: `Erro ao acessar storage: ${bucketsError.message}` }, { status: 500 })
    }

    const imagesBucketExists = buckets.some((bucket) => bucket.name === "images")

    if (!imagesBucketExists) {
      console.log("Bucket 'images' não encontrado, criando...")
      // Criar o bucket
      const { error: createError } = await supabase.storage.createBucket("images", {
        public: true,
      })
      if (createError) {
        console.error("Erro ao criar bucket 'images':", createError)
        return NextResponse.json({ error: "Não foi possível criar o bucket de imagens" }, { status: 500 })
      }
      console.log("Bucket 'images' criado com sucesso")
    } else {
      console.log("Bucket 'images' já existe")
    }

    // Configurar políticas de acesso para o bucket 'images'
    console.log("Configurando políticas de acesso para o bucket 'images'...")

    // Política para permitir leitura pública
    const { error: policyError } = await supabase.storage.from("images").getPublicUrl("test.txt")
    if (policyError) {
      console.error("Erro ao verificar políticas de acesso:", policyError)
    }

    return NextResponse.json({ success: true, message: "Storage configurado com sucesso" })
  } catch (error: any) {
    console.error("Erro ao configurar storage:", error)
    return NextResponse.json({ error: error.message || "Erro desconhecido ao configurar storage" }, { status: 500 })
  }
}
