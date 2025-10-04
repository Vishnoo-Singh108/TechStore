import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Heart, LogOut, MapPin, Phone, Mail, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export function UserProfile({ isOpen, onClose, user }: UserProfileProps) {
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});

  useEffect(() => {
    if (!user) return;

    setEditedData({
      name: user.name || 'John Doe',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
    });

const fetchOrders = async () => {
try {
  const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/orders/user/${user.id}`;

  const res = await axios.get(BASE_URL, { withCredentials: true });

  if (!res) {
    console.error("No response from server");
    return;
  }

  setOrderHistory(res.data.orders || []);
} catch (error) {
  console.error("Error fetching order history:", error);
}
 finally {
    setLoadingOrders(false);
  }
};


    fetchOrders();
   
  }, [user]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            My Profile
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>×</Button>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg">
                      {user.name?.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="font-semibold text-xl">{user.name}</h2>
                    <p className="text-muted-foreground">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editedData.name}
                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedData.email}
                            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={editedData.phone}
                            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={editedData.address}
                            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleSave} className="w-full">Save Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{user.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Order History</h3>
                {loadingOrders ? (
                  <p>Loading orders...</p>
                ) : orderHistory.length === 0 ? (
                  <p>No orders yet.</p>
                ) : (
                  orderHistory.map((order) => (
                    <Card key={order._id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                             <div>

  {order.items.map((item, i) => (
    <p key={i}>
      {item.quantity} × {item.productId.name}  
    </p>
  ))}
</div>

                              <span className="font-medium">{order.address}</span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{order.totalAmount}</p>
                          
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
           

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <h3 className="font-semibold">Account Settings</h3>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
