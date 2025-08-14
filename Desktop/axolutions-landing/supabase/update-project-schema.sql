-- Adicionar colunas necessárias para armazenar páginas e imagens adicionais
ALTER TABLE projects ADD COLUMN IF NOT EXISTS pages JSONB DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS page_images JSONB DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS has_additional_pages BOOLEAN DEFAULT false;

-- Garantir que temos colunas para conteúdo específico
ALTER TABLE projects ADD COLUMN IF NOT EXISTS landing_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS about_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS blog_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS system_content TEXT;

-- Garantir que temos colunas para URLs de imagens específicas
ALTER TABLE projects ADD COLUMN IF NOT EXISTS landing_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS about_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS blog_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS system_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS mobile_landing_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS mobile_about_image_url TEXT;

-- Garantir que temos flags para tipos de páginas
ALTER TABLE projects ADD COLUMN IF NOT EXISTS has_about BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS has_blog BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS has_system BOOLEAN DEFAULT false;
