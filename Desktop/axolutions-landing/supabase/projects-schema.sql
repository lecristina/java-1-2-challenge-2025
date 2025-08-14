-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Trigger para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Políticas de segurança (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Política para visualização pública de projetos publicados
DROP POLICY IF EXISTS "Projetos publicados são visíveis publicamente" ON projects;
CREATE POLICY "Projetos publicados são visíveis publicamente" ON projects
  FOR SELECT USING (status = 'published');

-- Política para administradores gerenciarem projetos
DROP POLICY IF EXISTS "Administradores podem gerenciar projetos" ON projects;
CREATE POLICY "Administradores podem gerenciar projetos" ON projects
  USING (true)
  WITH CHECK (true);

-- Inserir alguns projetos de exemplo
INSERT INTO projects (title, description, image_url, tags, url, github_url, featured, status)
VALUES 
  ('E-commerce Moderno', 'Plataforma de e-commerce completa com pagamentos, carrinho e painel administrativo.', '/placeholder.svg?height=600&width=800', ARRAY['Next.js', 'Tailwind CSS', 'Stripe'], '#', '#', true, 'published'),
  ('Dashboard Analytics', 'Dashboard interativo para visualização de dados e métricas de negócios.', '/placeholder.svg?height=600&width=800', ARRAY['React', 'D3.js', 'Firebase'], '#', '#', true, 'published'),
  ('App de Gestão Financeira', 'Aplicativo para controle de finanças pessoais com gráficos e relatórios.', '/placeholder.svg?height=600&width=800', ARRAY['React Native', 'TypeScript', 'Node.js'], '#', '#', true, 'published')
ON CONFLICT DO NOTHING;
