import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertSectionSchema,
  insertSubSectionSchema,
  insertProductSchema,
  insertCategorySchema,
  insertBannerSchema,
  insertContentBlockSchema,
  insertBlogPostSchema,
  insertDemoBookingSchema,
  insertContactInquirySchema,
  insertCartItemSchema,
} from "@shared/schema";

// Middleware to check admin role
const isAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.claims.sub;
  const user = await storage.getUser(userId);
  
  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return res.status(403).json({ message: "Admin access required" });
  }
  
  req.adminUser = user;
  next();
};

// Middleware to check super admin role
const isSuperAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.claims.sub;
  const user = await storage.getUser(userId);
  
  if (!user || user.role !== 'super_admin') {
    return res.status(403).json({ message: "Super admin access required" });
  }
  
  req.adminUser = user;
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public Section routes
  app.get('/api/sections', async (req, res) => {
    try {
      const sections = await storage.getSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching sections:", error);
      res.status(500).json({ message: "Failed to fetch sections" });
    }
  });

  app.get('/api/sections/:slug', async (req, res) => {
    try {
      const section = await storage.getSection(req.params.slug);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json(section);
    } catch (error) {
      console.error("Error fetching section:", error);
      res.status(500).json({ message: "Failed to fetch section" });
    }
  });

  // Public Sub-section routes
  app.get('/api/sub-sections', async (req, res) => {
    try {
      const sectionId = req.query.sectionId ? parseInt(req.query.sectionId as string) : undefined;
      const subSections = await storage.getSubSections(sectionId);
      res.json(subSections);
    } catch (error) {
      console.error("Error fetching sub-sections:", error);
      res.status(500).json({ message: "Failed to fetch sub-sections" });
    }
  });

  app.get('/api/sub-sections/:slug', async (req, res) => {
    try {
      const subSection = await storage.getSubSection(req.params.slug);
      if (!subSection) {
        return res.status(404).json({ message: "Sub-section not found" });
      }
      res.json(subSection);
    } catch (error) {
      console.error("Error fetching sub-section:", error);
      res.status(500).json({ message: "Failed to fetch sub-section" });
    }
  });

  app.get('/api/sections/:sectionSlug/sub-sections', async (req, res) => {
    try {
      const subSections = await storage.getSubSectionsBySection(req.params.sectionSlug);
      res.json(subSections);
    } catch (error) {
      console.error("Error fetching sub-sections:", error);
      res.status(500).json({ message: "Failed to fetch sub-sections" });
    }
  });

  // Public Category routes
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get('/api/categories/:id', async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.get('/api/sub-sections/:subSectionId/categories', async (req, res) => {
    try {
      const subSectionId = parseInt(req.params.subSectionId);
      const categories = await storage.getCategoriesBySubSection(subSectionId);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Public Product routes
  app.get('/api/products', async (req, res) => {
    try {
      const filters = {
        categoryId: req.query.categoryId as string,
        subSectionId: req.query.subSectionId ? parseInt(req.query.subSectionId as string) : undefined,
        featured: req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined,
        inStock: req.query.inStock === 'true' ? true : req.query.inStock === 'false' ? false : undefined,
        search: req.query.search as string,
      };
      
      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters] === undefined) {
          delete filters[key as keyof typeof filters];
        }
      });
      
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Public Banner routes
  app.get('/api/banners', async (req, res) => {
    try {
      const position = req.query.position as string;
      const banners = await storage.getBanners(position);
      res.json(banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ message: "Failed to fetch banners" });
    }
  });

  // Public Content blocks routes
  app.get('/api/content-blocks/:pageSlug', async (req, res) => {
    try {
      const section = req.query.section as string;
      const blocks = await storage.getContentBlocks(req.params.pageSlug, section);
      res.json(blocks);
    } catch (error) {
      console.error("Error fetching content blocks:", error);
      res.status(500).json({ message: "Failed to fetch content blocks" });
    }
  });

  // Public Blog routes
  app.get('/api/blog-posts', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog-posts/:id', async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Demo booking route
  app.post('/api/demo-booking', async (req, res) => {
    try {
      const booking = insertDemoBookingSchema.parse(req.body);
      const newBooking = await storage.createDemoBooking(booking);
      res.status(201).json(newBooking);
    } catch (error: any) {
      console.error("Error creating demo booking:", error);
      res.status(400).json({ message: error.message || "Failed to create demo booking" });
    }
  });

  // Contact inquiry route
  app.post('/api/contact', async (req, res) => {
    try {
      const inquiry = insertContactInquirySchema.parse(req.body);
      const newInquiry = await storage.createContactInquiry(inquiry);
      res.status(201).json(newInquiry);
    } catch (error: any) {
      console.error("Error creating contact inquiry:", error);
      res.status(400).json({ message: error.message || "Failed to create contact inquiry" });
    }
  });

  // Protected Cart routes
  app.get('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const item = insertCartItemSchema.parse({ ...req.body, userId });
      const newItem = await storage.addToCart(item);
      res.status(201).json(newItem);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      res.status(400).json({ message: error.message || "Failed to add to cart" });
    }
  });

  app.put('/api/cart/:id', isAuthenticated, async (req, res) => {
    try {
      const { quantity } = req.body;
      const updatedItem = await storage.updateCartItem(req.params.id, quantity);
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete('/api/cart/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  // Protected Order routes
  app.get('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // ========== ADMIN ROUTES ==========

  // Admin Dashboard
  app.get('/api/admin/dashboard', isAdmin, async (req, res) => {
    try {
      const [sections, products, demoBookings, contactInquiries] = await Promise.all([
        storage.getSections(),
        storage.getProducts(),
        storage.getDemoBookings(),
        storage.getContactInquiries(),
      ]);

      res.json({
        stats: {
          sections: sections.length,
          products: products.length,
          demoBookings: demoBookings.length,
          contactInquiries: contactInquiries.length,
        },
        recentDemoBookings: demoBookings.slice(0, 5),
        recentInquiries: contactInquiries.slice(0, 5),
      });
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Admin Section management
  app.post('/api/admin/sections', isAdmin, async (req, res) => {
    try {
      const section = insertSectionSchema.parse(req.body);
      const newSection = await storage.createSection(section);
      res.status(201).json(newSection);
    } catch (error: any) {
      console.error("Error creating section:", error);
      res.status(400).json({ message: error.message || "Failed to create section" });
    }
  });

  app.put('/api/admin/sections/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const section = insertSectionSchema.partial().parse(req.body);
      const updatedSection = await storage.updateSection(id, section);
      res.json(updatedSection);
    } catch (error: any) {
      console.error("Error updating section:", error);
      res.status(400).json({ message: error.message || "Failed to update section" });
    }
  });

  app.delete('/api/admin/sections/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSection(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting section:", error);
      res.status(500).json({ message: "Failed to delete section" });
    }
  });

  // Admin Sub-section management
  app.post('/api/admin/sub-sections', isAdmin, async (req, res) => {
    try {
      const subSection = insertSubSectionSchema.parse(req.body);
      const newSubSection = await storage.createSubSection(subSection);
      res.status(201).json(newSubSection);
    } catch (error: any) {
      console.error("Error creating sub-section:", error);
      res.status(400).json({ message: error.message || "Failed to create sub-section" });
    }
  });

  app.put('/api/admin/sub-sections/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subSection = insertSubSectionSchema.partial().parse(req.body);
      const updatedSubSection = await storage.updateSubSection(id, subSection);
      res.json(updatedSubSection);
    } catch (error: any) {
      console.error("Error updating sub-section:", error);
      res.status(400).json({ message: error.message || "Failed to update sub-section" });
    }
  });

  app.delete('/api/admin/sub-sections/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSubSection(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting sub-section:", error);
      res.status(500).json({ message: "Failed to delete sub-section" });
    }
  });

  // Admin Product management
  app.post('/api/admin/products', isAdmin, async (req, res) => {
    try {
      const product = insertProductSchema.parse(req.body);
      const newProduct = await storage.createProduct(product);
      res.status(201).json(newProduct);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: error.message || "Failed to create product" });
    }
  });

  app.put('/api/admin/products/:id', isAdmin, async (req, res) => {
    try {
      const product = insertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(req.params.id, product);
      res.json(updatedProduct);
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(400).json({ message: error.message || "Failed to update product" });
    }
  });

  app.delete('/api/admin/products/:id', isAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Admin Category management
  app.post('/api/admin/categories', isAdmin, async (req, res) => {
    try {
      const category = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(category);
      res.status(201).json(newCategory);
    } catch (error: any) {
      console.error("Error creating category:", error);
      res.status(400).json({ message: error.message || "Failed to create category" });
    }
  });

  app.put('/api/admin/categories/:id', isAdmin, async (req, res) => {
    try {
      const category = insertCategorySchema.partial().parse(req.body);
      const updatedCategory = await storage.updateCategory(req.params.id, category);
      res.json(updatedCategory);
    } catch (error: any) {
      console.error("Error updating category:", error);
      res.status(400).json({ message: error.message || "Failed to update category" });
    }
  });

  app.delete('/api/admin/categories/:id', isAdmin, async (req, res) => {
    try {
      await storage.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Admin Banner management
  app.get('/api/admin/banners', isAdmin, async (req, res) => {
    try {
      const banners = await storage.getBanners();
      res.json(banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ message: "Failed to fetch banners" });
    }
  });

  app.post('/api/admin/banners', isAdmin, async (req, res) => {
    try {
      const banner = insertBannerSchema.parse(req.body);
      const newBanner = await storage.createBanner(banner);
      res.status(201).json(newBanner);
    } catch (error: any) {
      console.error("Error creating banner:", error);
      res.status(400).json({ message: error.message || "Failed to create banner" });
    }
  });

  app.put('/api/admin/banners/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const banner = insertBannerSchema.partial().parse(req.body);
      const updatedBanner = await storage.updateBanner(id, banner);
      res.json(updatedBanner);
    } catch (error: any) {
      console.error("Error updating banner:", error);
      res.status(400).json({ message: error.message || "Failed to update banner" });
    }
  });

  app.delete('/api/admin/banners/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBanner(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting banner:", error);
      res.status(500).json({ message: "Failed to delete banner" });
    }
  });

  // Admin Content blocks management
  app.post('/api/admin/content-blocks', isAdmin, async (req, res) => {
    try {
      const block = insertContentBlockSchema.parse(req.body);
      const newBlock = await storage.createContentBlock(block);
      res.status(201).json(newBlock);
    } catch (error: any) {
      console.error("Error creating content block:", error);
      res.status(400).json({ message: error.message || "Failed to create content block" });
    }
  });

  app.put('/api/admin/content-blocks/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const block = insertContentBlockSchema.partial().parse(req.body);
      const updatedBlock = await storage.updateContentBlock(id, block);
      res.json(updatedBlock);
    } catch (error: any) {
      console.error("Error updating content block:", error);
      res.status(400).json({ message: error.message || "Failed to update content block" });
    }
  });

  app.delete('/api/admin/content-blocks/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContentBlock(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting content block:", error);
      res.status(500).json({ message: "Failed to delete content block" });
    }
  });

  // Admin Demo bookings management
  app.get('/api/admin/demo-bookings', isAdmin, async (req, res) => {
    try {
      const bookings = await storage.getDemoBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching demo bookings:", error);
      res.status(500).json({ message: "Failed to fetch demo bookings" });
    }
  });

  app.put('/api/admin/demo-bookings/:id/status', isAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const updatedBooking = await storage.updateDemoBookingStatus(req.params.id, status);
      res.json(updatedBooking);
    } catch (error) {
      console.error("Error updating demo booking status:", error);
      res.status(500).json({ message: "Failed to update demo booking status" });
    }
  });

  // Admin Contact inquiries management
  app.get('/api/admin/contact-inquiries', isAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({ message: "Failed to fetch contact inquiries" });
    }
  });

  app.put('/api/admin/contact-inquiries/:id/status', isAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const updatedInquiry = await storage.updateInquiryStatus(req.params.id, status);
      res.json(updatedInquiry);
    } catch (error) {
      console.error("Error updating contact inquiry status:", error);
      res.status(500).json({ message: "Failed to update contact inquiry status" });
    }
  });

  // Super Admin user management
  app.get('/api/admin/users', isSuperAdmin, async (req, res) => {
    try {
      // This would need a storage method to get all users
      res.json({ message: "User management endpoint" });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put('/api/admin/users/:id/role', isSuperAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      // This would need a storage method to update user role
      res.json({ message: "User role updated", role });
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}