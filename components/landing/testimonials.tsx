"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "PRO AM TV helped me reach thousands of new viewers and grow my audience faster than I ever thought possible.",
    name: "Alex Johnson",
    title: "Youth filmmaker",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    quote: "As a young creator, I needed a platform that took me seriously. PRO AM TV gave me the tools and audience to make content creation my career.",
    name: "Samantha Rodriguez",
    title: "Content Creator",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    quote: "The quality of the platform and professional features makes my content look amazing. My subscribers love it!",
    name: "Jamal Williams",
    title: "Sports Commentator",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  // Auto-advance carousel
  useEffect(() => {
    const startTimer = () => {
      timeoutRef.current = setTimeout(() => {
        nextTestimonial();
      }, 8000);
    };
    
    startTimer();
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);
  
  // Reset timer when user navigates manually
  const handleManualNavigation = (callback: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    callback();
  };

  return (
    <section className="bg-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          What Our <span className="text-primary">Creators</span> Say
        </h2>
        
        <div className="relative max-w-4xl mx-auto overflow-hidden px-4">
          <div className="absolute top-0 left-4 -z-10 opacity-30">
            <Quote className="h-24 w-24 text-primary" />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0 relative">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-cover"
                />
              </div>
              
              <div>
                <blockquote className="text-xl md:text-2xl mb-6 italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-muted-foreground">{testimonials[currentIndex].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-10 gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleManualNavigation(prevTestimonial)}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleManualNavigation(() => setCurrentIndex(index))}
                className={`w-2 h-2 p-0 rounded-full ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleManualNavigation(nextTestimonial)}
              className="rounded-full"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;