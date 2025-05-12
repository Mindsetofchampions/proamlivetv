"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Tv, 
  Laptop, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'esports',
    title: 'Esports',
    description: 'Watch competitive gaming at its finest. From tournament coverage to player profiles, dive into the world of professional gaming.',
    icon: <Gamepad2 className="h-8 w-8" />,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'original-programming',
    title: 'Original Programming',
    description: 'Exclusive shows created by and for youth creators. Featuring documentaries, series, and special events that showcase emerging talent.',
    icon: <Tv className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'tech-talk',
    title: 'Tech Talk',
    description: 'Stay up-to-date with the latest in technology. From coding tutorials to tech reviews, explore the digital frontier with expert insights.',
    icon: <Laptop className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'learning-lab',
    title: 'Learning Lab',
    description: 'Educational content that makes learning fun and engaging. Covering topics from science and math to arts and creativity.',
    icon: <GraduationCap className="h-8 w-8" />,
    color: 'from-orange-500 to-red-500'
  }
];

export default function ShowsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shows & Categories</h1>
          <p className="text-lg text-muted-foreground">
            Discover our curated collection of shows across different categories
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/shows/${category.id}`}>
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
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/videos">
              Browse All Videos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}