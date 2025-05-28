"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  School,
  Mic2,
  Video,
  Gamepad2,
  Radio,
  DollarSign,
  Laptop,
  Calendar,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const creatorJourney = [
  {
    id: 'find-school',
    title: 'Find Your School',
    icon: <School className="h-8 w-8" />,
    description: 'Connect with your school's media program',
    href: '/finder/school'
  },
  {
    id: 'on-air',
    title: 'On-Air Talent',
    icon: <Mic2 className="h-8 w-8" />,
    description: 'Learn broadcasting and hosting skills',
    href: '/academy/on-air'
  },
  {
    id: 'content-production',
    title: 'Content Production',
    icon: <Video className="h-8 w-8" />,
    description: 'Master video editing and storytelling',
    href: '/academy/content-production'
  },
  {
    id: 'esports-gaming',
    title: 'Esports & Gaming',
    icon: <Gamepad2 className="h-8 w-8" />,
    description: 'Compete and create gaming content',
    href: '/academy/esports-gaming'
  },
  {
    id: 'live-production',
    title: 'Live Production',
    icon: <Radio className="h-8 w-8" />,
    description: 'Learn to produce live events',
    href: '/academy/live-production'
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    icon: <DollarSign className="h-8 w-8" />,
    description: 'Build your creator business',
    href: '/academy/entrepreneurship-sponsorship'
  },
  {
    id: 'hardware-tech',
    title: 'Hardware & Tech',
    icon: <Laptop className="h-8 w-8" />,
    description: 'Setup your production gear',
    href: '/academy/hardware-tech'
  },
  {
    id: 'partner-booking',
    title: 'Partner Booking',
    icon: <Calendar className="h-8 w-8" />,
    description: 'Book gigs with partners',
    href: '/academy/partner-booking'
  },
  {
    id: 'launch',
    title: 'Launch Dashboard',
    icon: <LayoutDashboard className="h-8 w-8" />,
    description: 'Start your creator journey',
    href: '/creator/dashboard'
  }
];

export default function CreatorPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Creator Academy</h1>
          <p className="text-lg text-muted-foreground">
            Your journey to becoming a professional content creator starts here
          </p>
        </div>

        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <div className="relative flex overflow-x-auto gap-4 pb-4 px-2 snap-x snap-mandatory">
            {creatorJourney.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex-none w-72 snap-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={step.href}>
                  <Card 
                    className={`h-full p-6 hover:border-primary transition-colors ${
                      activeStep === index ? 'border-primary' : ''
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <Button variant="ghost" className="w-full group">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-muted-foreground mb-8">
            Join our community of student creators and start building your audience today.
          </p>
          <Button size="lg" asChild>
            <Link href="/creator/dashboard">
              Launch Creator Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}