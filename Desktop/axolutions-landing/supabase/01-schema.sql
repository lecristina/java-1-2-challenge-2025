-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de perfis
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de comentários
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger para todas as tabelas
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Função para incrementar visualizações de posts
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criar perfil quando um novo usuário é criado
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, name, avatar_url)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'), NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_profile_after_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile_for_user();

-- Políticas de segurança (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Políticas para perfis
CREATE POLICY "Perfis são visíveis para todos"
ON profiles FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Usuários podem editar seus próprios perfis"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Políticas para projetos
CREATE POLICY "Projetos publicados são visíveis para todos"
ON projects FOR SELECT
TO authenticated, anon
USING (status = 'published' OR auth.uid() IN (
  SELECT user_id FROM profiles WHERE role = 'admin'
));

CREATE POLICY "Admins podem gerenciar projetos"
ON projects FOR ALL
TO authenticated
USING (auth.uid() IN (
  SELECT user_id FROM profiles WHERE role = 'admin'
));

-- Políticas para posts
CREATE POLICY "Posts publicados são visíveis para todos"
ON posts FOR SELECT
TO authenticated, anon
USING (status = 'published' OR auth.uid() = author_id OR auth.uid() IN (
  SELECT user_id FROM profiles WHERE role = 'admin'
));

CREATE POLICY "Autores podem gerenciar seus próprios posts"
ON posts FOR ALL
TO authenticated
USING (auth.uid() = author_id OR auth.uid() IN (
  SELECT user_id FROM profiles WHERE role = 'admin'
));

-- Políticas para comentários
CREATE POLICY "Comentários são visíveis para todos"
ON comments FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Usuários autenticados podem criar comentários"
ON comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar seus próprios comentários"
ON comments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios comentários"
ON comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id OR auth.uid() IN (
  SELECT user_id FROM profiles WHERE role = 'admin'
));

-- Função para promover um usuário a admin
CREATE OR REPLACE FUNCTION promote_to_admin(user_email TEXT)
RETURNS VOID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Obter o ID do usuário pelo email
  SELECT id INTO user_id FROM auth.users WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário com email % não encontrado', user_email;
  END IF;
  
  -- Atualizar o perfil para admin
  UPDATE profiles
  SET role = 'admin'
  WHERE user_id = user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Perfil para usuário % não encontrado', user_email;
  END IF;
END;
$$ LANGUAGE plpgsql;
