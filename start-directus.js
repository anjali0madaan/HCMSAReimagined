#!/usr/bin/env node

// Set Directus environment variables
process.env.DB_CLIENT = 'pg';
process.env.DB_HOST = process.env.PGHOST;
process.env.DB_PORT = process.env.PGPORT;
process.env.DB_DATABASE = process.env.PGDATABASE;
process.env.DB_USER = process.env.PGUSER;
process.env.DB_PASSWORD = process.env.PGPASSWORD;
process.env.DB_SSL__SSLMODE = 'require';
process.env.DB_SSL__REJECT_UNAUTHORIZED = 'false';
process.env.KEY = 'hcmsa-directus-key';
process.env.SECRET = 'hcmsa-directus-secret-' + Date.now();
process.env.ADMIN_EMAIL = 'admin@hcmsa.org';
process.env.ADMIN_PASSWORD = 'AdminPassword123!';
process.env.HOST = '0.0.0.0';
process.env.PORT = '8055';
process.env.PUBLIC_URL = 'https://rest-express-' + process.env.REPL_ID + '.replit.app:8055';

// Start Directus
import { exec } from 'child_process';
console.log('Starting Directus CMS...');
exec('npx directus start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});