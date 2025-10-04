import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">TechStore</h3>
            <p className="text-muted-foreground text-sm">
              Your trusted destination for the latest technology products, gadgets, and accessories. 
              We offer competitive prices and exceptional customer service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Madan Mohan Malaviya University Of Technology Gorakhpur 273010 </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>+91 9129108798</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>vishusi173@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}


          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Laptops</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Smartphones</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Audio</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cameras</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Accessories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Gaming</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
         
       
            
            {/* Social Media */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Follow Us</p>
              <div className="flex space-x-2">
               <a href="https://github.com/Vishnoo-Singh108" target="_blank" rel="noopener noreferrer">
  <Button variant="outline" size="icon" className="w-8 h-8">
    <Github className="w-4 h-4" />
  </Button>
</a>

               <a href="https://www.linkedin.com/in/vishnoo-singh-81a1a7325/" target="_blank" rel="noopener noreferrer">
  <Button variant="outline" size="icon" className="w-8 h-8">
    <Linkedin className="w-4 h-4" />
  </Button>
</a>

               <a href="https://www.facebook.com/profile.php?id=100070656000552" target="_blank" rel="noopener noreferrer">
  <Button variant="outline" size="icon" className="w-8 h-8">
    <Facebook className="w-4 h-4" />
  </Button>
</a>

             <a href="https://www.instagram.com/vishnoosingh2659/?hl=en" target="_blank" rel="noopener noreferrer">
  <Button variant="outline" size="icon" className="w-8 h-8">
    <Instagram className="w-4 h-4" />
  </Button>
</a>

              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Trust Badges & Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h5 className="font-medium text-sm">Free Shipping</h5>
            <p className="text-xs text-muted-foreground">On orders over ₹100</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h5 className="font-medium text-sm">Quality Guarantee</h5>
            <p className="text-xs text-muted-foreground">30-day returns</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h5 className="font-medium text-sm">Secure Payment</h5>
            <p className="text-xs text-muted-foreground">SSL protected</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z" />
              </svg>
            </div>
            <h5 className="font-medium text-sm">24/7 Support</h5>
            <p className="text-xs text-muted-foreground">Customer service</p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 TechStore. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
          </div>
          
         
         
        </div>
      </div>
    </footer>
  );
}