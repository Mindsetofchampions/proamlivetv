"use client";

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}