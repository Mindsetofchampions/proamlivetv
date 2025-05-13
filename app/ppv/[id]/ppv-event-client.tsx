'use client';

import React from 'react';

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
                <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Expected Viewers:</strong> {event.expectedViewers}</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold mb-4">${event.price}</div>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-md font-semibold">
                Purchase Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}