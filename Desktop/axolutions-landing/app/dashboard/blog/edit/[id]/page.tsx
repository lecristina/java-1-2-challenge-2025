import { Header } from "@/components/dashboard/header"
import { PostForm } from "../../post-form"
import { getPostById } from "@/app/actions/blog-actions"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  console.log("Edit post page - Post ID:", params.id)

  const { data: post, error } = await getPostById(params.id)

  console.log("Post data:", post)
  console.log("Error:", error)

  if (error || !post) {
    console.error("Post not found or error:", error)
    notFound()
  }

  return (
    <div>
      <Header title={`Editar Post: ${post.title}`} />
      <div className="p-6">
        <PostForm post={post} />
      </div>
    </div>
  )
}
