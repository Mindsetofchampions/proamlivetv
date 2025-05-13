"use client";

import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PremiumContentLockProps {
  children: React.ReactNode;
}

export function PremiumContentLock({ children }: PremiumContentLockProps) {
  const isSignedIn = false; // Replace with your auth check

  if (!isSignedIn) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center p-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sign up to access this content and more
            </p>
            <Button asChild>
              <Link href="/register">Sign Up Now</Link>
            </Button>
          </div>
        </div>
        <div className="blur-sm">
          {children}
        </div>
      </div>
    );
  }

  return children;
}