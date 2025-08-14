"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  existingImageUrl?: string
  className?: string
}

export default function ImageUpload({ onImageUploaded, existingImageUrl, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null)
  const supabase = createClientComponentClient()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar o tipo de arquivo
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida.")
      return
    }

    // Validar o tamanho do arquivo (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("A imagem deve ter menos de 10MB.")
      return
    }

    try {
      setIsUploading(true)
      setError(null)

      // Criar um objeto URL para preview
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // Gerar um nome único para o arquivo
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `project-images/${fileName}`

      // Fazer upload para o Supabase
      const { data, error } = await supabase.storage.from("images").upload(filePath, file)

      if (error) {
        console.error("Erro ao fazer upload:", error)
        setError(`Erro ao fazer upload: ${error.message}`)
        return
      }

      // Obter a URL pública
      const { data: urlData } = await supabase.storage.from("images").getPublicUrl(filePath)

      console.log("Upload bem-sucedido:", urlData)
      onImageUploaded(urlData.publicUrl)
    } catch (err) {
      console.error("Erro inesperado:", err)
      setError("Ocorreu um erro inesperado ao fazer upload da imagem.")
    } finally {
      setIsUploading(false)
    }
  }

  function handleRemoveImage() {
    setPreview(null)
    onImageUploaded("")
  }

  return (
    <div className={`border border-dashed rounded-lg p-4 flex flex-col items-center justify-center ${className}`}>
      {preview ? (
        <div className="relative w-full">
          <div className="relative w-full h-48">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-contain"
              onError={() => {
                setError("Erro ao carregar imagem. Tente novamente.")
                setPreview(null)
              }}
            />
          </div>
          <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={handleRemoveImage}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center py-6 px-4">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground" />
            )}
            <span className="mt-2 text-sm text-muted-foreground">
              {isUploading ? "Enviando..." : "Clique para selecionar uma imagem"}
            </span>
          </label>
        </>
      )}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}
