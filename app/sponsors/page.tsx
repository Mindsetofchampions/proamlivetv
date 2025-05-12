"use client";

import { motion } from 'framer-motion';
import { Trophy, BarChart, Upload, ArrowRight, CheckCircle2, Radio } from 'lucide-react';
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

const levels = [
  {
    name: "Title Sponsor",
    price: "Contact for pricing",
    features: [
      "Featured on all videos",
      "Pre-roll ad placement",
      "Custom branded segment",
      "Social media promotion",
      "Monthly performance reports",
      "Direct creator access"
    ]
  },
  {
    name: "Season Sponsor",
    price: "Contact for pricing",
    features: [
      "Category hero placements",
      "Mid-roll ad placement",
      "Brand integration options",
      "Social media mentions",
      "Quarterly reports",
      "Creator matchmaking"
    ]
  },
  {
    name: "Show Sponsor",
    price: "Contact for pricing",
    features: [
      "Single show credit",
      "End-card placement",
      "Basic brand integration",
      "Social media tag",
      "Basic reporting",
      "Community access"
    ]
  }
];

const approvalSteps = [
  {
    title: "Submit Application",
    description: "Complete the sponsorship application form with your details and preferences"
  },
  {
    title: "Profile Review",
    description: "Our team reviews your brand alignment and sponsorship goals"
  },
  {
    title: "Brand Kit Upload",
    description: "Upload your logos, guidelines, and advertising assets"
  },
  {
    title: "Agreement & Launch",
    description: "Sign agreement, process payment, and launch your sponsorship"
  }
];

const metrics = [
  {
    label: "Average Views",
    value: "25K+",
    description: "per sponsored video"
  },
  {
    label: "Engagement Rate",
    value: "12%",
    description: "across all content"
  },
  {
    label: "Brand Recall",
    value: "85%",
    description: "viewer recognition"
  }
];

export default function SponsorsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-16 mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)] mix-blend-overlay"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sponsor Our Creators
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Support student talent and gain targeted exposure to our engaged audience
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-white/90"
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply to Sponsor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Sponsorship Levels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Sponsorship Levels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{level.price}</p>
                    <ul className="space-y-3">
                      {level.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={index === 0 ? "default" : "outline"}>
                      Select {level.name}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Reach & Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Approval Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Approval Process</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {approvalSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply-form" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>
          <Card>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Sponsor Name</label>
                    <Input placeholder="Enter sponsor name" />
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
                  <label className="text-sm font-medium mb-1 block">Sponsorship Level Interest</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title Sponsor</SelectItem>
                      <SelectItem value="season">Season Sponsor</SelectItem>
                      <SelectItem value="show">Show Sponsor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea 
                    placeholder="Tell us about your sponsorship goals"
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button className="w-full">Submit Application</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}