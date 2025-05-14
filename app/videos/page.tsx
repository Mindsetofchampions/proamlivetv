"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, Heart, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock videos data
const videos = [
  {
    id: "video1",
    title: "Urban Dance Championship Highlights",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "12:34",
    likes: 1245,
    creator: "DanceProdigy",
    category: "Dance",
    description: "Watch the incredible performances from the 2025 Urban Dance Championship featuring talented youth dancers from around the country."
  },
  {
    id: "video2",
    title: "New York Skateboarding Adventures",
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "8:17",
    likes: 987,
    creator: "SkateLife",
    category: "Sports",
    description: "Join me as I explore the best skateparks and street spots NYC has to offer. From Brooklyn Banks to Chelsea Piers."
  },
  {
    id: "video3",
    title: "DIY Room Makeover Under $100",
    thumbnail: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "15:42",
    likes: 2563,
    creator: "CreativeSoul",
    category: "DIY",
    description: "Transform your bedroom on a budget with these easy, affordable DIY projects. No special tools required!"
  },
  {
    id: "video4",
    title: "Making Music With Household Items",
    thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "7:29",
    likes: 1876,
    creator: "SoundWizard",
    category: "Music",
    description: "Create amazing beats and melodies using just items found around your house. Perfect for beginners with no equipment."
  },
  {
    id: "video5",
    title: "Street Art Documentary: Young Voices",
    thumbnail: "https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "22:15",
    likes: 3421,
    creator: "UrbanLens",
    category: "Art",
    description: "A deep dive into the vibrant street art scene featuring young artists making their mark on urban landscapes."
  },
  {
    id: "video6",
    title: "Cooking With Campus Ingredients",
    thumbnail: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "14:36",
    likes: 1432,
    creator: "DormChef",
    category: "Food",
    description: "Easy, delicious recipes you can make in a dorm room with minimal ingredients and equipment. Perfect for students!"
  },
  {
    id: "video7",
    title: "Drone Cinematography Basics",
    thumbnail: "https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "18:05",
    likes: 2156,
    creator: "SkyVision",
    category: "Film",
    description: "Learn how to capture stunning aerial footage with affordable drones. Tips and tricks for smooth shots and creative angles."
  },
  {
    id: "video8",
    title: "Backyard Science Experiments",
    thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "10:47",
    likes: 1895,
    creator: "CuriousMinds",
    category: "Education",
    description: "Amazing and safe science experiments you can do at home with common household materials. Educational and fun!"
  }
];

const categories = [
  "All Categories",
  "Dance",
  "Sports",
  "DIY",
  "Music",
  "Art",
  "Food",
  "Film",
  "Education"
];

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter videos based on search, category and sort
  const filteredVideos = videos
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(video => 
      selectedCategory === 'All Categories' || video.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      if (sortBy === 'popular') return b.likes - a.likes;
      return 0;
    });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Video Library</h1>
          <p className="text-muted-foreground">
            Discover and stream amazing content from our youth creators
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active filters */}
        {(searchTerm || selectedCategory !== 'All Categories') && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <span>Search: {searchTerm}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {selectedCategory !== 'All Categories' && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <span>Category: {selectedCategory}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSelectedCategory('All Categories')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}
            >
              Clear All
            </Button>
          </div>
        )}
        
        {/* Videos grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Link href={`/videos/${video.id}`} key={video.id} className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="rounded-full bg-primary/90 hover:bg-primary">
                      Watch Now
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                  
                  <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                    {video.category}
                  </div>
                </div>
                
                <h3 className="font-medium text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {video.description}
                </p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{video.creator}</span>
                  <span className="flex items-center text-muted-foreground">
                    <Heart className="h-3 w-3 mr-1" fill="currentColor" />
                    {video.likes.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No videos found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}