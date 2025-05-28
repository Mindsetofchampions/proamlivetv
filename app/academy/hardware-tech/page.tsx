"use client";

import { motion } from 'framer-motion';
import { Camera, Mic, Laptop, Monitor, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const equipment = [
  {
    title: 'Camera Setup',
    icon: <Camera className="h-8 w-8 text-primary" />,
    description: 'Choose and configure your video equipment',
    items: [
      'Camera Selection',
      'Lens Options',
      'Camera Settings',
      'Mounting Solutions'
    ],
    recommendations: [
      'DSLR/Mirrorless Cameras',
      'Webcams',
      'Action Cameras',
      'Capture Cards'
    ]
  },
  {
    title: 'Audio Equipment',
    icon: <Mic className="h-8 w-8 text-primary" />,
    description: 'Professional audio capture solutions',
    items: [
      'Microphone Types',
      'Audio Interfaces',
      'Acoustic Treatment',
      'Monitoring Setup'
    ],
    recommendations: [
      'USB Microphones',
      'XLR Microphones',
      'Audio Mixers',
      'Headphones'
    ]
  },
  {
    title: 'Streaming Setup',
    icon: <Laptop className="h-8 w-8 text-primary" />,
    description: 'Configure your streaming workstation',
    items: [
      'Computer Specs',
      'Streaming Software',
      'Network Setup',
      'Stream Settings'
    ],
    recommendations: [
      'OBS Studio',
      'Streamlabs',
      'Stream Deck',
      'Overlays'
    ]
  },
  {
    title: 'Studio Layout',
    icon: <Monitor className="h-8 w-8 text-primary" />,
    description: 'Design your production space',
    items: [
      'Room Setup',
      'Lighting Design',
      'Cable Management',
      'Green Screen'
    ],
    recommendations: [
      'LED Panels',
      'Ring Lights',
      'Backdrop Systems',
      'Storage Solutions'
    ]
  }
];

export default function HardwareTechPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hardware & Tech</h1>
        <p className="text-lg text-muted-foreground">
          Build your professional production setup
        </p>
      </div>

      <div className="grid gap-8">
        {equipment.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                
                <div className="flex-1 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Setup Guide</h3>
                    <ul className="space-y-2">
                      {item.items.map((setup) => (
                        <li key={setup} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{setup}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Recommended Gear</h3>
                    <ul className="space-y-2">
                      {item.recommendations.map((gear) => (
                        <li key={gear} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{gear}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  View Setup Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}