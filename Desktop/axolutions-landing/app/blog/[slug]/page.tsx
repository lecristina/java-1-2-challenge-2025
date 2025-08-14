import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogPost from "@/components/blog-post"
import { getPostBySlug, incrementPostViews } from "@/app/actions/blog-actions"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const { post, error } = await getPostBySlug(params.slug)

    if (!post || error) {
      console.error(`Post not found or error: ${error}`)
      notFound()
    }

    // Incrementar visualizações - wrap in try/catch
    try {
      await incrementPostViews(params.slug)
    } catch (err) {
      console.error("Error incrementing views:", err)
      // Continue even if view increment fails
    }

    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <Header />
        <main className="pt-32 pb-20">
          <BlogPost post={post} />
        </main>
        <Footer />
      </div>
    )
  } catch (err) {
    console.error("Error in blog post page:", err)
    notFound()
  }
}
