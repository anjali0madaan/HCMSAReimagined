import { 
  type User, 
  type InsertUser,
  type News,
  type InsertNews,
  type Event,
  type InsertEvent,
  type Publication,
  type InsertPublication,
  type Leadership,
  type InsertLeadership
} from "@shared/schema";
import { users, news, events, publications, leadership } from "@shared/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { db } from "./db.js";
import bcrypt from "bcrypt";

// Public user type without password
export type PublicUser = Omit<User, 'password'>;

export interface IStorage {
  // User operations - public methods never return passwords
  getUser(id: string): Promise<PublicUser | undefined>;
  getUserByUsername(username: string): Promise<PublicUser | undefined>;
  createUser(user: InsertUser): Promise<PublicUser>;
  verifyPassword(username: string, password: string): Promise<boolean>;
  // Auth-specific method that includes password for authentication only
  getUserAuth(username: string): Promise<Pick<User, 'id' | 'username' | 'password'> | undefined>;

  // News operations
  getNews(published?: boolean, limit?: number, offset?: number): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: string, updates: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: string): Promise<boolean>;

  // Events operations
  getEvents(published?: boolean, limit?: number, offset?: number): Promise<Event[]>;
  getEventItem(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, updates: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  // Publications operations
  getPublications(published?: boolean, limit?: number, offset?: number): Promise<Publication[]>;
  getPublicationItem(id: string): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: string, updates: Partial<InsertPublication>): Promise<Publication | undefined>;
  deletePublication(id: string): Promise<boolean>;

  // Leadership operations
  getLeadership(active?: boolean, limit?: number, offset?: number): Promise<Leadership[]>;
  getLeadershipItem(id: string): Promise<Leadership | undefined>;
  createLeadership(leadership: InsertLeadership): Promise<Leadership>;
  updateLeadership(id: string, updates: Partial<InsertLeadership>): Promise<Leadership | undefined>;
  deleteLeadership(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations - secure methods that never expose passwords
  async getUser(id: string): Promise<PublicUser | undefined> {
    const result = await db.select({
      id: users.id,
      username: users.username
    }).from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<PublicUser | undefined> {
    const result = await db.select({
      id: users.id,
      username: users.username
    }).from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<PublicUser> {
    try {
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(insertUser.password, 10);
      const userWithHashedPassword = {
        ...insertUser,
        password: hashedPassword
      };
      
      const result = await db.insert(users).values(userWithHashedPassword).returning({
        id: users.id,
        username: users.username
      });
      return result[0];
    } catch (error: any) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Username already exists');
      }
      throw error;
    }
  }

  // Auth-specific method that includes password for authentication only
  async getUserAuth(username: string): Promise<Pick<User, 'id' | 'username' | 'password'> | undefined> {
    const result = await db.select({
      id: users.id,
      username: users.username,
      password: users.password
    }).from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  // Helper method to verify password using getUserAuth
  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.getUserAuth(username);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  // Utility function to remove undefined values from updates
  private sanitizeUpdate<T extends Record<string, any>>(updates: T): Partial<T> {
    const sanitized: Partial<T> = {};
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        sanitized[key as keyof T] = value;
      }
    });
    return sanitized;
  }

  // News operations with pagination and error handling
  async getNews(published?: boolean, limit = 50, offset = 0): Promise<News[]> {
    const query = db.select().from(news);
    if (published !== undefined) {
      return query.where(eq(news.published, published))
        .orderBy(desc(news.date_published), desc(news.date_created))
        .limit(limit)
        .offset(offset);
    }
    return query.orderBy(desc(news.date_created)).limit(limit).offset(offset);
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return result[0];
  }

  async createNews(newsData: InsertNews): Promise<News> {
    const maxRetries = 5;
    const baseSlug = newsData.slug || this.generateSlug(newsData.title);
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt}`;
        const newsWithSlug = { ...newsData, slug };
        
        const result = await db.insert(news).values(newsWithSlug).returning();
        return result[0];
      } catch (error: any) {
        if (error.code === '23505' && attempt < maxRetries - 1) {
          // Unique constraint violation - retry with incremented slug
          continue;
        }
        if (error.code === '23505') {
          throw new Error('Unable to create news item - slug conflict after maximum retries');
        }
        throw error;
      }
    }
    
    throw new Error('Maximum retries exceeded');
  }

  async updateNews(id: string, updates: Partial<InsertNews>): Promise<News | undefined> {
    const sanitizedUpdates = this.sanitizeUpdate(updates);
    if (Object.keys(sanitizedUpdates).length === 0) return undefined;
    
    // Handle slug updates with retry logic if slug is being changed
    if (updates.slug !== undefined || updates.title !== undefined) {
      const maxRetries = 5;
      const baseSlug = updates.slug || (updates.title ? this.generateSlug(updates.title) : undefined);
      
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const slug = baseSlug && attempt > 0 ? `${baseSlug}-${attempt}` : baseSlug;
          const updateData = {
            ...sanitizedUpdates,
            ...(slug && { slug }),
            date_updated: sql`CURRENT_TIMESTAMP`
          };
          
          const result = await db.update(news)
            .set(updateData)
            .where(eq(news.id, id))
            .returning();
          return result[0];
        } catch (error: any) {
          if (error.code === '23505' && attempt < maxRetries - 1 && baseSlug) {
            // Slug conflict - retry with incremented slug
            continue;
          }
          if (error.code === '23505') {
            throw new Error('Unable to update news item - slug conflict after maximum retries');
          }
          throw error;
        }
      }
    } else {
      // Simple update without slug changes
      const updateData = {
        ...sanitizedUpdates,
        date_updated: sql`CURRENT_TIMESTAMP`
      };
      
      const result = await db.update(news)
        .set(updateData)
        .where(eq(news.id, id))
        .returning();
      return result[0];
    }
  }

  async deleteNews(id: string): Promise<boolean> {
    const result = await db.delete(news).where(eq(news.id, id)).returning({ id: news.id });
    return result.length > 0;
  }


  // Events operations with pagination
  async getEvents(published?: boolean, limit = 50, offset = 0): Promise<Event[]> {
    const query = db.select().from(events);
    if (published !== undefined) {
      return query.where(eq(events.published, published))
        .orderBy(asc(events.event_date))
        .limit(limit)
        .offset(offset);
    }
    return query.orderBy(desc(events.date_created)).limit(limit).offset(offset);
  }

  async getEventItem(id: string): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0];
  }

  async createEvent(eventData: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(eventData).returning();
    return result[0];
  }

  async updateEvent(id: string, updates: Partial<InsertEvent>): Promise<Event | undefined> {
    const sanitizedUpdates = this.sanitizeUpdate(updates);
    if (Object.keys(sanitizedUpdates).length === 0) return undefined;
    
    const updateData = {
      ...sanitizedUpdates,
      date_updated: sql`CURRENT_TIMESTAMP`
    };
    
    const result = await db.update(events)
      .set(updateData)
      .where(eq(events.id, id))
      .returning();
    return result[0];
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning({ id: events.id });
    return result.length > 0;
  }

  // Publications operations with pagination
  async getPublications(published?: boolean, limit = 50, offset = 0): Promise<Publication[]> {
    const query = db.select().from(publications);
    if (published !== undefined) {
      return query.where(eq(publications.published, published))
        .orderBy(desc(publications.publication_date), desc(publications.date_created))
        .limit(limit)
        .offset(offset);
    }
    return query.orderBy(desc(publications.date_created)).limit(limit).offset(offset);
  }

  async getPublicationItem(id: string): Promise<Publication | undefined> {
    const result = await db.select().from(publications).where(eq(publications.id, id)).limit(1);
    return result[0];
  }

  async createPublication(publicationData: InsertPublication): Promise<Publication> {
    const result = await db.insert(publications).values(publicationData).returning();
    return result[0];
  }

  async updatePublication(id: string, updates: Partial<InsertPublication>): Promise<Publication | undefined> {
    const sanitizedUpdates = this.sanitizeUpdate(updates);
    if (Object.keys(sanitizedUpdates).length === 0) return undefined;
    
    const updateData = {
      ...sanitizedUpdates,
      date_updated: sql`CURRENT_TIMESTAMP`
    };
    
    const result = await db.update(publications)
      .set(updateData)
      .where(eq(publications.id, id))
      .returning();
    return result[0];
  }

  async deletePublication(id: string): Promise<boolean> {
    const result = await db.delete(publications).where(eq(publications.id, id)).returning({ id: publications.id });
    return result.length > 0;
  }

  // Leadership operations with pagination
  async getLeadership(active?: boolean, limit = 50, offset = 0): Promise<Leadership[]> {
    const query = db.select().from(leadership);
    if (active !== undefined) {
      return query.where(eq(leadership.active, active))
        .orderBy(asc(leadership.order))
        .limit(limit)
        .offset(offset);
    }
    return query.orderBy(asc(leadership.order)).limit(limit).offset(offset);
  }

  async getLeadershipItem(id: string): Promise<Leadership | undefined> {
    const result = await db.select().from(leadership).where(eq(leadership.id, id)).limit(1);
    return result[0];
  }

  async createLeadership(leadershipData: InsertLeadership): Promise<Leadership> {
    const result = await db.insert(leadership).values(leadershipData).returning();
    return result[0];
  }

  async updateLeadership(id: string, updates: Partial<InsertLeadership>): Promise<Leadership | undefined> {
    const sanitizedUpdates = this.sanitizeUpdate(updates);
    if (Object.keys(sanitizedUpdates).length === 0) return undefined;
    
    const updateData = {
      ...sanitizedUpdates,
      date_updated: sql`CURRENT_TIMESTAMP`
    };
    
    const result = await db.update(leadership)
      .set(updateData)
      .where(eq(leadership.id, id))
      .returning();
    return result[0];
  }

  async deleteLeadership(id: string): Promise<boolean> {
    const result = await db.delete(leadership).where(eq(leadership.id, id)).returning({ id: leadership.id });
    return result.length > 0;
  }

  // Utility function to generate URL-friendly slugs
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

export const storage = new DatabaseStorage();