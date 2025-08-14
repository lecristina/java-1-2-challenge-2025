"use server"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

interface ProjectData {
  title: string
  description: string
  url?: string
  github_url?: string
  featured?: boolean
  thumbnail_url?: string
}

export async function createProject(data: ProjectData) {
  try {
    const cookieStore = cookies()
    const supabase = createClientComponentClient({ cookies: () => cookieStore })

    console.log("Criando projeto com dados:", data)

    // Gerar slug a partir do título
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    const { error, data: project } = await supabase
      .from("projects")
      .insert({
        title: data.title,
        slug,
        description: data.description,
        url: data.url || null,
        github_url: data.github_url || null,
        featured: data.featured || false,
        thumbnail_url: data.thumbnail_url || null,
        status: "draft",
      })
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar projeto:", error)
      throw new Error(`Erro ao criar projeto: ${error.message}`)
    }

    console.log("Projeto criado com sucesso:", project)

    revalidatePath("/dashboard/projects")
    return project
  } catch (err) {
    console.error("Erro inesperado ao criar projeto:", err)
    throw err
  }
}

export async function updateProject(id: string, data: ProjectData) {
  try {
    const cookieStore = cookies()
    const supabase = createClientComponentClient({ cookies: () => cookieStore })

    console.log("Atualizando projeto com ID:", id, "Dados:", data)

    const { error, data: project } = await supabase
      .from("projects")
      .update({
        title: data.title,
        description: data.description,
        url: data.url || null,
        github_url: data.github_url || null,
        featured: data.featured || false,
        thumbnail_url: data.thumbnail_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar projeto:", error)
      throw new Error(`Erro ao atualizar projeto: ${error.message}`)
    }

    console.log("Projeto atualizado com sucesso:", project)

    revalidatePath("/dashboard/projects")
    return project
  } catch (err) {
    console.error("Erro inesperado ao atualizar projeto:", err)
    throw err
  }
}

export async function deleteProject(id: string) {
  try {
    const cookieStore = cookies()
    const supabase = createClientComponentClient({ cookies: () => cookieStore })

    console.log("Excluindo projeto com ID:", id)

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Erro ao excluir projeto:", error)
      throw new Error(`Erro ao excluir projeto: ${error.message}`)
    }

    console.log("Projeto excluído com sucesso")

    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (err) {
    console.error("Erro inesperado ao excluir projeto:", err)
    throw err
  }
}

export async function toggleProjectStatus(id: string) {
  try {
    const cookieStore = cookies()
    const supabase = createClientComponentClient({ cookies: () => cookieStore })

    // Primeiro, obtenha o status atual
    const { data: project, error: fetchError } = await supabase.from("projects").select("status").eq("id", id).single()

    if (fetchError) {
      console.error("Erro ao buscar status do projeto:", fetchError)
      throw new Error(`Erro ao buscar status do projeto: ${fetchError.message}`)
    }

    // Alternar entre 'draft' e 'published'
    const newStatus = project.status === "published" ? "draft" : "published"

    console.log(`Alterando status do projeto ${id} de ${project.status} para ${newStatus}`)

    const { error: updateError } = await supabase
      .from("projects")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (updateError) {
      console.error("Erro ao atualizar status do projeto:", updateError)
      throw new Error(`Erro ao atualizar status do projeto: ${updateError.message}`)
    }

    console.log("Status do projeto atualizado com sucesso")

    revalidatePath("/dashboard/projects")
    return { success: true, status: newStatus }
  } catch (err) {
    console.error("Erro inesperado ao alternar status do projeto:", err)
    throw err
  }
}
