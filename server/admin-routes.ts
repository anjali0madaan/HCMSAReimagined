import type { Express } from "express";
import { storage } from "./storage.js";

export function registerAdminRoutes(app: Express) {
  // Admin routes are now handled by the React frontend
  // The /admin path should be served by the React app, not by static HTML

  return app;
}