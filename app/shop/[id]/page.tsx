"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Star,
  Truck,
  Shield,
  Package,
  Minus,
  Plus,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

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
  }
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  
  const product = products[params.id as keyof typeof products];
  
  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/shop">Back to Shop</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      // In a real app, add to Shopify cart here
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/shop/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.title}
                className="object-cover w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <Badge className="mb-4">{product.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                {product.reviews} reviews
              </span>
              <span className="text-muted-foreground">By {product.creator}</span>
            </div>

            <div className="text-3xl font-bold mb-6">
              ${product.price}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm">
                <Truck className="h-5 w-5 mr-2 text-primary" />
                Free shipping on orders over $500
              </div>
              <div className="flex items-center text-sm">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                1 year warranty included
              </div>
              <div className="flex items-center text-sm">
                <Package className="h-5 w-5 mr-2 text-primary" />
                {product.stock} in stock
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => quantity < product.stock && setQuantity(q => q + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-4">
                <div className="space-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium capitalize">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}