"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
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
  ShoppingBag
} from "lucide-react";

const Header = () => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Shows", href: "/shows", icon: <PlayCircle className="h-4 w-4 mr-2" /> },
    { name: "Videos", href: "/videos", icon: <Film className="h-4 w-4 mr-2" /> },
    { name: "Shop", href: "/shop", icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: "Creators", href: "/creators", icon: <Users className="h-4 w-4 mr-2" /> },
    { name: "Live TV", href: "/live", icon: <Radio className="h-4 w-4 mr-2" />, highlight: true },
  ];
  
  const authLinks = isSignedIn ? [
    { name: "Upload", href: "/dashboard/upload", icon: <Upload className="h-4 w-4 mr-2" /> },
    { name: "Dashboard", href: "/dashboard", icon: <Settings className="h-4 w-4 mr-2" /> },
  ] : [];

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
              <span className="font-bold text-xl">PRO AM TV</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[...navLinks, ...authLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) 
                    ? "text-primary" 
                    : link.highlight
                    ? "bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90"
                    : "text-foreground/60"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth and Theme Toggle Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Join Free</Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {[...navLinks, ...authLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.href) 
                      ? "bg-secondary text-primary" 
                      : link.highlight
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary/50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              {isSignedIn ? (
                <div className="pt-2 border-t flex items-center">
                  <span className="text-sm text-foreground/60 mr-2">Account:</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="pt-2 border-t flex flex-col space-y-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full">Join Free</Button>
                  </SignUpButton>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;