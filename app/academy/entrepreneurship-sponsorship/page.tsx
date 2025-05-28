"use client";

import { motion } from 'framer-motion';
import { DollarSign, Building2, BarChart, Handshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const topics = [
  {
    title: 'Business Fundamentals',
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    description: 'Learn the basics of running a creator business',
    modules: [
      'Business Planning',
      'Financial Management',
      'Legal Considerations',
      'Tax Planning'
    ]
  },
  {
    title: 'Sponsorship Strategy',
    icon: <Building2 className="h-8 w-8 text-primary" />,
    description: 'Develop effective sponsor relationships',
    modules: [
      'Brand Partnership Basics',
      'Pitch Development',
      'Contract Negotiation',
      'Deliverable Management'
    ]
  },
  {
    title: 'Analytics & Growth',
    icon: <BarChart className="h-8 w-8 text-primary" />,
    description: 'Track and optimize your performance',
    modules: [
      'Metrics Analysis',
      'Growth Strategy',
      'Audience Insights',
      'ROI Tracking'
    ]
  },
  {
    title: 'Partnership Management',
    icon: <Handshake className="h-8 w-8 text-primary" />,
    description: 'Maintain successful brand relationships',
    modules: [
      'Communication Skills',
      'Project Management',
      'Reporting & Analytics',
      'Long-term Strategy'
    ]
  }
];

export default function EntrepreneurshipSponsorshipPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Entrepreneurship & Sponsorship</h1>
        <p className="text-lg text-muted-foreground">
          Build and monetize your creator business
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {topic.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-2">{topic.title}</h2>
              <p className="text-muted-foreground mb-6">{topic.description}</p>
              <div className="space-y-3 mb-6">
                {topic.modules.map((module) => (
                  <div key={module} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{module}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}