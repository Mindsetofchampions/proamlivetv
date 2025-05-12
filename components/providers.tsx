"use client";

import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API!}
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