# HCMSA Website

## Project Overview
Official website for Haryana Civil Medical Services Association (HCMSA) - a professional association serving civil medical officers and healthcare professionals in Haryana.

## Recent Changes
- **Vercel Deployment Ready** (Sept 30, 2025): All server imports updated with `.js` extensions for ES module compatibility on Vercel - all 6 server files now properly reference relative imports with file extensions as required by Node.js ES module spec
- **Database Migration to Supabase**: Successfully migrated from Neon to Supabase PostgreSQL with comprehensive sample content (7 news, 7 events, 7 publications, 2 leadership profiles)
- **Event Detail Pages Fixed**: Fixed EventDetail.tsx to fetch from database API instead of mock data, now consistent with NewsDetail pages using React Query pattern
- **Navigation Fixed**: Fixed menu navigation to properly scroll to corresponding sections on homepage - all menu items (About, News, Events, Publications, Gallery, Contact) now correctly navigate to their respective sections
- **Complete Homepage Sections**: Added all missing homepage sections with proper IDs for navigation:
  - About section with HCMSA description and statistics
  - News section with latest articles
  - Events section with upcoming events
  - Publications section with featured documents
  - Gallery section with event photos and activities
  - Contact section with office details and contact information
- **Smooth Navigation**: Implemented smooth scrolling navigation for all sections with proper header offset calculation
- **Logo Update**: Updated header to use official HCMSA logo image instead of text-based logo
- **Events System**: Removed all registration buttons from events and created comprehensive events listing page at /events
- **Publications Section**: Added complete publications section with individual document detail pages
- **Menu Updates**: Simplified navigation menu (removed Member Services, changed "About HCMSA" to "About")
- **News and Events Navigation**: Individual news articles and events now open on separate detail pages with full content when clicked from the homepage
- **Integration with External Portal**: All member-related functionality (login, membership, services) now redirects to the existing membership portal at hcmsassociation.co.in

## User Preferences
- **Portal Integration**: The website integrates with an existing membership portal rather than duplicating member functionality
- **External Redirects**: All member-related actions redirect to hcmsassociation.co.in
- **No Recruitment**: Recruitment functionality has been intentionally removed from the navigation and content

## Project Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript, ES modules with `.js` extensions for Vercel compatibility
- **Database**: Supabase PostgreSQL (migrated from Neon) with Drizzle ORM
- **CMS**: Admin dashboard with API key authentication (CMS_API_KEY)
- **Design**: Professional government-style design based on Haryana Health Department portal
- **Integration**: Deep link integration with external membership portal
- **Deployment**: Vercel-ready with ES module imports properly configured

## Features
- Hero slider with HCMSA activities and achievements
- Latest news and announcements section
- Leadership profiles with contact information
- Events calendar with registration capabilities
- Publications and resources section
- Photo gallery
- Professional government-style branding
- Dark/light mode support
- Responsive design for mobile and desktop

## File Structure
- `client/src/components/`: Reusable React components
- `client/src/pages/`: Page components
- `client/src/components/examples/`: Component examples for development
- `attached_assets/generated_images/`: Generated images for the website

## External Dependencies
- Membership portal: hcmsassociation.co.in
- All member-related functionality handled by external portal