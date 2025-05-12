import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Pricing from '@/components/landing/pricing';
import Testimonials from '@/components/landing/testimonials';
import FeaturedVideos from '@/components/landing/featured-videos';
import JoinCta from '@/components/landing/join-cta';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <Hero />
      <FeaturedVideos />
      <Features />
      <Testimonials />
      <Pricing />
      <JoinCta />
    </div>
  );
}