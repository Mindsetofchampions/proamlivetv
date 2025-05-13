"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SignUpButton, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { PlayCircle, ChevronRight, UserPlus, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10" />
        <img 
          src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg"
          alt="Esports Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#FFD700]">Tomorrow's</span>{" "}
            <span className="text-[#FFD700]">Talent</span>,{" "}
            <span className="text-[#BF0707]">LIVE</span>{" "}
            <span className="text-[#FFD700]">Today</span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-lg mx-auto"
          >
            <Tabs defaultValue="student" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="student">Student Creator</TabsTrigger>
                <TabsTrigger value="viewer">Viewer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">Start Your Creator Journey</h3>
                  <p className="text-gray-300 mb-4">Join our community of student creators and start sharing your talent.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <SignUpButton mode="modal">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Account
                      </Button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                      >
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </Button>
                    </SignInButton>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="viewer" className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">Watch Amazing Content</h3>
                  <p className="text-gray-300 mb-4">Discover and support the next generation of content creators.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <SignUpButton mode="modal">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Join Free
                      </Button>
                    </SignUpButton>
                    <Link href="/videos" className="w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full text-lg h-14 px-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Browse Videos
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;