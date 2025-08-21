import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    price: string;
    imageUrl?: string;
    inStock?: boolean;
    features?: string[];
  };
  onAddToCart: (productId: string) => void;
  isAddingToCart: boolean;
}

export default function ProductCard({ product, onAddToCart, isAddingToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group" data-testid={`card-product-${product.id}`}>
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300x300"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid={`img-product-${product.id}`}
        />
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button asChild size="sm" variant="secondary" data-testid={`button-view-product-${product.id}`}>
            <Link href={`/products/${product.id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 mb-3 text-sm line-clamp-2" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
        )}
        
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.features.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
            ₹{product.price}
          </span>
          <Button
            onClick={() => onAddToCart(product.id)}
            disabled={!product.inStock || isAddingToCart}
            className="bg-primary text-white hover:bg-blue-800 disabled:opacity-50"
            data-testid={`button-add-cart-${product.id}`}
          >
            {isAddingToCart ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
