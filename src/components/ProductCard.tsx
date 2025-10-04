import React from 'react';
import { Star, ShoppingCart, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering product popup
    onAddToCart(product);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering product popup

    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: window.location.origin + "/product/" + product.id,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard! Share it anywhere.");
      } catch (error) {
        console.error("Clipboard copy failed:", error);
        alert("Sharing is not supported on this browser.");
      }
    }
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.originalPrice && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Sale
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <div className="mb-2 flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleShare(e)}
              className="hover:text-blue-600"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          
          <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-lg">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
