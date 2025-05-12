"use client";

import { motion } from 'framer-motion';
import { 
  Upload, 
  Play, 
  DollarSign, 
  Users, 
  Shield, 
  Zap
} from 'lucide-react';

const features = [
  {
    icon: <Upload className="h-10 w-10 text-purple-500" />,
    title: "Easy Upload",
    description: "Upload your content in minutes with our simple, intuitive interface designed for creators."
  },
  {
    icon: <Play className="h-10 w-10 text-blue-500" />,
    title: "Professional Playback",
    description: "Your content streams in high-quality to viewers on any device with adaptive bitrate technology."
  },
  {
    icon: <DollarSign className="h-10 w-10 text-green-500" />,
    title: "Monetize Your Talent",
    description: "Earn from your content through subscriptions and viewer support, all handled seamlessly."
  },
  {
    icon: <Users className="h-10 w-10 text-yellow-500" />,
    title: "Connect With Fans",
    description: "Build your audience with integrated analytics and engagement tools."
  },
  {
    icon: <Shield className="h-10 w-10 text-red-500" />,
    title: "Content Protection",
    description: "Your videos are secured with digital rights management to prevent unauthorized sharing."
  },
  {
    icon: <Zap className="h-10 w-10 text-orange-500" />,
    title: "Lightning Fast",
    description: "Videos process quickly and load instantly, providing the best experience for creators and viewers."
  }
];

const Features = () => {
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
          <motion.div 
            key={index}
            className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
            variants={itemVariants}
          >
            <div className="mb-4 p-3 rounded-full w-fit bg-secondary/20">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;