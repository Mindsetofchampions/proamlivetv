/*
  # Create Initial Admin User

  1. New Content
    - Creates initial admin user
    - Assigns admin role
    - Sets up necessary permissions
*/

-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'admin@proamtv.com'
  ) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@proamtv.com',
      crypt('admin123', gen_salt('bf')), -- Change this password in production
      NOW(),
      NOW(),
      NOW()
    )
    RETURNING id INTO admin_id;

    -- Insert into public.users
    INSERT INTO users (id, auth_id, username, display_name)
    VALUES (
      gen_random_uuid(),
      admin_id,
      'admin',
      'System Admin'
    );

    -- Assign admin role
    INSERT INTO user_roles (user_id, role_id)
    SELECT 
      (SELECT id FROM users WHERE auth_id = admin_id),
      (SELECT id FROM roles WHERE name = 'admin');
  END IF;
END $$;