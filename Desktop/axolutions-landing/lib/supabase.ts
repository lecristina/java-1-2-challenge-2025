import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Obter as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Variáveis de ambiente do Supabase não definidas:", {
    url: !!supabaseUrl,
    anonKey: !!supabaseAnonKey,
    serviceKey: !!supabaseServiceRoleKey,
  })
}

// Criar cliente Supabase para exportação padrão
export const supabase = createSupabaseClient(supabaseUrl!, supabaseAnonKey!)

// Função para criar um cliente com a service role key
export const createServiceClient = () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Variáveis de ambiente do Supabase não definidas para service client:", {
      url: !!supabaseUrl,
      serviceKey: !!supabaseServiceRoleKey,
    })
    throw new Error("Variáveis de ambiente do Supabase não definidas")
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Função para criar um cliente Supabase (para compatibilidade)
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Variáveis de ambiente do Supabase não definidas:", {
      url: !!supabaseUrl,
      anonKey: !!supabaseAnonKey,
    })
    throw new Error("Variáveis de ambiente do Supabase não definidas")
  }

  // Usar a chave anônima para operações normais
  console.log("Criando cliente Supabase com URL:", supabaseUrl)

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Novos tipos para as tabelas do Supabase
export type Project = {
  id: string
  title: string
  slug: string
  description?: string
  url?: string
  github_url?: string
  featured: boolean
  status: "draft" | "published"
  created_at: string
  updated_at: string

  // Campos virtuais (não estão na tabela, mas são preenchidos em consultas)
  pages?: ProjectPage[]
}

export type ProjectPage = {
  id: string
  project_id: string
  title: string
  type: string
  position: number
  created_at: string
  updated_at: string

  // Campo virtual
  sections?: ProjectPageSection[]
}

export type ProjectPageSection = {
  id: string
  page_id: string
  image_url: string
  position: number
  created_at: string
}

export type Post = {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  slug: string
  category: string
  views: number
  status: "draft" | "published"
  featured: boolean
  author_id: string
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  name: string
  avatar_url: string
  role: string
  bio: string
  user_id: string
  created_at: string
  updated_at: string
}
