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
        try {
          const { roles, permissions } = await getUserRoles(session.user.id);
          setUser({ ...session.user, roles, permissions });
        } catch (error) {
          console.error('Error setting initial user:', error);
          setUser(session.user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        try {
          const { roles, permissions } = await getUserRoles(session.user.id);
          setUser({ ...session.user, roles, permissions });
        } catch (error) {
          console.error('Error updating user:', error);
          setUser(session.user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { roles, permissions } = await getUserRoles(data.user.id);
        setUser({ ...data.user, roles, permissions });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user record and get the generated ID
        const { data: newUserRecord, error: userError } = await supabase
          .from('users')
          .insert({
            auth_id: data.user.id,
            username: email.split('@')[0],
            display_name: email.split('@')[0]
          })
          .select('id')
          .single();

        if (userError) throw userError;
        if (!newUserRecord) throw new Error('Failed to create user record');

        // Get viewer role
        const { data: roleData, error: roleError } = await supabase
          .from('roles')
          .select('id')
          .eq('name', 'viewer')
          .single();

        if (roleError) throw roleError;

        // Assign viewer role using the user's database ID
        const { error: roleAssignError } = await supabase
          .from('user_roles')
          .insert({
            user_id: newUserRecord.id, // Use the database-generated user ID
            role_id: roleData.id
          });

        if (roleAssignError) throw roleAssignError;

        setUser(data.user);
      }
      
      toast({
        title: "Success",
        description: "Account created successfully. Please check your email to verify your account.",
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
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