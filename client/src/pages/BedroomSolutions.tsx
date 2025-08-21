import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, Sun, Thermometer, Volume2, Lightbulb, 
  Bed, Clock, Home, ArrowLeft, Shield, Star,
  CheckCircle, ArrowRight, Timer, Smartphone,
  Heart, Activity, Wind, Eye
} from "lucide-react";

export default function BedroomSolutions() {
  const [activeFeature, setActiveFeature] = useState("sleep");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const smartFeatures = [
    {
      id: "sleep",
      name: "Sleep Tracking",
      icon: <Bed className="w-8 h-8" />,
      description: "Advanced sleep monitoring and optimization for better rest",
      features: ["Sleep Cycle Analysis", "Heart Rate Monitoring", "Smart Alarm", "Sleep Score"],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
      color: "purple"
    },
    {
      id: "blinds",
      name: "Automated Blinds",
      icon: <Sun className="w-8 h-8" />,
      description: "Smart window treatments that adapt to natural light and privacy needs",
      features: ["Sunrise Simulation", "Privacy Control", "Energy Efficiency", "Voice Control"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
      color: "blue"
    },
    {
      id: "climate",
      name: "Climate Control",
      icon: <Thermometer className="w-8 h-8" />,
      description: "Personalized temperature and air quality management for optimal sleep",
      features: ["Sleep Temperature", "Air Purification", "Humidity Control", "Quiet Operation"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
      color: "green"
    },
    {
      id: "lighting",
      name: "Circadian Lighting",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Lighting that supports your natural sleep-wake cycle",
      features: ["Color Temperature", "Gradual Dimming", "Wake-up Light", "Reading Mode"],
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
      color: "yellow"
    }
  ];

  const automationScenes = [
    {
      name: "Good Night",
      description: "Dims lights, lowers temperature, closes blinds",
      icon: <Moon className="w-6 h-6" />,
      devices: ["Lights", "Thermostat", "Blinds", "Security"],
      color: "bg-indigo-500"
    },
    {
      name: "Wake Up",
      description: "Gradual lighting, gentle temperature, open blinds",
      icon: <Sun className="w-6 h-6" />,
      devices: ["Lights", "Blinds", "Thermostat", "Audio"],
      color: "bg-yellow-500"
    },
    {
      name: "Reading Mode",
      description: "Focused lighting, comfortable temperature",
      icon: <Eye className="w-6 h-6" />,
      devices: ["Lights", "Climate", "Blinds"],
      color: "bg-amber-500"
    },
    {
      name: "Meditation",
      description: "Calming ambiance, white noise, optimal air",
      icon: <Heart className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Air Purifier"],
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-float-delayed"></div>
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
                <h1 className="text-3xl font-bold text-gray-900">Smart Bedroom Solutions</h1>
                <p className="text-gray-600">Create the perfect sanctuary for rest and relaxation</p>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
              Sleep Optimized
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
                  Smart Bedroom
                  <span className="block text-purple-600">Sleep Sanctuary</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience deeper, more restorative sleep with intelligent automation that creates the perfect environment for rest, relaxation, and rejuvenation.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Sleep Quality", value: "+40%" },
                  { label: "Energy Savings", value: "25%" },
                  { label: "Wake Comfort", value: "95%" },
                  { label: "Smart Features", value: "15+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Design My Bedroom
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Sleep Assessment
                </Button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
                  alt="Smart Bedroom"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Sleep Stats Overlay */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-semibold text-sm">Sleep Score</div>
                    <div className="text-xs text-gray-500">92/100</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-6 h-6 text-blue-500" />
                  <div>
                    <div className="font-semibold text-sm">Sleep Temp</div>
                    <div className="text-xs text-gray-500">68°F</div>
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Sleep Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology that monitors, adapts, and optimizes your sleep environment
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
                      activeFeature === feature.id ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
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
                              <h5 className="font-semibold text-gray-900">Benefits:</h5>
                              {feature.features.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Sleep Automation Scenes</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personalized automation routines for every moment of your sleep cycle
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
      <section className="relative z-10 py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Transform Your Sleep Experience</h3>
            <p className="text-xl text-purple-100 mb-8">
              Discover how smart bedroom automation can improve your sleep quality and overall well-being
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Start Sleep Analysis
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Sleep Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}