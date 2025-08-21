import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { 
  Shield, Lock, PiggyBank, Smartphone, Home, Car, Camera, Key, Star, 
  Phone, Mail, MapPin, Play, CheckCircle, Zap, Wifi, Brain,
  ArrowRight, ChevronDown, Quote, Award, Users, TrendingUp
} from "lucide-react";

interface DemoBookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
}

// Intersection Observer Hook
const useIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    elements.forEach(el => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [callback]);

  return observer;
};

export default function LuxuryLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DemoBookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  // Intersection Observer for animations
  useIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full animate-pulse3d blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full animate-rotate3d blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 fixed w-full top-0">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center animate-slide-left">
                <Phone className="w-4 h-4 mr-2" />+91 96637 54444
              </span>
              <span className="flex items-center animate-slide-left" style={{animationDelay: '0.2s'}}>
                <Mail className="w-4 h-4 mr-2" />sales@hekateautomation.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-300"
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
            <div className="flex items-center animate-scale-in">
              <div className="text-3xl font-orbitron font-bold luxury-gradient-text">
                HEKATE AUTOMATION
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Home</Link>
              <Link href="/smart-home-automation" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Smart Home</Link>
              <Link href="/smart-home-security" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Security</Link>
              <Link href="/apartment-villas" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Apartments</Link>
              <Link href="/products" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Products</Link>
              <Link href="/blog" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Blog</Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105">Contact</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="luxury-gradient hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25" data-testid="button-book-demo">
                Book Demo
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-orbitron font-bold mb-6 text-shadow-3d">
                  Future of
                  <span className="luxury-gradient-text animate-gradient block"> Home Automation</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed font-space">
                  Transform your living space with cutting-edge AI-powered automation. 
                  Experience luxury, security, and efficiency like never before.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 fade-in-up" style={{animationDelay: '0.3s'}}>
                <Button size="lg" className="luxury-gradient hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30 text-lg px-8 py-4" data-testid="button-get-quote">
                  <Zap className="mr-2 w-5 h-5" />
                  Get Started Now
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-lg px-8 py-4" data-testid="button-watch-demo">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-12 fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="text-center">
                  <div className="text-4xl font-orbitron font-bold luxury-gradient-text animate-pulse3d" data-testid="text-smart-units">5000+</div>
                  <div className="text-sm text-white/60 font-space">Smart Units</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-orbitron font-bold luxury-gradient-text animate-pulse3d" data-testid="text-experience">10+</div>
                  <div className="text-sm text-white/60 font-space">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-orbitron font-bold luxury-gradient-text animate-pulse3d" data-testid="text-satisfaction">100%</div>
                  <div className="text-sm text-white/60 font-space">Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative fade-in-right">
              <div className="relative">
                <div className="absolute -inset-4 luxury-gradient rounded-3xl blur-xl opacity-30 animate-pulse3d"></div>
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Luxury smart home interior" 
                  className="relative rounded-3xl shadow-2xl w-full card-3d"
                  data-testid="img-hero"
                />
                
                {/* Floating UI Elements */}
                <div className="absolute -top-8 -right-8 glass-effect p-6 rounded-2xl shadow-xl animate-float">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                      <Brain className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-white font-orbitron">AI Control</div>
                      <div className="text-sm text-white/60">Neural Learning</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 glass-effect p-6 rounded-2xl shadow-xl animate-float" style={{animationDelay: '2s'}}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Wifi className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-white font-orbitron">IoT Connected</div>
                      <div className="text-sm text-white/60">Seamless Integration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-orbitron font-bold mb-6 luxury-gradient-text">
              Revolutionary Technology
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-space">
              Experience the future of home automation with our cutting-edge AI-powered solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Ultimate Safety", desc: "AI-powered threat detection and emergency response", color: "from-red-500 to-pink-500" },
              { icon: Lock, title: "Quantum Security", desc: "Military-grade encryption and biometric access", color: "from-blue-500 to-cyan-500" },
              { icon: PiggyBank, title: "Smart Savings", desc: "AI optimization reduces energy costs by 60%", color: "from-green-500 to-emerald-500" },
              { icon: Smartphone, title: "Neural Control", desc: "Voice AI and predictive automation", color: "from-purple-500 to-violet-500" }
            ].map((feature, index) => (
              <Card key={index} className="bg-black/40 border-white/10 hover:border-white/30 backdrop-blur-xl card-3d group fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 animate-pulse3d`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60 font-space">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-orbitron font-bold mb-6 luxury-gradient-text">
              Premium Collection
            </h2>
            <p className="text-xl text-white/80 font-space">Discover our flagship smart home devices</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "NeuroLight Pro", price: "₹24,999", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64" },
              { name: "Guardian AI Camera", price: "₹45,999", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0" },
              { name: "Climate Genius", price: "₹35,999", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" },
              { name: "Quantum Lock", price: "₹29,999", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07" }
            ].map((product, index) => (
              <Card key={index} className="bg-black/40 border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 card-3d group fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid={`img-product-${index}`}
                  />
                  <div className="absolute inset-0 luxury-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-orbitron font-semibold text-white mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold luxury-gradient-text">{product.price}</span>
                    <Button className="luxury-gradient hover:scale-105 transition-all duration-300" data-testid={`button-add-cart-${index}`}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 fade-in-up">
            <Button asChild className="luxury-gradient hover:scale-105 transition-all duration-300 text-lg px-8 py-4" data-testid="button-view-all-products">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-orbitron font-bold mb-6 luxury-gradient-text">
              Client Experiences
            </h2>
            <p className="text-xl text-white/80 font-space">Trusted by thousands of luxury homeowners</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Arjun Mehta", location: "Bangalore", rating: 5, text: "Revolutionary transformation! The AI learns our patterns and anticipates our needs perfectly." },
              { name: "Priya Sharma", location: "Mumbai", rating: 5, text: "Incredible luxury experience. The voice control and automation exceed all expectations." },
              { name: "Rohit Gupta", location: "Delhi", rating: 5, text: "Outstanding service and technology. Our home feels like it's from the future!" }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-xl card-3d group fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-purple-400 mb-4" />
                  <p className="text-white/80 mb-6 italic font-space">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 luxury-gradient rounded-full mr-4 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white font-orbitron">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto fade-in-up">
            <h2 className="text-5xl font-orbitron font-bold mb-6 luxury-gradient-text">
              Ready for the Future?
            </h2>
            <p className="text-xl text-white/80 mb-8 font-space">
              Join thousands of satisfied customers who've transformed their homes with our luxury automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="luxury-gradient hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30 text-xl px-12 py-6" data-testid="button-get-started">
                <Award className="mr-2 w-6 h-6" />
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-xl px-12 py-6" data-testid="button-schedule-consultation">
                <Phone className="mr-2 w-6 h-6" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="text-3xl font-orbitron font-bold luxury-gradient-text mb-4">
                HEKATE AUTOMATION
              </div>
              <p className="text-white/60 mb-6 font-space">
                Leading the future of luxury home automation with AI-powered solutions that transform the way you live.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-white/60 font-space">
                <li><Link href="/smart-home-automation" className="hover:text-white transition-colors">Smart Home Automation</Link></li>
                <li><Link href="/smart-home-security" className="hover:text-white transition-colors">Home Security</Link></li>
                <li><Link href="/apartment-villas" className="hover:text-white transition-colors">Apartments & Villas</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-white/60 font-space">
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" />+91 96637 54444</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" />sales@hekateautomation.com</li>
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Bangalore, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-white/60 font-space">
            <p>&copy; 2024 Hekate Automation. All rights reserved. | Future of Home Automation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}