import {
  users,
  sections,
  subSections,
  categories,
  products,
  banners,
  contentBlocks,
  blogPosts,
  demoBookings,
  contactInquiries,
  cartItems,
  orders,
  orderItems,
  type User,
  type UpsertUser,
  type Section,
  type InsertSection,
  type SubSection,
  type InsertSubSection,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type Banner,
  type InsertBanner,
  type ContentBlock,
  type InsertContentBlock,
  type BlogPost,
  type InsertBlogPost,
  type DemoBooking,
  type InsertDemoBooking,
  type ContactInquiry,
  type InsertContactInquiry,
  type CartItem,
  type InsertCartItem,
  type Order,
  type OrderItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Section operations
  getSections(): Promise<Section[]>;
  getSection(slug: string): Promise<Section | undefined>;
  createSection(section: InsertSection): Promise<Section>;
  updateSection(id: number, section: Partial<InsertSection>): Promise<Section>;
  deleteSection(id: number): Promise<void>;
  
  // Sub-section operations
  getSubSections(sectionId?: number): Promise<SubSection[]>;
  getSubSection(slug: string): Promise<SubSection | undefined>;
  getSubSectionsBySection(sectionSlug: string): Promise<SubSection[]>;
  createSubSection(subSection: InsertSubSection): Promise<SubSection>;
  updateSubSection(id: number, subSection: Partial<InsertSubSection>): Promise<SubSection>;
  deleteSubSection(id: number): Promise<void>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoriesBySubSection(subSectionId: number): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  
  // Product operations
  getProducts(filters?: {
    categoryId?: string;
    subSectionId?: number;
    featured?: boolean;
    inStock?: boolean;
    search?: string;
  }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Banner operations
  getBanners(position?: string): Promise<Banner[]>;
  getBanner(id: number): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner>;
  deleteBanner(id: number): Promise<void>;
  
  // Content block operations
  getContentBlocks(pageSlug: string, section?: string): Promise<ContentBlock[]>;
  getContentBlock(id: number): Promise<ContentBlock | undefined>;
  createContentBlock(block: InsertContentBlock): Promise<ContentBlock>;
  updateContentBlock(id: number, block: Partial<InsertContentBlock>): Promise<ContentBlock>;
  deleteContentBlock(id: number): Promise<void>;
  
  // Blog operations
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  
  // Demo booking operations
  getDemoBookings(): Promise<DemoBooking[]>;
  getDemoBooking(id: string): Promise<DemoBooking | undefined>;
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  updateDemoBookingStatus(id: string, status: string): Promise<DemoBooking>;
  
  // Contact inquiry operations
  getContactInquiries(): Promise<ContactInquiry[]>;
  getContactInquiry(id: string): Promise<ContactInquiry | undefined>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  updateInquiryStatus(id: string, status: string): Promise<ContactInquiry>;
  
  // Cart operations
  getCartItems(userId: string): Promise<CartItem[]>;
  getCartItem(id: string): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem>;
  removeFromCart(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
  
  // Order operations
  getOrders(userId?: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: any): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Section operations
  async getSections(): Promise<Section[]> {
    return await db.select().from(sections).where(eq(sections.isActive, true)).orderBy(sections.sortOrder);
  }
  
  async getSection(slug: string): Promise<Section | undefined> {
    const [section] = await db.select().from(sections).where(and(eq(sections.slug, slug), eq(sections.isActive, true)));
    return section;
  }
  
  async createSection(section: InsertSection): Promise<Section> {
    const [newSection] = await db.insert(sections).values(section).returning();
    return newSection;
  }
  
  async updateSection(id: number, section: Partial<InsertSection>): Promise<Section> {
    const [updatedSection] = await db
      .update(sections)
      .set({ ...section, updatedAt: new Date() })
      .where(eq(sections.id, id))
      .returning();
    return updatedSection;
  }
  
  async deleteSection(id: number): Promise<void> {
    await db.update(sections).set({ isActive: false }).where(eq(sections.id, id));
  }
  
  // Sub-section operations
  async getSubSections(sectionId?: number): Promise<SubSection[]> {
    if (sectionId) {
      return await db
        .select()
        .from(subSections)
        .where(and(eq(subSections.sectionId, sectionId), eq(subSections.isActive, true)))
        .orderBy(subSections.sortOrder);
    } else {
      return await db
        .select()
        .from(subSections)
        .where(eq(subSections.isActive, true))
        .orderBy(subSections.sortOrder);
    }
  }
  
  async getSubSection(slug: string): Promise<SubSection | undefined> {
    const [subSection] = await db.select().from(subSections).where(and(eq(subSections.slug, slug), eq(subSections.isActive, true)));
    return subSection;
  }
  
  async getSubSectionsBySection(sectionSlug: string): Promise<SubSection[]> {
    const section = await this.getSection(sectionSlug);
    if (!section) return [];
    
    return await db
      .select()
      .from(subSections)
      .where(and(eq(subSections.sectionId, section.id), eq(subSections.isActive, true)))
      .orderBy(subSections.sortOrder);
  }
  
  async createSubSection(subSection: InsertSubSection): Promise<SubSection> {
    const [newSubSection] = await db.insert(subSections).values(subSection).returning();
    return newSubSection;
  }
  
  async updateSubSection(id: number, subSection: Partial<InsertSubSection>): Promise<SubSection> {
    const [updatedSubSection] = await db
      .update(subSections)
      .set({ ...subSection, updatedAt: new Date() })
      .where(eq(subSections.id, id))
      .returning();
    return updatedSubSection;
  }
  
  async deleteSubSection(id: number): Promise<void> {
    await db.update(subSections).set({ isActive: false }).where(eq(subSections.id, id));
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(categories.sortOrder);
  }
  
  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }
  
  async getCategoriesBySubSection(subSectionId: number): Promise<Category[]> {
    return await db
      .select()
      .from(categories)
      .where(and(eq(categories.subSectionId, subSectionId), eq(categories.isActive, true)))
      .orderBy(categories.sortOrder);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }
  
  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category> {
    const [updatedCategory] = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory;
  }
  
  async deleteCategory(id: string): Promise<void> {
    await db.update(categories).set({ isActive: false }).where(eq(categories.id, id));
  }
  
  // Product operations
  async getProducts(filters?: {
    categoryId?: string;
    subSectionId?: number;
    featured?: boolean;
    inStock?: boolean;
    search?: string;
  }): Promise<Product[]> {
    const conditions = [];
    
    if (filters?.categoryId) {
      conditions.push(eq(products.categoryId, filters.categoryId));
    }
    
    if (filters?.subSectionId) {
      conditions.push(eq(products.subSectionId, filters.subSectionId));
    }
    
    if (filters?.featured !== undefined) {
      conditions.push(eq(products.isFeatured, filters.featured));
    }
    
    if (filters?.inStock !== undefined) {
      conditions.push(eq(products.inStock, filters.inStock));
    }
    
    if (filters?.search) {
      conditions.push(like(products.name, `%${filters.search}%`));
    }
    
    if (conditions.length > 0) {
      return await db
        .select()
        .from(products)
        .where(and(...conditions))
        .orderBy(products.sortOrder, desc(products.createdAt));
    } else {
      return await db
        .select()
        .from(products)
        .orderBy(products.sortOrder, desc(products.createdAt));
    }
  }
  
  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }
  
  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
  
  // Banner operations
  async getBanners(position?: string): Promise<Banner[]> {
    if (position) {
      return await db
        .select()
        .from(banners)
        .where(and(eq(banners.position, position), eq(banners.isActive, true)))
        .orderBy(banners.sortOrder);
    } else {
      return await db
        .select()
        .from(banners)
        .where(eq(banners.isActive, true))
        .orderBy(banners.sortOrder);
    }
  }
  
  async getBanner(id: number): Promise<Banner | undefined> {
    const [banner] = await db.select().from(banners).where(eq(banners.id, id));
    return banner;
  }
  
  async createBanner(banner: InsertBanner): Promise<Banner> {
    const [newBanner] = await db.insert(banners).values(banner).returning();
    return newBanner;
  }
  
  async updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner> {
    const [updatedBanner] = await db
      .update(banners)
      .set({ ...banner, updatedAt: new Date() })
      .where(eq(banners.id, id))
      .returning();
    return updatedBanner;
  }
  
  async deleteBanner(id: number): Promise<void> {
    await db.update(banners).set({ isActive: false }).where(eq(banners.id, id));
  }
  
  // Content block operations
  async getContentBlocks(pageSlug: string, section?: string): Promise<ContentBlock[]> {
    if (section) {
      return await db
        .select()
        .from(contentBlocks)
        .where(and(eq(contentBlocks.pageSlug, pageSlug), eq(contentBlocks.section, section), eq(contentBlocks.isActive, true)))
        .orderBy(contentBlocks.sortOrder);
    } else {
      return await db
        .select()
        .from(contentBlocks)
        .where(and(eq(contentBlocks.pageSlug, pageSlug), eq(contentBlocks.isActive, true)))
        .orderBy(contentBlocks.sortOrder);
    }
  }
  
  async getContentBlock(id: number): Promise<ContentBlock | undefined> {
    const [block] = await db.select().from(contentBlocks).where(eq(contentBlocks.id, id));
    return block;
  }
  
  async createContentBlock(block: InsertContentBlock): Promise<ContentBlock> {
    const [newBlock] = await db.insert(contentBlocks).values(block).returning();
    return newBlock;
  }
  
  async updateContentBlock(id: number, block: Partial<InsertContentBlock>): Promise<ContentBlock> {
    const [updatedBlock] = await db
      .update(contentBlocks)
      .set({ ...block, updatedAt: new Date() })
      .where(eq(contentBlocks.id, id))
      .returning();
    return updatedBlock;
  }
  
  async deleteContentBlock(id: number): Promise<void> {
    await db.update(contentBlocks).set({ isActive: false }).where(eq(contentBlocks.id, id));
  }
  
  // Blog operations
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    if (published !== undefined) {
      return await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, published))
        .orderBy(desc(blogPosts.createdAt));
    } else {
      return await db
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.createdAt));
    }
  }
  
  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  
  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }
  
  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
  
  // Demo booking operations
  async getDemoBookings(): Promise<DemoBooking[]> {
    return await db.select().from(demoBookings).orderBy(desc(demoBookings.createdAt));
  }
  
  async getDemoBooking(id: string): Promise<DemoBooking | undefined> {
    const [booking] = await db.select().from(demoBookings).where(eq(demoBookings.id, id));
    return booking;
  }
  
  async createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking> {
    const [newBooking] = await db.insert(demoBookings).values(booking).returning();
    return newBooking;
  }
  
  async updateDemoBookingStatus(id: string, status: string): Promise<DemoBooking> {
    const [updatedBooking] = await db
      .update(demoBookings)
      .set({ status })
      .where(eq(demoBookings.id, id))
      .returning();
    return updatedBooking;
  }
  
  // Contact inquiry operations
  async getContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }
  
  async getContactInquiry(id: string): Promise<ContactInquiry | undefined> {
    const [inquiry] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id));
    return inquiry;
  }
  
  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [newInquiry] = await db.insert(contactInquiries).values(inquiry).returning();
    return newInquiry;
  }
  
  async updateInquiryStatus(id: string, status: string): Promise<ContactInquiry> {
    const [updatedInquiry] = await db
      .update(contactInquiries)
      .set({ status })
      .where(eq(contactInquiries.id, id))
      .returning();
    return updatedInquiry;
  }
  
  // Cart operations
  async getCartItems(userId: string): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.userId, userId));
  }
  
  async getCartItem(id: string): Promise<CartItem | undefined> {
    const [item] = await db.select().from(cartItems).where(eq(cartItems.id, id));
    return item;
  }
  
  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }
  
  async updateCartItem(id: string, quantity: number): Promise<CartItem> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem;
  }
  
  async removeFromCart(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }
  
  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }
  
  // Order operations
  async getOrders(userId?: string): Promise<Order[]> {
    if (userId) {
      return await db
        .select()
        .from(orders)
        .where(eq(orders.userId, userId))
        .orderBy(desc(orders.createdAt));
    } else {
      return await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt));
    }
  }
  
  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  
  async createOrder(order: any): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
  
  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }
  
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
}

export const storage = new DatabaseStorage();