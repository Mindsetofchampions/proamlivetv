import { createContext, useContext } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
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
    
    const supabase = createClientComponentClient();

    // First get the user record with auth_id
    const { data: userRecords, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return { roles: [], permissions: [] };
    }

    // Handle case where no user record exists
    if (!userRecords) {
      console.warn('No user record found for auth_id:', userId);
      return { roles: [], permissions: [] };
    }

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
      .eq('user_id', userRecords.id);

    if (roleError) {
      console.error('Error fetching roles:', roleError);
      return { roles: [], permissions: [] };
    }

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