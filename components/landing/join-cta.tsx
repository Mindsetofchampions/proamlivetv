"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const JoinCta = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)] mix-blend-overlay"></div>
          
          <motion.div 
            className="py-16 px-8 md:px-16 text-center text-white relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Share Your Talent?
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join thousands of youth creators building their audience and brand on PRO AM LIVE TV today.
            </motion.p>
            
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="text-lg h-14 px-8 rounded-full bg-white text-purple-700 hover:bg-white/90"
                asChild
              >
                <a href="/register">
                  Start Creating Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinCta;