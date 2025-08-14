-- Adicionar novos campos à tabela de projetos
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS landing_image_url TEXT,
ADD COLUMN IF NOT EXISTS about_image_url TEXT,
ADD COLUMN IF NOT EXISTS blog_image_url TEXT,
ADD COLUMN IF NOT EXISTS system_image_url TEXT,
ADD COLUMN IF NOT EXISTS mobile_landing_image_url TEXT,
ADD COLUMN IF NOT EXISTS mobile_about_image_url TEXT,
ADD COLUMN IF NOT EXISTS has_about BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_blog BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_system BOOLEAN DEFAULT FALSE;

-- Criar bucket de armazenamento para projetos se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Configurar políticas de acesso para o bucket de projetos
CREATE POLICY "Imagens de projetos são visíveis para todos" ON storage.objects
  FOR SELECT USING (bucket_id = 'projects');

CREATE POLICY "Usuários autenticados podem fazer upload de imagens de projetos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar suas próprias imagens de projetos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem excluir suas próprias imagens de projetos" ON storage.objects
  FOR DELETE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');
