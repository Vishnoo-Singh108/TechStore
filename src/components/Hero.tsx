import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onShopNow: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden ">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-bold text-4xl lg:text-6xl leading-tight">
                Discover Amazing
                <span className="text-primary block">Tech Products</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Shop the latest gadgets, electronics, and accessories with unbeatable prices and fast shipping.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onShopNow} className="text-lg px-8">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Categories
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl">10K+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">50K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">4.8★</div>
                <div className="text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1606025082986-50dcb5903e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGVjb21tZXJjZSUyMGhlcm98ZW58MXx8fHwxNzU4ODE1OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Shopping Experience"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg">
              <ShoppingBag className="w-8 h-8" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-background border-2 border-primary/20 p-6 rounded-lg shadow-lg">
              <div className="text-sm font-medium">Free Shipping</div>
              <div className="text-xs text-muted-foreground">On orders over ₹100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
    </section>
  );
}