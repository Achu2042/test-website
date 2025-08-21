import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, Lightbulb, Volume2, Wind, Brain, Timer, 
  Home, ArrowLeft, Zap, Star, CheckCircle, ArrowRight, 
  Coffee, Smartphone, TrendingUp, Activity, Focus
} from "lucide-react";

export default function HomeOfficeSolutions() {
  const [activeFeature, setActiveFeature] = useState("lighting");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const smartFeatures = [
    {
      id: "lighting",
      name: "Focus Lighting",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Adaptive lighting that reduces eye strain and boosts productivity",
      features: ["Circadian Lighting", "Blue Light Control", "Task Illumination", "Eye Strain Reduction"],
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      color: "yellow"
    },
    {
      id: "audio",
      name: "Noise Control",
      icon: <Volume2 className="w-8 h-8" />,
      description: "Active noise cancellation and focus-enhancing audio environments",
      features: ["White Noise", "Nature Sounds", "Focus Music", "Call Enhancement"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      color: "purple"
    },
    {
      id: "air",
      name: "Air Quality",
      icon: <Wind className="w-8 h-8" />,
      description: "Clean air and optimal humidity for mental clarity and health",
      features: ["Air Purification", "Humidity Control", "CO2 Monitoring", "Allergen Removal"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
      color: "green"
    },
    {
      id: "productivity",
      name: "Productivity Modes",
      icon: <Brain className="w-8 h-8" />,
      description: "Intelligent automation that adapts to your work patterns and schedule",
      features: ["Focus Sessions", "Break Reminders", "Meeting Modes", "Energy Tracking"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
      color: "blue"
    }
  ];

  const automationScenes = [
    {
      name: "Deep Focus",
      description: "Optimal lighting, white noise, perfect air quality",
      icon: <Focus className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Air Purifier", "Climate"],
      color: "bg-blue-500"
    },
    {
      name: "Video Call",
      description: "Perfect lighting, noise cancellation, professional setup",
      icon: <Monitor className="w-6 h-6" />,
      devices: ["Camera Lights", "Audio", "Background", "Climate"],
      color: "bg-green-500"
    },
    {
      name: "Break Time",
      description: "Relaxing ambiance, gentle music, fresh air circulation",
      icon: <Coffee className="w-6 h-6" />,
      devices: ["Lights", "Audio", "Air Circulation", "Smart Plugs"],
      color: "bg-orange-500"
    },
    {
      name: "End Workday",
      description: "Shutdown routine, save work, optimize for evening",
      icon: <Timer className="w-6 h-6" />,
      devices: ["All Devices", "Security", "Climate", "Lighting"],
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
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
                <h1 className="text-3xl font-bold text-gray-900">Smart Home Office Solutions</h1>
                <p className="text-gray-600">Optimize your productivity with intelligent automation</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              Productivity Boost
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
                  Smart Home Office
                  <span className="block text-blue-600">Productivity Hub</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create the ultimate work environment with intelligent lighting, air quality control, and productivity-focused automation that adapts to your work style.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Productivity Boost", value: "+45%" },
                  { label: "Focus Time", value: "8hrs" },
                  { label: "Energy Savings", value: "30%" },
                  { label: "Health Benefits", value: "100%" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Optimize My Office
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Productivity Analysis
                </Button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
                  alt="Smart Home Office"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Productivity Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Productivity</div>
                    <div className="text-xs text-gray-500">+32% Today</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Air Quality</div>
                    <div className="text-xs text-gray-500">Excellent</div>
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Productivity Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced automation designed to maximize focus, comfort, and work efficiency
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {smartFeatures.map((feature) => (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeFeature === feature.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
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
                              <h5 className="font-semibold text-gray-900">Benefits:</h5>
                              {feature.features.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Work Mode Automation</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent scenes that adapt your office environment for different work activities
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
                    Activate Mode
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Boost Your Work Performance</h3>
            <p className="text-xl text-blue-100 mb-8">
              Create the perfect work environment with smart automation tailored for productivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Optimize My Workspace
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Office Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}