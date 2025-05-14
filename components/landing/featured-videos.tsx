"use client";

import { VideoCard } from '@/components/ui/video-card';
import { VideoCarousel } from '@/components/ui/video-carousel';

const featuredVideos = [
  {
    id: "video1",
    title: "Urban Dance Championship Highlights",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "12:34",
    likes: 1245,
    creator: "DanceProdigy"
  },
  {
    id: "video2",
    title: "New York Skateboarding Adventures",
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "8:17",
    likes: 987,
    creator: "SkateLife"
  },
  {
    id: "video3",
    title: "DIY Room Makeover Under $100",
    thumbnail: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "15:42",
    likes: 2563,
    creator: "CreativeSoul"
  },
  {
    id: "video4",
    title: "Making Music With Household Items",
    thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "7:29",
    likes: 1876,
    creator: "SoundWizard"
  }
];

const FeaturedVideos = () => {
  return (
    <section className="container mx-auto px-8">
      <VideoCarousel
        title="Featured Videos"
        description="Watch the latest trending content from our creators"
      >
        {featuredVideos.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
            className="min-w-[300px] md:min-w-[400px]"
          />
        ))}
      </VideoCarousel>
    </section>
  );
};

export default FeaturedVideos;