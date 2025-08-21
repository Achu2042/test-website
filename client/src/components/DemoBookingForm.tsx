import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";

interface DemoBookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  message?: string;
}

export default function DemoBookingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DemoBookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    message: "",
  });

  const demoBookingMutation = useMutation({
    mutationFn: async (data: DemoBookingFormData) => {
      const payload = {
        ...data,
        preferredDate: data.preferredDate ? new Date(data.preferredDate).toISOString() : undefined,
      };
      await apiRequest("POST", "/api/demo-booking", payload);
    },
    onSuccess: () => {
      toast({
        title: "Demo Booking Submitted",
        description: "We'll contact you soon to schedule your personalized demonstration.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        preferredDate: "",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit demo booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    demoBookingMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof DemoBookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const minDate = new Date().toISOString().split('T')[0]; // Today's date

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-name" className="flex items-center">
            <User className="w-4 h-4 mr-2 text-gray-500" />
            Full Name *
          </Label>
          <Input
            id="demo-name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            data-testid="input-demo-name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-phone" className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            Phone Number *
          </Label>
          <Input
            id="demo-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            data-testid="input-demo-phone"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-email" className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-500" />
          Email Address *
        </Label>
        <Input
          id="demo-email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
          data-testid="input-demo-email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-service" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
            Service Interest *
          </Label>
          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
            <SelectTrigger id="demo-service" data-testid="select-demo-service">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Smart Home Automation">Smart Home Automation</SelectItem>
              <SelectItem value="Smart Home Security">Smart Home Security</SelectItem>
              <SelectItem value="Apartment Solutions">Apartment Solutions</SelectItem>
              <SelectItem value="Villa Solutions">Villa Solutions</SelectItem>
              <SelectItem value="HVAC Control">HVAC Control</SelectItem>
              <SelectItem value="Lighting Control">Lighting Control</SelectItem>
              <SelectItem value="Complete Package">Complete Package</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-date" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            Preferred Date
          </Label>
          <Input
            id="demo-date"
            type="date"
            min={minDate}
            value={formData.preferredDate}
            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
            data-testid="input-demo-date"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-message" className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
          Additional Requirements
        </Label>
        <Textarea
          id="demo-message"
          placeholder="Tell us about your specific requirements, property size, or any questions you have..."
          rows={4}
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          data-testid="textarea-demo-message"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Demo Details:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Duration: 45-60 minutes</li>
              <li>• Format: On-site or virtual presentation</li>
              <li>• Includes: Live product demonstration</li>
              <li>• Free consultation and quotation</li>
            </ul>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-white hover:bg-blue-800"
        disabled={demoBookingMutation.isPending}
        data-testid="button-submit-demo"
      >
        {demoBookingMutation.isPending ? (
          "Submitting..."
        ) : (
          <>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Demo
          </>
        )}
      </Button>

      <p className="text-xs text-gray-600 text-center">
        By submitting this form, you agree to be contacted by our team regarding your demo request.
      </p>
    </form>
  );
}
