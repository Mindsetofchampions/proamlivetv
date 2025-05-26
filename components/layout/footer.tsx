'use client';

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Tv } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user, hasRole } = useAuth();
  
  return (
    <footer className="bg-secondary/20 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Tv className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PRO AM LIVE TV</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The premier platform for youth creators to showcase their talent and connect with audiences worldwide.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/videos" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Videos
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  Student Marketplace
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-muted-foreground hover:text-primary transition-colors">
                  For Creators
                </Link>
              </li>
              {user && hasRole('admin') ? (
                <li>
                  <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/login?redirect=/admin" className="text-muted-foreground hover:text-primary transition-colors">
                    Admin Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Business</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sponsors" className="text-muted-foreground hover:text-primary transition-colors">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="text-muted-foreground hover:text-primary transition-colors">
                  Corporate Partners
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-muted-foreground hover:text-primary transition-colors">
                  Advertiser Portal
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-muted-foreground hover:text-primary transition-colors">
                  Copyright
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} PRO AM LIVE TV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;