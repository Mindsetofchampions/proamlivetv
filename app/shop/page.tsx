"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ShoppingBag,
  Star,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock products data
const products = [
  {
    id: 'gaming-pc-1',
    title: 'Student Pro Gaming PC',
    price: 999.99,
    image: 'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg',
    category: 'Gaming PCs',
    creator: 'Tech Club',
    rating: 4.8,
    reviews: 156,
    description: 'Custom-built gaming PC with RTX 3060, Ryzen 5, 16GB RAM'
  },
  {
    id: 'monitor-1',
    title: 'Elite Gaming Monitor',
    price: 299.99,
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    category: 'Monitors',
    creator: 'Display Team',
    rating: 4.7,
    reviews: 89,
    description: '27" 1440p 165Hz Gaming Monitor with G-Sync'
  },
  {
    id: 'headset-1',
    title: 'Pro Gaming Headset',
    price: 79.99,
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    category: 'Audio',
    creator: 'Audio Lab',
    rating: 4.5,
    reviews: 234,
    description: '7.1 Surround Sound Gaming Headset with Noise Cancellation'
  }
];

const categories = ['All Categories', 'Gaming PCs', 'Monitors', 'Audio', 'Accessories'];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // In a real app, fetch cart count from Shopify
    setCartCount(0);
  }, []);

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All Categories' || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Marketplace</h1>
            <p className="text-muted-foreground">
              Gaming gear and PCs built by students, for students
            </p>
          </div>
          
          <Link href="/shop/cart">
            <Button variant="outline" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        {(searchTerm || selectedCategory !== 'All Categories') && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <span>Search: {searchTerm}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {selectedCategory !== 'All Categories' && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <span>Category: {selectedCategory}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSelectedCategory('All Categories')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">By {product.creator}</p>
                      </div>
                      <Badge variant="secondary">${product.price}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No products found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}