"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { LogIn, RefreshCw, LayoutDashboard, Video, Users, Flag, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
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

  // Mock stats data for preview
  const stats = [
    { name: 'Pending Videos', value: '24', description: 'Awaiting review' },
    { name: 'Approved Videos', value: '156', description: 'Last 30 days' },
    { name: 'Active Users', value: '1,234', description: 'Total registered' },
    { name: 'Reports', value: '12', description: 'Needs attention' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Dashboard Preview */}
        <div className="w-64 border-r bg-card h-screen fixed">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { name: 'Overview', icon: LayoutDashboard },
                { name: 'Videos', icon: Video },
                { name: 'Users', icon: Users },
                { name: 'Reports', icon: Flag },
                { name: 'Settings', icon: Settings }
              ].map((item) => (
                <li key={item.name}>
                  <Button variant="ghost" className="w-full justify-start">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="relative">
            {/* Dashboard Preview Content */}
            <div className={`transition-opacity duration-300 ${showLoginForm ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <Button>Add Admin</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.name} className="p-6">
                    <h3 className="font-medium text-muted-foreground">{stat.name}</h3>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Video Approved</p>
                            <p className="text-sm text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">System Status</h2>
                    <div className="space-y-4">
                      {['Video Processing', 'Content Delivery', 'Authentication'].map((service) => (
                        <div key={service} className="flex justify-between items-center">
                          <span>{service}</span>
                          <span className="text-green-500">Operational</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Hover Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              onMouseEnter={() => setShowLoginForm(true)}
              onMouseLeave={() => setShowLoginForm(false)}
            >
              {showLoginForm && (
                <Card className="w-full max-w-md p-6 backdrop-blur-lg bg-background/95">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold">Admin Access Required</h1>
                      <p className="text-muted-foreground">Sign in to access the dashboard</p>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}