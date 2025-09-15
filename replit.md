# HCMSA Website

## Project Overview
Official website for Haryana Civil Medical Services Association (HCMSA) - a professional association serving civil medical officers and healthcare professionals in Haryana.

## Recent Changes
- **Integration with External Portal**: All member-related functionality (login, membership, services) now redirects to the existing membership portal at portal.hscmsassociation.co.in
- **Removed Recruitment Section**: Recruitment functionality has been removed from the website as requested
- **External Portal Links**: Member login, join membership, and member services buttons now redirect to the external portal

## User Preferences
- **Portal Integration**: The website integrates with an existing membership portal rather than duplicating member functionality
- **External Redirects**: All member-related actions redirect to portal.hscmsassociation.co.in
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
- Membership portal: portal.hscmsassociation.co.in
- All member-related functionality handled by external portal