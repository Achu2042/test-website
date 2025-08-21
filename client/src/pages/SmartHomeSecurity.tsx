import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Shield, Camera, Lock, Bell, Smartphone, Eye, Siren, Users, Clock, Zap, CheckCircle } from "lucide-react";

export default function SmartHomeSecurity() {
  const securityFeatures = [
    {
      icon: Camera,
      title: "4K Security Cameras",
      description: "High-resolution surveillance with night vision and motion detection",
      benefits: ["Ultra HD video quality", "Night vision capability", "Motion alerts", "Cloud storage"]
    },
    {
      icon: Lock,
      title: "Smart Door Locks",
      description: "Biometric and app-controlled access systems for maximum security",
      benefits: ["Fingerprint recognition", "Remote access control", "Guest access codes", "Auto-lock features"]
    },
    {
      icon: Bell,
      title: "Intrusion Detection",
      description: "Advanced sensors for door/window monitoring and perimeter security",
      benefits: ["Instant alerts", "Multiple sensor types", "Pet-immune detection", "Bypass options"]
    },
    {
      icon: Siren,
      title: "Alarm Systems",
      description: "Multi-zone alarm systems with local and remote monitoring",
      benefits: ["Loud deterrent alarms", "Silent panic alerts", "Emergency contacts", "Professional monitoring"]
    },
    {
      icon: Eye,
      title: "Video Doorbell",
      description: "Smart doorbell with video calling and visitor identification",
      benefits: ["Two-way communication", "Visitor recording", "Package detection", "Mobile notifications"]
    },
    {
      icon: Smartphone,
      title: "Mobile Integration",
      description: "Complete control and monitoring through dedicated mobile apps",
      benefits: ["Real-time alerts", "Live video streaming", "Remote arming/disarming", "Activity history"]
    }
  ];

  const securityPackages = [
    {
      name: "Basic Security",
      price: "₹45,000",
      features: [
        "4 security cameras",
        "Smart door lock",
        "Basic alarm system",
        "Mobile app access",
        "Professional installation"
      ],
      popular: false
    },
    {
      name: "Advanced Security",
      price: "₹85,000",
      features: [
        "8 HD security cameras",
        "Multiple smart locks",
        "Intrusion detection system",
        "Video doorbell",
        "24/7 monitoring",
        "Mobile alerts",
        "1-year warranty"
      ],
      popular: true
    },
    {
      name: "Premium Security",
      price: "₹1,50,000",
      features: [
        "16 4K security cameras",
        "Biometric access control",
        "Perimeter security",
        "AI-powered detection",
        "Professional monitoring",
        "Emergency response",
        "Smart home integration",
        "3-year warranty"
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "24/7 Protection",
      description: "Round-the-clock monitoring and instant alerts for complete peace of mind"
    },
    {
      icon: Smartphone,
      title: "Remote Monitoring",
      description: "Monitor your home from anywhere in the world with live video feeds"
    },
    {
      icon: Users,
      title: "Family Safety",
      description: "Advanced features to keep your family safe and secure at all times"
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "Immediate notifications for any security events or suspicious activities"
    }
  ];

  const securityTypes = [
    {
      title: "Residential Security",
      description: "Comprehensive security solutions for homes and apartments",
      features: ["Perimeter protection", "Indoor monitoring", "Access control", "Emergency response"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Villa Security",
      description: "Advanced security systems for large properties and villas",
      features: ["Compound security", "Multiple zones", "Guest management", "Landscape monitoring"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Apartment Security",
      description: "Specialized security solutions for apartment complexes",
      features: ["Common area monitoring", "Visitor management", "Parking security", "Intercom systems"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
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
                Smart Home Security Systems
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Protect your home and family with our advanced security solutions. From smart cameras to intelligent access control, we provide comprehensive protection you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-blue-800" data-testid="button-security-quote">
                  <Link href="/contact">Get Security Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="button-view-cameras">
                  <Link href="/products">View Security Products</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-gray-600">Homes Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-gray-600">Monitoring</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Smart security camera system" 
                className="rounded-2xl shadow-2xl w-full"
                data-testid="img-hero-security"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <Shield className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Active Protection</div>
                    <div className="text-sm text-gray-600">All systems operational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Security Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art security technology to protect what matters most
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-security-feature-${index}`}>
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
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

      {/* Security Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Solutions by Property Type</h2>
            <p className="text-xl text-gray-600">Customized security systems for different property types</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {securityTypes.map((type, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-security-type-${index}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    data-testid={`img-security-type-${index}`}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Security Systems?</h2>
            <p className="text-xl text-gray-600">Advanced protection with modern convenience</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-security-benefit-${index}`}>
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* Security Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Packages</h2>
            <p className="text-xl text-gray-600">Choose the right level of protection for your property</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {securityPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-red-500 shadow-lg' : 'hover:shadow-lg'} transition-shadow`} data-testid={`card-security-package-${index}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4" data-testid={`text-security-package-price-${index}`}>
                    {pkg.price}
                  </div>
                  <p className="text-gray-600">Starting from</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full ${pkg.popular ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                    data-testid={`button-choose-security-package-${index}`}
                  >
                    <Link href="/contact">Choose Package</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Professional Monitoring Services</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our certified security professionals monitor your property 24/7, ensuring immediate response to any security events.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Monitoring</h3>
                    <p className="text-gray-600">Round-the-clock professional monitoring by certified security experts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Alerts</h3>
                    <p className="text-gray-600">Immediate notifications via SMS, email, and mobile app</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Response</h3>
                    <p className="text-gray-600">Direct coordination with local authorities and emergency services</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Security monitoring center" 
                className="rounded-2xl shadow-xl w-full"
                data-testid="img-monitoring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Secure Your Home Today</h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Don't wait for a security incident. Protect your family and property with our comprehensive security solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100" data-testid="button-free-assessment">
              <Link href="/contact">Free Security Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600" data-testid="button-emergency-support">
              <Link href="/contact">24/7 Emergency Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
