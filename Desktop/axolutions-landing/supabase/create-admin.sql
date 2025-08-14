-- Função para criar um usuário admin
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_name TEXT
)
RETURNS TEXT AS $$
DECLARE
  user_id UUID;
  profile_id UUID;
BEGIN
  -- Criar o usuário na tabela auth.users
  INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    json_build_object('name', admin_name),
    NOW(),
    NOW()
  )
  RETURNING id INTO user_id;

  -- Atualizar o perfil para ser admin
  UPDATE profiles
  SET role = 'admin'
  WHERE user_id = user_id
  RETURNING id INTO profile_id;

  RETURN 'Usuário admin criado com sucesso. ID: ' || user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para promover um usuário existente para admin
CREATE OR REPLACE FUNCTION promote_to_admin(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Obter o ID do usuário
  SELECT id INTO user_id FROM auth.users WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RETURN 'Usuário não encontrado';
  END IF;
  
  -- Atualizar o perfil para ser admin
  UPDATE profiles
  SET role = 'admin'
  WHERE user_id = user_id;
  
  RETURN 'Usuário promovido a admin com sucesso. ID: ' || user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Exemplo de uso:
-- SELECT create_admin_user('admin@example.com', 'senha_segura', 'Admin');
-- SELECT promote_to_admin('usuario@example.com');
