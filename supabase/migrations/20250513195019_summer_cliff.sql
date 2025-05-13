/*
  # Add Role-Based Access Control

  1. New Tables
    - `roles` - Defines available user roles
    - `role_permissions` - Defines permissions for each role
    - `user_roles` - Maps users to roles

  2. Security
    - Enable RLS on new tables
    - Add policies for role-based access
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_id, permission)
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full system access'),
  ('creator', 'Content creator with video management access'),
  ('moderator', 'Content moderation access'),
  ('viewer', 'Basic viewing access');

-- Insert default permissions
INSERT INTO role_permissions (role_id, permission) 
SELECT id, 'manage:users' FROM roles WHERE name = 'admin';

INSERT INTO role_permissions (role_id, permission) 
SELECT id, 'manage:videos' FROM roles WHERE name IN ('admin', 'creator');

INSERT INTO role_permissions (role_id, permission) 
SELECT id, 'moderate:content' FROM roles WHERE name IN ('admin', 'moderator');

-- Create policies
CREATE POLICY "Admins can manage roles"
  ON roles
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

CREATE POLICY "Users can view roles"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage permissions"
  ON role_permissions
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

CREATE POLICY "Users can view their roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);