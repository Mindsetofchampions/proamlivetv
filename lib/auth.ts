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
    // First get the user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) throw userError;
    
    // If no user record found, return empty roles and permissions
    if (!userData) {
      return { roles: [], permissions: [] };
    }

    // Get user roles and permissions
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select(`
        roles (
          name,
          role_permissions (
            permission
          )
        )
      `)
      .eq('user_id', userData.id);

    if (roleError) throw roleError;

    // Extract roles and permissions from the data
    const roles = roleData?.map(d => d.roles.name as UserRole) || [];
    const permissions = roleData?.flatMap(d => 
      d.roles.role_permissions.map(p => p.permission)
    ) || [];

    return { roles, permissions };
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return { roles: [], permissions: [] };
  }
}