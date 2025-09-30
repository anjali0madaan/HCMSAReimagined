import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { registerAdminRoutes } from "./admin-routes.js";
import { 
  insertNewsSchema, 
  insertEventSchema, 
  insertPublicationSchema, 
  insertLeadershipSchema 
} from "@shared/schema";

// Helper function to parse pagination parameters
function getPaginationParams(query: any) {
  const limit = Math.max(1, Math.min(parseInt(query.limit) || 50, 100)); // 1-100 items
  const offset = Math.max(parseInt(query.offset) || 0, 0);
  return { limit, offset };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // CMS API Routes
  
  // Simple API key authentication middleware for write operations
  const authenticateWrite = (req: any, res: any, next: any) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.CMS_API_KEY;
    
    if (!validApiKey) {
      console.warn('WARNING: CMS_API_KEY not configured - write operations disabled');
      res.status(503).json({ 
        error: 'CMS write operations disabled - API key not configured',
        hint: 'Set CMS_API_KEY environment variable to enable content management'
      });
      return;
    }
    
    if (apiKey === validApiKey) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized - valid API key required' });
    }
  };

  // News endpoints with full CRUD
  app.get("/api/cms/news", async (req, res) => {
    try {
      // Only filter by published if explicitly provided
      const published = req.query.published !== undefined ? req.query.published !== 'false' : undefined;
      const { limit, offset } = getPaginationParams(req.query);
      const news = await storage.getNews(published, limit, offset);
      res.json(news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/cms/news/:id", async (req, res) => {
    try {
      const id = req.params.id; // UUID string, not integer
      const newsItem = await storage.getNewsItem(id);
      if (newsItem) {
        res.json(newsItem);
      } else {
        res.status(404).json({ error: "News item not found" });
      }
    } catch (error) {
      console.error('Failed to fetch news item:', error);
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });

  app.post("/api/cms/news", authenticateWrite, async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(validatedData);
      res.status(201).json(newsItem);
    } catch (error: any) {
      console.error('Failed to create news item:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else if (error.message.includes('slug')) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create news item" });
      }
    }
  });

  app.put("/api/cms/news/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const validatedData = insertNewsSchema.partial().parse(req.body);
      const updatedItem = await storage.updateNews(id, validatedData);
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: "News item not found" });
      }
    } catch (error: any) {
      console.error('Failed to update news item:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else if (error.message.includes('slug')) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update news item" });
      }
    }
  });

  app.delete("/api/cms/news/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await storage.deleteNews(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "News item not found" });
      }
    } catch (error) {
      console.error('Failed to delete news item:', error);
      res.status(500).json({ error: "Failed to delete news item" });
    }
  });

  // Events endpoints with full CRUD
  app.get("/api/cms/events", async (req, res) => {
    try {
      // Only filter by published if explicitly provided
      const published = req.query.published !== undefined ? req.query.published !== 'false' : undefined;
      const { limit, offset } = getPaginationParams(req.query);
      const events = await storage.getEvents(published, limit, offset);
      res.json(events);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/cms/events/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const eventItem = await storage.getEventItem(id);
      if (eventItem) {
        res.json(eventItem);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/cms/events", authenticateWrite, async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const eventItem = await storage.createEvent(validatedData);
      res.status(201).json(eventItem);
    } catch (error: any) {
      console.error('Failed to create event:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create event" });
      }
    }
  });

  app.put("/api/cms/events/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const validatedData = insertEventSchema.partial().parse(req.body);
      const updatedItem = await storage.updateEvent(id, validatedData);
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error: any) {
      console.error('Failed to update event:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update event" });
      }
    }
  });

  app.delete("/api/cms/events/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await storage.deleteEvent(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      res.status(500).json({ error: "Failed to delete event" });
    }
  });

  // Publications endpoints with full CRUD
  app.get("/api/cms/publications", async (req, res) => {
    try {
      // Only filter by published if explicitly provided
      const published = req.query.published !== undefined ? req.query.published !== 'false' : undefined;
      const { limit, offset } = getPaginationParams(req.query);
      const publications = await storage.getPublications(published, limit, offset);
      res.json(publications);
    } catch (error) {
      console.error('Failed to fetch publications:', error);
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.get("/api/cms/publications/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const publication = await storage.getPublicationItem(id);
      if (publication) {
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error) {
      console.error('Failed to fetch publication:', error);
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  app.post("/api/cms/publications", authenticateWrite, async (req, res) => {
    try {
      const validatedData = insertPublicationSchema.parse(req.body);
      const publication = await storage.createPublication(validatedData);
      res.status(201).json(publication);
    } catch (error: any) {
      console.error('Failed to create publication:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create publication" });
      }
    }
  });

  app.put("/api/cms/publications/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const validatedData = insertPublicationSchema.partial().parse(req.body);
      const updatedItem = await storage.updatePublication(id, validatedData);
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error: any) {
      console.error('Failed to update publication:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update publication" });
      }
    }
  });

  app.delete("/api/cms/publications/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await storage.deletePublication(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error) {
      console.error('Failed to delete publication:', error);
      res.status(500).json({ error: "Failed to delete publication" });
    }
  });

  // Leadership endpoints with full CRUD
  app.get("/api/cms/leadership", async (req, res) => {
    try {
      // Only filter by active if explicitly provided
      const active = req.query.active !== undefined ? req.query.active !== 'false' : undefined;
      const { limit, offset } = getPaginationParams(req.query);
      const leadership = await storage.getLeadership(active, limit, offset);
      res.json(leadership);
    } catch (error) {
      console.error('Failed to fetch leadership:', error);
      res.status(500).json({ error: "Failed to fetch leadership" });
    }
  });

  app.get("/api/cms/leadership/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const leader = await storage.getLeadershipItem(id);
      if (leader) {
        res.json(leader);
      } else {
        res.status(404).json({ error: "Leadership member not found" });
      }
    } catch (error) {
      console.error('Failed to fetch leadership member:', error);
      res.status(500).json({ error: "Failed to fetch leadership member" });
    }
  });

  app.post("/api/cms/leadership", authenticateWrite, async (req, res) => {
    try {
      const validatedData = insertLeadershipSchema.parse(req.body);
      const leader = await storage.createLeadership(validatedData);
      res.status(201).json(leader);
    } catch (error: any) {
      console.error('Failed to create leadership member:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create leadership member" });
      }
    }
  });

  app.put("/api/cms/leadership/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const validatedData = insertLeadershipSchema.partial().parse(req.body);
      const updatedItem = await storage.updateLeadership(id, validatedData);
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: "Leadership member not found" });
      }
    } catch (error: any) {
      console.error('Failed to update leadership member:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update leadership member" });
      }
    }
  });

  app.delete("/api/cms/leadership/:id", authenticateWrite, async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await storage.deleteLeadership(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Leadership member not found" });
      }
    } catch (error) {
      console.error('Failed to delete leadership member:', error);
      res.status(500).json({ error: "Failed to delete leadership member" });
    }
  });

  // Health check endpoint for CMS
  app.get("/api/cms/status", async (req, res) => {
    try {
      // Test all storage services
      const [news, events, publications, leadership] = await Promise.all([
        storage.getNews(true, 1).then(() => 'ok').catch(() => 'error'),
        storage.getEvents(true, 1).then(() => 'ok').catch(() => 'error'),
        storage.getPublications(true, 1).then(() => 'ok').catch(() => 'error'),
        storage.getLeadership(true, 1).then(() => 'ok').catch(() => 'error')
      ]);

      res.json({
        cms: 'connected',
        services: {
          news,
          events,
          publications,
          leadership
        },
        mode: 'database',
        storage: 'postgresql'
      });
    } catch (error) {
      console.error('CMS status check failed:', error);
      res.status(500).json({ 
        cms: 'error',
        error: 'CMS services unavailable',
        mode: 'database'
      });
    }
  });

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
