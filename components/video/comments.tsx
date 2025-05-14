"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Heart, MoreVertical, Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock comments data since Supabase isn't properly configured yet
const mockComments = [
  {
    id: "1",
    content: "Great video! Really enjoyed the techniques shown.",
    created_at: "2025-03-15T10:00:00Z",
    user: {
      id: "user1",
      username: "PhotoEnthusiast",
      avatar_url: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  },
  {
    id: "2",
    content: "The lighting tips were especially helpful. Thanks for sharing!",
    created_at: "2025-03-15T11:30:00Z",
    user: {
      id: "user2",
      username: "CameraPro",
      avatar_url: "https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  }
];

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

interface CommentsProps {
  videoId: string;
}

export default function Comments({ videoId }: CommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || !newComment.trim()) return;

    try {
      setSubmitting(true);
      
      // Mock adding a new comment
      const newCommentObj = {
        id: `temp-${Date.now()}`,
        content: newComment.trim(),
        created_at: new Date().toISOString(),
        user: {
          id: user.id,
          username: user.email?.split('@')[0] || 'Anonymous',
          avatar_url: user.user_metadata?.avatar_url || ''
        }
      };

      setComments([newCommentObj, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Comments</h3>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      {user ? (
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setNewComment('')}
                disabled={!newComment.trim() || submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!newComment.trim() || submitting}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h4 className="font-medium mb-2">Join the conversation</h4>
          <p className="text-muted-foreground mb-4">Sign in to comment on this video</p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.user.avatar_url} />
              <AvatarFallback>{comment.user.username?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.username}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user?.id === comment.user.id ? (
                      <DropdownMenuItem onClick={() => handleDelete(comment.id)}>
                        Delete
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}