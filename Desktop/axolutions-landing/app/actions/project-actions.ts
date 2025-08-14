"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar projetos:", error)
      return { projects: [], error: error.message }
    }

    return { projects: data || [], error: null }
  } catch (error: any) {
    console.error("Erro ao buscar projetos:", error)
    return { projects: [], error: error.message || "Unknown error" }
  }
}

// Adicionando a função getPublishedProjects que estava faltando
export async function getPublishedProjects() {
  try {
    console.log("Iniciando getPublishedProjects")
    const supabase = createClient()

    // Buscar projetos publicados
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (projectsError) {
      console.error("Erro ao buscar projetos publicados:", projectsError)
      return { projects: [], error: projectsError.message }
    }

    // Para cada projeto, buscar suas páginas e seções (primeira página)
    const projectsWithFirstPage = await Promise.all(
      projects.map(async (project) => {
        const { data: pages, error: pagesError } = await supabase
          .from("project_pages")
          .select("*")
          .eq("project_id", project.id)
          .order("position", { ascending: true })
          .limit(1)

        if (pagesError) {
          console.error(`Erro ao buscar páginas para o projeto ${project.id}:`, pagesError)
          return { ...project, firstPageImage: null }
        }

        // Se não tem páginas, retorna o projeto como está
        if (!pages || pages.length === 0) {
          return { ...project, firstPageImage: null }
        }

        // Buscar primeira seção da primeira página
        const { data: sections, error: sectionsError } = await supabase
          .from("project_page_sections")
          .select("*")
          .eq("page_id", pages[0].id)
          .order("position", { ascending: true })
          .limit(1)

        if (sectionsError || !sections || sections.length === 0) {
          console.error(`Erro ao buscar seções para a página ${pages[0].id}:`, sectionsError)
          return { ...project, firstPageImage: null }
        }

        return { ...project, firstPageImage: sections[0].image_url }
      }),
    )

    return { projects: projectsWithFirstPage, error: null }
  } catch (error: any) {
    console.error("Exceção ao buscar projetos publicados:", error)
    return { projects: [], error: error.message || "Erro desconhecido" }
  }
}

export async function getProjectById(id: string) {
  try {
    const supabase = createClient()

    // Buscar o projeto
    const { data: project, error: projectError } = await supabase.from("projects").select("*").eq("id", id).single()

    if (projectError) {
      console.error(`Erro ao buscar projeto ${id}:`, projectError)
      return { data: null, error: projectError.message }
    }

    // Buscar páginas
    const { data: pages, error: pagesError } = await supabase
      .from("project_pages")
      .select("*")
      .eq("project_id", id)
      .order("position", { ascending: true })

    if (pagesError) {
      console.error(`Erro ao buscar páginas para o projeto ${id}:`, pagesError)
      return {
        data: {
          ...project,
          pages: [],
        },
        error: null,
      }
    }

    // Para cada página, buscar suas seções
    const pagesWithSections = await Promise.all(
      pages.map(async (page) => {
        const { data: sections, error: sectionsError } = await supabase
          .from("project_page_sections")
          .select("*")
          .eq("page_id", page.id)
          .order("position", { ascending: true })

        if (sectionsError) {
          console.error(`Erro ao buscar seções para a página ${page.id}:`, sectionsError)
          return { ...page, sections: [] }
        }

        return { ...page, sections: sections || [] }
      }),
    )

    // Montar o objeto completo do projeto
    const projectWithRelations = {
      ...project,
      pages: pagesWithSections || [],
    }

    console.log("Projeto encontrado com todas as relações:", projectWithRelations)
    return { data: projectWithRelations, error: null }
  } catch (error: any) {
    console.error(`Erro ao buscar projeto ${id}:`, error)
    return { data: null, error: error.message || "Unknown error" }
  }
}

export async function createProject(formData: any) {
  const supabase = createClient()

  try {
    // Gerar slug a partir do título
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    // 1. Criar o projeto
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        title: formData.title,
        description: formData.description,
        url: formData.url,
        featured: formData.featured,
        status: formData.status,
        slug,
      })
      .select()
      .single();

    if (projectError) throw projectError;

    // 2. Criar as páginas
    for (const [pageIdx, page] of (formData.pages || []).entries()) {
      const { data: projectPage, error: pageError } = await supabase
        .from("project_pages")
        .insert({
          project_id: project.id,
          title: page.title,
          type: page.type,
          position: pageIdx,
        })
        .select()
        .single();

      if (pageError) throw pageError;

      // 3. Criar as seções (imagens) da página
      for (const [imgIdx, section] of (page.sections || []).entries()) {
        const { error: sectionError } = await supabase
          .from("project_page_sections")
          .insert({
            page_id: projectPage.id,
            image_url: section.image_url,
            position: imgIdx,
          });

        if (sectionError) throw sectionError;
      }
    }

    return { success: true, project };
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return { success: false, error };
  }
}

export async function updateProject(id: string, formData: any) {
  const supabase = createClient()

  try {
    // Remover o campo pages antes de atualizar o projeto
    const { pages, ...projectData } = formData

    // 1. Atualizar o projeto
    const { error: projectError } = await supabase.from("projects").update(projectData).eq("id", id)
    if (projectError) throw projectError

    // 2. Remover páginas e seções antigas
    // Buscar páginas antigas
    const { data: oldPages } = await supabase.from("project_pages").select("id").eq("project_id", id)
    if (oldPages && oldPages.length > 0) {
      const oldPageIds = oldPages.map((p: any) => p.id)
      // Remover seções antigas
      await supabase.from("project_page_sections").delete().in("page_id", oldPageIds)
      // Remover páginas antigas
      await supabase.from("project_pages").delete().in("id", oldPageIds)
    }

    // 3. Inserir novas páginas e seções
    for (const [pageIdx, page] of (pages || []).entries()) {
      const { data: projectPage, error: pageError } = await supabase
        .from("project_pages")
        .insert({
          project_id: id,
          title: page.title,
          type: page.type,
          position: pageIdx,
        })
        .select()
        .single()
      if (pageError) throw pageError

      for (const [imgIdx, section] of (page.sections || []).entries()) {
        const { error: sectionError } = await supabase
          .from("project_page_sections")
          .insert({
            page_id: projectPage.id,
            image_url: section.image_url,
            position: imgIdx,
          })
        if (sectionError) throw sectionError
      }
    }

    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    console.error(`Erro ao atualizar projeto ${id}:`, error)
    return { success: false, error }
  }
}

export async function deleteProject(id: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    console.error(`Erro ao excluir projeto ${id}:`, error)
    return { success: false, error }
  }
}

export async function toggleProjectFeatured(id: string, featured: boolean) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("projects").update({ featured }).eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    console.error(`Erro ao alternar destaque do projeto ${id}:`, error)
    return { success: false, error }
  }
}

export async function toggleProjectStatus(id: string, status: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("projects").update({ status }).eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/projects")
    return { success: true }
  } catch (error) {
    console.error(`Erro ao alternar status do projeto ${id}:`, error)
    return { success: false, error }
  }
}
