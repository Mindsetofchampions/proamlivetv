/*
  # Fix Admin Role Assignment Migration

  1. Changes
    - Add policy for admins to view all users
    - Add policy for admins to manage user roles
    - Fix role assignment permissions
*/

-- Add admin policies
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
      AND r.name = 'admin'
    )
  );

CREATE POLICY "Admins can manage user roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
      AND r.name = 'admin'
    )
  );

-- Ensure admin role exists
INSERT INTO roles (name, description)
VALUES ('admin', 'Full system access')
ON CONFLICT (name) DO NOTHING;