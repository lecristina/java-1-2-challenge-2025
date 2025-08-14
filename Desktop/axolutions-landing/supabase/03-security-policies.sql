-- Habilitar RLS (Row Level Security) para todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
DROP POLICY IF EXISTS "Perfis são visíveis para todos" ON profiles;
CREATE POLICY "Perfis são visíveis para todos" ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Usuários podem editar seus próprios perfis" ON profiles;
CREATE POLICY "Usuários podem editar seus próprios perfis" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para projects
DROP POLICY IF EXISTS "Projetos publicados são visíveis para todos" ON projects;
CREATE POLICY "Projetos publicados são visíveis para todos" ON projects
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Administradores podem gerenciar todos os projetos" ON projects;
CREATE POLICY "Administradores podem gerenciar todos os projetos" ON projects
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Políticas para posts
DROP POLICY IF EXISTS "Posts publicados são visíveis para todos" ON posts;
CREATE POLICY "Posts publicados são visíveis para todos" ON posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Administradores podem gerenciar todos os posts" ON posts;
CREATE POLICY "Administradores podem gerenciar todos os posts" ON posts
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Autores podem gerenciar seus próprios posts" ON posts;
CREATE POLICY "Autores podem gerenciar seus próprios posts" ON posts
  USING (author_id = auth.uid());

-- Políticas para comments
DROP POLICY IF EXISTS "Comentários são visíveis para todos" ON comments;
CREATE POLICY "Comentários são visíveis para todos" ON comments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Usuários autenticados podem criar comentários" ON comments;
CREATE POLICY "Usuários autenticados podem criar comentários" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Usuários podem editar seus próprios comentários" ON comments;
CREATE POLICY "Usuários podem editar seus próprios comentários" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem excluir seus próprios comentários" ON comments;
CREATE POLICY "Usuários podem excluir seus próprios comentários" ON comments
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Administradores podem gerenciar todos os comentários" ON comments;
CREATE POLICY "Administradores podem gerenciar todos os comentários" ON comments
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
