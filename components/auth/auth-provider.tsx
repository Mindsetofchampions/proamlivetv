"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthContext, AuthContextType, AuthUser, UserRole, getUserRoles } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { roles, permissions } = await getUserRoles(session.user.id);
        setUser({ ...session.user, roles, permissions });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { roles, permissions } = await getUserRoles(session.user.id);
        setUser({ ...session.user, roles, permissions });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Assign default viewer role
      if (user) {
        const { data: roleData } = await supabase
          .from('roles')
          .select('id')
          .eq('name', 'viewer')
          .single();

        if (roleData) {
          await supabase.from('user_roles').insert({
            user_id: user.id,
            role_id: roleData.id
          });
        }
      }
      
      toast({
        title: "Success",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const hasRole = (role: UserRole) => {
    return user?.roles?.includes(role) || false;
  };

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) || false;
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    hasRole,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}