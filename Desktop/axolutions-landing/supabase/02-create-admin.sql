-- Função para criar um usuário admin (apenas para desenvolvimento)
CREATE OR REPLACE FUNCTION create_admin_user(
  email TEXT,
  password TEXT,
  name TEXT DEFAULT 'Admin'
)
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Criar o usuário
  user_id := (
    SELECT id FROM auth.users
    WHERE auth.users.email = create_admin_user.email
  );
  
  IF user_id IS NULL THEN
    user_id := (
      INSERT INTO auth.users (
        email,
        password,
        email_confirmed_at,
        raw_user_meta_data
      )
      VALUES (
        email,
        crypt(password, gen_salt('bf')),
        now(),
        json_build_object('name', name)
      )
      RETURNING id
    );
  END IF;
  
  -- Garantir que o perfil exista e seja admin
  UPDATE profiles
  SET role = 'admin'
  WHERE user_id = user_id;
  
  RETURN user_id;
END;
$$ LANGUAGE plpgsql;

-- ATENÇÃO: Use apenas em ambiente de desenvolvimento!
-- Para criar um admin, execute:
-- SELECT create_admin_user('admin@exemplo.com', 'senha_segura', 'Nome do Admin');
