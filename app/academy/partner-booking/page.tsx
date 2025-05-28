"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const partners = [
  {
    id: 'ymca',
    name: 'YMCA',
    icon: <Users className="h-12 w-12 text-blue-500" />,
    description: 'Book creators for youth programs and community events'
  },
  {
    id: 'bgc',
    name: 'Boys & Girls Club',
    icon: <Building2 className="h-12 w-12 text-green-500" />,
    description: 'Host workshops and activities at local clubs'
  },
  {
    id: 'schools',
    name: 'Local Schools',
    icon: <GraduationCap className="h-12 w-12 text-purple-500" />,
    description: 'Create content for school events and sports'
  }
];

export default function PartnerBookingPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success handling would go here
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Partner Booking</h1>
        <p className="text-lg text-muted-foreground">
          Connect with partner organizations and book creator opportunities
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/partner-channels/${partner.id}`}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                  {partner.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-muted-foreground mb-4">{partner.description}</p>
                <Button variant="outline" className="w-full">
                  View Opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Request a Creator</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input id="organizationName" placeholder="Enter organization name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" placeholder="Enter contact name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDetails">Event Details</Label>
            <Textarea 
              id="eventDetails" 
              placeholder="Describe your event and creator requirements"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Calendar className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}