import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tv, Volume2, Lightbulb, Thermometer, Smartphone, Wifi, 
  Settings, Play, Pause, SkipForward, Home, ArrowLeft,
  Zap, Brain, Timer, Star, CheckCircle, ArrowRight,
  Speaker, Monitor, Tablet, Watch
} from "lucide-react";

const useIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [callback]);
};

export default function LivingRoomSolutions() {
  const [activeDevice, setActiveDevice] = useState("tv");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  });

  const devices = [
    {
      id: "tv",
      name: "Smart TV Control",
      icon: <Tv className="w-8 h-8" />,
      description: "Control your entertainment system with voice commands and automated scenes",
      features: ["4K Streaming", "Voice Control", "App Integration", "Gaming Mode"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
      color: "blue"
    },
    {
      id: "lighting",
      name: "Ambient Lighting",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Adaptive lighting that changes based on time of day and activities",
      features: ["RGB Colors", "Dimming Control", "Schedule Automation", "Scene Modes"],
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
      color: "yellow"
    },
    {
      id: "climate",
      name: "Climate Control",
      icon: <Thermometer className="w-8 h-8" />,
      description: "Maintain perfect temperature with intelligent climate management",
      features: ["Smart Thermostat", "Zone Control", "Energy Optimization", "Remote Access"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
      color: "green"
    },
    {
      id: "audio",
      name: "Audio System",
      icon: <Volume2 className="w-8 h-8" />,
      description: "Immersive sound experience with multi-room audio control",
      features: ["Surround Sound", "Multi-Room", "Streaming Services", "Voice Assistant"],
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600",
      color: "purple"
    }
  ];

  const automationScenes = [
    {
      name: "Movie Night",
      description: "Dims lights, activates theater mode, adjusts temperature",
      icon: <Play className="w-6 h-6" />,
      devices: ["TV", "Lights", "Audio", "Climate"],
      color: "bg-blue-500"
    },
    {
      name: "Party Mode",
      description: "Colorful lighting, upbeat music, optimal temperature",
      icon: <Star className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Climate"],
      color: "bg-purple-500"
    },
    {
      name: "Relaxation",
      description: "Warm lighting, calm music, comfortable temperature",
      icon: <Home className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Climate"],
      color: "bg-green-500"
    },
    {
      name: "Good Morning",
      description: "Gradual lighting, weather update, coffee prep",
      icon: <Timer className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Climate", "Smart Plugs"],
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Living Room Automation</h1>
                <p className="text-gray-600">Transform your entertainment space into a smart sanctuary</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              Premium Solutions
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${animateIn ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Smart Living Room
                  <span className="block text-blue-600">Entertainment Hub</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create the perfect atmosphere for relaxation, entertainment, and social gatherings with intelligent automation that adapts to your lifestyle.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Connected Devices", value: "15+" },
                  { label: "Automation Scenes", value: "25+" },
                  { label: "Energy Savings", value: "30%" },
                  { label: "Voice Commands", value: "100+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-get-quote">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" data-testid="button-book-demo">
                  Book Demo
                </Button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
                  alt="Smart Living Room"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Control Panels */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <Tv className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">4K TV</div>
                    <div className="text-xs text-gray-500">Netflix Playing</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-sm">Ambient Lights</div>
                    <div className="text-xs text-gray-500">Movie Mode</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Controls */}
      <section className="relative z-10 py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Device Control</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless control over all your living room devices through a unified smart system
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Device Selector */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {devices.map((device, index) => (
                  <Card 
                    key={device.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeDevice === device.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveDevice(device.id)}
                    data-testid={`card-device-${device.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-${device.color}-100 text-${device.color}-600`}>
                          {device.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{device.name}</h4>
                          <p className="text-sm text-gray-600">{device.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Device Details */}
            <div className="lg:col-span-2">
              {devices.map(device => (
                <div 
                  key={device.id}
                  className={`transition-all duration-500 ${
                    activeDevice === device.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute'
                  }`}
                >
                  {activeDevice === device.id && (
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2">
                          <div className="aspect-video md:aspect-auto">
                            <img 
                              src={device.image}
                              alt={device.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-8">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className={`p-3 rounded-lg bg-${device.color}-100 text-${device.color}-600`}>
                                {device.icon}
                              </div>
                              <h4 className="text-2xl font-bold text-gray-900">{device.name}</h4>
                            </div>
                            
                            <p className="text-gray-600 mb-6">{device.description}</p>
                            
                            <div className="space-y-3 mb-6">
                              <h5 className="font-semibold text-gray-900">Key Features:</h5>
                              {device.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              Learn More About {device.name}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Automation Scenes */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Automation Scenes</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              One-touch automation scenes that transform your living room for any occasion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationScenes.map((scene, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 card-3d fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${scene.color} rounded-full flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {scene.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{scene.name}</h4>
                  <p className="text-gray-600 mb-4">{scene.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="text-sm font-medium text-gray-700">Controls:</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {scene.devices.map((device, deviceIndex) => (
                        <Badge key={deviceIndex} variant="secondary" className="text-xs">
                          {device}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline" data-testid={`button-activate-${scene.name.toLowerCase().replace(' ', '-')}`}>
                    Activate Scene
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Living Room?</h3>
            <p className="text-xl text-blue-100 mb-8">
              Get a personalized consultation and see how smart automation can enhance your entertainment experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" data-testid="button-schedule-consultation">
                Schedule Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-view-products">
                View Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}