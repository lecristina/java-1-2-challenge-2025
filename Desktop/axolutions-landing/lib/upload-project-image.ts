"use server"

import { createClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export async function uploadProjectImage(file: File) {
  try {
    console.log(`[UPLOAD] Iniciando upload de imagem:`, file.name, file.size, file.type)

    const supabase = createClient()

    // Gerar um nome único para o arquivo
    const fileExt = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `projects/${fileName}`

    // Converter o arquivo para ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

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
