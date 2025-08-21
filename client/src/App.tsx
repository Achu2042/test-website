import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import CompleteHomeLanding from "@/pages/CompleteHomeLanding";
import Home from "@/pages/Home";
import SmartHomeAutomation from "@/pages/SmartHomeAutomation";
import SmartHomeSecurity from "@/pages/SmartHomeSecurity";
import ApartmentVillas from "@/pages/ApartmentVillas";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import SubSectionDetail from "@/pages/SubSectionDetail";
import AdminPanel from "@/pages/AdminPanel";
import LivingRoomSolutions from "@/pages/LivingRoomSolutions";
import KitchenSolutions from "@/pages/KitchenSolutions";
import BedroomSolutions from "@/pages/BedroomSolutions";
import BathroomSolutions from "@/pages/BathroomSolutions";
import HomeOfficeSolutions from "@/pages/HomeOfficeSolutions";
import GardenSolutions from "@/pages/GardenSolutions";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={CompleteHomeLanding} />
          <Route path="/smart-home-automation" component={() => <Layout><SmartHomeAutomation /></Layout>} />
          <Route path="/smart-home-security" component={() => <Layout><SmartHomeSecurity /></Layout>} />
          <Route path="/apartment-villas" component={() => <Layout><ApartmentVillas /></Layout>} />
          <Route path="/products" component={() => <Layout><Products /></Layout>} />
          <Route path="/products/:id" component={() => <Layout><ProductDetail /></Layout>} />
          <Route path="/sections/:sectionSlug/:subSectionSlug" component={() => <Layout><SubSectionDetail /></Layout>} />
          <Route path="/living-room" component={() => <Layout><LivingRoomSolutions /></Layout>} />
          <Route path="/kitchen" component={() => <Layout><KitchenSolutions /></Layout>} />
          <Route path="/bedroom" component={() => <Layout><BedroomSolutions /></Layout>} />
          <Route path="/bathroom" component={() => <Layout><BathroomSolutions /></Layout>} />
          <Route path="/home-office" component={() => <Layout><HomeOfficeSolutions /></Layout>} />
          <Route path="/garden" component={() => <Layout><GardenSolutions /></Layout>} />
          <Route path="/blog" component={() => <Layout><Blog /></Layout>} />
          <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
        </>
      ) : (
        <>
          <Route path="/" component={() => <Layout><Home /></Layout>} />
          <Route path="/smart-home-automation" component={() => <Layout><SmartHomeAutomation /></Layout>} />
          <Route path="/smart-home-security" component={() => <Layout><SmartHomeSecurity /></Layout>} />
          <Route path="/apartment-villas" component={() => <Layout><ApartmentVillas /></Layout>} />
          <Route path="/products" component={() => <Layout><Products /></Layout>} />
          <Route path="/products/:id" component={() => <Layout><ProductDetail /></Layout>} />
          <Route path="/sections/:sectionSlug/:subSectionSlug" component={() => <Layout><SubSectionDetail /></Layout>} />
          <Route path="/living-room" component={() => <Layout><LivingRoomSolutions /></Layout>} />
          <Route path="/kitchen" component={() => <Layout><KitchenSolutions /></Layout>} />
          <Route path="/bedroom" component={() => <Layout><BedroomSolutions /></Layout>} />
          <Route path="/bathroom" component={() => <Layout><BathroomSolutions /></Layout>} />
          <Route path="/home-office" component={() => <Layout><HomeOfficeSolutions /></Layout>} />
          <Route path="/garden" component={() => <Layout><GardenSolutions /></Layout>} />
          <Route path="/blog" component={() => <Layout><Blog /></Layout>} />
          <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
          <Route path="/cart" component={() => <Layout><Cart /></Layout>} />
          <Route path="/profile" component={() => <Layout><Profile /></Layout>} />
          <Route path="/admin" component={AdminPanel} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
