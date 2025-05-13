import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddAdminDialog() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Get admin role ID
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'admin')
        .single();

      if (roleError) throw roleError;

      // Assign admin role
      const { error: roleAssignError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role_id: roleData.id
        });

      if (roleAssignError) throw roleAssignError;

      toast({
        title: "Success",
        description: "Admin account created successfully",
      });

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: "Error",
        description: "Failed to create admin account",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>
            Create a new administrator account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Admin Account'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}