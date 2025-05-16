"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Tv, 
  Laptop, 
  GraduationCap,
  ArrowRight,
  Search,
  Filter,
  Briefcase,
  Handshake,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const careerPaths = [
  {
    id: 'on-air-talent',
    title: 'On-Air Talent & Hosts',
    description: 'Learn broadcasting, hosting, and on-camera skills',
    icon: <Tv className="h-8 w-8" />,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'content-production',
    title: 'Content Production',
    description: 'Master video editing, motion graphics, and storytelling',
    icon: <Laptop className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'esports',
    title: 'Esports & Gaming',
    description: 'Compete and create content in competitive gaming',
    icon: <Gamepad2 className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'live-production',
    title: 'Live Production',
    description: 'Learn to produce and direct live events',
    icon: <GraduationCap className="h-8 w-8" />,
    color: 'from-orange-500 to-red-500'
  }
];

const businessPaths = [
  {
    id: 'event-management',
    title: 'Event Management',
    description: 'Master the art of planning and executing successful live events',
    icon: <Calendar className="h-8 w-8" />,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship & Relations',
    description: 'Learn to secure and manage corporate partnerships',
    icon: <Handshake className="h-8 w-8" />,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'business-development',
    title: 'Business Development',
    description: 'Develop strategies for growth and revenue generation',
    icon: <Briefcase className="h-8 w-8" />,
    color: 'from-teal-500 to-emerald-500'
  },
  {
    id: 'revenue-management',
    title: 'Revenue Management',
    description: 'Master monetization and financial planning',
    icon: <DollarSign className="h-8 w-8" />,
    color: 'from-violet-500 to-purple-500'
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

        {/* Content Creation Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Content Creation Skills</h2>
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
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
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

        {/* Business & Entrepreneurship Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Business & Entrepreneurship</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${path.color} p-1`}>
                  <div className="relative overflow-hidden rounded-lg bg-background p-6">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
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
          <div className="bg-card border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search schools..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="w-full px-4 py-2 rounded-lg border bg-background"
                value={selectedSkill || ''}
                onChange={(e) => setSelectedSkill(e.target.value || null)}
              >
                <option value="">Select skill</option>
                <option value="all">All Skills</option>
                {skills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>

              <select
                className="w-full px-4 py-2 rounded-lg border bg-background"
                value={selectedLocation || ''}
                onChange={(e) => setSelectedLocation(e.target.value || null)}
              >
                <option value="">Select location</option>
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
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
                <div className="group relative overflow-hidden rounded-xl bg-card border hover:border-primary transition-colors">
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
                </div>
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