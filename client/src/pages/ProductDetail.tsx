import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { ArrowLeft, ShoppingCart, Star, Check, Truck, Shield, Headphones, Package } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["/api/products", id],
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart", { productId: id, quantity });
    },
    onSuccess: () => {
      toast({
        title: "Added to Cart",
        description: `${quantity} item(s) added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Login Required",
          description: "Please log in to add items to your cart.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    addToCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild data-testid="button-back-products">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredRelatedProducts = relatedProducts?.filter((p: any) => 
    p.id !== product.id && p.categoryId === product.categoryId
  ).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4" data-testid="button-back">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.imageUrl || "https://via.placeholder.com/600x600"}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-detail"
              />
            </div>
            {!product.inStock && (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-product-name">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(24 reviews)</span>
              </div>

              <div className="text-5xl font-bold text-primary mb-6" data-testid="text-product-price">
                ₹{product.price}
              </div>

              {product.description && (
                <p className="text-xl text-gray-600 mb-6" data-testid="text-product-description">
                  {product.description}
                </p>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-lg font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 font-medium" data-testid="text-quantity">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    data-testid="button-increase-quantity"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addToCartMutation.isPending}
                  className="flex-1 bg-primary text-white hover:bg-blue-800 disabled:opacity-50 text-lg py-3"
                  data-testid="button-add-to-cart"
                >
                  {addToCartMutation.isPending ? (
                    "Adding..."
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button asChild variant="outline" className="px-8 py-3" data-testid="button-contact-expert">
                  <Link href="/contact">Contact Expert</Link>
                </Button>
              </div>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-0">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="specifications" className="py-4 text-lg" data-testid="tab-specifications">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="installation" className="py-4 text-lg" data-testid="tab-installation">
                  Installation
                </TabsTrigger>
                <TabsTrigger value="support" className="py-4 text-lg" data-testid="tab-support">
                  Support
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Detailed specifications will be provided upon consultation.</p>
                )}
              </TabsContent>
              
              <TabsContent value="installation" className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Installation</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Our certified technicians provide professional installation services to ensure optimal performance and safety.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Pre-installation site survey</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Professional installation by certified technicians</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>System testing and configuration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>User training and documentation</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Support & Warranty</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We provide comprehensive support to ensure your smart home system operates flawlessly.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Warranty Coverage</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 1-year manufacturer warranty</li>
                        <li>• Free repair or replacement</li>
                        <li>• Software updates included</li>
                        <li>• 24/7 technical support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Support Channels</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Phone support: +91 96637 54444</li>
                        <li>• Email: support@hekateautomation.com</li>
                        <li>• Mobile app support</li>
                        <li>• On-site service available</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredRelatedProducts.map((relatedProduct: any) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-related-${relatedProduct.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.imageUrl || "https://via.placeholder.com/300x300"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      data-testid={`img-related-${relatedProduct.id}`}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1" data-testid={`text-related-name-${relatedProduct.id}`}>
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary" data-testid={`text-related-price-${relatedProduct.id}`}>
                        ₹{relatedProduct.price}
                      </span>
                      <Button asChild variant="outline" size="sm" data-testid={`button-view-related-${relatedProduct.id}`}>
                        <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
