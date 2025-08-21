import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Package, Users, Shield, Zap } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface SubSection {
  id: number;
  sectionId: number;
  name: string;
  slug: string;
  description: string;
  content: string;
  imageUrl?: string;
}

interface Section {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  inStock: boolean;
  isFeatured: boolean;
}

export default function SubSectionDetail() {
  const { sectionSlug, subSectionSlug } = useParams<{ sectionSlug: string; subSectionSlug: string }>();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const { data: sections = [] } = useQuery({
    queryKey: ["/api/sections"],
  });

  const { data: subSections = [] } = useQuery({
    queryKey: ["/api/sub-sections"],
  });

  const section = (sections as Section[]).find((s: Section) => s.slug === sectionSlug);
  const subSection = (subSections as SubSection[]).find((ss: SubSection) => ss.slug === subSectionSlug);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["/api/products", { subSectionId: subSection?.id }],
    enabled: !!subSection?.id,
  });

  if (!section || !subSection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Section not found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Industry-leading components with extended warranties"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Installation",
      description: "Professional setup by certified technicians"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Integration",
      description: "Seamless connectivity with existing systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <Link href="/#solutions" className="text-blue-600 hover:text-blue-800">Solutions</Link>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-blue-600">{section.name}</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{subSection.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
                  {section.name}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-page-title">
                  {subSection.name}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  {subSection.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/products?subSection=${subSection.id}`}>
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" data-testid="button-view-products">
                      View Products
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Get Consultation
                    </Button>
                  </Link>
                </div>
              </div>
              {subSection.imageUrl && (
                <div className={`transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-6"></div>
                    <img
                      src={subSection.imageUrl}
                      alt={subSection.name}
                      className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
                      data-testid="img-hero"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`transition-all duration-1000 delay-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-xl leading-relaxed">
                  {subSection.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium automation solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`group hover:shadow-lg transition-all duration-500 delay-${index * 100} ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600">Discover our top-rated {subSection.name.toLowerCase()} products</p>
            </div>
            <Link href={`/products?subSection=${subSection.id}`}>
              <Button variant="outline" data-testid="button-view-all-products">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (products as Product[]).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(products as Product[]).slice(0, 8).map((product: Product, index: number) => (
                <div key={product.id} className={`transition-all duration-500 delay-${index * 100} ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <ProductCard
                    product={{
                      ...product,
                      price: product.price.toString()
                    }}
                    onAddToCart={() => {}}
                    isAddingToCart={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600">Products for this category will be available soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get expert consultation and personalized recommendations for your {subSection.name.toLowerCase()} needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Book Free Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}