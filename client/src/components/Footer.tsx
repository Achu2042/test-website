import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-6">HEKATE AUTOMATION</div>
            <p className="text-gray-400 mb-6">
              Leading home automation company providing smart solutions for modern homes and buildings.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/smart-home-automation" className="hover:text-white transition-colors" data-testid="link-footer-automation">
                  Smart Home Automation
                </Link>
              </li>
              <li>
                <Link href="/smart-home-security" className="hover:text-white transition-colors" data-testid="link-footer-security">
                  Smart Security Systems
                </Link>
              </li>
              <li>
                <Link href="/apartment-villas" className="hover:text-white transition-colors" data-testid="link-footer-apartments">
                  Apartment Solutions
                </Link>
              </li>
              <li>
                <Link href="/apartment-villas" className="hover:text-white transition-colors" data-testid="link-footer-villas">
                  Villa Automation
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">HVAC Control</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Lighting Control</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors" data-testid="link-footer-switches">
                  Smart Switches
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors" data-testid="link-footer-cameras">
                  Security Cameras
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors" data-testid="link-footer-locks">
                  Door Locks
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors" data-testid="link-footer-thermostats">
                  Thermostats
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors" data-testid="link-footer-sensors">
                  Sensors
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors" data-testid="link-footer-controllers">
                  Controllers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  EBSL, No. 2452 & 2453, 1st & 2nd Floor,<br />
                  9 Main, 17 E Cross, BSK 2 Stage,<br />
                  Bengaluru 560070
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span data-testid="text-footer-phone">+91 96637 54444</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span data-testid="text-footer-email">sales@hekateautomation.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 HEKATE AUTOMATION. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
