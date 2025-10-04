import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Sun, Moon, LogOut, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  onProfileClick: () => void;
  onAuthClick: () => void;
  user: any;
  onSignOut: () => void;
}

export function Header({ cartItemsCount, onCartClick, onSearchChange, onProfileClick, onAuthClick, user, onSignOut }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-xl">TechStore</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:inline-flex"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            
            {user ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={onProfileClick}>
                  <User className="w-5 h-5" />
                </Button>
                <span className="text-sm hidden md:inline-block">Hi, {user.name.split(' ')[0]}</span>
                <Button variant="ghost" size="icon" onClick={onSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={onAuthClick}>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 px-1 min-w-[20px] h-5 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-2">
              {user ? (
                <>
                  <Button variant="ghost" className="justify-start" onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={onSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="ghost" className="justify-start" onClick={onAuthClick}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
              <Button variant="ghost" className="justify-start" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Light Mode
                  </>
                )}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}