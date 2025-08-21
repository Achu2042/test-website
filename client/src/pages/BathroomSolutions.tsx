import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, Monitor, Thermometer, Wind, AlertTriangle,
  Timer, Home, ArrowLeft, Shield, Star, CheckCircle, 
  ArrowRight, Smartphone, Lightbulb, Bath, Gauge
} from "lucide-react";

export default function BathroomSolutions() {
  const [activeFeature, setActiveFeature] = useState("mirrors");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const smartFeatures = [
    {
      id: "mirrors",
      name: "Smart Mirrors",
      icon: <Monitor className="w-8 h-8" />,
      description: "Interactive mirrors with weather, news, and health monitoring",
      features: ["Touch Display", "Health Metrics", "Weather Updates", "Voice Commands"],
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600",
      color: "blue"
    },
    {
      id: "water",
      name: "Digital Water Control",
      icon: <Droplets className="w-8 h-8" />,
      description: "Precise temperature control and water conservation features",
      features: ["Temperature Presets", "Water Usage Tracking", "Auto Shutoff", "Child Safety"],
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      color: "cyan"
    },
    {
      id: "climate",
      name: "Climate & Ventilation",
      icon: <Wind className="w-8 h-8" />,
      description: "Humidity control and air quality management for comfort",
      features: ["Humidity Control", "Auto Ventilation", "Air Quality Monitor", "Fog Prevention"],
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
      color: "green"
    },
    {
      id: "safety",
      name: "Leak Detection",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Advanced water leak detection and flood prevention",
      features: ["Flood Sensors", "Automatic Shutoff", "Mobile Alerts", "Damage Prevention"],
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      color: "red"
    }
  ];

  const automationScenes = [
    {
      name: "Morning Routine",
      description: "Warm lights, mirror display, optimal temperature",
      icon: <Lightbulb className="w-6 h-6" />,
      devices: ["Mirror", "Lights", "Water Heater", "Ventilation"],
      color: "bg-yellow-500"
    },
    {
      name: "Shower Time",
      description: "Perfect water temp, steam control, music",
      icon: <Bath className="w-6 h-6" />,
      devices: ["Digital Faucet", "Ventilation", "Audio", "Lighting"],
      color: "bg-blue-500"
    },
    {
      name: "Spa Mode",
      description: "Relaxing ambiance, aromatherapy, bath filling",
      icon: <Star className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Aromatherapy", "Bath Controls"],
      color: "bg-purple-500"
    },
    {
      name: "Away Mode",
      description: "Water monitoring, safety checks, energy saving",
      icon: <Shield className="w-6 h-6" />,
      devices: ["Leak Sensors", "Water Shutoff", "Security", "Climate"],
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-float-delayed"></div>
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
                <h1 className="text-3xl font-bold text-gray-900">Smart Bathroom Solutions</h1>
                <p className="text-gray-600">Luxury, safety, and wellness in your personal spa</p>
              </div>
            </div>
            <Badge className="bg-cyan-100 text-cyan-800 px-4 py-2">
              Spa Experience
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
                  Smart Bathroom
                  <span className="block text-cyan-600">Wellness Center</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your bathroom into a luxury spa with intelligent mirrors, precision water control, and advanced safety features for the ultimate wellness experience.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Water Savings", value: "35%" },
                  { label: "Safety Features", value: "10+" },
                  { label: "Comfort Level", value: "100%" },
                  { label: "Smart Devices", value: "8+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-2xl font-bold text-cyan-600">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                  Design Spa Bathroom
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Safety Assessment
                </Button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800"
                  alt="Smart Bathroom"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Status Overlays */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-6 h-6 text-cyan-600" />
                  <div>
                    <div className="font-semibold text-sm">Water Temp</div>
                    <div className="text-xs text-gray-500">Perfect 98°F</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Humidity</div>
                    <div className="text-xs text-gray-500">Optimal 45%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Same structure as other room pages */}
      <section className="relative z-10 py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Smart Bathroom Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology for luxury, safety, and wellness in your personal bathroom space
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {smartFeatures.map((feature) => (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeFeature === feature.id ? 'ring-2 ring-cyan-500 bg-cyan-50' : 'hover:bg-gray-50'
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
                              <h5 className="font-semibold text-gray-900">Features:</h5>
                              {feature.features.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Bathroom Automation</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personalized routines for comfort, safety, and luxury in your bathroom
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
      <section className="relative z-10 py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Create Your Smart Spa Experience</h3>
            <p className="text-xl text-cyan-100 mb-8">
              Transform your bathroom into a luxury wellness center with intelligent automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50">
                Design My Spa
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