"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Radio, DollarSign, Laptop, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const sections = [
  {
    title: 'Broadcast Techniques',
    icon: <Radio className="h-8 w-8 text-primary" />,
    description: 'Master the art of hosting and directing live broadcasts',
    topics: ['Camera Presence', 'Show Direction', 'Live Interviewing', 'Audience Engagement']
  },
  {
    title: 'Entrepreneurship & Sponsorship',
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    description: 'Learn how to pitch sponsors and manage brand deals',
    href: '/academy/entrepreneurship-sponsorship',
    topics: ['Sponsor Pitching', 'Brand Partnerships', 'Deal Negotiation', 'Content Integration']
  },
  {
    title: 'Hardware & Tech Setup',
    icon: <Laptop className="h-8 w-8 text-primary" />,
    description: 'Configure your professional streaming setup',
    href: '/academy/hardware-tech',
    topics: ['Camera Selection', 'Audio Equipment', 'Lighting Design', 'Streaming Software']
  }
];

export default function LiveProductionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Live Production</h1>
        <p className="text-lg text-muted-foreground">
          Master the skills needed to produce professional live broadcasts
        </p>
      </div>

      <div className="grid gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {section.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>

                  {section.href && (
                    <Button asChild>
                      <Link href={section.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}