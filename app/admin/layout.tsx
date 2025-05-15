"use client";

import { useEffect } from 'react';
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
  LogOut
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, hasRole, signOut, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (!hasRole('admin')) {
        console.log('User lacks admin role:', user);
        router.push('/');
        return;
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

  // Don't render admin content until we confirm admin role
  if (!user || !hasRole('admin')) {
    return null;
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
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-card">
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
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}