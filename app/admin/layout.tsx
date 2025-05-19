"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Video,
  Users,
  Flag,
  Settings,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, hasRole, signOut, loading } = useAuth();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const isAdmin = hasRole('admin');
      if (!isAdmin) {
        console.log('User lacks admin role:', user);
        router.push('/');
      }
    }
  }, [user, loading, router, hasRole]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navigation = [
    {
      name: 'Overview',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      name: 'Videos',
      href: '/admin/videos',
      icon: Video
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: Flag
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <div className="flex min-h-screen relative mt-16">
      <div className="fixed top-16 left-0 bottom-0 w-64 border-r bg-card">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            {user ? (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                  onClick={() => router.push('/login?redirect=/admin')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/register')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 ml-64">
        {!user && (
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onMouseEnter={() => setShowAuthOverlay(true)}
            onMouseLeave={() => setShowAuthOverlay(false)}
          >
            <div 
              className={`text-center p-6 rounded-lg transition-opacity duration-200 ${
                showAuthOverlay ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in with an admin account to access the dashboard
              </p>
              <div className="space-x-4">
                <Button 
                  onClick={() => router.push('/login?redirect=/admin')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/register')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}