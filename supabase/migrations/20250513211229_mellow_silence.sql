/*
  # Fix Role Policies Infinite Recursion

  1. Changes
    - Drop existing policies on roles table
    - Create new policies without recursion
    - Update user roles policies for better security
*/

-- Drop existing policies on roles table
DROP POLICY IF EXISTS "Admins can manage roles" ON roles;
DROP POLICY IF EXISTS "Users can view roles" ON roles;

-- Create new non-recursive policies
CREATE POLICY "Anyone can view roles"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only super_admin can manage roles"
  ON roles
  USING (
    auth.jwt() ->> 'role' = 'super_admin'
  );

-- Update user_roles policies
DROP POLICY IF EXISTS "Users can view their roles" ON user_roles;

CREATE POLICY "Users can view their roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'role' = 'super_admin'
  );