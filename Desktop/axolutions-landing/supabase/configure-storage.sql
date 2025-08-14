-- Verificar se o bucket 'images' existe e criar se não existir
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

-- Remover políticas existentes para evitar conflitos
DO $$
BEGIN
    BEGIN
        SELECT storage.delete_policy('images', 'Leitura pública');
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Política não existe ou erro ao remover: %', SQLERRM;
    END;
    
    BEGIN
        SELECT storage.delete_policy('images', 'Inserção por usuários autenticados');
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Política não existe ou erro ao remover: %', SQLERRM;
    END;
    
    BEGIN
        SELECT storage.delete_policy('images', 'Atualização por usuários autenticados');
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Política não existe ou erro ao remover: %', SQLERRM;
    END;
    
    BEGIN
        SELECT storage.delete_policy('images', 'Exclusão por usuários autenticados');
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Política não existe ou erro ao remover: %', SQLERRM;
    END;
END $$;

-- Criar novas políticas com permissões adequadas
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
        RAISE NOTICE 'Política de leitura pública criada com sucesso';
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Erro ao criar política de leitura pública: %', SQLERRM;
    END;
    
    BEGIN
        -- Política para inserção por qualquer usuário (incluindo anônimos)
        SELECT storage.create_policy(
            'images',
            'Inserção por qualquer usuário',
            'INSERT',
            'public',
            true
        );
        RAISE NOTICE 'Política de inserção criada com sucesso';
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Erro ao criar política de inserção: %', SQLERRM;
    END;
    
    BEGIN
        -- Política para atualização por qualquer usuário
        SELECT storage.create_policy(
            'images',
            'Atualização por qualquer usuário',
            'UPDATE',
            'public',
            true
        );
        RAISE NOTICE 'Política de atualização criada com sucesso';
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Erro ao criar política de atualização: %', SQLERRM;
    END;
    
    BEGIN
        -- Política para exclusão por qualquer usuário
        SELECT storage.create_policy(
            'images',
            'Exclusão por qualquer usuário',
            'DELETE',
            'public',
            true
        );
        RAISE NOTICE 'Política de exclusão criada com sucesso';
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Erro ao criar política de exclusão: %', SQLERRM;
    END;
END $$;

-- Em vez de verificar através da tabela storage.policies, 
-- vamos apenas confirmar que o bucket existe
SELECT EXISTS (
    SELECT 1 
    FROM storage.buckets
    WHERE name = 'images'
) AS bucket_exists;
