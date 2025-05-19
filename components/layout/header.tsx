"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { 
  Tv, 
  Menu, 
  X, 
  Home, 
  Film, 
  Upload, 
  Settings,
  Radio,
  PlayCircle,
  Users,
  ShoppingBag,
  LayoutDashboard,
  UserCircle,
  LogOut
} from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
  icon: JSX.Element;
  highlight?: boolean;
  isLive?: boolean;
  requiresAuth?: boolean;
}

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks: NavLink[] = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Shows", href: "/shows", icon: <PlayCircle className="h-4 w-4 mr-2" /> },
    { name: "Videos", href: "/videos", icon: <Film className="h-4 w-4 mr-2" /> },
    { name: "Shop", href: "/shop", icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: "Creators", href: "/creators", icon: <Users className="h-4 w-4 mr-2" /> },
    { 
      name: "Creator Dashboard", 
      href: "/creator/dashboard", 
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      requiresAuth: true 
    },
    { 
      name: "LIVE", 
      href: "/live", 
      icon: <Radio className="h-4 w-4 mr-2" />, 
      highlight: true, 
      isLive: true 
    },
  ];

  const filteredNavLinks = navLinks.filter(link => 
    !link.requiresAuth || (link.requiresAuth && user)
  );

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Tv className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PRO AM LIVE TV</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) 
                    ? "text-primary" 
                    : link.highlight
                    ? "live-button px-4 py-2 rounded-full hover:bg-red-600"
                    : "text-foreground/60"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/account">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Account
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Join Free</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <ModeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-2"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.href) 
                      ? "bg-secondary text-primary" 
                      : link.highlight
                      ? "live-button"
                      : "hover:bg-secondary/50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full mb-2" asChild>
                      <Link href="/account">
                        <UserCircle className="h-4 w-4 mr-2" />
                        Account
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => signOut()}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full mb-2" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/register">Join Free</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;