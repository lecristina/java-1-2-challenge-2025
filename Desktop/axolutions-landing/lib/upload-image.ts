"use server"

import { createServiceClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export async function uploadImage(file: File, folder = "general") {
  try {
    console.log(`[UPLOAD] Iniciando upload de imagem para pasta ${folder}:`, {
      nome: file.name,
      tamanho: file.size,
      tipo: file.type,
    })

    // Verificar se as variáveis de ambiente estão definidas
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[UPLOAD] Variáveis de ambiente do Supabase não definidas")
      return {
        url: null,
        error: "Configuração do Supabase incompleta. Contate o administrador.",
      }
    }

    // Criar cliente Supabase com a service role key para ter permissões completas
    const supabase = createServiceClient()

    // Verificar se o bucket 'images' existe
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      console.error("[UPLOAD] Erro ao listar buckets:", bucketsError)
      return { url: null, error: `Erro ao acessar storage: ${bucketsError.message}` }
    }

    const imagesBucketExists = buckets.some((bucket) => bucket.name === "images")

    if (!imagesBucketExists) {
      console.log("[UPLOAD] Bucket 'images' não encontrado, tentando criar...")
      // Tentar criar o bucket
      try {
        const { error: createError } = await supabase.storage.createBucket("images", {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        })
        if (createError) {
          console.error("[UPLOAD] Erro ao criar bucket 'images':", createError)
          return { url: null, error: "Não foi possível criar o bucket de imagens" }
        }
        console.log("[UPLOAD] Bucket 'images' criado com sucesso")
      } catch (e) {
        console.error("[UPLOAD] Erro ao criar bucket:", e)
        return { url: null, error: "Configuração de armazenamento incompleta" }
      }
    }

    // Gerar um nome único para o arquivo
    const fileExt = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    console.log(`[UPLOAD] Caminho do arquivo: ${filePath}`)

    // Converter o arquivo para ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

    console.log(`[UPLOAD] Arquivo convertido para buffer, tamanho: ${fileBuffer.length} bytes`)

    // Fazer o upload do arquivo
    const { data, error } = await supabase.storage.from("images").upload(filePath, fileBuffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: true,
    })

    if (error) {
      console.error("[UPLOAD] Erro ao fazer upload da imagem:", error)
      return { url: null, error: error.message }
    }

    console.log("[UPLOAD] Upload concluído com sucesso:", data)

    // Obter a URL pública do arquivo
    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath)
    console.log("[UPLOAD] URL pública gerada:", urlData.publicUrl)

    return { url: urlData.publicUrl, error: null }
  } catch (error: any) {
    console.error("[UPLOAD] Exceção ao fazer upload da imagem:", error)
    return {
      url: null,
      error: error.message || "Erro desconhecido ao fazer upload da imagem",
    }
  }
}
