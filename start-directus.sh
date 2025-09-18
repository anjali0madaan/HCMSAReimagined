#!/bin/bash

# Set all required environment variables for Directus
export DB_CLIENT=pg
export DB_HOST=$PGHOST
export DB_PORT=$PGPORT
export DB_DATABASE=$PGDATABASE
export DB_USER=$PGUSER
export DB_PASSWORD=$PGPASSWORD
export DB_SSL__SSLMODE=require
export DB_SSL__REJECT_UNAUTHORIZED=false
export KEY=hcmsa-directus-key
export SECRET=hcmsa-directus-secret-$(date +%s)
export ADMIN_EMAIL=admin@hcmsa.org
export ADMIN_PASSWORD=AdminPassword123!
export HOST=0.0.0.0
export PORT=8055
export PUBLIC_URL=https://$REPL_SLUG-$REPL_OWNER.replit.app:8055

echo "Starting Directus CMS on port 8055..."
echo "Admin URL: https://$REPL_SLUG-$REPL_OWNER.replit.app:8055"
echo "Login: admin@hcmsa.org / AdminPassword123!"

# Start Directus
npx directus start