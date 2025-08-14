import { Header } from "@/components/dashboard/header"
import { PostForm } from "../post-form"

export default function NewPostPage() {
  return (
    <div>
      <Header title="Novo Post" />
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Criar Novo Post</h2>
          <p className="text-muted-foreground">Preencha os campos abaixo para criar um novo post.</p>
        </div>
        <PostForm />
      </div>
    </div>
  )
}
