export default {
  host: '0.0.0.0',
  port: process.env.DIRECTUS_PORT || 8055,
  public_url: process.env.PUBLIC_URL || `http://localhost:${process.env.DIRECTUS_PORT || 8055}`,
  
  db_client: 'pg',
  db_host: process.env.PGHOST,
  db_port: process.env.PGPORT,
  db_database: process.env.PGDATABASE,
  db_user: process.env.PGUSER,
  db_password: process.env.PGPASSWORD,
  
  key: process.env.DIRECTUS_KEY || 'directus-key-' + Math.random().toString(36).substring(7),
  secret: process.env.DIRECTUS_SECRET || 'directus-secret-' + Math.random().toString(36).substring(7),
  
  admin_email: process.env.DIRECTUS_ADMIN_EMAIL || 'admin@hcmsa.org',
  admin_password: process.env.DIRECTUS_ADMIN_PASSWORD || 'AdminPassword123!',
  
  cors_enabled: true,
  cors_origin: true,
  
  storage_locations: 'local',
  storage_local_driver: 'local',
  storage_local_root: './uploads',
  
  // Disable telemetry for better performance
  telemetry: false,
  
  // Security settings
  auth_providers: 'directus',
  access_token_ttl: '15m',
  refresh_token_ttl: '7d',
  refresh_token_cookie_secure: false,
  refresh_token_cookie_same_site: 'lax',
  refresh_token_cookie_name: 'directus_refresh_token',
  
  // Rate limiting
  rate_limiter_enabled: true,
  rate_limiter_store: 'memory',
  rate_limiter_points: 25,
  rate_limiter_duration: 1,
};