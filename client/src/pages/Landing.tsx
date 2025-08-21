import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Shield, Lock, PiggyBank, Smartphone, Home, Car, Camera, Key, Star, Phone, Mail, MapPin } from "lucide-react";

interface DemoBookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
}

export default function Landing() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DemoBookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const demoBookingMutation = useMutation({
    mutationFn: async (data: DemoBookingFormData) => {
      await apiRequest("POST", "/api/demo-booking", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Booking Submitted",
        description: "We'll contact you soon to schedule your demo.",
      });
      setFormData({ name: "", email: "", phone: "", service: "" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit demo booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    demoBookingMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><Phone className="w-4 h-4 mr-2" />+91 96637 54444</span>
              <span className="flex items-center"><Mail className="w-4 h-4 mr-2" />sales@hekateautomation.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-accent"
                onClick={() => window.location.href = "/api/login"}
                data-testid="button-login"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary">
                HEKATE AUTOMATION
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
              <Link href="/smart-home-automation" className="text-gray-700 hover:text-primary transition-colors font-medium">Smart Home Automation</Link>
              <Link href="/smart-home-security" className="text-gray-700 hover:text-primary transition-colors font-medium">Smart Home Security</Link>
              <Link href="/apartment-villas" className="text-gray-700 hover:text-primary transition-colors font-medium">Apartments & Villas</Link>
              <Link href="/products" className="text-gray-700 hover:text-primary transition-colors font-medium">Products</Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors font-medium">Blog</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">Contact</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-accent text-white hover:bg-green-700" data-testid="button-book-demo">
                Book Demo
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Best Home Automation Company in
                <span className="text-primary"> Bangalore</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Trusted with 3000+ Smart Units. Transform your home with our cutting-edge automation solutions for Safety, Security, Savings & Convenience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-white hover:bg-blue-800" data-testid="button-get-quote">
                  Get Free Quote
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="button-watch-demo">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-smart-units">3000+</div>
                  <div className="text-sm text-gray-600">Smart Units</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-experience">8+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-satisfaction">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern smart home interior" 
                className="rounded-2xl shadow-2xl w-full"
                data-testid="img-hero"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Home className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Smart Control</div>
                    <div className="text-sm text-gray-600">Voice & App Control</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4S Approach Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our 4S Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on four key pillars to deliver comprehensive home automation solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety</h3>
                <p className="text-gray-600">Fire protection, flooding detection, and emergency response systems</p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Security</h3>
                <p className="text-gray-600">Advanced surveillance, access control, and monitoring systems</p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <PiggyBank className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Savings</h3>
                <p className="text-gray-600">Energy management and cost reduction through smart controls</p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Convenience</h3>
                <p className="text-gray-600">Voice control, mobile app integration, and remote access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Explore our range of smart home automation devices</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://pixabay.com/get/gd62031bc1fc9aef489452aac70bb2f0f2888f30b96c74e830d172e6140737933fefce0c2d52c338505a2ec769402157df5aba3c861e22c41892e593260d2bbb7_1280.jpg" 
                  alt="Smart lighting control" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid="img-product-lighting"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Lighting Control</h3>
                <p className="text-gray-600 mb-4">Advanced lighting automation with dimming and scheduling</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">₹12,999</span>
                  <Button className="bg-primary text-white hover:bg-blue-800" data-testid="button-add-cart-lighting">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                  alt="Security camera system" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid="img-product-security"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Camera System</h3>
                <p className="text-gray-600 mb-4">4K surveillance with night vision and mobile alerts</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">₹24,999</span>
                  <Button className="bg-primary text-white hover:bg-blue-800" data-testid="button-add-cart-security">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://pixabay.com/get/g7b643aecc16684a131967a9e26e6350646bb57e63978ef800d693e029aa7367d0896a0cf5b5067bac102d877cf487f988c6f760e55c29b81d7a0f2d3f3ae9a6d_1280.jpg" 
                  alt="Smart thermostat" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid="img-product-thermostat"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Thermostat</h3>
                <p className="text-gray-600 mb-4">Climate control with energy-saving algorithms</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">₹18,999</span>
                  <Button className="bg-primary text-white hover:bg-blue-800" data-testid="button-add-cart-thermostat">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://pixabay.com/get/g845d2ecbb0929bd637a0659a96d1191fb92dbe54ecae2a3ba57949db14468376fa8c7d7d819946cc3a17b93f5ba27572d2735d85d4afd4c1d36aa9da5bd2fdd3_1280.jpg" 
                  alt="Smart door lock" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-testid="img-product-lock"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Door Lock</h3>
                <p className="text-gray-600 mb-4">Biometric and app-controlled access system</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">₹8,999</span>
                  <Button className="bg-primary text-white hover:bg-blue-800" data-testid="button-add-cart-lock">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-accent text-white hover:bg-green-700" data-testid="button-view-all-products">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Apartment & Villa Solutions</h2>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive automation solutions for residential complexes and individual properties.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Car Parking</h3>
                    <p className="text-gray-600">Smart parking management with automated gates and tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fire Alarm Systems</h3>
                    <p className="text-gray-600">Advanced fire detection and automatic suppression systems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Door Phone Systems</h3>
                    <p className="text-gray-600">Multi-unit video communication and access control</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Key className="text-purple-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Electronic Access Control</h3>
                    <p className="text-gray-600">Biometric and card-based security systems</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-primary text-white hover:bg-blue-800" data-testid="button-learn-more">
                  <Link href="/apartment-villas">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern apartment building" 
                className="rounded-2xl shadow-xl w-full"
                data-testid="img-apartment"
              />
              
              <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="text-white w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Smart Security</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Smartphone className="text-white w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">IoT Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by 3000+ satisfied customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "HEKATE AUTOMATION transformed our home completely. The smart lighting and security systems work flawlessly. Excellent service and support!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Rajesh Kumar</div>
                    <div className="text-sm text-gray-600">Bangalore</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Amazing experience with their villa automation solutions. Energy savings are significant and the convenience is unmatched!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Priya Sharma</div>
                    <div className="text-sm text-gray-600">Coimbatore</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Professional team, quality products, and excellent after-sales service. Highly recommended for anyone looking for home automation."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Arjun Reddy</div>
                    <div className="text-sm text-gray-600">Bangalore</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Home?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Get a free consultation and see how our smart automation solutions can enhance your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-primary hover:bg-gray-100" data-testid="button-book-free-demo">
                  Book Free Demo
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-get-quote-cta">
                  Get Quote
                </Button>
              </div>
            </div>
            
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Callback</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                      <SelectTrigger data-testid="select-service">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Smart Home Automation">Smart Home Automation</SelectItem>
                        <SelectItem value="Smart Security">Smart Security</SelectItem>
                        <SelectItem value="Apartment Solutions">Apartment Solutions</SelectItem>
                        <SelectItem value="Villa Solutions">Villa Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-white hover:bg-blue-800"
                    disabled={demoBookingMutation.isPending}
                    data-testid="button-request-callback"
                  >
                    {demoBookingMutation.isPending ? "Submitting..." : "Request Callback"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-6">HEKATE AUTOMATION</div>
              <p className="text-gray-400 mb-6">
                Leading home automation company providing smart solutions for modern homes and buildings.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/smart-home-automation" className="hover:text-white transition-colors">Smart Home Automation</Link></li>
                <li><Link href="/smart-home-security" className="hover:text-white transition-colors">Smart Security Systems</Link></li>
                <li><Link href="/apartment-villas" className="hover:text-white transition-colors">Apartment Solutions</Link></li>
                <li><Link href="/apartment-villas" className="hover:text-white transition-colors">Villa Automation</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">HVAC Control</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lighting Control</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Products</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/products" className="hover:text-white transition-colors">Smart Switches</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Security Cameras</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Door Locks</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Thermostats</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Sensors</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Controllers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    EBSL, No. 2452 & 2453, 1st & 2nd Floor,<br />
                    9 Main, 17 E Cross, BSK 2 Stage,<br />
                    Bengaluru 560070
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>+91 96637 54444</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>sales@hekateautomation.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2024 HEKATE AUTOMATION. All rights reserved.
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
