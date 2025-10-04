import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CartItem } from './Cart';
import { toast } from 'sonner';
import API from '../api'; // ✅ centralized API instance

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export function Checkout({ cartItems, onBack, onOrderComplete }: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'COD',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // ✅ Get current user
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser._id || storedUser.id; // handle both _id and id

    if (!userId) {
      toast.error('User ID not found. Please log in first.');
      setIsProcessing(false);
      return;
    }

    // ✅ Validate required fields
    const requiredFields: (keyof typeof formData)[] = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field} is required.`);
        setIsProcessing(false);
        return;
      }
    }

    if (!cartItems.length) {
      toast.error('Your cart is empty.');
      setIsProcessing(false);
      return;
    }

    try {
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`;

      const orderPayload = {
        userId,
        items: cartItems.map(item => ({
          productId: item.id, // ✅ ensure MongoDB _id is used
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        address: fullAddress,
        paymentMethod: formData.paymentMethod,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      console.log('Submitting Order Payload:', orderPayload);

      // ✅ Use centralized API instance
      const response = await API.post('/orders', orderPayload);

      toast.success('Order placed successfully!');
      onOrderComplete();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Order failed. Try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
        </Button>
        <h1 className="font-bold text-2xl">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COD" id="COD" />
                  <Label htmlFor="COD" className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" /> COD
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex space-x-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>

              <Button className="w-full" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
