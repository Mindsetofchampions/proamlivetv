import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import VideoClient from './video-client';

// Mock video data
const videos = {
  "video1": {
    id: "video1",
    title: "Urban Dance Championship Highlights",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "12:34",
    views: 25678,
    likes: 1245,
    creator: "DanceProdigy",
    creatorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
    publishedAt: "2025-02-15",
    category: "Dance",
    description: "Watch the incredible performances from the 2025 Urban Dance Championship featuring talented youth dancers from around the country. This event showcased some of the most innovative choreography and technical skills from participants aged 13-19.\n\nHighlights include the winning routine from Team Momentum, the crowd-favorite solo by Alicia Chen, and the surprise guest appearance by professional dancer Marcus Johnson.",
    tags: ["dance", "championship", "youth", "urban", "competition"]
  },
  "video2": {
    id: "video2",
    title: "New York Skateboarding Adventures",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "8:17",
    views: 18765,
    likes: 987,
    creator: "SkateLife",
    creatorAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
    publishedAt: "2025-03-01",
    category: "Sports",
    description: "Join me as I explore the best skateparks and street spots NYC has to offer. From Brooklyn Banks to Chelsea Piers, this tour shows you where to find the best places to skate in the city that never sleeps.\n\nI also share some tips for dealing with pedestrians, finding hidden gems, and avoiding common problems when skating in busy urban environments. Plus, check out my meetup with local skaters who showed me some insane tricks!",
    tags: ["skateboarding", "nyc", "urban", "sports", "street"]
  },
  "esports1": {
    id: "esports1",
    title: "Pro Gaming Championship Finals",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual video URL
    thumbnail: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "45:21",
    views: 98765,
    likes: 8432,
    creator: "ESportsCenter",
    creatorAvatar: "https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=300",
    publishedAt: "2025-03-10",
    category: "Esports",
    description: "Watch the thrilling finals of the 2025 Pro Gaming Championship! See the world's top players compete for the grand prize in this intense matchup that came down to the wire.",
    tags: ["esports", "gaming", "competition", "pro-gaming"]
  }
};

// Mock related videos
const relatedVideos = [
  {
    id: "video3",
    title: "DIY Room Makeover Under $100",
    thumbnail: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "15:42",
    creator: "CreativeSoul",
    views: 12432
  },
  {
    id: "video4",
    title: "Making Music With Household Items",
    thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "7:29",
    creator: "SoundWizard",
    views: 8765
  },
  {
    id: "video5",
    title: "Street Art Documentary: Young Voices",
    thumbnail: "https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "22:15",
    creator: "UrbanLens",
    views: 15983
  }
];

export function generateStaticParams() {
  return Object.keys(videos).map((id) => ({
    id,
  }));
}

export default function VideoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const video = videos[id as keyof typeof videos];
  
  // Check if video exists
  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <p className="mb-6">The video you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/videos">Back to Videos</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-16 bg-background">
      <VideoClient video={video} relatedVideos={relatedVideos} />
    </div>
  );
}