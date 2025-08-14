"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getPosts() {
  const supabase = createClient()

  try {
    console.log("Fetching all posts")
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
      return { posts: [], error: error.message }
    }

    console.log(`Retrieved ${data?.length || 0} posts`)
    return { posts: data || [], error: null }
  } catch (error: any) {
    console.error("Error fetching posts:", error)
    return { posts: [], error: error.message || "Unknown error" }
  }
}

export async function getPublishedPosts() {
  const supabase = createClient()

  try {
    console.log("Fetching published posts")
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching published posts:", error)
      return { posts: null, error: error.message }
    }

    console.log(`Retrieved ${data?.length || 0} published posts`)
    return { posts: data, error: null }
  } catch (error: any) {
    console.error("Error:", error)
    return { posts: null, error: "Failed to fetch posts" }
  }
}

export async function getFeaturedPosts() {
  const supabase = createClient()

  try {
    console.log("Fetching featured posts")
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching featured posts:", error)
      return { posts: [], error: error.message }
    }

    console.log(`Retrieved ${data?.length || 0} featured posts`)
    return { posts: data || [], error: null }
  } catch (error: any) {
    console.error("Error fetching featured posts:", error)
    return { posts: [], error: error.message || "Unknown error" }
  }
}

export async function getPostById(id: string) {
  const supabase = createClient()

  try {
    console.log("Fetching post with ID:", id)
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching post with ID ${id}:`, error)
      return { data: null, error: error.message }
    }

    console.log("Post data retrieved:", data)
    return { data, error: null }
  } catch (error: any) {
    console.error(`Error fetching post with ID ${id}:`, error)
    return { data: null, error: error.message || "Unknown error" }
  }
}

export async function getPostBySlug(slug: string) {
  const supabase = createClient()

  try {
    console.log("Fetching post with slug:", slug)
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single()

    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error)
      return { post: null, error: error.message }
    }

    console.log("Post data retrieved:", data)
    return { post: data, error: null }
  } catch (error: any) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return { post: null, error: error.message || "Unknown error" }
  }
}

export async function createPost(postData: any) {
  const supabase = createClient()

  try {
    console.log("Creating post with data:", postData)

    if (!postData.title || !postData.slug || !postData.content) {
      return { post: null, error: "Title, slug, and content are required" }
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt,
          image_url: postData.image_url,
          category: postData.category,
          featured: postData.featured,
          status: postData.status,
        },
      ])
      .select()

    if (error) {
      console.error("Error creating post:", error)
      return { post: null, error: error.message }
    }

    console.log("Post created successfully:", data)
    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { post: data?.[0] || null, error: null }
  } catch (error: any) {
    console.error("Error creating post:", error)
    return { post: null, error: error.message || "Unknown error creating post" }
  }
}

export async function updatePost(id: string, postData: any) {
  const supabase = createClient()

  try {
    console.log("Updating post with ID:", id, "Data:", postData)

    if (!postData.title || !postData.slug || !postData.content) {
      return { post: null, error: "Title, slug, and content are required" }
    }

    const { data, error } = await supabase
      .from("posts")
      .update({
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        image_url: postData.image_url,
        category: postData.category,
        featured: postData.featured,
        status: postData.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error(`Error updating post with ID ${id}:`, error)
      return { post: null, error: error.message }
    }

    console.log("Post updated successfully:", data)
    revalidatePath("/dashboard/blog")
    revalidatePath(`/blog/${postData.slug}`)
    revalidatePath("/")

    return { post: data?.[0] || null, error: null }
  } catch (error: any) {
    console.error(`Error updating post with ID ${id}:`, error)
    return { post: null, error: error.message || `Unknown error updating post ${id}` }
  }
}

export async function deletePost(id: string) {
  const supabase = createClient()

  try {
    console.log("Deleting post with ID:", id)
    const { error } = await supabase.from("posts").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting post with ID ${id}:`, error)
      return { success: false, error: error.message }
    }

    console.log("Post deleted successfully")
    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { success: true, error: null }
  } catch (error: any) {
    console.error(`Error deleting post with ID ${id}:`, error)
    return { success: false, error: error.message || `Unknown error deleting post ${id}` }
  }
}

export async function incrementPostViews(slug: string) {
  const supabase = createClient()

  try {
    console.log("Incrementing views for post with slug:", slug)
    const { error } = await supabase.rpc("increment_post_views", { post_slug: slug })

    if (error) {
      console.error(`Error incrementing views for post ${slug}:`, error.message)
      return { error: error.message }
    }

    console.log("Post views incremented successfully")
    revalidatePath(`/blog/${slug}`)
    return { error: null }
  } catch (error: any) {
    console.error(`Error incrementing views for post ${slug}:`, error)
    return { error: error.message || `Failed to increment views for post ${slug}` }
  }
}

export async function togglePostFeatured(id: string, featured: boolean) {
  const supabase = createClient()

  try {
    console.log("Toggling featured status for post ID:", id, "Featured:", featured)
    const { error } = await supabase
      .from("posts")
      .update({ featured, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      console.error(`Error updating featured status for post with ID ${id}:`, error.message)
      return { error: error.message }
    }

    console.log("Post featured status updated successfully")
    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { error: null }
  } catch (error: any) {
    console.error(`Error updating featured status for post with ID ${id}:`, error)
    return { error: error.message || `Failed to update featured status for post with ID ${id}` }
  }
}

export async function togglePostStatus(id: string, status: "published" | "draft") {
  const supabase = createClient()

  try {
    console.log("Toggling status for post ID:", id, "Status:", status)
    const { error } = await supabase.from("posts").update({ status, updated_at: new Date().toISOString() }).eq("id", id)

    if (error) {
      console.error(`Error updating status for post with ID ${id}:`, error.message)
      return { error: error.message }
    }

    console.log("Post status updated successfully")
    revalidatePath("/dashboard/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { error: null }
  } catch (error: any) {
    console.error(`Error updating status for post with ID ${id}:`, error)
    return { error: error.message || `Failed to update status for post with ID ${id}` }
  }
}
