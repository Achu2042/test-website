import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Users, Package, MessageSquare, Calendar, Settings, 
  Plus, Edit, Trash2, Eye, BarChart3, TrendingUp,
  Shield, Globe, Database, FileText, Image,
  ChevronRight, Activity, AlertCircle, CheckCircle
} from "lucide-react";

interface AdminStats {
  sections: number;
  products: number;
  demoBookings: number;
  contactInquiries: number;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Check if user is admin
  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
            <Button onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error)) return false;
      return failureCount < 3;
    }
  });

  const { data: sections = [] } = useQuery({
    queryKey: ["/api/sections"],
  });

  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: demoBookings = [] } = useQuery({
    queryKey: ["/api/admin/demo-bookings"],
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error)) return false;
      return failureCount < 3;
    }
  });

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "sections", label: "Sections", icon: Globe },
    { id: "products", label: "Products", icon: Package },
    { id: "bookings", label: "Demo Bookings", icon: Calendar },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "content", label: "Content", icon: FileText },
    ...(user.role === 'super_admin' ? [{ id: "users", label: "Users", icon: Users }] : []),
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">HEKATE AUTOMATION Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Shield className="w-4 h-4 mr-1" />
                {user.role?.toUpperCase()}
              </Badge>
              <div className="text-right">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        data-testid={`tab-${tab.id}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{tab.label}</span>
                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && <DashboardContent stats={stats} />}
            {activeTab === 'sections' && <SectionsContent sections={sections} />}
            {activeTab === 'products' && <ProductsContent products={products} />}
            {activeTab === 'bookings' && <BookingsContent bookings={demoBookings} />}
            {activeTab === 'content' && <ContentManagement />}
            {activeTab === 'settings' && <SettingsContent />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Content
function DashboardContent({ stats }: { stats?: AdminStats }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sections</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.sections || 0}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">Active sections</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.products || 0}</p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Activity className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600">In catalog</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Demo Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.demoBookings || 0}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-600">Pending</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.contactInquiries || 0}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Activity className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-purple-600">New messages</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="h-20 bg-blue-600 hover:bg-blue-700">
              <div className="text-center">
                <Plus className="w-6 h-6 mx-auto mb-2" />
                <span>Add Section</span>
              </div>
            </Button>
            <Button className="h-20 bg-green-600 hover:bg-green-700">
              <div className="text-center">
                <Package className="w-6 h-6 mx-auto mb-2" />
                <span>Add Product</span>
              </div>
            </Button>
            <Button className="h-20 bg-purple-600 hover:bg-purple-700">
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <span>Manage Content</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sections Content
function SectionsContent({ sections }: { sections: any[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sections Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section: any) => (
            <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                {section.imageUrl && (
                  <img src={section.imageUrl} alt={section.name} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="font-medium">{section.name}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Products Content
function ProductsContent({ products }: { products: any[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Products Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((product: any) => (
            <div key={product.id} className="border rounded-lg p-4">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
              )}
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">₹{product.price}</span>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Bookings Content
function BookingsContent({ bookings }: { bookings: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.slice(0, 10).map((booking: any) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{booking.name}</h3>
                <p className="text-sm text-gray-600">{booking.email} • {booking.phone}</p>
                <p className="text-sm text-gray-500">Service: {booking.service}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">{booking.status}</Badge>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Content Management
function ContentManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Banners</h3>
            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Content Blocks</h3>
            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Content Block
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Settings Content
function SettingsContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Site Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Title</label>
                <Input defaultValue="HEKATE AUTOMATION" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <Input defaultValue="sales@hekateautomation.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <Input defaultValue="+91 96637 54444" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <Input type="color" defaultValue="#3b82f6" className="w-20 h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <Input placeholder="Enter logo URL" />
              </div>
            </div>
          </div>
          
          <Button className="w-full">Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}