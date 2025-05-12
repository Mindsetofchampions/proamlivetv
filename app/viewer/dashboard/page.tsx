"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  Heart, 
  Clock, 
  History,
  Bookmark,
  PlayCircle,
  ListPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data
const watchHistory = [
  {
    id: 1,
    title: "Urban Dance Championship Highlights",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg",
    creator: "DanceProdigy",
    watchedAt: "2025-03-10T15:30:00Z",
    duration: "12:34",
    progress: 75
  },
  {
    id: 2,
    title: "New York Skateboarding Adventures",
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg",
    creator: "SkateLife",
    watchedAt: "2025-03-09T18:45:00Z",
    duration: "8:17",
    progress: 100
  }
];

const savedVideos = [
  {
    id: 3,
    title: "DIY Room Makeover Under $100",
    thumbnail: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
    creator: "CreativeSoul",
    savedAt: "2025-03-08T12:20:00Z",
    duration: "15:42"
  },
  {
    id: 4,
    title: "Making Music With Household Items",
    thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg",
    creator: "SoundWizard",
    savedAt: "2025-03-07T09:15:00Z",
    duration: "7:29"
  }
];

const playlists = [
  {
    id: 1,
    name: "Dance Tutorials",
    videoCount: 12,
    thumbnail: "https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg"
  },
  {
    id: 2,
    name: "Favorite Music Covers",
    videoCount: 8,
    thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg"
  }
];

export default function ViewerDashboard() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  
  if (!isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Library</h1>
            <p className="text-muted-foreground">
              Manage your saved content and playlists
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="history">
              <TabsList className="mb-4">
                <TabsTrigger value="history">Watch History</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Watched</CardTitle>
                    <CardDescription>Videos you've watched recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {watchHistory.map((video) => (
                        <div key={video.id} className="flex gap-4 border-b pb-4">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
                              <div 
                                className="h-full bg-primary"
                                style={{ width: `${video.progress}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{video.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{video.creator}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(video.watchedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Videos</CardTitle>
                    <CardDescription>Videos you've bookmarked to watch later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 border-b pb-4">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{video.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{video.creator}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              Saved on {new Date(video.savedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="playlists">
                <Card>
                  <CardHeader>
                    <CardTitle>My Playlists</CardTitle>
                    <CardDescription>Organize your favorite content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-[120px] flex flex-col items-center justify-center border-dashed"
                      >
                        <ListPlus className="h-8 w-8 mb-2" />
                        Create New Playlist
                      </Button>
                      
                      {playlists.map((playlist) => (
                        <div 
                          key={playlist.id}
                          className="group relative aspect-[2/1] rounded-lg overflow-hidden"
                        >
                          <img 
                            src={playlist.thumbnail}
                            alt={playlist.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end">
                            <h4 className="text-white font-medium">{playlist.name}</h4>
                            <p className="text-white/80 text-sm">
                              {playlist.videoCount} videos
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your viewing preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                      Viewer
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <span className="text-sm">Watch History</span>
                    </div>
                    <span className="text-sm text-muted-foreground">24 videos</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">Liked Videos</span>
                    </div>
                    <span className="text-sm text-muted-foreground">12 videos</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      <span className="text-sm">Saved Videos</span>
                    </div>
                    <span className="text-sm text-muted-foreground">8 videos</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      <span className="text-sm">Playlists</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 playlists</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}