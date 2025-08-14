-- Verificar e criar tabela de projetos se não existir
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Verificar e criar tabela de páginas de projetos se não existir
CREATE TABLE IF NOT EXISTS project_pages (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'custom',
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Verificar e criar tabela de seções de páginas de projetos se não existir
CREATE TABLE IF NOT EXISTS project_page_sections (
  id BIGSERIAL PRIMARY KEY,
  page_id BIGINT REFERENCES project_pages(id) ON DELETE CASCADE,
  image_url TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Trigger para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger para projetos
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Aplicar trigger para páginas de projetos
DROP TRIGGER IF EXISTS update_project_pages_updated_at ON project_pages;
CREATE TRIGGER update_project_pages_updated_at
BEFORE UPDATE ON project_pages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_page_sections ENABLE ROW LEVEL SECURITY;

-- Políticas para projetos
DROP POLICY IF EXISTS "Projetos publicados são visíveis publicamente" ON projects;
CREATE POLICY "Projetos publicados são visíveis publicamente" ON projects
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Administradores podem gerenciar projetos" ON projects;
CREATE POLICY "Administradores podem gerenciar projetos" ON projects
  USING (true)
  WITH CHECK (true);

-- Políticas para páginas de projetos
DROP POLICY IF EXISTS "Páginas de projetos publicados são visíveis publicamente" ON project_pages;
CREATE POLICY "Páginas de projetos publicados são visíveis publicamente" ON project_pages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_pages.project_id 
      AND projects.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Administradores podem gerenciar páginas de projetos" ON project_pages;
CREATE POLICY "Administradores podem gerenciar páginas de projetos" ON project_pages
  USING (true)
  WITH CHECK (true);

-- Políticas para seções de páginas de projetos
DROP POLICY IF EXISTS "Seções de páginas de projetos publicados são visíveis publicamente" ON project_page_sections;
CREATE POLICY "Seções de páginas de projetos publicados são visíveis publicamente" ON project_page_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM project_pages
      JOIN projects ON projects.id = project_pages.project_id
      WHERE project_pages.id = project_page_sections.page_id
      AND projects.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Administradores podem gerenciar seções de páginas de projetos" ON project_page_sections;
CREATE POLICY "Administradores podem gerenciar seções de páginas de projetos" ON project_page_sections
  USING (true)
  WITH CHECK (true);

-- Criar bucket de storage se não existir
DO $$
BEGIN
  -- Esta função é executada apenas uma vez durante a execução do script
  PERFORM storage.create_bucket('images', '{"public": true}');
EXCEPTION
  -- Ignora erro se o bucket já existir
  WHEN others THEN
    RAISE NOTICE 'Bucket já existe ou erro ao criar: %', SQLERRM;
END $$;
