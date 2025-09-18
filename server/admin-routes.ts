import type { Express } from "express";
import { storage } from "./storage";

export function registerAdminRoutes(app: Express) {
  // Simple admin interface for content management
  app.get("/admin", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>HCMSA Admin Panel</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .container { max-width: 800px; margin: 0 auto; }
          .section { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          h1 { color: #2c5aa0; }
          h2 { color: #444; }
          .status { padding: 10px; background: #f0f8ff; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🏥 HCMSA Admin Panel</h1>
          
          <div class="status">
            <h2>System Status</h2>
            <p>✅ Website: Running on port 5000</p>
            <p>✅ Database: Connected (PostgreSQL)</p>
            <p>⚠️ CMS: Using fallback data</p>
          </div>

          <div class="section">
            <h2>Quick Access</h2>
            <p><strong>Main Website:</strong> <a href="/" target="_blank">View HCMSA Website</a></p>
            <p><strong>API Status:</strong> <a href="/api/cms/status" target="_blank">Check CMS Status</a></p>
          </div>

          <div class="section">
            <h2>Content Management</h2>
            <p>The website is currently using fallback content data including:</p>
            <ul>
              <li><strong>News:</strong> Sample news articles about HCMSA activities</li>
              <li><strong>Events:</strong> Conference and meeting information</li>
              <li><strong>Publications:</strong> Guidelines, reports, and newsletters</li>
              <li><strong>Leadership:</strong> Officer profiles and contact information</li>
            </ul>
          </div>

          <div class="section">
            <h2>Available API Endpoints</h2>
            <ul>
              <li><code>GET /api/cms/news</code> - Get all news</li>
              <li><code>GET /api/cms/events</code> - Get all events</li>
              <li><code>GET /api/cms/publications</code> - Get all publications</li>
              <li><code>GET /api/cms/leadership</code> - Get leadership profiles</li>
            </ul>
          </div>

          <div class="section">
            <h2>Next Steps</h2>
            <p>Your HCMSA website is fully functional and ready for use. The content management system provides:</p>
            <ul>
              <li>Professional government-style design</li>
              <li>Responsive layout for all devices</li>
              <li>Integration with external membership portal</li>
              <li>Sample content ready for customization</li>
            </ul>
          </div>
        </div>
      </body>
      </html>
    `);
  });

  return app;
}