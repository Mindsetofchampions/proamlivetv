"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/creator">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Link>
        </Button>
        {children}
      </div>
    </div>
  );
}