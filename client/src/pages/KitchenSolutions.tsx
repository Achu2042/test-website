import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChefHat, Droplets, Lightbulb, Thermometer, Smartphone, 
  Settings, AlertTriangle, Timer, Home, ArrowLeft, Zap, 
  Brain, Star, CheckCircle, ArrowRight, Shield, Gauge,
  Coffee, Utensils, Refrigerator, Microwave
} from "lucide-react";

export default function KitchenSolutions() {
  const [activeFeature, setActiveFeature] = useState("appliances");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const smartFeatures = [
    {
      id: "appliances",
      name: "Smart Appliances",
      icon: <ChefHat className="w-8 h-8" />,
      description: "Connected kitchen appliances that work together seamlessly",
      features: ["Smart Refrigerator", "Intelligent Oven", "Connected Dishwasher", "Smart Coffee Maker"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
      color: "blue"
    },
    {
      id: "safety",
      name: "Leak Detection",
      icon: <Droplets className="w-8 h-8" />,
      description: "Advanced water leak detection and automatic shutoff systems",
      features: ["Water Sensors", "Automatic Shutoff", "Mobile Alerts", "Damage Prevention"],
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      color: "red"
    },
    {
      id: "lighting",
      name: "Task Lighting",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Intelligent lighting that adapts to your cooking activities",
      features: ["Under-cabinet LEDs", "Motion Detection", "Color Temperature", "Recipe Lighting"],
      image: "https://images.unsplash.com/photo-1556909088-4b29f9fb99e9?w=600",
      color: "yellow"
    },
    {
      id: "climate",
      name: "Ventilation Control",
      icon: <Thermometer className="w-8 h-8" />,
      description: "Smart ventilation and temperature control for optimal cooking environment",
      features: ["Auto Exhaust Fan", "Air Quality Monitor", "Temperature Control", "Humidity Management"],
      image: "https://images.unsplash.com/photo-1556909088-4b29f9fb99e9?w=600",
      color: "green"
    }
  ];

  const automationScenes = [
    {
      name: "Morning Coffee",
      description: "Auto-brew coffee, gentle lighting, weather update",
      icon: <Coffee className="w-6 h-6" />,
      devices: ["Coffee Maker", "Lights", "Smart Display"],
      color: "bg-amber-500"
    },
    {
      name: "Cooking Mode",
      description: "Task lighting, ventilation, recipe display",
      icon: <Utensils className="w-6 h-6" />,
      devices: ["Lights", "Exhaust Fan", "Smart Display"],
      color: "bg-orange-500"
    },
    {
      name: "Cleanup Time",
      description: "Bright lights, dishwasher start, music",
      icon: <Timer className="w-6 h-6" />,
      devices: ["Lights", "Dishwasher", "Audio"],
      color: "bg-blue-500"
    },
    {
      name: "Away Mode",
      description: "All appliances off, leak monitoring active",
      icon: <Shield className="w-6 h-6" />,
      devices: ["All Appliances", "Sensors", "Security"],
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Smart Kitchen Solutions</h1>
                <p className="text-gray-600">Transform your kitchen into a culinary command center</p>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
              Chef's Choice
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
                  Intelligent Kitchen
                  <span className="block text-orange-600">Automation</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the future of cooking with smart appliances, safety systems, and automation that makes every meal preparation effortless and enjoyable.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Smart Appliances", value: "12+" },
                  { label: "Safety Features", value: "8+" },
                  { label: "Energy Savings", value: "40%" },
                  { label: "Recipe Database", value: "1000+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Get Kitchen Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  See Demo
                </Button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
                  alt="Smart Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Status Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <Refrigerator className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Smart Fridge</div>
                    <div className="text-xs text-gray-500">Temp: 38°F</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Microwave className="w-6 h-6 text-orange-500" />
                  <div>
                    <div className="font-semibold text-sm">Smart Oven</div>
                    <div className="text-xs text-gray-500">Preheating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Kitchen Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how intelligent technology transforms every aspect of your kitchen experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature Selector */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {smartFeatures.map((feature) => (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeFeature === feature.id ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-${feature.color}-100 text-${feature.color}-600`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Feature Details */}
            <div className="lg:col-span-2">
              {smartFeatures.map(feature => (
                <div 
                  key={feature.id}
                  className={`transition-all duration-500 ${
                    activeFeature === feature.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute'
                  }`}
                >
                  {activeFeature === feature.id && (
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2">
                          <div className="aspect-video md:aspect-auto">
                            <img 
                              src={feature.image}
                              alt={feature.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-8">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className={`p-3 rounded-lg bg-${feature.color}-100 text-${feature.color}-600`}>
                                {feature.icon}
                              </div>
                              <h4 className="text-2xl font-bold text-gray-900">{feature.name}</h4>
                            </div>
                            
                            <p className="text-gray-600 mb-6">{feature.description}</p>
                            
                            <div className="space-y-3 mb-6">
                              <h5 className="font-semibold text-gray-900">Includes:</h5>
                              {feature.features.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                              Learn More
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
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Kitchen Automation Scenes</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preset automations that make cooking and kitchen management effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationScenes.map((scene, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 card-3d">
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
                  
                  <Button className="w-full" variant="outline">
                    Activate Scene
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Ready for a Smart Kitchen Upgrade?</h3>
            <p className="text-xl text-orange-100 mb-8">
              Transform your cooking experience with intelligent automation and connected appliances
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Get Kitchen Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}