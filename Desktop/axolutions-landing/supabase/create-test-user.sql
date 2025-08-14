-- Criar um usuário de teste para login
-- Execute este script no SQL Editor do Supabase

-- Primeiro, crie o usuário na tabela auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'teste@exemplo.com',
  crypt('senha123', gen_salt('bf')),
  now(),
  NULL,
  NULL,
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Usuário Teste"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- O trigger que criamos anteriormente deve criar automaticamente um perfil para este usuário
-- Mas podemos verificar e criar manualmente se necessário
DO $$
DECLARE
  user_id uuid;
BEGIN
  SELECT id INTO user_id FROM auth.users WHERE email = 'teste@exemplo.com';
  
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = user_id) THEN
    INSERT INTO public.profiles (user_id, name, role)
    VALUES (user_id, 'Usuário Teste', 'admin');
  END IF;
END
$$;

-- Agora você pode fazer login com:
-- Email: teste@exemplo.com
-- Senha: senha123
