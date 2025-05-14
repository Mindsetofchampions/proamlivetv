import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoCarouselProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function VideoCarousel({
  title,
  description,
  children,
  className
}: VideoCarouselProps) {
  const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    const container = e.currentTarget.parentElement?.querySelector('.video-scroll');
    if (container) {
      container.scrollLeft -= container.clientWidth;
    }
  };

  const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    const container = e.currentTarget.parentElement?.querySelector('.video-scroll');
    if (container) {
      container.scrollLeft += container.clientWidth;
    }
  };

  return (
    <div className={cn("mb-12", className)}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-wide mb-1">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="video-scroll flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}