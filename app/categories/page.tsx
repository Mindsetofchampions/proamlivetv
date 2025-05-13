"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  GraduationCap, 
  Users, 
  Trophy,
  PlayCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'esports',
    title: 'Esports',
    description: 'Watch competitive gaming tournaments, player interviews, and strategy guides.',
    icon: <Gamepad2 className="h-8 w-8" />,
    color: 'from-purple-500 to-indigo-500',
    videoCount: 156
  },
  {
    id: 'workshops',
    title: 'Workshops',
    description: 'Learn from industry experts with hands-on tutorials and masterclasses.',
    icon: <GraduationCap className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500',
    videoCount: 89
  },
  {
    id: 'live-coaching',
    title: 'Live Coaching',
    description: 'Get real-time feedback and guidance from professional coaches.',
    icon: <Users className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500',
    videoCount: 42
  },
  {
    id: 'highlights',
    title: 'Highlights',
    description: 'Catch up on the best moments from recent tournaments and events.',
    icon: <Trophy className="h-8 w-8" />,
    color: 'from-orange-500 to-red-500',
    videoCount: 234
  },
  {
    id: 'originals',
    title: 'Originals',
    description: 'Exclusive content created by our community of youth creators.',
    icon: <PlayCircle className="h-8 w-8" />,
    color: 'from-pink-500 to-rose-500',
    videoCount: 67
  }
];

export default function CategoriesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Video Categories</h1>
          <p className="text-lg text-muted-foreground">
            Explore our diverse collection of content across different categories
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/categories/${category.id}`}>
                <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${category.color} p-1`}>
                  <div className="relative overflow-hidden rounded-lg bg-background p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {category.videoCount} videos
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}