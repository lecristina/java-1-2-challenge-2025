-- Verificar se a tabela project_page_sections existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'project_page_sections'
    ) THEN
        -- Criar a tabela se não existir
        CREATE TABLE project_page_sections (
            id BIGSERIAL PRIMARY KEY,
            page_id BIGINT REFERENCES project_pages(id) ON DELETE CASCADE,
            image_url TEXT,
            position INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );
        
        -- Habilitar RLS
        ALTER TABLE project_page_sections ENABLE ROW LEVEL SECURITY;
        
        -- Adicionar políticas
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
            USING (true)
            WITH CHECK (true);
            
        RAISE NOTICE 'Tabela project_page_sections criada com sucesso';
    ELSE
        -- Verificar se a coluna image_url existe
        IF NOT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'project_page_sections' 
            AND column_name = 'image_url'
        ) THEN
            -- Adicionar a coluna se não existir
            ALTER TABLE project_page_sections ADD COLUMN image_url TEXT;
            RAISE NOTICE 'Coluna image_url adicionada à tabela project_page_sections';
        END IF;
        
        RAISE NOTICE 'Tabela project_page_sections já existe';
    END IF;
END $$;

-- Verificar se existem registros na tabela
SELECT COUNT(*) FROM project_page_sections;

-- Verificar se o bucket de storage existe
DO $$
BEGIN
    PERFORM storage.create_bucket('images', '{"public": true, "fileSizeLimit": 10485760}');
    RAISE NOTICE 'Bucket images criado ou já existente';
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Erro ao criar bucket: %', SQLERRM;
END $$;
