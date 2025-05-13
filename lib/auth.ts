import { createContext, useContext, useEffect, useState } from 'react';
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
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      roles (
        name,
        role_permissions (
          permission
        )
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;

  const roles = data?.map(d => d.roles.name) || [];
  const permissions = data?.flatMap(d => 
    d.roles.role_permissions.map(p => p.permission)
  ) || [];

  return { roles, permissions };
}