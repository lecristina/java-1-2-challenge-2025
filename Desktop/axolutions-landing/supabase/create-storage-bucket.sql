-- Verifica se o bucket 'images' já existe e configura as políticas
DO $$
DECLARE
    bucket_exists BOOLEAN;
    policy_exists BOOLEAN;
BEGIN
    -- Verifica se o bucket 'images' já existe
    SELECT EXISTS (
        SELECT 1 FROM storage.buckets WHERE name = 'images'
    ) INTO bucket_exists;

    IF NOT bucket_exists THEN
        -- Cria o bucket 'images' se não existir
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('images', 'images', true);
        
        RAISE NOTICE 'Bucket de imagens criado com sucesso';
    ELSE
        RAISE NOTICE 'Bucket de imagens já existe';
    END IF;

    -- Verifica se a política "Imagens públicas para todos 1" já existe
    SELECT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Imagens públicas para todos 1'
    ) INTO policy_exists;
    
    IF NOT policy_exists THEN
        -- Cria a política se não existir
        EXECUTE 'CREATE POLICY "Imagens públicas para todos 1" ON storage.objects
                FOR SELECT
                USING (bucket_id = ''images'')';
        RAISE NOTICE 'Política "Imagens públicas para todos 1" criada com sucesso';
    ELSE
        RAISE NOTICE 'Política "Imagens públicas para todos 1" já existe';
    END IF;
    
    -- Verifica se a política "Usuários autenticados podem fazer upload 1" já existe
    SELECT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Usuários autenticados podem fazer upload 1'
    ) INTO policy_exists;
    
    IF NOT policy_exists THEN
        -- Cria a política se não existir
        EXECUTE 'CREATE POLICY "Usuários autenticados podem fazer upload 1" ON storage.objects
                FOR INSERT
                WITH CHECK (bucket_id = ''images'' AND auth.role() = ''authenticated'')';
        RAISE NOTICE 'Política "Usuários autenticados podem fazer upload 1" criada com sucesso';
    ELSE
        RAISE NOTICE 'Política "Usuários autenticados podem fazer upload 1" já existe';
    END IF;
    
    -- Verifica se a política "Proprietários podem atualizar 1" já existe
    SELECT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Proprietários podem atualizar 1'
    ) INTO policy_exists;
    
    IF NOT policy_exists THEN
        -- Cria a política se não existir
        EXECUTE 'CREATE POLICY "Proprietários podem atualizar 1" ON storage.objects
                FOR UPDATE
                USING (bucket_id = ''images'' AND auth.uid() = owner)';
        RAISE NOTICE 'Política "Proprietários podem atualizar 1" criada com sucesso';
    ELSE
        RAISE NOTICE 'Política "Proprietários podem atualizar 1" já existe';
    END IF;
    
    -- Verifica se a política "Proprietários podem excluir 1" já existe
    SELECT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Proprietários podem excluir 1'
    ) INTO policy_exists;
    
    IF NOT policy_exists THEN
        -- Cria a política se não existir
        EXECUTE 'CREATE POLICY "Proprietários podem excluir 1" ON storage.objects
                FOR DELETE
                USING (bucket_id = ''images'' AND auth.uid() = owner)';
        RAISE NOTICE 'Política "Proprietários podem excluir 1" criada com sucesso';
    ELSE
        RAISE NOTICE 'Política "Proprietários podem excluir 1" já existe';
    END IF;
    
    -- Verifica se a política "Acesso anônimo para leitura 1" já existe
    SELECT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Acesso anônimo para leitura 1'
    ) INTO policy_exists;
    
    IF NOT policy_exists THEN
        -- Cria a política se não existir
        EXECUTE 'CREATE POLICY "Acesso anônimo para leitura 1" ON storage.objects
                FOR SELECT
                USING (bucket_id = ''images'')';
        RAISE NOTICE 'Política "Acesso anônimo para leitura 1" criada com sucesso';
    ELSE
        RAISE NOTICE 'Política "Acesso anônimo para leitura 1" já existe';
    END IF;
    
    -- Mensagem final de conclusão
    RAISE NOTICE 'Configuração do bucket de imagens concluída com sucesso';
END $$;
