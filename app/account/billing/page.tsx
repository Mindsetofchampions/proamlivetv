"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Loader2 } from 'lucide-react';

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>
          
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Manage Your Subscription</h2>
            <p className="text-muted-foreground mb-6">
              Update your payment method, view billing history, or change your subscription plan.
            </p>
            
            <Button 
              onClick={handleManageSubscription}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Subscription
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}