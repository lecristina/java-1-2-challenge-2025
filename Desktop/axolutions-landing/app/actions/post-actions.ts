"use server"

import { createServiceClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export type PostStatus = "draft" | "published"

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string
  author: string
  status: PostStatus
  created_at: string
  updated_at: string
  views: number
  featured: boolean
  tags: string[]
}

export async function getPosts() {
  const supabase = createServiceClient()
  try {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { data: data || [] }
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return { data: [], error }
  }
}

export async function getPostById(id: string) {
  const supabase = createServiceClient()
  try {
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()

    if (error) throw error
    return { data }
  } catch (error) {
    console.error(`Erro ao buscar post ${id}:`, error)
    return { data: null, error }
  }
}

export async function createPost(formData: FormData) {
  const supabase = createServiceClient()

  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const cover_image = formData.get("cover_image") as string
    const author = formData.get("author") as string
    const status = formData.get("status") as PostStatus
    const featured = formData.get("featured") === "on"
    const tagsString = formData.get("tags") as string
    const tags = tagsString ? tagsString.split(",").map((tag) => tag.trim()) : []

    const { error } = await supabase.from("posts").insert({
      title,
      slug,
      content,
      excerpt,
      cover_image,
      author,
      status,
      featured,
      tags,
    })

    if (error) throw error

    revalidatePath("/dashboard/blog")
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar post:", error)
    return { success: false, error }
  }
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = createServiceClient()

  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const cover_image = formData.get("cover_image") as string
    const author = formData.get("author") as string
    const status = formData.get("status") as PostStatus
    const featured = formData.get("featured") === "on"
    const tagsString = formData.get("tags") as string
    const tags = tagsString ? tagsString.split(",").map((tag) => tag.trim()) : []

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        content,
        excerpt,
        cover_image,
        author,
        status,
        featured,
        tags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/blog")
    revalidatePath(`/blog/${slug}`)
    return { success: true }
  } catch (error) {
    console.error(`Erro ao atualizar post ${id}:`, error)
    return { success: false, error }
  }
}

import { deletePost as deleteBlogPost } from "./blog-actions"

export async function deletePost(id: string) {
  await deleteBlogPost(id)
  revalidatePath("/dashboard/blog")
}
