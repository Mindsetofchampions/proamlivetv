import { notFound } from 'next/navigation';
import ShowCategoryClient from './show-category-client';

// Mock data for each category
const categoryData = {
  'esports': {
    title: 'Esports',
    description: 'Watch competitive gaming at its finest. From tournament coverage to player profiles, dive into the world of professional gaming.',
    videos: [
      {
        id: 'esports1',
        title: 'Pro League Finals Highlights',
        thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
        duration: '25:14',
        views: 45678,
        creator: 'ESports Central',
        description: 'Best moments from the championship finals'
      },
      {
        id: 'esports2',
        title: 'Team Spotlight: Rising Stars',
        thumbnail: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
        duration: '18:22',
        views: 32100,
        creator: 'Gaming Insights',
        description: 'Meet the next generation of pro gamers'
      },
      {
        id: 'esports3',
        title: 'Strategy Breakdown: Pro Tactics',
        thumbnail: 'https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-xbox-159393.jpeg',
        duration: '15:45',
        views: 28930,
        creator: 'Pro Gaming Academy',
        description: 'Learn from the best players in the game'
      }
    ]
  },
  'original-programming': {
    title: 'Original Programming',
    description: 'Exclusive shows created by and for youth creators. Featuring documentaries, series, and special events that showcase emerging talent.',
    videos: [
      {
        id: 'original1',
        title: 'Youth Voices: Documentary Series',
        thumbnail: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
        duration: '32:18',
        views: 52340,
        creator: 'Next Gen Studios',
        description: 'Stories of young changemakers'
      },
      {
        id: 'original2',
        title: 'Creative Journey: Behind the Scenes',
        thumbnail: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
        duration: '24:45',
        views: 41200,
        creator: 'Arts Collective',
        description: 'Following young artists as they create'
      },
      {
        id: 'original3',
        title: 'Innovation Nation',
        thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
        duration: '28:30',
        views: 38750,
        creator: 'Future Forward',
        description: 'Young inventors changing the world'
      }
    ]
  },
  'tech-talk': {
    title: 'Tech Talk',
    description: 'Stay up-to-date with the latest in technology. From coding tutorials to tech reviews, explore the digital frontier with expert insights.',
    videos: [
      {
        id: 'tech1',
        title: 'Coding 101: Web Development',
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
        duration: '22:15',
        views: 48920,
        creator: 'Code Academy',
        description: 'Learn the basics of web development'
      },
      {
        id: 'tech2',
        title: 'Future Tech Review',
        thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
        duration: '16:40',
        views: 35670,
        creator: 'Tech Insider',
        description: 'Exploring the latest gadgets and innovations'
      },
      {
        id: 'tech3',
        title: 'AI & Machine Learning Explained',
        thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
        duration: '28:55',
        views: 42180,
        creator: 'Future Labs',
        description: 'Understanding artificial intelligence'
      }
    ]
  },
  'learning-lab': {
    title: 'Learning Lab',
    description: 'Educational content that makes learning fun and engaging. Covering topics from science and math to arts and creativity.',
    videos: [
      {
        id: 'learn1',
        title: 'Science Made Simple',
        thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
        duration: '19:30',
        views: 51240,
        creator: 'Science Squad',
        description: 'Breaking down complex concepts'
      },
      {
        id: 'learn2',
        title: 'Art History Adventures',
        thumbnail: 'https://images.pexels.com/photos/20967/pexels-photo.jpg',
        duration: '25:18',
        views: 38450,
        creator: 'Creative Minds',
        description: 'Exploring art through the ages'
      },
      {
        id: 'learn3',
        title: 'Math Mysteries Solved',
        thumbnail: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg',
        duration: '21:45',
        views: 42890,
        creator: 'Math Masters',
        description: 'Making mathematics fun and accessible'
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({
    category,
  }));
}

export default function ShowCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const data = categoryData[category as keyof typeof categoryData];

  if (!data) {
    notFound();
  }

  return <ShowCategoryClient category={data} />;
}