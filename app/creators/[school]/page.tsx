import { notFound } from 'next/navigation';
import SchoolClient from './school-client';

const schoolDetails = {
  'lincoln-high-school': {
    name: "Lincoln High School",
    location: "San Francisco, CA",
    programs: ["Broadcasting", "Digital Media"],
    description: "Lincoln High School's media program offers state-of-the-art facilities and experienced instructors dedicated to nurturing the next generation of content creators.",
    facilities: [
      "Professional Broadcasting Studio",
      "Digital Editing Lab",
      "Podcast Recording Rooms",
      "Green Screen Studio"
    ],
    achievements: [
      "Regional Broadcasting Awards Winner 2024",
      "Student Film Festival Host",
      "Industry Partnership Program"
    ],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg"
  },
  'roosevelt-academy': {
    name: "Roosevelt Academy",
    location: "Chicago, IL",
    programs: ["Film Production", "Sports Commentary"],
    description: "Roosevelt Academy specializes in film production and sports broadcasting, providing students with hands-on experience in live event coverage and documentary filmmaking.",
    facilities: [
      "Film Production Studio",
      "Sports Commentary Booth",
      "Post-Production Suite",
      "Equipment Lending Library"
    ],
    achievements: [
      "Best Student Sports Coverage 2024",
      "Documentary Film Awards",
      "Professional Sports Partnership"
    ],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg"
  },
  'washington-tech': {
    name: "Washington Tech",
    location: "Seattle, WA",
    programs: ["Media Technology", "Live Production"],
    description: "Washington Tech's innovative program combines technical expertise with creative storytelling, preparing students for careers in digital media production.",
    facilities: [
      "Live Production Control Room",
      "Virtual Reality Lab",
      "Audio Engineering Studio",
      "Motion Capture Stage"
    ],
    achievements: [
      "Tech Innovation Award 2024",
      "Virtual Production Showcase",
      "Industry Mentorship Program"
    ],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg"
  },
  'jefferson-arts': {
    name: "Jefferson Arts",
    location: "New York, NY",
    programs: ["Creative Media", "Performance Arts"],
    description: "Jefferson Arts integrates traditional performing arts with digital media, creating unique opportunities for students to explore creative storytelling.",
    facilities: [
      "Performance Theater",
      "Digital Arts Studio",
      "Animation Lab",
      "Content Creation Hub"
    ],
    achievements: [
      "Arts & Media Excellence Award",
      "Student Showcase Series",
      "Creative Industry Partnerships"
    ],
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg"
  }
};

export function generateStaticParams() {
  return Object.keys(schoolDetails).map((school) => ({
    school: school
  }));
}

export default function SchoolPage({ params }: { params: { school: string } }) {
  const { school } = params;
  const details = schoolDetails[school as keyof typeof schoolDetails];
  
  if (!details) {
    notFound();
  }

  return <SchoolClient school={details} />;
}