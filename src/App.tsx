import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Cart, CartItem } from './components/Cart';
import { ProductDetail } from './components/ProductDetail';
import { Checkout } from './components/Checkout';
import { UserProfile } from './components/UserProfile';
import { Footer } from './components/Footer';
import { Auth } from './components/Auth';
import { Toaster } from './components/ui/sonner';
import { products, Product } from './data/products';
import { toast } from 'sonner';

type View = 'home' | 'checkout' | 'order-complete';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductGrid, setShowProductGrid] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentView('order-complete');
    setTimeout(() => {
      setCurrentView('home');
      setShowProductGrid(false);
    }, 3000);
  };

  const handleShopNow = () => {
    setShowProductGrid(true);
    // Scroll to products section
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query && !showProductGrid) {
      setShowProductGrid(true);
    }
  };

  const handleSignIn = (userData: any) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setIsProfileOpen(false);
    toast.success('Signed out successfully');
  };

  const handleProfileClick = () => {
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (currentView === 'checkout') {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Checkout
            cartItems={cartItems}
            onBack={() => setCurrentView('home')}
            onOrderComplete={handleOrderComplete}
          />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  }

  if (currentView === 'order-complete') {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-bold text-2xl mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-4">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
            <p className="text-sm text-muted-foreground">Redirecting you back to the store...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header
          cartItemsCount={totalCartItems}
          onCartClick={() => setIsCartOpen(true)}
          onSearchChange={handleSearchChange}
          onProfileClick={handleProfileClick}
          onAuthClick={() => setIsAuthOpen(true)}
          user={user}
          onSignOut={handleSignOut}
        />

        <main>
          {!showProductGrid && <Hero onShopNow={handleShopNow} />}
          
          <div id="products">
            <ProductGrid
              products={products}
              onAddToCart={addToCart}
              onProductClick={setSelectedProduct}
              searchQuery={searchQuery}
            />
          </div>
        </main>

        <Footer />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />

        <ProductDetail
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />

        <UserProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
        />

        <Auth
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSignIn={handleSignIn}
        />

        <Toaster />
      </div>
    </ThemeProvider>
  );
}