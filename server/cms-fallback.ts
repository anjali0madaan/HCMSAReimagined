// Fallback CMS service using static data when Directus is not available
import { readFileSync } from 'fs';
import { NewsItem, EventItem, PublicationItem, LeadershipItem } from './directus-client';

// Import existing static data as fallback
const staticDataPath = '../shared/data.ts';

// Mock data that matches the CMS structure
const mockNewsData: NewsItem[] = [
  {
    id: 1,
    title: "HCMSA Annual Conference 2024 Announcement",
    slug: "hcmsa-annual-conference-2024-announcement",
    content: "<p>We are pleased to announce the HCMSA Annual Conference 2024, scheduled for March 15-16, 2024, at the Haryana Civil Medical Services Training Institute, Panchkula.</p><p>This year's theme focuses on 'Advancing Healthcare Excellence in Haryana' with sessions covering latest medical protocols, administrative best practices, and professional development opportunities.</p>",
    excerpt: "Join us for the HCMSA Annual Conference 2024 - Advancing Healthcare Excellence in Haryana",
    published: true,
    date_published: "2024-01-15T10:00:00Z",
    date_created: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "New Healthcare Guidelines Released",
    slug: "new-healthcare-guidelines-released",
    content: "<p>The Health Department has released updated healthcare guidelines for civil medical officers across Haryana. These guidelines cover patient care protocols, documentation requirements, and quality assurance measures.</p>",
    excerpt: "Updated healthcare guidelines now available for all civil medical officers",
    published: true,
    date_published: "2024-01-10T09:00:00Z",
    date_created: "2024-01-10T09:00:00Z"
  },
  {
    id: 3,
    title: "HCMSA Membership Drive 2024",
    slug: "hcmsa-membership-drive-2024",
    content: "<p>HCMSA is launching its annual membership drive for 2024. All eligible civil medical officers are encouraged to join and benefit from our professional development programs, networking opportunities, and advocacy initiatives.</p>",
    excerpt: "Join HCMSA's 2024 membership drive and connect with fellow medical professionals",
    published: true,
    date_published: "2024-01-05T08:00:00Z",
    date_created: "2024-01-05T08:00:00Z"
  }
];

const mockEventsData: EventItem[] = [
  {
    id: 1,
    title: "HCMSA Annual Conference 2024",
    description: "Annual conference focusing on advancing healthcare excellence in Haryana with keynote speakers, workshops, and networking sessions.",
    location: "Haryana Civil Medical Services Training Institute, Panchkula",
    event_date: "2024-03-15T09:00:00Z",
    end_date: "2024-03-16T17:00:00Z",
    registration_required: true,
    external_registration_url: "https://hcmsassociation.co.in/conference-2024",
    published: true,
    date_created: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Monthly Medical Officers Meeting",
    description: "Regular monthly meeting for civil medical officers to discuss ongoing initiatives, policy updates, and professional matters.",
    location: "HCMSA Headquarters, Chandigarh",
    event_date: "2024-02-20T14:00:00Z",
    end_date: "2024-02-20T16:00:00Z",
    registration_required: false,
    published: true,
    date_created: "2024-01-20T10:00:00Z"
  },
  {
    id: 3,
    title: "Professional Development Workshop",
    description: "Workshop on latest medical technologies and administrative best practices for healthcare professionals.",
    location: "Medical College, Rohtak",
    event_date: "2024-04-10T10:00:00Z",
    end_date: "2024-04-10T15:00:00Z",
    registration_required: true,
    external_registration_url: "https://hcmsassociation.co.in/workshop-april",
    published: true,
    date_created: "2024-01-25T10:00:00Z"
  }
];

const mockPublicationsData: PublicationItem[] = [
  {
    id: 1,
    title: "HCMSA Guidelines for Medical Officers 2024",
    description: "Comprehensive guidelines covering administrative procedures, patient care protocols, and professional conduct for civil medical officers.",
    category: "guidelines" as const,
    publication_date: "2024-01-01",
    author: "HCMSA Executive Committee",
    published: true,
    date_created: "2024-01-01T10:00:00Z"
  },
  {
    id: 2,
    title: "Annual Report 2023",
    description: "Detailed report covering HCMSA activities, achievements, and initiatives undertaken during the year 2023.",
    category: "reports" as const,
    publication_date: "2023-12-31",
    author: "HCMSA Secretariat",
    published: true,
    date_created: "2023-12-31T10:00:00Z"
  },
  {
    id: 3,
    title: "HCMSA Newsletter - January 2024",
    description: "Monthly newsletter featuring association news, member achievements, and upcoming events.",
    category: "newsletters" as const,
    publication_date: "2024-01-01",
    author: "HCMSA Communications Team",
    published: true,
    date_created: "2024-01-01T10:00:00Z"
  }
];

const mockLeadershipData: LeadershipItem[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    position: "President",
    bio: "Dr. Rajesh Kumar is a senior civil medical officer with over 20 years of experience in healthcare administration and patient care. He has been instrumental in implementing several healthcare reforms in Haryana.",
    email: "president@hcmsa.org",
    phone: "+91-98765-43210",
    order: 1,
    active: true,
    date_created: "2024-01-01T10:00:00Z"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    position: "Vice President",
    bio: "Dr. Priya Sharma specializes in public health and has been actively involved in HCMSA initiatives for community health improvement and medical officer welfare.",
    email: "vicepresident@hcmsa.org",
    phone: "+91-98765-43211",
    order: 2,
    active: true,
    date_created: "2024-01-01T10:00:00Z"
  },
  {
    id: 3,
    name: "Dr. Amit Singh",
    position: "General Secretary",
    bio: "Dr. Amit Singh oversees the administrative functions of HCMSA and coordinates various professional development programs for association members.",
    email: "secretary@hcmsa.org",
    phone: "+91-98765-43212",
    order: 3,
    active: true,
    date_created: "2024-01-01T10:00:00Z"
  },
  {
    id: 4,
    name: "Dr. Sunita Gupta",
    position: "Treasurer",
    bio: "Dr. Sunita Gupta manages the financial affairs of HCMSA and ensures transparent handling of association funds and member contributions.",
    email: "treasurer@hcmsa.org",
    phone: "+91-98765-43213",
    order: 4,
    active: true,
    date_created: "2024-01-01T10:00:00Z"
  }
];

// Fallback CMS Service
export class FallbackCMSService {
  async getNews(published: boolean = true): Promise<NewsItem[]> {
    return published ? mockNewsData.filter(item => item.published) : mockNewsData;
  }

  async getNewsItem(id: number): Promise<NewsItem | null> {
    return mockNewsData.find(item => item.id === id) || null;
  }

  async createNews(data: Omit<NewsItem, 'id'>): Promise<NewsItem | null> {
    const newItem: NewsItem = {
      ...data,
      id: mockNewsData.length + 1,
      date_created: new Date().toISOString(),
      date_updated: new Date().toISOString()
    };
    mockNewsData.push(newItem);
    return newItem;
  }

  async getEvents(published: boolean = true): Promise<EventItem[]> {
    return published ? mockEventsData.filter(item => item.published) : mockEventsData;
  }

  async getEventItem(id: number): Promise<EventItem | null> {
    return mockEventsData.find(item => item.id === id) || null;
  }

  async createEvent(data: Omit<EventItem, 'id'>): Promise<EventItem | null> {
    const newItem: EventItem = {
      ...data,
      id: mockEventsData.length + 1,
      date_created: new Date().toISOString(),
      date_updated: new Date().toISOString()
    };
    mockEventsData.push(newItem);
    return newItem;
  }

  async getPublications(published: boolean = true): Promise<PublicationItem[]> {
    return published ? mockPublicationsData.filter(item => item.published) : mockPublicationsData;
  }

  async getPublicationItem(id: number): Promise<PublicationItem | null> {
    return mockPublicationsData.find(item => item.id === id) || null;
  }

  async createPublication(data: Omit<PublicationItem, 'id'>): Promise<PublicationItem | null> {
    const newItem: PublicationItem = {
      ...data,
      id: mockPublicationsData.length + 1,
      date_created: new Date().toISOString(),
      date_updated: new Date().toISOString()
    };
    mockPublicationsData.push(newItem);
    return newItem;
  }

  async getLeadership(active: boolean = true): Promise<LeadershipItem[]> {
    return active ? mockLeadershipData.filter(item => item.active) : mockLeadershipData;
  }

  async getLeadershipItem(id: number): Promise<LeadershipItem | null> {
    return mockLeadershipData.find(item => item.id === id) || null;
  }

  async createLeadership(data: Omit<LeadershipItem, 'id'>): Promise<LeadershipItem | null> {
    const newItem: LeadershipItem = {
      ...data,
      id: mockLeadershipData.length + 1,
      date_created: new Date().toISOString(),
      date_updated: new Date().toISOString()
    };
    mockLeadershipData.push(newItem);
    return newItem;
  }
}

export const fallbackCMSService = new FallbackCMSService();