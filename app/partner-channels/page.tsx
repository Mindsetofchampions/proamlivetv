"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const partners = [
  {
    id: 'ymca',
    name: 'YMCA',
    icon: <Users className="h-12 w-12 text-blue-500" />,
    description: 'Community youth programs focused on developing leadership and life skills through sports, arts, and education.',
    categories: ['Sports', 'Education', 'Leadership']
  },
  {
    id: 'bgc',
    name: 'Boys & Girls Club',
    icon: <Building2 className="h-12 w-12 text-green-500" />,
    description: 'After-school activities and programs designed to empower young people to reach their full potential.',
    categories: ['Arts', 'Technology', 'Character Development']
  },
  {
    id: 'schools',
    name: 'Local Schools',
    icon: <GraduationCap className="h-12 w-12 text-purple-500" />,
    description: 'High school sports, academic competitions, and student-produced content from our educational partners.',
    categories: ['Sports', 'Academics', 'Student Life']
  }
];

export default function PartnerChannelsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Partner Channels</h1>
          <p className="text-lg text-muted-foreground">
            Discover curated content from our trusted community partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/partner-channels/${partner.id}`}>
                <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                      {partner.icon}
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {partner.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {partner.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {partner.categories.map((category) => (
                        <span
                          key={category}
                          className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );