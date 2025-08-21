import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Home, Lightbulb, Thermometer, Volume2, Tv, Shield, Smartphone, Wifi, Zap, Clock } from "lucide-react";

export default function SmartHomeAutomation() {
  const features = [
    {
      icon: Lightbulb,
      title: "Lighting Control & Automation",
      description: "Smart switches, dimmers, and automated lighting schedules for every room",
      benefits: ["Energy savings up to 30%", "Voice control compatibility", "Remote access", "Mood lighting scenes"]
    },
    {
      icon: Thermometer,
      title: "HVAC Control Systems",
      description: "Climate control with intelligent temperature management and energy optimization",
      benefits: ["Automatic temperature adjustment", "Zone-based control", "Energy monitoring", "Smart scheduling"]
    },
    {
      icon: Volume2,
      title: "Distributed Audio/Video",
      description: "Multi-room audio and video distribution with centralized control",
      benefits: ["Whole-home entertainment", "Synchronized playback", "Individual room control", "High-quality streaming"]
    },
    {
      icon: Tv,
      title: "TV/Home Theater Integration",
      description: "Seamless integration of entertainment systems with smart controls",
      benefits: ["One-touch operation", "Universal remote control", "Automated scenes", "Voice commands"]
    },
    {
      icon: Shield,
      title: "Security & Surveillance",
      description: "Comprehensive security systems with smart monitoring and alerts",
      benefits: ["24/7 monitoring", "Mobile alerts", "Video recording", "Access control"]
    },
    {
      icon: Home,
      title: "Motorized Curtains & Blinds",
      description: "Automated window treatments with schedule and sensor integration",
      benefits: ["Privacy control", "Energy efficiency", "Sunlight optimization", "Timer-based operation"]
    }
  ];

  const packages = [
    {
      name: "Basic Smart Home",
      price: "₹75,000",
      features: [
        "Smart lighting (5 rooms)",
        "Basic security system",
        "Mobile app control",
        "Voice assistant integration",
        "Basic installation"
      ],
      popular: false
    },
    {
      name: "Premium Automation",
      price: "₹1,50,000",
      features: [
        "Complete home lighting",
        "HVAC automation",
        "Security & surveillance",
        "Entertainment integration",
        "Professional installation",
        "1-year warranty"
      ],
      popular: true
    },
    {
      name: "Luxury Smart Villa",
      price: "₹3,00,000",
      features: [
        "Full home automation",
        "Advanced security systems",
        "Multi-zone audio/video",
        "Motorized curtains",
        "Garden automation",
        "Smart pool control",
        "Dedicated support",
        "3-year warranty"
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Energy Efficiency",
      description: "Save up to 40% on electricity bills with intelligent automation"
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Advanced monitoring and alert systems for complete peace of mind"
    },
    {
      icon: Smartphone,
      title: "Remote Control",
      description: "Control your entire home from anywhere in the world"
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Automated routines save hours of manual operations every week"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
                Smart Home Automation Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your home into an intelligent living space with our comprehensive automation solutions. Experience the perfect blend of comfort, security, and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-blue-800" data-testid="button-get-quote">
                  <Link href="/contact">Get Free Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="button-view-products">
                  <Link href="/products">View Products</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600">Homes Automated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Smart home automation setup" 
                className="rounded-2xl shadow-2xl w-full"
                data-testid="img-hero"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Wifi className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Connected Home</div>
                    <div className="text-sm text-gray-600">All devices synchronized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Automation Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our smart home solutions cover every aspect of modern living
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Smart Home Automation?</h2>
            <p className="text-xl text-gray-600">Experience the advantages of intelligent living</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-benefit-${index}`}>
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Home Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect automation solution for your home</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'} transition-shadow`} data-testid={`card-package-${index}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4" data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </div>
                  <p className="text-gray-600">Starting from</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full ${pkg.popular ? 'bg-primary text-white hover:bg-blue-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                    data-testid={`button-choose-package-${index}`}
                  >
                    <Link href="/contact">Choose Package</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Advanced Technology Integration</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our smart home systems use cutting-edge technology for seamless integration and reliable performance.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wifi className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Wireless & Wired Networks</h3>
                    <p className="text-gray-600">Reliable communication protocols including WiFi, Zigbee, and Z-Wave</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Control Integration</h3>
                    <p className="text-gray-600">Compatible with Amazon Alexa, Google Home, and Apple Siri</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="text-purple-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">IoT & Cloud Integration</h3>
                    <p className="text-gray-600">Secure cloud connectivity for remote access and monitoring</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Smart home technology" 
                className="rounded-2xl shadow-xl w-full"
                data-testid="img-technology"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Automate Your Home?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their homes with our smart automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-schedule-demo">
              <Link href="/contact">Schedule Free Demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-call-expert">
              <Link href="/contact">Call Our Experts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
