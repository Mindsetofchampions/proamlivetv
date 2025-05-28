'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Calendar, Users, Eye } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PPVEvent {
  id: string;
  title: string;
  thumbnail: string;
  streamUrl: string;
  date: string;
  price: number;
  description: string;
  venue: string;
  expectedViewers: string;
  category: string;
}

interface PPVEventClientProps {
  event: PPVEvent;
}

export default function PPVEventClient({ event }: PPVEventClientProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/ppv/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id })
      });

      if (!response.ok) throw new Error('Failed to create checkout session');
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process purchase. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <img 
              src={event.thumbnail} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-lg mb-4">{event.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(event.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{event.expectedViewers} expected viewers</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <div className="text-3xl font-bold mb-4">
                <DollarSign className="h-6 w-6 inline-block" />
                {event.price.toFixed(2)}
              </div>
              <Button 
                className="w-full"
                onClick={handlePurchase}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Purchase Access'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}