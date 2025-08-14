-- Verificar e criar extensão uuid-ossp se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Verificar e criar tabela projects
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'projects'
    ) THEN
        CREATE TABLE projects (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            description TEXT,
            url TEXT,
            github_url TEXT,
            featured BOOLEAN DEFAULT false,
            status TEXT DEFAULT 'draft',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );
        
        ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Projetos publicados são visíveis publicamente" ON projects
            FOR SELECT USING (status = 'published');
            
        CREATE POLICY "Administradores podem gerenciar projetos" ON projects
            USING (auth.role() = 'authenticated')
            WITH CHECK (auth.role() = 'authenticated');
            
        RAISE NOTICE 'Tabela projects criada com sucesso';
    ELSE
        RAISE NOTICE 'Tabela projects já existe';
    END IF;
END $$;

-- Verificar e criar tabela project_pages
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'project_pages'
    ) THEN
        CREATE TABLE project_pages (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            type TEXT DEFAULT 'custom',
            position INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );
        
        ALTER TABLE project_pages ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Páginas de projetos publicados são visíveis publicamente" ON project_pages
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM projects
                    WHERE projects.id = project_pages.project_id
                    AND projects.status = 'published'
                )
            );
            
        CREATE POLICY "Administradores podem gerenciar páginas de projetos" ON project_pages
            USING (auth.role() = 'authenticated')
            WITH CHECK (auth.role() = 'authenticated');
            
        RAISE NOTICE 'Tabela project_pages criada com sucesso';
    ELSE
        RAISE NOTICE 'Tabela project_pages já existe';
    END IF;
END $$;

-- Verificar e criar tabela project_page_sections
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'project_page_sections'
    ) THEN
        CREATE TABLE project_page_sections (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            page_id UUID REFERENCES project_pages(id) ON DELETE CASCADE,
            image_url TEXT,
            position INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );
        
        ALTER TABLE project_page_sections ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Seções de páginas de projetos publicados são visíveis publicamente" ON project_page_sections
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM project_pages
                    JOIN projects ON projects.id = project_pages.project_id
                    WHERE project_pages.id = project_page_sections.page_id
                    AND projects.status = 'published'
                )
            );

        CREATE POLICY "Administradores podem gerenciar seções de páginas de projetos" ON project_page_sections
            USING (auth.role() = 'authenticated')
            WITH CHECK (auth.role() = 'authenticated');
            
        RAISE NOTICE 'Tabela project_page_sections criada com sucesso';
    ELSE
        RAISE NOTICE 'Tabela project_page_sections já existe';
    END IF;
END $$;

-- Configurar bucket de storage para imagens
DO $$
BEGIN
    BEGIN
        SELECT storage.create_bucket('images', '{"public": true, "fileSizeLimit": 10485760}');
        RAISE NOTICE 'Bucket images criado com sucesso';
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Bucket images já existe ou ocorreu um erro: %', SQLERRM;
    END;
END $$;

-- Configurar políticas de acesso ao bucket de imagens
DO $$
BEGIN
    BEGIN
        -- Política para leitura pública
        SELECT storage.create_policy(
            'images',
            'Leitura pública',
            'SELECT',
            'public',
            true
        );
        
        -- Política para inserção por usuários autenticados
        SELECT storage.create_policy(
            'images',
            'Inserção por usuários autenticados',
            'INSERT',
            'authenticated',
            true
        );
        
        -- Política para atualização por usuários autenticados
        SELECT storage.create_policy(
            'images',
            'Atualização por usuários autenticados',
            'UPDATE',
            'authenticated',
            true
        );
        
        -- Política para exclusão por usuários autenticados
        SELECT storage.create_policy(
            'images',
            'Exclusão por usuários autenticados',
            'DELETE',
            'authenticated',
            true
        );
        
        RAISE NOTICE 'Políticas de acesso ao bucket images configuradas com sucesso';
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Erro ao configurar políticas de acesso ao bucket images: %', SQLERRM;
    END;
END $$;

-- Verificar registros nas tabelas
SELECT 'projects' as tabela, COUNT(*) as registros FROM projects
UNION ALL
SELECT 'project_pages' as tabela, COUNT(*) as registros FROM project_pages
UNION ALL
SELECT 'project_page_sections' as tabela, COUNT(*) as registros FROM project_page_sections;
