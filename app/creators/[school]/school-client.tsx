"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { School, MapPin, GraduationCap, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SchoolDetails {
  name: string;
  location: string;
  programs: string[];
  description: string;
  facilities: string[];
  achievements: string[];
  image: string;
}

interface SchoolClientProps {
  school: SchoolDetails;
}

export default function SchoolClient({ school }: SchoolClientProps) {
  const router = useRouter();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src={school.image} 
                  alt={school.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                {school.location}
              </div>

              <p className="text-lg mb-6">{school.description}</p>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Programs</h2>
                  <div className="flex flex-wrap gap-2">
                    {school.programs.map((program, index) => (
                      <div 
                        key={index}
                        className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {program}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Facilities</h2>
                  <ul className="space-y-2">
                    {school.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center">
                        <School className="h-4 w-4 mr-2 text-primary" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Achievements</h2>
                  <ul className="space-y-2">
                    {school.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Enroll in Our Program</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" />
                  </div>

                  <div>
                    <Label htmlFor="grade">Current Grade</Label>
                    <Input id="grade" placeholder="Enter your grade" />
                  </div>

                  <div>
                    <Label htmlFor="program">Program Interest</Label>
                    <select 
                      id="program"
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select a program</option>
                      {school.programs.map((program, index) => (
                        <option key={index} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      placeholder="Tell us about your interests and goals"
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Submit Inquiry
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}