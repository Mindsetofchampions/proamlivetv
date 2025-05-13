"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Free Forever",
    description: "Perfect for families and casual viewers",
    price: {
      monthly: 0,
      yearly: 0
    },
    features: [
      { name: "Full video library access", included: true },
      { name: "Stream on one device", included: true },
      { name: "HD video quality", included: true },
      { name: "Community support", included: true },
      { name: "Basic parental controls", included: true },
      { name: "Ad-supported viewing", included: true }
    ],
    popular: false,
    buttonText: "Start Watching"
  },
  {
    name: "Family Plus",
    description: "Enhanced features for the whole family",
    price: {
      monthly: 7.99,
      yearly: 79.99
    },
    features: [
      { name: "Everything in Free", included: true },
      { name: "Stream on three devices", included: true },
      { name: "4K video quality", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced parental controls", included: true },
      { name: "Ad-free viewing", included: true }
    ],
    popular: true,
    buttonText: "Choose Family Plus"
  },
  {
    name: "Creator",
    description: "For aspiring content creators",
    price: {
      monthly: 14.99,
      yearly: 149.99
    },
    features: [
      { name: "Everything in Family Plus", included: true },
      { name: "Stream on five devices", included: true },
      { name: "Creator tools & analytics", included: true },
      { name: "24/7 premium support", included: true },
      { name: "Revenue sharing", included: true },
      { name: "Early access features", included: true }
    ],
    popular: false,
    buttonText: "Choose Creator"
  }
];

const comparisonFeatures = [
  {
    category: "Content Access",
    features: [
      { name: "Video Library Access", free: "Full", basic: "Full", premium: "Full" },
      { name: "Video Quality", free: "HD", basic: "4K", premium: "4K" },
      { name: "Offline Downloads", free: "No", basic: "Yes", premium: "Yes" },
      { name: "Ad-Free Viewing", free: "No", basic: "Yes", premium: "Yes" }
    ]
  },
  {
    category: "Family Features",
    features: [
      { name: "Simultaneous Streams", free: "1", basic: "3", premium: "5" },
      { name: "Parental Controls", free: "Basic", basic: "Advanced", premium: "Advanced" },
      { name: "Family Profiles", free: "2", basic: "6", premium: "Unlimited" },
      { name: "Watch History", free: "Yes", basic: "Yes", premium: "Yes" }
    ]
  },
  {
    category: "Support & Features",
    features: [
      { name: "Customer Support", free: "Community", basic: "Priority", premium: "24/7" },
      { name: "Creator Tools", free: "No", basic: "No", premium: "Yes" },
      { name: "Revenue Sharing", free: "No", basic: "No", premium: "Yes" },
      { name: "Early Access", free: "No", basic: "No", premium: "Yes" }
    ]
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const yearlyDiscount = 'Save 16%';

  return (
    <section id="pricing" className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, Family-Friendly <span className="text-primary">Pricing</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start watching for free forever. Upgrade anytime for enhanced family features.
        </p>
        
        <div className="flex items-center justify-center mt-8">
          <span className={`text-sm mr-2 ${billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={billingCycle === 'yearly'}
            onCheckedChange={toggleBillingCycle}
          />
          <span className={`text-sm ml-2 flex items-center ${billingCycle === 'yearly' ? 'font-medium' : 'text-muted-foreground'}`}>
            Yearly
            {billingCycle === 'yearly' && (
              <span className="ml-2 bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
                {yearlyDiscount}
              </span>
            )}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`bg-card rounded-xl shadow-sm border overflow-hidden ${
              plan.popular ? 'border-primary md:scale-105 relative z-10' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {plan.popular && (
              <div className="bg-primary text-white text-xs font-medium py-1 text-center">
                MOST POPULAR
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-3xl font-bold">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground ml-1 mb-1">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
              </div>
              
              <Button 
                className={`w-full mb-6 ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : ''
                }`} 
                variant={plan.popular ? 'default' : 'outline'}
                asChild
              >
                <a href="/register">{plan.buttonText}</a>
              </Button>
              
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                    )}
                    <span className={!feature.included ? 'text-muted-foreground' : ''}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">Features Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium">Feature</th>
                <th className="text-center py-4 px-4 font-medium">Free Forever</th>
                <th className="text-center py-4 px-4 font-medium">Family Plus</th>
                <th className="text-center py-4 px-4 font-medium">Creator</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((section, sectionIndex) => (
                <>
                  <tr key={`section-${sectionIndex}`} className="bg-muted/50">
                    <td colSpan={4} className="py-3 px-4 font-semibold">
                      {section.category}
                    </td>
                  </tr>
                  {section.features.map((feature, featureIndex) => (
                    <tr key={`feature-${sectionIndex}-${featureIndex}`} className="border-b">
                      <td className="py-3 px-4">{feature.name}</td>
                      <td className="text-center py-3 px-4">
                        {feature.free === "Yes" ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : feature.free === "No" ? (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          feature.free
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {feature.basic === "Yes" ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : feature.basic === "No" ? (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          feature.basic
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {feature.premium === "Yes" ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : feature.premium === "No" ? (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          feature.premium
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}