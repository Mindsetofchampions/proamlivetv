import { ProductDetails } from './product-details';

// Mock product data
const products = {
  'gaming-pc-1': {
    id: 'gaming-pc-1',
    title: 'Student Pro Gaming PC',
    price: 999.99,
    images: [
      'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
      'https://images.pexels.com/photos/1034312/pexels-photo-1034312.jpeg'
    ],
    category: 'Gaming PCs',
    creator: 'Tech Club',
    rating: 4.8,
    reviews: 156,
    description: 'Custom-built gaming PC designed for optimal performance in modern games.',
    specs: {
      processor: 'AMD Ryzen 5 5600X',
      graphics: 'NVIDIA RTX 3060 12GB',
      memory: '16GB DDR4 3200MHz',
      storage: '1TB NVMe SSD',
      motherboard: 'B550 Gaming',
      case: 'RGB Gaming Case',
      power: '650W Gold PSU'
    },
    stock: 5
  },
  'monitor-1': {
    id: 'monitor-1',
    title: 'Pro Gaming Monitor',
    price: 299.99,
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
    ],
    category: 'Monitors',
    creator: 'Tech Club',
    rating: 4.7,
    reviews: 89,
    description: 'Professional gaming monitor with high refresh rate and low response time.',
    specs: {
      size: '27 inch',
      resolution: '2560 x 1440',
      refreshRate: '165Hz',
      responseTime: '1ms',
      panel: 'IPS',
      ports: 'HDMI 2.0, DisplayPort 1.4',
      features: 'AMD FreeSync Premium'
    },
    stock: 8
  }
};

// Generate static params for all product IDs
export function generateStaticParams() {
  return Object.keys(products).map((id) => ({
    id: id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products[id as keyof typeof products];
  
  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="mb-6">The product you're looking for doesn't exist.</p>
          <a href="/shop" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}