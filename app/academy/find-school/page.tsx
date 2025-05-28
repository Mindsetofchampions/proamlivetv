"use client";

import { motion } from 'framer-motion';
import { School, MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schools = [
  {
    id: 'lincoln-high',
    name: 'Lincoln High School',
    location: 'San Francisco, CA',
    programs: ['Broadcasting', 'Digital Media'],
    image: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg'
  },
  {
    id: 'roosevelt-academy',
    name: 'Roosevelt Academy',
    location: 'Chicago, IL',
    programs: ['Film Production', 'Sports Commentary'],
    image: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg'
  },
  {
    id: 'washington-tech',
    name: 'Washington Tech',
    location: 'Seattle, WA',
    programs: ['Media Technology', 'Live Production'],
    image: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg'
  }
];

export default function FindSchoolPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your School</h1>
        <p className="text-lg text-muted-foreground">
          Connect with your school's media program and start your creator journey
        </p>
      </div>

      <div className="mb-12">
        <Label htmlFor="search">Search Schools</Label>
        <div className="relative">
          <Input
            id="search"
            placeholder="Enter your school name or location..."
            className="pl-10"
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-6">
        {schools.map((school, index) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative aspect-video md:w-64 rounded-lg overflow-hidden">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{school.name}</h2>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {school.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {school.programs.map((program) => (
                      <span
                        key={program}
                        className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                  <Button>
                    Apply to Join
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}