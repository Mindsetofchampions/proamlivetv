"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mic2, 
  Video, 
  Gamepad2, 
  Radio,
  ArrowRight
} from 'lucide-react';

const learningPaths = [
  {
    id: 'on-air',
    title: 'On-Air Talent & Hosts',
    description: 'Learn broadcasting, hosting, and on-camera skills',
    icon: <Mic2 className="h-12 w-12" />,
    color: 'from-purple-500 to-indigo-500',
    href: '/academy/on-air'
  },
  {
    id: 'content',
    title: 'Content Production',
    description: 'Master video editing, motion graphics, and storytelling',
    icon: <Video className="h-12 w-12" />,
    color: 'from-blue-500 to-cyan-500',
    href: '/academy/content-production'
  },
  {
    id: 'esports',
    title: 'Esports & Gaming',
    description: 'Compete and create content in competitive gaming',
    icon: <Gamepad2 className="h-12 w-12" />,
    color: 'from-green-500 to-emerald-500',
    href: '/academy/esports-gaming'
  },
  {
    id: 'live',
    title: 'Live Production',
    description: 'Learn to produce and direct live events',
    icon: <Radio className="h-12 w-12" />,
    color: 'from-orange-500 to-red-500',
    href: '/academy/live-production'
  }
];

export default function CreatorPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Creator Academy</h1>
          <p className="text-lg text-muted-foreground">
            Launch your content creation career with professional training and mentorship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path, index) => (
            <Link key={path.id} href={path.href} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${path.color} p-1 h-full transition-transform hover:scale-[1.02] cursor-pointer`}
              >
                <div className="relative overflow-hidden rounded-lg bg-background p-6 h-full">
                  <div className="rounded-full bg-primary/10 p-3 w-fit text-primary mb-4">
                    {path.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {path.description}
                  </p>
                  <div className="flex items-center text-primary">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}