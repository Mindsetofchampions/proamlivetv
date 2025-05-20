"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { LogIn, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { signIn, hasRole } = useAuth();
  const { toast } = useToast();
  const [redirectPath, setRedirectPath] = useState('');

  // Handle password manager autofill and search params
  useEffect(() => {
    setMounted(true);
    if (params) {
      setRedirectPath(params.get('redirect') || '/dashboard');
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      
      // Check if user has admin role and redirect accordingly
      if (hasRole('admin')) {
        router.push('/admin');
      } else {
        router.push(redirectPath);
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">
              {redirectPath.includes('admin') 
                ? 'Admin access required' 
                : 'Welcome back to PRO AM LIVE TV'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}