import { getPublishedPosts } from "@/app/actions/blog-actions"
import BlogPageClient from "./BlogPageClient"

export const metadata = {
  title: "Blog | Axolutions",
  description: "Artigos, tutoriais e insights sobre desenvolvimento web, design e tecnologia.",
}

export default async function BlogPage() {
  // Fetch data on the server side
  const { posts, error } = await getPublishedPosts()

  // Handle error if needed
  if (error) {
    console.error("Error fetching posts:", error)
  }

  // Pass the fetched data to the client component
  return <BlogPageClient initialPosts={posts || []} />
}
