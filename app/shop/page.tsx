"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, Search, Cpu, Monitor, Headphones, Gamepad, Mouse, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock products data
const products = [
  {
    id: 1,
    name: 'Student Pro Gaming PC',
    price: 999.99,
    image: 'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg',
    category: 'Gaming PCs',
    creator: 'Tech Club',
    description: 'Custom-built gaming PC with RTX 3060, Ryzen 5, 16GB RAM, perfect for esports'
  },
  {
    id: 2,
    name: 'Elite Gaming Monitor',
    price: 299.99,
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    category: 'Monitors',
    creator: 'Display Team',
    description: '27" 1440p 165Hz Gaming Monitor with G-Sync'
  },
  {
    id: 3,
    name: 'Pro Gaming Headset',
    price: 79.99,
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    category: 'Audio',
    creator: 'Audio Lab',
    description: '7.1 Surround Sound Gaming Headset with Noise Cancellation'
  },
  {
    id: 4,
    name: 'Tournament Gaming Mouse',
    price: 49.99,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
    category: 'Accessories',
    creator: 'Esports Team',
    description: 'Lightweight gaming mouse with 16K DPI sensor'
  },
  {
    id: 5,
    name: 'Mechanical Gaming Keyboard',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
    category: 'Accessories',
    creator: 'Tech Club',
    description: 'RGB Mechanical Keyboard with Blue Switches'
  },
  {
    id: 6,
    name: 'Streaming PC Bundle',
    price: 1499.99,
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
    category: 'Gaming PCs',
    creator: 'Media Lab',
    description: 'Complete streaming setup with capture card and mic'
  },
  {
    id: 7,
    name: 'Budget Gaming PC',
    price: 699.99,
    image: 'https://images.pexels.com/photos/1034312/pexels-photo-1034312.jpeg',
    category: 'Gaming PCs',
    creator: 'Tech Club',
    description: 'Entry-level gaming PC perfect for Minecraft and Fortnite'
  },
  {
    id: 8,
    name: 'Gaming Controller',
    price: 59.99,
    image: 'https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg',
    category: 'Accessories',
    creator: 'Gaming Club',
    description: 'Wireless gaming controller compatible with PC and console'
  }
];

const categories = ['All Categories', 'Gaming PCs', 'Monitors', 'Audio', 'Accessories'];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All Categories' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Gaming PCs': return <Cpu className="h-4 w-4" />;
      case 'Monitors': return <Monitor className="h-4 w-4" />;
      case 'Audio': return <Headphones className="h-4 w-4" />;
      case 'Accessories': return <Gamepad className="h-4 w-4" />;
      default: return <ShoppingBag className="h-4 w-4" />;
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Student Marketplace
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Gaming gear and PCs built by students, for students
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gaming gear..."
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
                    <div className="flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2">{category}</span>
                    </div>
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
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="rounded-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">By {product.creator}</p>
                    </div>
                    <Badge variant="secondary">${product.price}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mt-3">
                    <Badge variant="outline" className="flex items-center w-fit">
                      {getCategoryIcon(product.category)}
                      <span className="ml-1">{product.category}</span>
                    </Badge>
                  </div>
                </div>
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