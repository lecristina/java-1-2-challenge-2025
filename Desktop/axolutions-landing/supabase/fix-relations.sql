-- Verificar se a tabela posts existe
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts') THEN
    -- Criar a tabela posts se não existir
    CREATE TABLE public.posts (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      image_url TEXT,
      category TEXT,
      tags TEXT[] DEFAULT '{}',
      views INTEGER DEFAULT 0,
      featured BOOLEAN DEFAULT false,
      status TEXT DEFAULT 'draft',
      author_id UUID,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;

  -- Verificar se a tabela profiles existe
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    -- Criar a tabela profiles se não existir
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      avatar_url TEXT,
      role TEXT DEFAULT 'user',
      bio TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;

  -- Adicionar a chave estrangeira se não existir
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'posts_author_id_fkey' 
    AND table_name = 'posts'
  ) THEN
    -- Adicionar a chave estrangeira
    ALTER TABLE public.posts 
    ADD CONSTRAINT posts_author_id_fkey 
    FOREIGN KEY (author_id) 
    REFERENCES public.profiles(id) 
    ON DELETE SET NULL;
  END IF;
END $$;

-- Inserir dados de exemplo se as tabelas estiverem vazias
INSERT INTO public.profiles (id, name, role, bio)
SELECT 
  uuid_generate_v4(), 
  'Admin', 
  'admin', 
  'Administrador do sistema'
WHERE NOT EXISTS (SELECT 1 FROM public.profiles LIMIT 1);

-- Obter o ID do primeiro perfil para usar como autor
DO $$
DECLARE
  first_profile_id UUID;
BEGIN
  SELECT id INTO first_profile_id FROM public.profiles LIMIT 1;
  
  -- Inserir posts de exemplo se a tabela estiver vazia
  IF NOT EXISTS (SELECT 1 FROM public.posts LIMIT 1) THEN
    INSERT INTO public.posts (
      title, 
      slug, 
      content, 
      excerpt, 
      image_url, 
      category, 
      featured, 
      status, 
      author_id
    ) VALUES 
    (
      'Introdução ao Next.js', 
      'introducao-ao-nextjs', 
      '<p>Next.js é um framework React que permite funcionalidades como renderização do lado do servidor e geração de sites estáticos para aplicativos da web baseados em React.</p><p>Neste artigo, vamos explorar os conceitos básicos do Next.js e como começar a usá-lo em seus projetos.</p>', 
      'Aprenda os conceitos básicos do Next.js e como começar a usá-lo em seus projetos.', 
      '/placeholder.svg?height=600&width=800', 
      'Desenvolvimento', 
      true, 
      'published', 
      first_profile_id
    ),
    (
      'Estilização com Tailwind CSS', 
      'estilizacao-com-tailwind-css', 
      '<p>Tailwind CSS é um framework CSS utilitário que permite criar designs personalizados sem sair do seu HTML.</p><p>Neste artigo, vamos ver como integrar o Tailwind CSS em um projeto Next.js e como usá-lo para criar interfaces modernas e responsivas.</p>', 
      'Aprenda a usar o Tailwind CSS para criar interfaces modernas e responsivas em projetos Next.js.', 
      '/placeholder.svg?height=600&width=800', 
      'Design', 
      false, 
      'published', 
      first_profile_id
    ),
    (
      'Trabalhando com APIs no Next.js', 
      'trabalhando-com-apis-no-nextjs', 
      '<p>Next.js oferece várias maneiras de trabalhar com APIs, desde API Routes até Server Components.</p><p>Neste artigo, vamos explorar as diferentes abordagens para integrar APIs em seus projetos Next.js e quando usar cada uma delas.</p>', 
      'Conheça as diferentes abordagens para integrar APIs em seus projetos Next.js.', 
      '/placeholder.svg?height=600&width=800', 
      'Backend', 
      false, 
      'published', 
      first_profile_id
    );
  END IF;
END $$;

-- Criar função para incrementar visualizações se não existir
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- Configurar políticas de segurança (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
DROP POLICY IF EXISTS "Perfis são visíveis para todos" ON profiles;
CREATE POLICY "Perfis são visíveis para todos" ON profiles
  FOR SELECT USING (true);

-- Políticas para posts
DROP POLICY IF EXISTS "Posts publicados são visíveis para todos" ON posts;
CREATE POLICY "Posts publicados são visíveis para todos" ON posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Administradores podem gerenciar todos os posts" ON posts;
CREATE POLICY "Administradores podem gerenciar todos os posts" ON posts
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  ));

DROP POLICY IF EXISTS "Autores podem gerenciar seus próprios posts" ON posts;
CREATE POLICY "Autores podem gerenciar seus próprios posts" ON posts
  USING (
    author_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );
