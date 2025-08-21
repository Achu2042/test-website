import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, Sun, CloudRain, Sprout, Camera, Shield, 
  Timer, Home, ArrowLeft, Zap, Star, CheckCircle, 
  ArrowRight, Smartphone, Thermometer, Lightbulb, Activity
} from "lucide-react";

export default function GardenSolutions() {
  const [activeFeature, setActiveFeature] = useState("irrigation");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const smartFeatures = [
    {
      id: "irrigation",
      name: "Smart Irrigation",
      icon: <Droplets className="w-8 h-8" />,
      description: "Intelligent watering system that conserves water while keeping plants healthy",
      features: ["Weather Integration", "Soil Moisture Sensors", "Zone Control", "Water Conservation"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
      color: "blue"
    },
    {
      id: "weather",
      name: "Weather Monitoring",
      icon: <CloudRain className="w-8 h-8" />,
      description: "Real-time weather tracking and predictive gardening recommendations",
      features: ["Weather Station", "Rainfall Tracking", "Wind Monitoring", "Frost Alerts"],
      image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=600",
      color: "gray"
    },
    {
      id: "lighting",
      name: "Garden Lighting",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Beautiful and secure outdoor lighting with smart controls",
      features: ["Path Lighting", "Security Floods", "Accent Lighting", "Motion Detection"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      color: "yellow"
    },
    {
      id: "monitoring",
      name: "Plant Care Monitoring",
      icon: <Sprout className="w-8 h-8" />,
      description: "Advanced sensors that monitor plant health and growing conditions",
      features: ["Soil Analysis", "Nutrient Levels", "Growth Tracking", "Disease Detection"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
      color: "green"
    }
  ];

  const automationScenes = [
    {
      name: "Morning Care",
      description: "Gentle watering, plant health check, weather update",
      icon: <Sun className="w-6 h-6" />,
      devices: ["Sprinklers", "Sensors", "Weather Station", "Cameras"],
      color: "bg-yellow-500"
    },
    {
      name: "Evening Security",
      description: "Security lighting, perimeter monitoring, night mode",
      icon: <Shield className="w-6 h-6" />,
      devices: ["Security Lights", "Cameras", "Motion Sensors", "Alarms"],
      color: "bg-blue-500"
    },
    {
      name: "Rain Detected",
      description: "Stop irrigation, adjust lighting, protect equipment",
      icon: <CloudRain className="w-6 h-6" />,
      devices: ["Irrigation", "Covers", "Lighting", "Electronics"],
      color: "bg-gray-500"
    },
    {
      name: "Garden Party",
      description: "Ambient lighting, music zones, comfortable environment",
      icon: <Star className="w-6 h-6" />,
      devices: ["Accent Lights", "Audio", "Climate", "Water Features"],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-float-delayed"></div>
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
                <h1 className="text-3xl font-bold text-gray-900">Smart Garden Solutions</h1>
                <p className="text-gray-600">Cultivate your outdoor paradise with intelligent automation</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">
              Eco-Friendly
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
                  Smart Garden
                  <span className="block text-green-600">Automation</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your outdoor space into a thriving, sustainable garden with intelligent irrigation, weather monitoring, and plant care automation.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Water Savings", value: "50%" },
                  { label: "Plant Health", value: "+60%" },
                  { label: "Garden Security", value: "24/7" },
                  { label: "Automation Zones", value: "12+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Design Smart Garden
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Garden Assessment
                </Button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"
                  alt="Smart Garden"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Garden Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Soil Moisture</div>
                    <div className="text-xs text-gray-500">Optimal 75%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Soil Temp</div>
                    <div className="text-xs text-gray-500">Perfect 72°F</div>
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Garden Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced automation for sustainable gardening, plant health, and outdoor security
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {smartFeatures.map((feature) => (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeFeature === feature.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'
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
                              <h5 className="font-semibold text-gray-900">Capabilities:</h5>
                              {feature.features.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                              Explore Feature
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Garden Automation Scenes</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent automation that adapts to weather, seasons, and garden needs
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
      <section className="relative z-10 py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Grow Your Smart Garden Paradise</h3>
            <p className="text-xl text-green-100 mb-8">
              Create a sustainable, beautiful, and automated outdoor space that thrives year-round
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Plan My Garden
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Garden Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}