"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Trophy, Star, Award } from 'lucide-react';

// Mock student achievements
const achievements = [
  {
    title: "Rising Star",
    description: "Reached 1,000 subscribers",
    date: "2025-02-15",
    icon: <Star className="h-4 w-4 text-yellow-500" />
  },
  {
    title: "Content Champion",
    description: "Published 10 videos",
    date: "2025-01-30",
    icon: <Trophy className="h-4 w-4 text-purple-500" />
  },
  {
    title: "Engagement Expert",
    description: "Achieved 85% viewer retention",
    date: "2025-01-15",
    icon: <Award className="h-4 w-4 text-blue-500" />
  }
];

interface StudentProfileProps {
  user: any;
}

export function StudentProfile({ user }: StudentProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Creator Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{user?.fullName}</h3>
            <p className="text-sm text-muted-foreground mb-2">{user?.primaryEmailAddress?.emailAddress}</p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                Student Creator
              </Badge>
              <Badge variant="outline">Level 2</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Creator Stats</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </div>
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="text-2xl font-bold">1.2K</div>
                <div className="text-sm text-muted-foreground">Subscribers</div>
              </div>
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="text-2xl font-bold">45K</div>
                <div className="text-sm text-muted-foreground">Views</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Recent Achievements</h4>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                  <div className="bg-background rounded-full p-2">
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Content Focus</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Gaming</Badge>
              <Badge>Tutorial</Badge>
              <Badge>Vlog</Badge>
              <Badge>Educational</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}