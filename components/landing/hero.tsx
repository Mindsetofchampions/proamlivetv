"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { PlayCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.pexels.com/photos/7345444/pexels-photo-7345444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        >
          <source
            src="https://player.vimeo.com/external/403635109.sd.mp4?s=66c9fbd26bb3224c21c6d574d1a8e8179ba18a60&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Youth Creators
            </span>
            {" "}
            Deserve a Platform
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            PRO AM LIVE TV provides a professional platform for youth talent to create, publish, and monetize their content.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SignUpButton mode="modal">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Your Free Trial
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </SignUpButton>
            
            <Link href="/videos">
              <Button variant="outline" size="lg" className="text-lg h-14 px-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10">
                <PlayCircle className="mr-2 h-5 w-5" />
                Browse Videos
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;