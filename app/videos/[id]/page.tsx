import { Button } from "@/components/ui/button";
import VideoClient from './video-client';

// Mock video data
const videos = {
  "video1": {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Urban Dance Championship Highlights",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
    id: "25a6dff3-cdba-4f94-9af9-d79b937a2c1c",
    title: "New York Skateboarding Adventures",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
  "video3": {
    id: "7b8e6477-32ee-4c48-9b87-6e952a9069f1",
    title: "DIY Room Makeover Under $100",
    thumbnail: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "15:42",
    creator: "CreativeSoul",
    views: 12432,
    likes: 876,
    creatorAvatar: "https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=300",
    publishedAt: "2025-03-05",
    category: "DIY",
    description: "Transform your space on a budget with these creative DIY ideas. Perfect for students and young professionals looking to personalize their living space without breaking the bank.",
    tags: ["diy", "home", "budget", "creative"]
  },
  "video4": {
    id: "f5b6d789-c123-4d56-a789-e012f3456789",
    title: "Advanced Photography Tips",
    thumbnail: "https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "20:15",
    creator: "PhotoPro",
    views: 15678,
    likes: 1234,
    creatorAvatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300",
    publishedAt: "2025-03-15",
    category: "Photography",
    description: "Master advanced photography techniques with this comprehensive guide. Learn about composition, lighting, and post-processing to take your photography skills to the next level.",
    tags: ["photography", "tutorial", "advanced", "tips"]
  },
  "esports1": {
    id: "9c47d657-e428-4c49-b1e3-1c1ca3f58a25",
    title: "Pro Gaming Championship Finals",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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

export function generateStaticParams() {
  return Object.keys(videos).map((id) => ({
    id,
  }));
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);
  const video = videos[id as keyof typeof videos];
  
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
      <VideoClient video={video} relatedVideos={[]} />
    </div>
  );
}