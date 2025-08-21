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
  ArrowRight, ChevronDown, Quote, Award, Users, TrendingUp, Settings,
  Lightbulb, Thermometer, Volume2, DoorOpen, Cctv, Gauge, Timer,
  SmartphoneCharging, Headphones, Speaker, Monitor, Tablet, Watch,
  Calendar, Moon
} from "lucide-react";
import HierarchicalNavigation from "@/components/HierarchicalNavigation";

interface DemoBookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
}

// Intersection Observer Hook for animations
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

// Floating animation for background elements
const FloatingElement = ({ children, delay = 0, duration = 6 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <div 
    className="animate-float" 
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    {children}
  </div>
);

export default function CompleteHomeLanding() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DemoBookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    message: "",
  });

  // Intersection Observer for scroll animations
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
      setFormData({ name: "", email: "", phone: "", service: "", preferredDate: "", message: "" });
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
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    demoBookingMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Floating Background Elements for 3D Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingElement delay={0} duration={8}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2} duration={10}>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/30 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={4} duration={12}>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-200/30 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={1} duration={9}>
          <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-orange-200/30 rounded-full blur-xl"></div>
        </FloatingElement>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white shadow-lg fixed w-full top-0">
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 animate-slide-left">
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />+91 96637 54444
              </span>
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />sales@hekateautomation.com
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />Bangalore, India
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-accent hover:bg-white/10 transition-all duration-300"
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
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">HEKATE AUTOMATION</div>
                  <div className="text-xs text-gray-600">Smart Home Solutions</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/smart-home-automation" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Smart Home Automation
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/smart-home-security" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Smart Home Security
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/apartment-villas" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Apartments & Villas
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-accent text-white hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg" data-testid="button-book-demo">
                <Calendar className="w-4 h-4 mr-2" />
                Book Demo
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Best Home Automation Company in
                  <span className="text-gradient block"> Bangalore</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Trusted with 3000+ Smart Units. Transform your home with our cutting-edge automation solutions for 
                  <span className="font-semibold text-primary"> Safety, Security, Savings & Convenience.</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 fade-in-up" style={{animationDelay: '0.3s'}}>
                <Button size="lg" className="bg-primary text-white hover:bg-blue-800 hover:scale-105 transition-all duration-300 shadow-xl text-lg px-8 py-4" data-testid="button-get-quote">
                  <Zap className="mr-2 w-5 h-5" />
                  Get Free Quote
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 text-lg px-8 py-4" data-testid="button-watch-demo">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-12 fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary animate-pulse3d" data-testid="text-smart-units">3000+</div>
                  <div className="text-sm text-gray-600">Smart Units</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary animate-pulse3d" data-testid="text-experience">8+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary animate-pulse3d" data-testid="text-satisfaction">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent animate-pulse3d" data-testid="text-energy-savings">60%</div>
                  <div className="text-sm text-gray-600">Energy Savings</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 fade-in-up" style={{animationDelay: '0.9s'}}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">ISO 9001 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Award Winning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">5 Year Warranty</span>
                </div>
              </div>
            </div>
            
            <div className="relative fade-in-right">
              <div className="relative">
                {/* Main Hero Image */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                    alt="Modern smart home interior with automation" 
                    className="relative rounded-3xl shadow-2xl w-full card-3d hover:scale-105 transition-transform duration-500"
                    data-testid="img-hero"
                  />
                </div>
                
                {/* Floating UI Elements */}
                <FloatingElement delay={0} duration={6}>
                  <div className="absolute -top-8 -right-8 glass-effect p-6 rounded-2xl shadow-xl backdrop-blur-xl border border-white/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Brain className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">AI Learning</div>
                        <div className="text-sm text-gray-600">Neural Networks</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
                
                <FloatingElement delay={2} duration={8}>
                  <div className="absolute -bottom-8 -left-8 glass-effect p-6 rounded-2xl shadow-xl backdrop-blur-xl border border-white/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <Wifi className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">IoT Connected</div>
                        <div className="text-sm text-gray-600">5G Ready</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement delay={4} duration={7}>
                  <div className="absolute top-1/2 -right-12 glass-effect p-4 rounded-2xl shadow-xl backdrop-blur-xl border border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Zap className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Energy Saving</div>
                        <div className="text-xs text-gray-600">60% Reduction</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* 4S Approach Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our 4S Approach</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We focus on four key pillars to deliver comprehensive home automation solutions that transform your living experience through innovation and technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Safety", 
                description: "Fire protection, gas leak detection, flood sensors, emergency response systems with instant alerts",
                color: "from-red-500 to-pink-500",
                features: ["Fire Detection", "Gas Leak Alert", "Flood Sensors", "Emergency Response"]
              },
              { 
                icon: Lock, 
                title: "Security", 
                description: "Advanced surveillance, biometric access control, motion detection, and 24/7 monitoring systems",
                color: "from-blue-500 to-cyan-500",
                features: ["CCTV Surveillance", "Access Control", "Motion Detection", "24/7 Monitoring"]
              },
              { 
                icon: PiggyBank, 
                title: "Savings", 
                description: "Energy management through smart controls, automated scheduling, and AI-powered optimization",
                color: "from-green-500 to-emerald-500",
                features: ["Energy Management", "Smart Scheduling", "AI Optimization", "Cost Reduction"]
              },
              { 
                icon: Smartphone, 
                title: "Convenience", 
                description: "Voice control, mobile app integration, remote access, and seamless automation workflows",
                color: "from-purple-500 to-violet-500",
                features: ["Voice Control", "Mobile App", "Remote Access", "Automation"]
              }
            ].map((approach, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 card-3d border-0 bg-gradient-to-br from-white to-gray-50 fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${approach.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${approach.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <approach.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{approach.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{approach.description}</p>
                  
                  <div className="space-y-2">
                    {approach.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Smart Home Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Control your entire home from a single, intuitive interface with real-time monitoring and intelligent automation
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto fade-in-up">
            <div className="bg-white rounded-3xl shadow-2xl p-8 card-3d hover:scale-105 transition-transform duration-500">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Good Evening, Rajesh</h3>
                  <p className="text-gray-600">Your home is running efficiently</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">All Systems Online</span>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Grid */}
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Temperature Control */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Thermometer className="w-8 h-8 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">24°C</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Climate Control</h4>
                    <p className="text-sm text-gray-600">Living Room</p>
                    <div className="mt-4 bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Lighting Control */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Lightbulb className="w-8 h-8 text-yellow-500" />
                      <span className="text-2xl font-bold text-gray-900">85%</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Smart Lighting</h4>
                    <p className="text-sm text-gray-600">12 Lights Active</p>
                    <div className="mt-4 bg-yellow-100 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Security Status */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Shield className="w-8 h-8 text-green-500" />
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
                    <p className="text-sm text-gray-600">Armed & Secure</p>
                    <div className="mt-4 text-xs text-green-600 font-medium">All Zones Protected</div>
                  </CardContent>
                </Card>
                
                {/* Energy Monitor */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Gauge className="w-8 h-8 text-purple-500" />
                      <span className="text-2xl font-bold text-gray-900">3.2kW</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Energy Usage</h4>
                    <p className="text-sm text-gray-600">Current Load</p>
                    <div className="mt-4 text-xs text-green-600 font-medium">↓ 25% vs Yesterday</div>
                  </CardContent>
                </Card>
                
                {/* Entertainment */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Volume2 className="w-8 h-8 text-indigo-500" />
                      <span className="text-2xl font-bold text-gray-900">♪</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Entertainment</h4>
                    <p className="text-sm text-gray-600">Playing in Living Room</p>
                    <div className="mt-4 text-xs text-indigo-600 font-medium">Jazz Playlist</div>
                  </CardContent>
                </Card>
                
                {/* Door Access */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DoorOpen className="w-8 h-8 text-orange-500" />
                      <Lock className="w-6 h-6 text-gray-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                    <p className="text-sm text-gray-600">Front Door Locked</p>
                    <div className="mt-4 text-xs text-orange-600 font-medium">Last: 10:30 PM</div>
                  </CardContent>
                </Card>
                
                {/* Cameras */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Cctv className="w-8 h-8 text-red-500" />
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Surveillance</h4>
                    <p className="text-sm text-gray-600">8 Cameras Active</p>
                    <div className="mt-4 text-xs text-red-600 font-medium">Recording</div>
                  </CardContent>
                </Card>
                
                {/* Schedule */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Timer className="w-8 h-8 text-teal-500" />
                      <span className="text-2xl font-bold text-gray-900">5</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Automations</h4>
                    <p className="text-sm text-gray-600">Scheduled Tasks</p>
                    <div className="mt-4 text-xs text-teal-600 font-medium">Next: Morning Scene</div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-primary hover:bg-blue-700 transition-colors duration-300">
                    <Home className="w-4 h-4 mr-2" />
                    Home Mode
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                    <Moon className="w-4 h-4 mr-2" />
                    Night Mode
                  </Button>
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300">
                    <Car className="w-4 h-4 mr-2" />
                    Away Mode
                  </Button>
                  <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
                    <Users className="w-4 h-4 mr-2" />
                    Party Mode
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-Room Solutions */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Room-by-Room Automation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Customize every space in your home with intelligent automation tailored to your lifestyle and preferences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                room: "Living Room",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
                features: ["Smart TV Control", "Ambient Lighting", "Climate Control", "Voice Assistant"],
                devices: ["4K Smart TV", "RGB Lighting", "Smart Thermostat", "Echo Dot"],
                color: "blue"
              },
              {
                room: "Kitchen",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
                features: ["Smart Appliances", "Leak Detection", "Motion Lighting", "Recipe Assistant"],
                devices: ["Smart Refrigerator", "Water Sensors", "Under-cabinet LEDs", "Smart Display"],
                color: "green"
              },
              {
                room: "Bedroom",
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
                features: ["Sleep Tracking", "Automated Blinds", "Climate Control", "Wake-up Lighting"],
                devices: ["Sleep Sensor", "Smart Blinds", "Bedroom AC", "Sunrise Alarm"],
                color: "purple"
              },
              {
                room: "Bathroom",
                image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400",
                features: ["Smart Mirrors", "Water Temperature", "Humidity Control", "Leak Detection"],
                devices: ["Smart Mirror", "Digital Faucet", "Exhaust Fan", "Flood Sensor"],
                color: "cyan"
              },
              {
                room: "Home Office",
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
                features: ["Focus Lighting", "Noise Control", "Air Quality", "Productivity Modes"],
                devices: ["Desk Lamp", "White Noise", "Air Purifier", "Smart Plug"],
                color: "orange"
              },
              {
                room: "Garden",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
                features: ["Irrigation System", "Weather Monitoring", "Security Lighting", "Plant Care"],
                devices: ["Smart Sprinklers", "Weather Station", "Flood Lights", "Soil Sensors"],
                color: "emerald"
              }
            ].map((room, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 card-3d fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={room.image}
                    alt={`Smart ${room.room} automation`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${room.color}-900/80 to-transparent`}></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{room.room}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Smart Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {room.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Devices</h4>
                      <div className="flex flex-wrap gap-2">
                        {room.devices.map((device, deviceIndex) => (
                          <span key={deviceIndex} className={`px-2 py-1 bg-${room.color}-100 text-${room.color}-700 rounded-full text-xs font-medium`}>
                            {device}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => {
                        const roomUrl = room.room.toLowerCase().replace(/\s+/g, '-');
                        window.location.href = `/${roomUrl}`;
                      }}
                      data-testid={`button-explore-${room.room.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      Explore {room.room} Solutions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our premium collection of smart home devices designed for luxury living and seamless automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Smart WiFi Switch",
                price: "₹2,999",
                originalPrice: "₹3,999",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
                description: "Control lights and appliances remotely with voice commands",
                features: ["Voice Control", "WiFi Enabled", "Energy Monitoring", "Timer Function"],
                rating: 4.8,
                reviews: 156,
                inStock: true,
                badge: "Best Seller"
              },
              {
                name: "4K Security Camera",
                price: "₹12,999",
                originalPrice: "₹15,999",
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
                description: "Ultra HD surveillance with night vision and AI detection",
                features: ["4K Recording", "Night Vision", "AI Detection", "Cloud Storage"],
                rating: 4.9,
                reviews: 203,
                inStock: true,
                badge: "Premium"
              },
              {
                name: "Smart Thermostat",
                price: "₹8,999",
                originalPrice: "₹11,999",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
                description: "AI-powered climate control with energy optimization",
                features: ["AI Learning", "Energy Saving", "Remote Control", "Scheduling"],
                rating: 4.7,
                reviews: 89,
                inStock: true,
                badge: "Eco-Friendly"
              },
              {
                name: "Smart Door Lock",
                price: "₹15,999",
                originalPrice: "₹19,999",
                image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
                description: "Biometric access control with multiple unlock methods",
                features: ["Fingerprint", "PIN Code", "Mobile App", "Emergency Key"],
                rating: 4.6,
                reviews: 74,
                inStock: false,
                badge: "Coming Soon"
              }
            ].map((product, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 card-3d bg-white fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-square overflow-hidden relative">
                  {/* Product Badge */}
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.badge === 'Best Seller' ? 'bg-red-500 text-white' :
                    product.badge === 'Premium' ? 'bg-purple-500 text-white' :
                    product.badge === 'Eco-Friendly' ? 'bg-green-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {product.badge}
                  </div>
                  
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid={`img-product-${index}`}
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300">
                      Quick View
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {product.features.slice(0, 2).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-primary hover:bg-blue-700 transition-colors duration-300"
                      disabled={!product.inStock}
                      data-testid={`button-add-cart-${index}`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                    </Button>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 fade-in-up">
            <Button asChild className="bg-accent text-white hover:bg-green-700 hover:scale-105 transition-all duration-300 text-lg px-8 py-4" data-testid="button-view-all-products">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by 3000+ satisfied customers across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Mehta",
                location: "Bangalore",
                profession: "IT Executive",
                rating: 5,
                text: "HEKATE AUTOMATION completely transformed our home. The smart lighting and security systems work flawlessly. The energy savings are incredible - our electricity bill dropped by 40%! Professional installation and excellent after-sales service.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                project: "3 BHK Apartment Automation",
                savings: "40% Energy Reduction"
              },
              {
                name: "Priya Sharma", 
                location: "Mumbai",
                profession: "Interior Designer",
                rating: 5,
                text: "Amazing experience with their villa automation solutions. The voice control integration is seamless, and the mobile app is incredibly user-friendly. My clients are always impressed by the smart home features. Highly recommended!",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                project: "Luxury Villa Automation",
                savings: "Smart Integration"
              },
              {
                name: "Dr. Arun Kumar",
                location: "Chennai",
                profession: "Medical Professional", 
                rating: 5,
                text: "Outstanding security solutions! The AI-powered cameras and biometric access control give us complete peace of mind. The automation schedules perfectly match our daily routine. Worth every penny invested.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                project: "Security & Automation",
                savings: "Enhanced Security"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 card-3d bg-gradient-to-br from-white to-gray-50 fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  
                  {/* Customer Info */}
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.profession}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.location}</div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Project:</span>
                        <div className="font-medium text-gray-900">{testimonial.project}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Result:</span>
                        <div className="font-medium text-green-600">{testimonial.savings}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Additional Stats */}
          <div className="mt-16 text-center fade-in-up">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3000+</div>
                <div className="text-gray-600">Smart Homes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-left">
              <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Home?</h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Experience the future of home automation with a personalized demo. Our experts will design a custom solution tailored to your lifestyle and budget.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Custom Design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Professional Installation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>5 Year Warranty</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 transition-colors duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +91 96637 54444
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-colors duration-300">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </div>
            </div>
            
            <div className="fade-in-right">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Book Your Free Demo</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-white/60"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-white/60"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-white/60"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="date"
                          placeholder="Preferred Date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder-white/60"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select Service Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="complete-automation">Complete Home Automation</SelectItem>
                          <SelectItem value="smart-lighting">Smart Lighting</SelectItem>
                          <SelectItem value="security-system">Security System</SelectItem>
                          <SelectItem value="climate-control">Climate Control</SelectItem>
                          <SelectItem value="entertainment">Entertainment System</SelectItem>
                          <SelectItem value="consultation">Consultation Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-white/60 min-h-[120px]"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-accent text-white hover:bg-green-700 transition-colors duration-300"
                      disabled={demoBookingMutation.isPending}
                    >
                      {demoBookingMutation.isPending ? (
                        "Booking Demo..."
                      ) : (
                        <>
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Free Demo
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center text-sm text-white/60">
                    <p>We'll contact you within 2 hours to schedule your demo</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">HEKATE AUTOMATION</div>
                  <div className="text-gray-400">Smart Home Solutions</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Leading provider of smart home automation solutions in India. We transform ordinary homes into intelligent living spaces with cutting-edge technology and expert installation services.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6">Our Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link href="/smart-home-automation" className="hover:text-white transition-colors">Smart Home Automation</Link></li>
                <li><Link href="/smart-home-security" className="hover:text-white transition-colors">Home Security Systems</Link></li>
                <li><Link href="/apartment-villas" className="hover:text-white transition-colors">Apartments & Villas</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Smart Devices</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Installation & Support</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6">Contact Information</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  +91 96637 54444
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-primary" />
                  sales@hekateautomation.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-primary" />
                  Bangalore, Karnataka, India
                </li>
                <li className="flex items-center">
                  <Timer className="w-4 h-4 mr-3 text-primary" />
                  24/7 Support Available
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>&copy; 2024 Hekate Automation. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/warranty" className="hover:text-white transition-colors">Warranty</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}