import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cmsService } from "./directus-client";
import { fallbackCMSService } from "./cms-fallback";

// CMS Service that automatically falls back to static data if Directus is unavailable
class CMSService {
  private useDirectus = false;

  constructor() {
    this.checkDirectusAvailability();
  }

  private async checkDirectusAvailability() {
    try {
      // Try to fetch a simple request to check if Directus is available
      await cmsService.getNews();
      this.useDirectus = true;
      console.log('✅ Directus CMS connected successfully');
    } catch (error) {
      this.useDirectus = false;
      console.log('⚠️ Directus unavailable, using fallback data');
    }
  }

  private getService() {
    return this.useDirectus ? cmsService : fallbackCMSService;
  }

  // Delegate all methods to the appropriate service
  async getNews(published?: boolean) {
    return this.getService().getNews(published);
  }

  async getNewsItem(id: number) {
    return this.getService().getNewsItem(id);
  }

  async createNews(data: any) {
    return this.getService().createNews(data);
  }

  async getEvents(published?: boolean) {
    return this.getService().getEvents(published);
  }

  async getEventItem(id: number) {
    return this.getService().getEventItem(id);
  }

  async createEvent(data: any) {
    return this.getService().createEvent(data);
  }

  async getPublications(published?: boolean) {
    return this.getService().getPublications(published);
  }

  async getPublicationItem(id: number) {
    return this.getService().getPublicationItem(id);
  }

  async createPublication(data: any) {
    return this.getService().createPublication(data);
  }

  async getLeadership(active?: boolean) {
    return this.getService().getLeadership(active);
  }

  async getLeadershipItem(id: number) {
    return this.getService().getLeadershipItem(id);
  }

  async createLeadership(data: any) {
    return this.getService().createLeadership(data);
  }
}

const cms = new CMSService();

export async function registerRoutes(app: Express): Promise<Server> {
  // CMS API Routes
  
  // Simple API key authentication middleware for write operations
  const authenticateWrite = (req: any, res: any, next: any) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.CMS_API_KEY || 'dev-api-key-change-in-production';
    
    if (apiKey === validApiKey) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized - valid API key required' });
    }
  };

  // News endpoints
  app.get("/api/cms/news", async (req, res) => {
    try {
      const published = req.query.published !== 'false';
      const news = await cms.getNews(published);
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/cms/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsItem = await cms.getNewsItem(id);
      if (newsItem) {
        res.json(newsItem);
      } else {
        res.status(404).json({ error: "News item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });

  app.post("/api/cms/news", authenticateWrite, async (req, res) => {
    try {
      const newsItem = await cms.createNews(req.body);
      if (newsItem) {
        res.status(201).json(newsItem);
      } else {
        res.status(400).json({ error: "Failed to create news item" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create news item" });
    }
  });

  // Events endpoints
  app.get("/api/cms/events", async (req, res) => {
    try {
      const published = req.query.published !== 'false';
      const events = await cms.getEvents(published);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/cms/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eventItem = await cms.getEventItem(id);
      if (eventItem) {
        res.json(eventItem);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/cms/events", authenticateWrite, async (req, res) => {
    try {
      const eventItem = await cms.createEvent(req.body);
      if (eventItem) {
        res.status(201).json(eventItem);
      } else {
        res.status(400).json({ error: "Failed to create event" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  // Publications endpoints
  app.get("/api/cms/publications", async (req, res) => {
    try {
      const published = req.query.published !== 'false';
      const publications = await cms.getPublications(published);
      res.json(publications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.get("/api/cms/publications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const publication = await cms.getPublicationItem(id);
      if (publication) {
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  app.post("/api/cms/publications", authenticateWrite, async (req, res) => {
    try {
      const publication = await cms.createPublication(req.body);
      if (publication) {
        res.status(201).json(publication);
      } else {
        res.status(400).json({ error: "Failed to create publication" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create publication" });
    }
  });

  // Leadership endpoints
  app.get("/api/cms/leadership", async (req, res) => {
    try {
      const active = req.query.active !== 'false';
      const leadership = await cms.getLeadership(active);
      res.json(leadership);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leadership" });
    }
  });

  app.get("/api/cms/leadership/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const leader = await cms.getLeadershipItem(id);
      if (leader) {
        res.json(leader);
      } else {
        res.status(404).json({ error: "Leadership member not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leadership member" });
    }
  });

  app.post("/api/cms/leadership", authenticateWrite, async (req, res) => {
    try {
      const leader = await cms.createLeadership(req.body);
      if (leader) {
        res.status(201).json(leader);
      } else {
        res.status(400).json({ error: "Failed to create leadership member" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create leadership member" });
    }
  });

  // Health check endpoint for CMS
  app.get("/api/cms/status", async (req, res) => {
    try {
      // Test all services
      const [news, events, publications, leadership] = await Promise.all([
        cms.getNews().then(() => 'ok').catch(() => 'error'),
        cms.getEvents().then(() => 'ok').catch(() => 'error'),
        cms.getPublications().then(() => 'ok').catch(() => 'error'),
        cms.getLeadership().then(() => 'ok').catch(() => 'error')
      ]);

      res.json({
        cms: 'connected',
        services: {
          news,
          events,
          publications,
          leadership
        },
        mode: cms['useDirectus'] ? 'directus' : 'fallback'
      });
    } catch (error) {
      res.status(500).json({ 
        cms: 'error',
        error: 'CMS services unavailable',
        mode: 'fallback'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
