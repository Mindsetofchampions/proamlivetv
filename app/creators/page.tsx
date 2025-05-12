"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users,
  TrendingUp,
  DollarSign,
  Shield,
  ArrowRight,
  Upload,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';

const features = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Easy Content Upload",
    description: "Upload and manage your content with our intuitive creator dashboard."
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Grow Your Audience",
    description: "Reach thousands of viewers and build your fanbase with our platform."
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Monetize Your Content",
    description: "Earn from your content through subscriptions and viewer support."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Content Protection",
    description: "Your content is protected with industry-standard DRM technology."
  }
];

export default function CreatorsPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Share Your Talent With The World
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of youth creators and start sharing your content with a global audience
            </p>
            {isSignedIn ? (
              <Button size="lg" asChild>
                <Link href="/dashboard/upload">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Become a Creator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border rounded-xl p-6"
            >
              <div className="rounded-full bg-primary/10 p-3 w-fit text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)] mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Creator Journey?
              </h2>
              <p className="text-white/90 mb-6">
                Join thousands of youth creators already sharing their passion and talent on PRO AM LIVE TV.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/sign-up">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/dashboard">
                    Creator Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}