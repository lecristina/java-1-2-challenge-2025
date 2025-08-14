-- Verificar e criar a tabela de projetos se não existir
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verificar e criar a tabela de perfis se não existir
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verificar e criar a tabela de posts se não existir
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  author_id UUID REFERENCES profiles(id),
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados de exemplo para projetos se a tabela estiver vazia
INSERT INTO projects (title, description, image_url, url, featured, status)
SELECT 
  'Projeto de Exemplo', 
  'Este é um projeto de exemplo para demonstração.', 
  'https://via.placeholder.com/800x600', 
  'https://exemplo.com', 
  true, 
  'published'
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

-- Inserir dados de exemplo para posts se a tabela estiver vazia
-- Primeiro, verificamos se existe pelo menos um perfil
DO $$
DECLARE
  profile_id UUID;
BEGIN
  -- Obter um ID de perfil existente ou criar um novo
  SELECT id INTO profile_id FROM profiles LIMIT 1;
  
  IF profile_id IS NULL THEN
    -- Se não houver perfil, verificamos se há usuários
    DECLARE
      user_id UUID;
    BEGIN
      SELECT id INTO user_id FROM auth.users LIMIT 1;
      
      IF user_id IS NOT NULL THEN
        -- Criar um perfil para o usuário existente
        INSERT INTO profiles (user_id, name)
        VALUES (user_id, 'Administrador')
        RETURNING id INTO profile_id;
      END IF;
    END;
  END IF;
  
  -- Se temos um perfil, inserimos posts de exemplo
  IF profile_id IS NOT NULL THEN
    INSERT INTO posts (title, slug, content, excerpt, image_url, category, author_id, featured, status)
    SELECT 
      'Post de Exemplo', 
      'post-de-exemplo', 
      'Este é um conteúdo de exemplo para o post.', 
      'Este é um resumo do post de exemplo.', 
      'https://via.placeholder.com/800x600', 
      'Tecnologia', 
      profile_id, 
      true, 
      'published'
    WHERE NOT EXISTS (SELECT 1 FROM posts LIMIT 1);
  END IF;
END $$;

-- Criar função para incrementar visualizações de posts se não existir
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- Adicionar políticas de segurança para acesso anônimo às tabelas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para projetos
CREATE POLICY IF NOT EXISTS "Projetos visíveis para todos" 
ON projects FOR SELECT 
USING (true);

-- Políticas para posts
CREATE POLICY IF NOT EXISTS "Posts visíveis para todos" 
ON posts FOR SELECT 
USING (true);

-- Políticas para perfis
CREATE POLICY IF NOT EXISTS "Perfis visíveis para todos" 
ON profiles FOR SELECT 
USING (true);
