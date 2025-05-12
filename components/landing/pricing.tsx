"use client";

import { useState } from 'react';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  X 
} from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Free Trial",
    description: "Experience all features for 7 days",
    price: {
      monthly: 0,
      yearly: 0
    },
    features: [
      { name: "Limited video library access", included: true },
      { name: "Stream on one device", included: true },
      { name: "Standard video quality", included: true },
      { name: "Basic support", included: true },
      { name: "No creator tools", included: false },
      { name: "No account sharing", included: false }
    ],
    popular: false,
    buttonText: "Start Free Trial"
  },
  {
    name: "Basic",
    description: "Perfect for regular viewers",
    price: {
      monthly: 7.99,
      yearly: 79.99
    },
    features: [
      { name: "Full video library access", included: true },
      { name: "Stream on two devices", included: true },
      { name: "HD video quality", included: true },
      { name: "Priority support", included: true },
      { name: "Limited creator tools", included: true },
      { name: "No account sharing", included: false }
    ],
    popular: true,
    buttonText: "Choose Basic"
  },
  {
    name: "Premium",
    description: "For serious creators and superfans",
    price: {
      monthly: 14.99,
      yearly: 149.99
    },
    features: [
      { name: "Full video library access", included: true },
      { name: "Stream on four devices", included: true },
      { name: "4K video quality", included: true },
      { name: "24/7 premium support", included: true },
      { name: "Full creator tools", included: true },
      { name: "Account sharing allowed", included: true }
    ],
    popular: false,
    buttonText: "Choose Premium"
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const yearlyDiscount = 'Save 16%';

  return (
    <section id="pricing" className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works for you. All plans include a 7-day free trial.
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
              
              <SignUpButton mode="modal">
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : ''
                  }`} 
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </SignUpButton>
              
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
    </section>
  );
};

export default Pricing;