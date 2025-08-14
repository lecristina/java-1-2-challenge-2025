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
  WHERE id = user_id;
  
  RETURN 'Usuário promovido a admin com sucesso. ID: ' || user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para criar um usuário admin (use com cuidado, apenas em ambiente de desenvolvimento)
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_name TEXT
)
RETURNS TEXT AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Criar o usuário na tabela auth.users
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
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    json_build_object('name', admin_name),
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO user_id;

  -- O trigger on_auth_user_created criará automaticamente um perfil
  -- Agora atualizamos o perfil para ser admin
  UPDATE profiles
  SET role = 'admin'
  WHERE id = user_id;

  RETURN 'Usuário admin criado com sucesso. ID: ' || user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
