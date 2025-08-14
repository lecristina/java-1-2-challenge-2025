import { ProjectForm } from "../project-form"

export default function NewProjectPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-transparent bg-clip-text">
          Criar Novo Projeto
        </h1>
        <p className="text-white/70 mt-2">Preencha os campos abaixo para criar um novo projeto.</p>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-lg p-6">
        <ProjectForm />
      </div>
    </div>
  )
}
