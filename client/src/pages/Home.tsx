import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ShoppingCart, Package, Calendar, User } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  const { data: cartItems } = useQuery({
    queryKey: ["/api/cart"],
  });

  const { data: orders } = useQuery({
    queryKey: ["/api/orders"],
  });

  const { data: recentProducts } = useQuery({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-welcome">
            Welcome back, {user?.firstName || user?.email}!
          </h1>
          <p className="text-gray-600">
            Manage your smart home automation products and services
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="text-cart-count">
                    {cartItems?.length || 0}
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
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="text-order-count">
                    {orders?.length || 0}
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
                  <p className="text-sm text-gray-600">Demo Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
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
                  <p className="text-sm text-gray-600">Profile</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName || "Complete"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Shop Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Browse our latest smart home automation products
              </p>
              <Button asChild className="w-full" data-testid="button-shop-products">
                <Link href="/products">Shop Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book a Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Schedule a personalized demonstration of our solutions
              </p>
              <Button asChild variant="outline" className="w-full" data-testid="button-book-demo-home">
                <Link href="/contact">Book Demo</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>View Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Review and checkout your selected items
              </p>
              <Button asChild variant="outline" className="w-full" data-testid="button-view-cart">
                <Link href="/cart">View Cart</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProducts?.slice(0, 4).map((product: any) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid={`card-product-${product.id}`}>
                    <CardContent className="p-4">
                      <img
                        src={product.imageUrl || "https://via.placeholder.com/300x200"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                        data-testid={`img-product-${product.id}`}
                      />
                      <h3 className="font-semibold text-gray-900 mb-1" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <p className="text-primary font-bold" data-testid={`text-product-price-${product.id}`}>
                        ₹{product.price}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )) || (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No products available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
