"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Gamepad2, 
  GraduationCap, 
  Users, 
  Trophy,
  PlayCircle,
  ArrowRight,
  Mic2,
  MapPin,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const careerPaths = [
  {
    id: 'on-air-talent',
    title: 'On-Air Talent & Hosts',
    icon: <Mic2 className="h-8 w-8" />,
    description: 'Learn broadcasting, hosting, and on-camera skills',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'content-production',
    title: 'Content Production',
    icon: <Video className="h-8 w-8" />,
    description: 'Master video editing, motion graphics, and storytelling',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'esports',
    title: 'Esports & Gaming',
    icon: <Gamepad2 className="h-8 w-8" />,
    description: 'Compete and create content in competitive gaming',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'live-production',
    title: 'Live Production',
    icon: <PlayCircle className="h-8 w-8" />,
    description: 'Learn to produce and direct live events',
    color: 'from-orange-500 to-red-500'
  }
];

const skills = [
  "Broadcasting",
  "Digital Media",
  "Film Production",
  "Sports Commentary",
  "Media Technology",
  "Live Production",
  "Creative Media",
  "Performance Arts"
];

const schools = [
  {
    id: 'lincoln-high-school',
    name: "Lincoln High School",
    location: "San Francisco, CA",
    programs: ["Broadcasting", "Digital Media"],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    rating: 4.8,
    studentCount: 450,
    description: "State-of-the-art facilities and experienced instructors dedicated to nurturing the next generation of content creators."
  },
  {
    id: 'roosevelt-academy',
    name: "Roosevelt Academy",
    location: "Chicago, IL",
    programs: ["Film Production", "Sports Commentary"],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    rating: 4.7,
    studentCount: 380,
    description: "Specializing in film production and sports broadcasting, providing hands-on experience in live event coverage."
  },
  {
    id: 'washington-tech',
    name: "Washington Tech",
    location: "Seattle, WA",
    programs: ["Media Technology", "Live Production"],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    rating: 4.9,
    studentCount: 520,
    description: "Innovative program combining technical expertise with creative storytelling."
  },
  {
    id: 'jefferson-arts',
    name: "Jefferson Arts",
    location: "New York, NY",
    programs: ["Creative Media", "Performance Arts"],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    rating: 4.6,
    studentCount: 410,
    description: "Integrating traditional performing arts with digital media for unique storytelling opportunities."
  }
];

export default function CreatorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !selectedSkill || selectedSkill === 'all' || school.programs.includes(selectedSkill);
    const matchesLocation = !selectedLocation || selectedLocation === 'all' || school.location.includes(selectedLocation);
    return matchesSearch && matchesSkill && matchesLocation;
  });

  const locations = Array.from(new Set(schools.map(school => school.location)));

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Creator Academy</h1>
          <p className="text-lg text-muted-foreground">
            Launch your content creation career with professional training and mentorship
          </p>
        </div>

        {/* Career Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${path.color} p-1`}>
                  <div className="relative overflow-hidden rounded-lg bg-background p-6">
                    <div className="rounded-full bg-primary/10 p-3 w-fit text-primary mb-4">
                      {path.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {path.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* School Search */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Find Your School</h2>
          <Card>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schools..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={selectedSkill || undefined} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {skills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation || undefined} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* School Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSchools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/creators/${school.id}`}>
                <Card className="group relative overflow-hidden hover:border-primary transition-colors">
                  <div className="relative aspect-video">
                    <img 
                      src={school.image}
                      alt={school.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{school.name}</h3>
                      <div className="flex items-center text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {school.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4" />
                        <span>{school.studentCount} students</span>
                        <span className="mx-2">•</span>
                        <span>{school.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {school.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {school.programs.map((program, programIndex) => (
                        <Badge key={programIndex} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No schools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see your school?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking to partner with more educational institutions
          </p>
          <Button size="lg">
            Partner With Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}