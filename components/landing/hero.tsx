"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10" />
        <img 
          src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-6xl font-semibold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tomorrow's Talent,{" "}
            <span className="text-primary">LIVE</span>{" "}
            Today
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-white/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The premier platform for youth creators to showcase their talent and connect with audiences worldwide.
          </motion.p>
          
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="text-lg h-14 px-8 rounded-full bg-white text-black hover:bg-white/90"
              asChild
            >
              <Link href="/videos">
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Watching
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg h-14 px-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10"
              asChild
            >
              <Link href="/creators">
                Learn More
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;