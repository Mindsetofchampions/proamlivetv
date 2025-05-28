"use client";

import { useState } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { 
  ShoppingBag,
  Trash2,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Mock cart data
const cartItems = [
  {
    id: 'gaming-pc-1',
    title: 'Student Pro Gaming PC',
    price: 999.99,
    image: 'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg',
    quantity: 1
  },
  {
    id: 'monitor-1',
    title: 'Elite Gaming Monitor',
    price: 299.99,
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    quantity: 1
  }
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const { toast } = useToast();

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 29.99;
  const total = subtotal + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 border-b pb-6"
                >
                  <Link href={`/shop/${item.id}`} className="relative aspect-square w-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                  
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <Link href={`/shop/${item.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping === 0 ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      <span>${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="pt-4 border-t flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Checkout
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}