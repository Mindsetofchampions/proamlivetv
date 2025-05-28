"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { motion } from 'framer-motion';
import { IVS_CONFIG } from '@/lib/ivs';
import { 
  Calendar,
  Clock,
  Users,
  Edit,
  Trash2,
  Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

export default function LiveEventsPage() {
  const router = useRouter();
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    capacity: 100
  });

  useEffect(() => {
    if (!user || !hasRole('creator')) {
      router.push('/login');
      return;
    }

    fetchEvents();
  }, [user, hasRole, router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/live-events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/live-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create event');

      toast({
        title: "Success",
        description: "Event created successfully"
      });

      setShowEventDialog(false);
      setFormData({
        title: '',
        description: '',
        scheduledAt: '',
        capacity: 100
      });
      fetchEvents();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetch(`/api/live-events/${eventId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete event');

      toast({
        title: "Success",
        description: "Event deleted successfully"
      });

      fetchEvents();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Live Events</h2>
          <p className="text-muted-foreground">Schedule and manage your live sessions</p>
        </div>

        <Button onClick={() => setShowEventDialog(true)}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stream Settings</CardTitle>
          <CardDescription>Use these settings in your streaming software (OBS/Streamlabs)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Ingest URL</Label>
              <Input value={IVS_CONFIG.ingestEndpoint} readOnly />
            </div>
            <div>
              <Label>Playback URL</Label>
              <Input value={IVS_CONFIG.playbackUrl} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.scheduled_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(event.scheduled_at).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.viewer_count} / {event.capacity} viewers
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={event.status === 'live' ? 'destructive' : 'secondary'}>
                    {event.status === 'live' ? (
                      <>
                        <Radio className="h-3 w-3 mr-1" />
                        Live Now
                      </>
                    ) : (
                      'Scheduled'
                    )}
                  </Badge>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {events.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No events scheduled</h3>
              <p className="text-muted-foreground mb-4">
                Schedule your first live event to engage with your audience
              </p>
              <Button onClick={() => setShowEventDialog(true)}>
                Schedule Event
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Live Event</DialogTitle>
            <DialogDescription>
              Create a new live event for your audience
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your event"
              />
            </div>

            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Viewer Capacity</Label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                min="1"
                max="1000"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Schedule Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}