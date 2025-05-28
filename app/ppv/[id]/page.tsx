import PPVEventClient from './ppv-event-client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ppvEvents = {
  'championship-finals-2025': {
    id: 'championship-finals-2025',
    title: 'Championship Finals 2025',
    thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    streamUrl: 'https://example.com/stream/finals-2025.m3u8',
    date: '2025-04-15T18:00:00Z',
    price: 29.99,
    description: 'Watch the ultimate showdown as top teams compete for the championship title.',
    venue: 'Virtual Arena',
    expectedViewers: '50K+',
    category: 'Esports'
  },
  'dance-competition-2025': {
    id: 'dance-competition-2025',
    title: 'National Dance Competition 2025',
    thumbnail: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg',
    streamUrl: 'https://example.com/stream/dance-2025.m3u8',
    date: '2025-04-20T19:30:00Z',
    price: 24.99,
    description: 'Experience the artistry and skill of youth dancers from across the country.',
    venue: 'Performance Center',
    expectedViewers: '35K+',
    category: 'Dance'
  }
};

export default async function PPVEventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = ppvEvents[id as keyof typeof ppvEvents];

  if (!event) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has ended.</p>
          <a href="/ppv" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Back to Events
          </a>
        </div>
      </div>
    );
  }

  return <PPVEventClient event={event} />;
}