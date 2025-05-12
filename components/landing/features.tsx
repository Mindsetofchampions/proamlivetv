"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Play, 
  DollarSign, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const features = [
  {
    icon: <Upload className="h-10 w-10 text-purple-500" />,
    title: "Easy Upload",
    description: "Upload your content in minutes with our simple, intuitive interface designed for creators.",
    details: {
      title: "How to Upload Content",
      steps: [
        "Sign in to your creator account",
        "Click the 'Upload' button in the dashboard",
        "Select your video file (supported formats: MP4, MOV, WebM)",
        "Add title, description, and tags while the video processes",
        "Choose a thumbnail or upload your own",
        "Set visibility options (public, private, or unlisted)",
        "Publish when ready!"
      ]
    }
  },
  {
    icon: <Play className="h-10 w-10 text-blue-500" />,
    title: "Professional Playback",
    description: "Your content streams in high-quality to viewers on any device with adaptive bitrate technology.",
    details: {
      title: "Playback Features",
      features: [
        "Adaptive bitrate streaming for smooth playback",
        "Support for up to 4K resolution",
        "Multiple device compatibility",
        "Picture-in-picture mode",
        "Custom player branding",
        "Chapters and timestamps",
        "Automatic quality adjustment"
      ]
    }
  },
  {
    icon: <DollarSign className="h-10 w-10 text-green-500" />,
    title: "Monetize Your Talent",
    description: "Earn from your content through subscriptions and viewer support, all handled seamlessly.",
    details: {
      title: "Monetization Options",
      options: [
        "Channel subscriptions",
        "Pay-per-view events",
        "Virtual tips and donations",
        "Sponsored content opportunities",
        "Revenue sharing program",
        "Custom merchandise integration",
        "Brand partnership marketplace"
      ]
    }
  },
  {
    icon: <Users className="h-10 w-10 text-yellow-500" />,
    title: "Connect With Fans",
    description: "Build your audience with integrated analytics and engagement tools.",
    details: {
      title: "Fan Engagement Tools",
      tools: [
        "Live chat during streams",
        "Community posts and updates",
        "Polls and surveys",
        "Fan badges and levels",
        "Custom emotes",
        "Member-only content",
        "Direct messaging system"
      ]
    }
  },
  {
    icon: <Shield className="h-10 w-10 text-red-500" />,
    title: "Content Protection",
    description: "Your videos are secured with digital rights management to prevent unauthorized sharing.",
    details: {
      title: "Security Features",
      features: [
        "Digital Rights Management (DRM)",
        "Watermarking options",
        "Download restrictions",
        "Geographic restrictions",
        "Content ID system",
        "Copyright protection",
        "Secure video storage"
      ]
    }
  },
  {
    icon: <Zap className="h-10 w-10 text-orange-500" />,
    title: "Lightning Fast",
    description: "Videos process quickly and load instantly, providing the best experience for creators and viewers.",
    details: {
      title: "Performance Features",
      features: [
        "Fast video processing",
        "Global CDN distribution",
        "Quick thumbnail generation",
        "Instant live streaming",
        "Real-time analytics",
        "Low latency playback",
        "Optimized mobile experience"
      ]
    }
  }
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to <span className="text-primary">Succeed</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our platform provides all the tools youth creators need to upload, stream, and monetize their content professionally.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                variants={itemVariants}
              >
                <div className="mb-4 p-3 rounded-full w-fit bg-secondary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{feature.details.title}</DialogTitle>
                <DialogDescription>
                  <div className="mt-4">
                    {feature.details.steps && (
                      <ol className="list-decimal pl-4 space-y-2">
                        {feature.details.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    )}
                    {feature.details.features && (
                      <ul className="list-disc pl-4 space-y-2">
                        {feature.details.features.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {feature.details.options && (
                      <ul className="list-disc pl-4 space-y-2">
                        {feature.details.options.map((option, i) => (
                          <li key={i}>{option}</li>
                        ))}
                      </ul>
                    )}
                    {feature.details.tools && (
                      <ul className="list-disc pl-4 space-y-2">
                        {feature.details.tools.map((tool, i) => (
                          <li key={i}>{tool}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;