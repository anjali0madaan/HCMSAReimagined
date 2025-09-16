# HCMSA Website

## Project Overview
Official website for Haryana Civil Medical Services Association (HCMSA) - a professional association serving civil medical officers and healthcare professionals in Haryana.

## Recent Changes
- **Smooth Navigation**: Implemented smooth scrolling navigation for all sections (About, News, Events, Publications, Gallery, Contact) with proper header offset calculation
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
- **Design**: Professional government-style design based on Haryana Health Department portal
- **Integration**: Deep link integration with external membership portal
- **Mock Data**: Contains sample news, events, and leadership data for demonstration

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