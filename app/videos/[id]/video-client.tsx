"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import { 
  Heart, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Calendar,
  User,
  Clock,
  Shield,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface VideoClientProps {
  video: any;
  relatedVideos: any[];
}

export default function VideoClient({ video, relatedVideos }: VideoClientProps) {
  const isSignedIn = true;
  const user = {
    imageUrl: 'https://avatars.githubusercontent.com/u/1',
    firstName: 'Demo',
  };
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  
  const requireSubscription = !isSignedIn;
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  useEffect(() => {
    if (requireSubscription) {
      const timer = setTimeout(() => {
        setShowSubscribeModal(true);
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [requireSubscription]);

  return (
    <>
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 mx-auto">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Subscribe to Continue Watching</h3>
            <p className="text-muted-foreground mb-6">
              Get unlimited access to all videos on PRO AM LIVE TV.
            </p>
            <div className="space-y-4">
              <Link href="/sign-up">
                <Button className="w-full">Sign Up Now</Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={() => setShowSubscribeModal(false)}>
                Continue Preview (Limited Time)
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              {requireSubscription && (
                <div className="absolute top-0 left-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-2 rounded">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Preview Mode</span>
                  </Badge>
                </div>
              )}
              <ReactPlayer
                url={video.url}
                width="100%"
                height="100%"
                controls
                pip
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  }
                }}
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center mb-2 md:mb-0">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={video.creatorAvatar} alt={video.creator} />
                  <AvatarFallback>{video.creator[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{video.creator}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(video.publishedAt)}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {formatNumber(video.views)} views
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={liked ? "text-red-500" : ""}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-red-500" : ""}`} />
                  <span>{formatNumber(liked ? video.likes + 1 : video.likes)}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSaved(!saved)}
                >
                  <Bookmark className={`h-4 w-4 mr-1 ${saved ? "fill-current" : ""}`} />
                  <span>Save</span>
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-4 mb-8">
              <div className="whitespace-pre-line mb-4">{video.description}</div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {video.tags.map((tag: string) => (
                  <Link href={`/videos?tag=${tag}`} key={tag}>
                    <Badge variant="secondary">#{tag}</Badge>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              
              {isSignedIn ? (
                <div>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea 
                        className="w-full p-2 h-20 bg-background border rounded-md resize-none"
                        placeholder="Add a comment..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button>Comment</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="my-6 border-t" />
                  
                  <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                <div className="bg-secondary/30 rounded-lg p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-medium mb-2">Join the conversation</h4>
                  <p className="text-muted-foreground mb-4">Sign in to comment on this video</p>
                  <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link href={`/videos/${relatedVideo.id}`} key={relatedVideo.id} className="flex gap-3 group">
                  <div className="relative aspect-video w-40 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={relatedVideo.thumbnail} 
                      alt={relatedVideo.title} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{relatedVideo.creator}</p>
                    <p className="text-xs text-muted-foreground">{formatNumber(relatedVideo.views)} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}