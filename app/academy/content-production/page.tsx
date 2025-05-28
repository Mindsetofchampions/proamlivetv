"use client";

import { motion } from 'framer-motion';
import { Video, Edit, Image as ImageIcon, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const courses = [
  {
    title: 'Video Editing',
    icon: <Edit className="h-8 w-8 text-primary" />,
    description: 'Master professional video editing techniques',
    topics: [
      'Timeline Management',
      'Transitions & Effects',
      'Color Grading',
      'Audio Mixing'
    ],
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro']
  },
  {
    title: 'Cinematography',
    icon: <Video className="h-8 w-8 text-primary" />,
    description: 'Learn camera techniques and shot composition',
    topics: [
      'Camera Movement',
      'Lighting Setup',
      'Shot Composition',
      'Focus Techniques'
    ],
    tools: ['DSLR Cameras', 'Lighting Kits', 'Stabilizers']
  },
  {
    title: 'Visual Effects',
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    description: 'Create stunning visual effects and graphics',
    topics: [
      'Motion Graphics',
      'Green Screen',
      'Text Animation',
      'Particle Effects'
    ],
    tools: ['After Effects', 'Blender', 'Cinema 4D']
  },
  {
    title: 'Content Strategy',
    icon: <Share2 className="h-8 w-8 text-primary" />,
    description: 'Plan and optimize your content for success',
    topics: [
      'Audience Analysis',
      'Content Calendar',
      'SEO Optimization',
      'Analytics'
    ],
    tools: ['Analytics Tools', 'SEO Software', 'Social Media']
  }
];

export default function ContentProductionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Content Production</h1>
        <p className="text-lg text-muted-foreground">
          Learn professional video production and editing techniques
        </p>
      </div>

      <div className="grid gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {course.icon}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                
                <div className="flex-1 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Topics Covered</h3>
                    <ul className="space-y-2">
                      {course.topics.map((topic) => (
                        <li key={topic} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Tools & Software</h3>
                    <ul className="space-y-2">
                      {course.tools.map((tool) => (
                        <li key={tool} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  Start Course
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