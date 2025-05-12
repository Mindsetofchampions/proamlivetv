"use client";

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const tierDetails = {
  gold: {
    name: "Gold Partnership",
    description: "Our premium partnership tier offering maximum visibility and engagement",
    price: "Contact for pricing",
    benefits: [
      {
        title: "Premium Brand Visibility",
        description: "Featured placement on homepage and all major platform sections"
      },
      {
        title: "Custom Content Creation",
        description: "Dedicated team for creating co-branded content and shows"
      },
      {
        title: "Strategic Consultation",
        description: "Quarterly strategy meetings with our leadership team"
      },
      {
        title: "Talent Pipeline",
        description: "First access to our pool of emerging creative talent"
      },
      {
        title: "Event Integration",
        description: "VIP access and speaking opportunities at all events"
      },
      {
        title: "Analytics & Reporting",
        description: "Weekly detailed reports on partnership performance"
      }
    ]
  },
  silver: {
    name: "Silver Partnership",
    description: "Balanced partnership offering strong visibility and engagement opportunities",
    price: "Contact for pricing",
    benefits: [
      {
        title: "Enhanced Brand Visibility",
        description: "Prominent footer placement and category features"
      },
      {
        title: "Content Collaboration",
        description: "Regular opportunities for content collaboration"
      },
      {
        title: "Business Reviews",
        description: "Bi-annual strategy and performance reviews"
      },
      {
        title: "Talent Access",
        description: "Standard access to our talent pool"
      },
      {
        title: "Event Participation",
        description: "Regular invitations to platform events"
      },
      {
        title: "Performance Tracking",
        description: "Monthly performance and engagement reports"
      }
    ]
  },
  community: {
    name: "Community Partnership",
    description: "Entry-level partnership focused on community engagement",
    price: "Contact for pricing",
    benefits: [
      {
        title: "Basic Brand Presence",
        description: "Social media integration and community features"
      },
      {
        title: "Speaking Opportunities",
        description: "Guest speaking slots at community events"
      },
      {
        title: "Annual Review",
        description: "Annual partnership review and planning session"
      },
      {
        title: "Community Access",
        description: "Basic access to our creator community"
      },
      {
        title: "Event Access",
        description: "Access to select community events"
      },
      {
        title: "Basic Reporting",
        description: "Quarterly engagement reports"
      }
    ]
  }
};

export default function TierPage() {
  const router = useRouter();
  const params = useParams();
  const tier = params.tier as string;
  
  const details = tierDetails[tier as keyof typeof tierDetails];
  
  if (!details) {
    return null;
  }

  const handleScheduleCall = () => {
    // Replace with your actual Calendly URL
    window.open('https://calendly.com/proamtv/partnership', '_blank');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Partnership Tiers
        </Button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{details.name}</h1>
            <p className="text-xl text-muted-foreground mb-8">{details.description}</p>

            <Card className="mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Partnership Tier</p>
                    <h2 className="text-2xl font-bold">{details.price}</h2>
                  </div>
                  <Button size="lg" onClick={handleScheduleCall}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule a Call
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {details.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}