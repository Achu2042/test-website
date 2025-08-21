import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { User, ShoppingBag, Package, Calendar, MapPin, Phone, Mail, Edit, LogOut, Shield } from "lucide-react";

export default function Profile() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["/api/orders"],
    retry: false,
  });

  const { data: cartItems } = useQuery({
    queryKey: ["/api/cart"],
    retry: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [user, authLoading, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.firstName 
    ? user.firstName
    : user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.profileImageUrl} alt={displayName} />
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-profile-name">
                  {displayName}
                </h1>
                <p className="text-gray-600 mb-4" data-testid="text-profile-email">
                  {user.email}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified Customer
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Member since {new Date(user.createdAt).getFullYear()}
                  </Badge>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" data-testid="button-edit-profile">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/api/logout"}
                  data-testid="button-logout-profile"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="text-total-orders">
                    {orders?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="text-cart-items">
                    {cartItems?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-lg font-bold text-gray-900" data-testid="text-member-since">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Profile Status</p>
                  <p className="text-lg font-bold text-green-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" data-testid="tab-orders">Order History</TabsTrigger>
            <TabsTrigger value="account" data-testid="tab-account">Account Details</TabsTrigger>
            <TabsTrigger value="preferences" data-testid="tab-preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading orders...</p>
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order: any, index: number) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg" data-testid={`order-item-${index}`}>
                        <div>
                          <p className="font-semibold text-gray-900" data-testid={`text-order-id-${index}`}>
                            Order #{order.id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary" data-testid={`text-order-total-${index}`}>
                            ₹{order.total}
                          </p>
                          <Badge 
                            variant={order.status === 'pending' ? 'outline' : 'default'}
                            className={order.status === 'pending' ? 'text-amber-600' : 'text-green-600'}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No orders found</p>
                    <p className="text-sm text-gray-500 mt-2">Start shopping to see your orders here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 text-gray-900" data-testid="text-first-name">
                      {user.firstName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 text-gray-900" data-testid="text-last-name">
                      {user.lastName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <p className="mt-1 text-gray-900" data-testid="text-email-address">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Account Created</label>
                    <p className="mt-1 text-gray-900" data-testid="text-account-created">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <Button className="bg-primary text-white hover:bg-blue-800" data-testid="button-update-account">
                    Update Account Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your orders and new products</p>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-email-notifications">
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Updates</h4>
                      <p className="text-sm text-gray-600">Get text messages for order status updates</p>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-sms-updates">
                      Disabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                      <p className="text-sm text-gray-600">Receive newsletters and promotional offers</p>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-marketing">
                      Enabled
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <Button className="bg-primary text-white hover:bg-blue-800" data-testid="button-save-preferences">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2" data-testid="button-reorder">
                <Package className="w-8 h-8 text-primary" />
                <span>Reorder Items</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2" data-testid="button-support">
                <Phone className="w-8 h-8 text-primary" />
                <span>Contact Support</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2" data-testid="button-download-invoices">
                <Mail className="w-8 h-8 text-primary" />
                <span>Download Invoices</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
