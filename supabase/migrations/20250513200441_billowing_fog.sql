/*
  # Add Initial Admin Account

  1. Creates the initial admin user account
  2. Assigns admin role to the user
*/

-- Create initial admin user if it doesn't exist
DO $$
DECLARE
  admin_user_id uuid;
  admin_role_id uuid;
BEGIN
  -- Get admin role ID
  SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';

  -- Create admin user in auth.users
  INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) VALUES (
    'admin@proamtv.com',
    crypt('admin123', gen_salt('bf')), -- Change this password in production!
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"System Admin"}',
    now(),
    now(),
    '',
    ''
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO admin_user_id;

  -- Create user profile
  INSERT INTO users (id, auth_id, username, display_name)
  VALUES (
    gen_random_uuid(),
    admin_user_id,
    'admin',
    'System Admin'
  )
  ON CONFLICT DO NOTHING;

  -- Assign admin role
  INSERT INTO user_roles (user_id, role_id)
  VALUES (admin_user_id, admin_role_id)
  ON CONFLICT DO NOTHING;
END $$;