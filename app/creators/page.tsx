"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mic,
  Video,
  Cog,
  BarChart,
  Users,
  ArrowRight,
  GraduationCap,
  School
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

const careerPaths = [
  {
    id: 'on-air-talent',
    title: 'On-Air Talent & Hosts',
    icon: <Mic className="h-6 w-6" />,
    roles: ['Live Stream Host', 'Show Anchor', 'Play-by-Play Commentator', 'Analyst'],
    pathway: [
      {
        stage: 'Foundations',
        modules: [
          {
            title: 'Public Speaking & On-Camera Confidence',
            badge: 'Studio Rookie',
            task: 'Record a 1-min on-camera intro'
          }
        ]
      },
      {
        stage: 'Practice & Feedback',
        modules: [
          {
            title: 'Co-host 1–2 community streams',
            badge: 'Co-Host Certified'
          }
        ]
      },
      {
        stage: 'Lead Shows',
        modules: [
          {
            title: 'Pitch & run your own weekly show',
            description: 'Create highlight reel or interview segment',
            badge: 'On-Air Host'
          }
        ]
      },
      {
        stage: 'Advanced Broadcast',
        modules: [
          {
            title: 'Play-by-Play/Color Commentary training',
            certificate: 'Pro Commentator'
          }
        ]
      }
    ]
  },
  {
    id: 'content-production',
    title: 'Content Production & Editing',
    icon: <Video className="h-6 w-6" />,
    roles: ['Video Editor', 'Highlight Reel Producer', 'Motion Graphics Designer'],
    pathway: [
      {
        stage: 'Basics of Editing',
        modules: [
          {
            title: 'Adobe Premiere / DaVinci Resolve Essentials',
            badge: 'Cut Rookie',
            task: 'Cut a 60-sec highlight clip'
          }
        ]
      },
      {
        stage: 'Advanced Techniques',
        modules: [
          {
            title: 'Transitions, Color Grading, Sound Design',
            badge: 'Editor Certified',
            task: 'Produce a themed highlight reel with music/sfx'
          }
        ]
      },
      {
        stage: 'Motion Graphics & Branding',
        modules: [
          {
            title: 'After Effects / Blender Basics',
            certificate: 'Motion Designer'
          }
        ]
      }
    ]
  },
  {
    id: 'live-production',
    title: 'Live Production & Engineering',
    icon: <Cog className="h-6 w-6" />,
    roles: ['Broadcast Engineer', 'Technical Director', 'Stream Operations Specialist'],
    pathway: [
      {
        stage: 'Streaming Fundamentals',
        modules: [
          {
            title: 'OBS/Streamlabs setup, audio/video sync',
            badge: 'Stream Tech Rookie',
            task: 'Configure a 720p multi-scene stream'
          }
        ]
      },
      {
        stage: 'Hardware & Networking',
        modules: [
          {
            title: 'Encoders, Switchers, Network Optimization',
            badge: 'Tech Certified',
            task: 'Build and run a mock live event with 2 cameras'
          }
        ]
      },
      {
        stage: 'Live Event Management',
        modules: [
          {
            title: 'Redundancy & Failover, Team Coordination',
            certificate: 'Live Broadcast Engineer'
          }
        ]
      }
    ]
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy & Production Management',
    icon: <BarChart className="h-6 w-6" />,
    roles: ['Showrunner', 'Series Producer', 'Scheduler'],
    pathway: [
      {
        stage: 'Creative Development',
        modules: [
          {
            title: 'Ideation & Scripting for Episodic Content',
            badge: 'Showrunner Rookie',
            task: 'Draft a 3–episode mini-series outline'
          }
        ]
      },
      {
        stage: 'Project Management',
        modules: [
          {
            title: 'Agile & Waterfall for Media Production',
            badge: 'Producer Certified',
            task: 'Run a 2-week sprint to deliver an episode'
          }
        ]
      },
      {
        stage: 'Monetization & PPV',
        modules: [
          {
            title: 'Pricing Strategy, Audience Analytics',
            certificate: 'Content Strategist'
          }
        ]
      }
    ]
  }
];

const participatingSchools = [
  {
    name: "Lincoln High School",
    location: "San Francisco, CA",
    programs: ["Broadcasting", "Digital Media"]
  },
  {
    name: "Roosevelt Academy",
    location: "Chicago, IL",
    programs: ["Film Production", "Sports Commentary"]
  },
  {
    name: "Washington Tech",
    location: "Seattle, WA",
    programs: ["Media Technology", "Live Production"]
  },
  {
    name: "Jefferson Arts",
    location: "New York, NY",
    programs: ["Creative Media", "Performance Arts"]
  }
];

export default function CreatorsPage() {
  const { isSignedIn } = useAuth();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Launch Your Creator Career
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose your path, earn certifications, and build your portfolio in our youth-run television network
            </p>
            {isSignedIn ? (
              <Button size="lg" asChild>
                <Link href="/dashboard/career">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Join as Creator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Career Paths */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Career Pathways</h2>
          <div className="grid gap-6">
            {careerPaths.map((path) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value={path.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          {path.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold">{path.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {path.roles.join(' • ')}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-16 pt-4">
                        {path.pathway.map((stage, index) => (
                          <div key={index} className="mb-6">
                            <h4 className="font-semibold mb-3">{stage.stage}</h4>
                            {stage.modules.map((module, moduleIndex) => (
                              <div key={moduleIndex} className="mb-4 pl-4 border-l">
                                <p className="mb-2">{module.title}</p>
                                {module.task && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Task: {module.task}
                                  </p>
                                )}
                                {module.badge && (
                                  <Badge variant="secondary">
                                    Badge: {module.badge}
                                  </Badge>
                                )}
                                {module.certificate && (
                                  <Badge variant="default">
                                    Certificate: {module.certificate}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Participating Schools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Participating Schools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {participatingSchools.map((school, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <School className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{school.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{school.location}</p>
                    <div className="flex flex-wrap gap-2">
                      {school.programs.map((program, programIndex) => (
                        <Badge key={programIndex} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)] mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Creator Journey?
              </h2>
              <p className="text-white/90 mb-6">
                Join our community of young creators and start building your portfolio today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/sign-up">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/dashboard">
                    Creator Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}