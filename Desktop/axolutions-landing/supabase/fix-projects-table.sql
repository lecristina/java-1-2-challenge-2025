-- Verificar se a tabela projects existe e criar se não existir
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  slug TEXT,
  
  -- Campos para páginas específicas
  landing_content TEXT,
  about_content TEXT,
  blog_content TEXT,
  system_content TEXT,
  
  -- URLs de imagens para páginas específicas
  landing_image_url TEXT,
  about_image_url TEXT,
  blog_image_url TEXT,
  system_image_url TEXT,
  mobile_landing_image_url TEXT,
  mobile_about_image_url TEXT,
  
  -- Flags para tipos de páginas
  has_about BOOLEAN DEFAULT false,
  has_blog BOOLEAN DEFAULT false,
  has_system BOOLEAN DEFAULT false,
  has_additional_pages BOOLEAN DEFAULT false,
  
  -- Campos para páginas personalizadas (JSONB)
  pages JSONB,
  page_images JSONB
);

-- Verificar e adicionar colunas que podem estar faltando
DO $$
BEGIN
  -- Verificar e adicionar coluna pages (JSONB)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'pages') THEN
    ALTER TABLE projects ADD COLUMN pages JSONB;
  END IF;
  
  -- Verificar e adicionar coluna page_images (JSONB)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'page_images') THEN
    ALTER TABLE projects ADD COLUMN page_images JSONB;
  END IF;
  
  -- Verificar e adicionar coluna slug
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'slug') THEN
    ALTER TABLE projects ADD COLUMN slug TEXT;
  END IF;
  
  -- Verificar e adicionar flags para tipos de páginas
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'has_about') THEN
    ALTER TABLE projects ADD COLUMN has_about BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'has_blog') THEN
    ALTER TABLE projects ADD COLUMN has_blog BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'has_system') THEN
    ALTER TABLE projects ADD COLUMN has_system BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'projects' AND column_name = 'has_additional_pages') THEN
    ALTER TABLE projects ADD COLUMN has_additional_pages BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Verificar e configurar políticas de segurança (RLS)
-- Desabilitar RLS temporariamente para facilitar o desenvolvimento
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Criar política para permitir todas as operações (temporário para desenvolvimento)
DROP POLICY IF EXISTS "Allow all operations on projects" ON projects;
CREATE POLICY "Allow all operations on projects" ON projects
  USING (true)
  WITH CHECK (true);

-- Criar bucket de armazenamento para imagens se não existir
-- Nota: Isso precisa ser executado via API, não via SQL
