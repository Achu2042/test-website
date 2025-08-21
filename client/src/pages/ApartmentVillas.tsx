import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Building, Home, Car, Shield, Camera, Users, Wifi, Bell, Key, Droplets, TreePine, Phone } from "lucide-react";

export default function ApartmentVillas() {
  const apartmentSolutions = [
    {
      icon: Car,
      title: "Automated Car Parking Systems",
      description: "Smart parking management with automated gates, RFID access, and space monitoring",
      features: ["RFID/Card access", "Automatic gate control", "Parking space detection", "Visitor management"]
    },
    {
      icon: Shield,
      title: "Fire Alarm Systems (FAS)",
      description: "Advanced fire detection and suppression systems for complete building safety",
      features: ["Smoke detection", "Heat sensors", "Automatic sprinklers", "Emergency alerts"]
    },
    {
      icon: Phone,
      title: "Multi Video Door Phone Systems",
      description: "Integrated communication system for building-wide visitor management",
      features: ["Video calling", "Remote door opening", "Visitor recording", "Intercom facility"]
    },
    {
      icon: Key,
      title: "Electronic Access Control",
      description: "Biometric and card-based security systems for restricted area access",
      features: ["Fingerprint scanners", "RFID card access", "Time-based permissions", "Audit trails"]
    },
    {
      icon: Camera,
      title: "CCTV Surveillance",
      description: "Comprehensive surveillance systems for common areas and perimeters",
      features: ["HD cameras", "Night vision", "Motion detection", "Remote monitoring"]
    },
    {
      icon: Users,
      title: "Guard Patrolling Systems",
      description: "Digital patrolling solutions with real-time tracking and reporting",
      features: ["GPS tracking", "Checkpoint monitoring", "Incident reporting", "Shift management"]
    }
  ];

  const villaSolutions = [
    {
      icon: Home,
      title: "Complete Villa Automation",
      description: "End-to-end smart home solutions for luxury villas and independent houses",
      features: ["Whole home control", "Scene management", "Energy monitoring", "Remote access"]
    },
    {
      icon: Droplets,
      title: "Garden & Pool Automation",
      description: "Automated irrigation, lighting, and pool management systems",
      features: ["Smart irrigation", "Pool automation", "Garden lighting", "Weather integration"]
    },
    {
      icon: TreePine,
      title: "Landscape Automation",
      description: "Intelligent outdoor lighting and irrigation for beautiful landscapes",
      features: ["Outdoor lighting", "Sprinkler control", "Weather sensors", "Seasonal scheduling"]
    },
    {
      icon: Shield,
      title: "Perimeter Security",
      description: "Advanced security solutions for villa compound and boundary protection",
      features: ["Boundary sensors", "Motion detectors", "Alarm systems", "24/7 monitoring"]
    }
  ];

  const packages = [
    {
      name: "Basic Apartment Package",
      price: "₹2,50,000",
      features: [
        "Video door phone system",
        "Basic CCTV surveillance",
        "Electronic access control",
        "Fire alarm system",
        "Installation & commissioning"
      ],
      popular: false,
      type: "apartment"
    },
    {
      name: "Premium Apartment Solution",
      price: "₹5,00,000",
      features: [
        "Complete video door phone",
        "Advanced CCTV with analytics",
        "Automated parking system",
        "Comprehensive fire safety",
        "Guard patrolling system",
        "Building management system",
        "2-year warranty"
      ],
      popular: true,
      type: "apartment"
    },
    {
      name: "Luxury Villa Automation",
      price: "₹8,00,000",
      features: [
        "Complete home automation",
        "Advanced security systems",
        "Garden & pool automation",
        "Landscape lighting",
        "Energy management",
        "Voice control integration",
        "Professional maintenance",
        "3-year warranty"
      ],
      popular: false,
      type: "villa"
    }
  ];

  const benefits = [
    {
      icon: Building,
      title: "Enhanced Property Value",
      description: "Smart automation systems significantly increase property value and appeal"
    },
    {
      icon: Shield,
      title: "Improved Security",
      description: "Multi-layered security systems provide comprehensive protection"
    },
    {
      icon: Users,
      title: "Resident Convenience",
      description: "Advanced systems make daily life more convenient and comfortable"
    },
    {
      icon: Wifi,
      title: "Future-Ready Infrastructure",
      description: "Scalable systems that can adapt to future technology advances"
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
                Apartment & Villa Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Comprehensive automation solutions for residential complexes and luxury villas. From basic security to complete smart building management systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-blue-800" data-testid="button-project-quote">
                  <Link href="/contact">Get Project Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="button-site-visit">
                  <Link href="/contact">Schedule Site Visit</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Apartment Complexes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern apartment building with smart automation" 
                className="rounded-2xl shadow-2xl w-full"
                data-testid="img-hero-apartment"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Building className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Smart Complex</div>
                    <div className="text-sm text-gray-600">Fully automated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment Solutions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Apartment Complex Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced automation systems designed specifically for multi-unit residential buildings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartmentSolutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-apartment-solution-${index}`}>
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <solution.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
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

      {/* Villa Solutions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Luxury Villa Automation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium automation solutions for independent houses and luxury villas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {villaSolutions.map((solution, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-villa-solution-${index}`}>
                <CardHeader>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <solution.icon className="w-10 h-10 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Solutions?</h2>
            <p className="text-xl text-gray-600">Benefits of professional building automation systems</p>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Solution Packages</h2>
            <p className="text-xl text-gray-600">Comprehensive packages for different property types</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'} transition-shadow`} data-testid={`card-package-${index}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {pkg.type === 'apartment' ? (
                      <Building className="w-8 h-8 text-primary mr-2" />
                    ) : (
                      <Home className="w-8 h-8 text-green-600 mr-2" />
                    )}
                    <Badge variant="outline" className="text-sm">
                      {pkg.type === 'apartment' ? 'Apartment' : 'Villa'}
                    </Badge>
                  </div>
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
                    <Link href="/contact">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Implementation Process</h2>
            <p className="text-xl text-gray-600">From consultation to completion, we handle everything</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Site Survey</h3>
                <p className="text-gray-600">Detailed assessment of your property and requirements</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">System Design</h3>
                <p className="text-gray-600">Custom solution design based on your specific needs</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation</h3>
                <p className="text-gray-600">Professional installation by certified technicians</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600">Ongoing maintenance and technical support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Upgrade Your Property?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether it's an apartment complex or luxury villa, we have the expertise to deliver exceptional automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-discuss-project">
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-download-brochure">
              <Link href="/contact">Download Brochure</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
