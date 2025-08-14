-- Remover a tabela existente se necessário
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS project_cover_images CASCADE;
DROP TABLE IF EXISTS project_pages CASCADE;
DROP TABLE IF EXISTS project_page_images CASCADE;

-- Criar nova tabela de projetos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela para armazenar páginas de projetos
CREATE TABLE project_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela para armazenar imagens de páginas
-- Cada página pode ter múltiplas imagens que serão exibidas em sequência
CREATE TABLE project_page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES project_pages(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
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

-- Aplicar trigger na tabela projects
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Aplicar trigger na tabela project_pages
DROP TRIGGER IF EXISTS update_project_pages_updated_at ON project_pages;
CREATE TRIGGER update_project_pages_updated_at
BEFORE UPDATE ON project_pages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Desabilitar RLS temporariamente para facilitar o desenvolvimento
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_page_sections DISABLE ROW LEVEL SECURITY;

-- Criar índices para melhorar a performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_pages_project_id ON project_pages(project_id);
CREATE INDEX idx_project_page_sections_page_id ON project_page_sections(page_id);

-- Inserir alguns projetos de exemplo
INSERT INTO projects (title, slug, description, url, featured, status)
VALUES 
  ('Axolutions Website', 'axolutions-website', 'Website corporativo da Axolutions com landing page, sobre e blog.', 'https://axolutions.com', true, 'published'),
  ('Dashboard Analytics', 'dashboard-analytics', 'Dashboard interativo para visualização de dados e métricas de negócios.', '#', true, 'published');

-- Inserir páginas para os projetos de exemplo
INSERT INTO project_pages (project_id, title, type, position)
VALUES 
  ((SELECT id FROM projects WHERE slug = 'axolutions-website'), 'Landing Page', 'landing', 0),
  ((SELECT id FROM projects WHERE slug = 'axolutions-website'), 'Sobre', 'about', 1),
  ((SELECT id FROM projects WHERE slug = 'axolutions-website'), 'Blog', 'blog', 2),
  ((SELECT id FROM projects WHERE slug = 'dashboard-analytics'), 'Dashboard Principal', 'landing', 0);

-- Inserir seções de imagens para as páginas (usando placeholders)
INSERT INTO project_page_sections (page_id, image_url, position)
VALUES 
  ((SELECT id FROM project_pages WHERE project_id = (SELECT id FROM projects WHERE slug = 'axolutions-website') AND title = 'Landing Page'), 
   '/placeholder.svg?height=1200&width=800&query=axolutions-landing-page-top', 0),
  ((SELECT id FROM project_pages WHERE project_id = (SELECT id FROM projects WHERE slug = 'axolutions-website') AND title = 'Landing Page'), 
   '/placeholder.svg?height=1200&width=800&query=axolutions-landing-page-middle', 1),
  ((SELECT id FROM project_pages WHERE project_id = (SELECT id FROM projects WHERE slug = 'axolutions-website') AND title = 'Landing Page'), 
   '/placeholder.svg?height=1200&width=800&query=axolutions-landing-page-bottom', 2),
  ((SELECT id FROM project_pages WHERE project_id = (SELECT id FROM projects WHERE slug = 'axolutions-website') AND title = 'Sobre'), 
   '/placeholder.svg?height=1200&width=800&query=axolutions-about-page', 0),
  ((SELECT id FROM project_pages WHERE project_id = (SELECT id FROM projects WHERE slug = 'axolutions-website') AND title = 'Blog'), 
   '/placeholder.svg?height=1200&width=800&query=axolutions-blog-page', 0);
