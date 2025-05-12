"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, ArrowRight, CheckCircle2, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const benefits = [
  {
    icon: <Building2 className="h-12 w-12 text-primary" />,
    title: "Brand Exposure",
    description: "Reach a highly engaged audience of young creators and their followers"
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Community Impact",
    description: "Support the next generation of digital media professionals"
  },
  {
    icon: <GraduationCap className="h-12 w-12 text-primary" />,
    title: "Talent Pipeline",
    description: "Connect with emerging talent for internships and future opportunities"
  }
];

const steps = [
  {
    title: "Initial Inquiry",
    description: "Submit your partnership interest through our form"
  },
  {
    title: "Strategy Call",
    description: "Discuss goals and explore partnership opportunities"
  },
  {
    title: "Custom Integration",
    description: "Design a tailored partnership program"
  },
  {
    title: "Launch & Growth",
    description: "Implement partnership and track success metrics"
  }
];

const tiers = [
  {
    id: "gold",
    name: "Gold Partner",
    price: "Contact for pricing",
    features: [
      "Homepage logo placement",
      "Custom co-branded show",
      "Quarterly strategy meetings",
      "First access to talent pool",
      "VIP event access",
      "Custom content creation"
    ]
  },
  {
    id: "silver",
    name: "Silver Partner",
    price: "Contact for pricing",
    features: [
      "Footer logo placement",
      "Sponsor highlight reel",
      "Bi-annual strategy meetings",
      "Talent pool access",
      "Event invitations",
      "Content collaboration"
    ]
  },
  {
    id: "community",
    name: "Community Partner",
    price: "Contact for pricing",
    features: [
      "Guest speaking slots",
      "Social media shoutouts",
      "Annual strategy meeting",
      "Community events access",
      "Brand mentions",
      "Basic reporting"
    ]
  }
];

const comparisonFeatures = [
  { name: "Brand Visibility", category: "Marketing" },
  { name: "Logo Placement", category: "Marketing" },
  { name: "Content Creation", category: "Marketing" },
  { name: "Social Media Promotion", category: "Marketing" },
  { name: "Strategy Meetings", category: "Support" },
  { name: "Talent Pool Access", category: "Recruitment" },
  { name: "Event Access", category: "Networking" },
  { name: "Custom Shows", category: "Content" },
  { name: "Analytics Reports", category: "Support" },
  { name: "Direct Creator Access", category: "Networking" }
];

const tierFeatures = {
  gold: [true, "Homepage", "Custom", "Weekly", "Quarterly", "Priority", "VIP", true, "Weekly", true],
  silver: [true, "Footer", "Basic", "Monthly", "Bi-annual", "Standard", "Regular", false, "Monthly", false],
  community: [true, "None", "None", "Quarterly", "Annual", "Basic", "Basic", false, "Quarterly", false]
};

export default function CorporatePage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleScheduleCall = () => {
    window.open('https://calendly.com/proamtv/partnership', '_blank');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 md:p-16 mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)] mix-blend-overlay"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Corporate Partnerships
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join PRO AM LIVE TV in shaping the next generation of media leaders
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-white/90"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 hidden md:block"></div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="bg-background relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Partnership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/corporate/${tier.id}`}>
                  <Card className="relative h-full hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{tier.price}</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-6" 
                        variant={index === 0 ? "default" : "outline"}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTier(tier.id);
                          handleScheduleCall();
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule a Call
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Features Comparison</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>Gold Partner</TableHead>
                  <TableHead>Silver Partner</TableHead>
                  <TableHead>Community Partner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {feature.name}
                      <span className="text-xs text-muted-foreground block">
                        {feature.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      {typeof tierFeatures.gold[index] === 'boolean' ? (
                        tierFeatures.gold[index] ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )
                      ) : (
                        <span className="font-medium text-primary">{tierFeatures.gold[index]}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof tierFeatures.silver[index] === 'boolean' ? (
                        tierFeatures.silver[index] ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )
                      ) : (
                        <span>{tierFeatures.silver[index]}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof tierFeatures.community[index] === 'boolean' ? (
                        tierFeatures.community[index] ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )
                      ) : (
                        <span>{tierFeatures.community[index]}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div id="contact-form" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started</h2>
          <Card>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company Name</label>
                    <Input placeholder="Enter company name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Contact Name</label>
                    <Input placeholder="Enter contact name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <Input type="tel" placeholder="Enter phone number" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Partnership Tier Interest</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold Partner</SelectItem>
                      <SelectItem value="silver">Silver Partner</SelectItem>
                      <SelectItem value="community">Community Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea 
                    placeholder="Tell us about your partnership goals"
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button className="w-full">Submit Inquiry</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}