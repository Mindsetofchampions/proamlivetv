import { createContext, useContext } from 'react';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'creator' | 'moderator' | 'viewer';

export interface AuthUser extends User {
  roles?: UserRole[];
  permissions?: string[];
}

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: string) => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export async function getUserRoles(userId: string) {
  try {
    console.log('Fetching roles for user:', userId);

    // First get the user record with auth_id
    const { data: userRecords, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId);

    if (userError) {
      console.error('Error fetching user:', userError);
      throw userError;
    }

    // Handle case where no user record exists
    if (!userRecords || userRecords.length === 0) {
      console.warn('No user record found for auth_id:', userId);
      return { roles: [], permissions: [] };
    }

    const userData = userRecords[0];

    // Get user roles with a more detailed query
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select(`
        role:roles (
          name,
          permissions:role_permissions (
            permission
          )
        )
      `)
      .eq('user_id', userData.id);

    if (roleError) {
      console.error('Error fetching roles:', roleError);
      throw roleError;
    }

    console.log('Raw role data:', roleData);

    // Extract roles and permissions from the data
    const roles = roleData?.map(d => d.role.name as UserRole) || [];
    const permissions = roleData?.flatMap(d => 
      d.role.permissions.map(p => p.permission)
    ) || [];

    console.log('Processed roles and permissions:', { roles, permissions });
    return { roles, permissions };
  } catch (error) {
    console.error('Error in getUserRoles:', error);
    return { roles: [], permissions: [] };
  }
}