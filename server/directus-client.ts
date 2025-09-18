import { createDirectus, rest, readItems, createItem, updateItem, deleteItem, readItem } from '@directus/sdk';

// Create Directus client instance
const directusClient = createDirectus('http://localhost:8055').with(rest());

export interface NewsItem {
  id?: number;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published: boolean;
  date_published?: string;
  date_created?: string;
  date_updated?: string;
}

export interface EventItem {
  id?: number;
  title: string;
  description: string;
  location?: string;
  event_date: string;
  end_date?: string;
  featured_image?: string;
  registration_required: boolean;
  external_registration_url?: string;
  published: boolean;
  date_created?: string;
  date_updated?: string;
}

export interface PublicationItem {
  id?: number;
  title: string;
  description?: string;
  document_file?: string;
  category: 'guidelines' | 'reports' | 'newsletters' | 'research';
  publication_date?: string;
  author?: string;
  published: boolean;
  date_created?: string;
  date_updated?: string;
}

export interface LeadershipItem {
  id?: number;
  name: string;
  position: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  order: number;
  active: boolean;
  date_created?: string;
  date_updated?: string;
}

// CMS Service functions
export class DirectusCMSService {
  // News methods
  async getNews(published: boolean = true): Promise<NewsItem[]> {
    try {
      const filter = published ? { published: { _eq: true } } : {};
      const result = await directusClient.request(
        readItems('news', {
          fields: ['*'],
          filter,
          sort: ['-date_published', '-date_created']
        })
      );
      return result as NewsItem[];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  async getNewsItem(id: number): Promise<NewsItem | null> {
    try {
      const result = await directusClient.request(readItem('news', id));
      return result as NewsItem;
    } catch (error) {
      console.error('Error fetching news item:', error);
      return null;
    }
  }

  async createNews(data: Omit<NewsItem, 'id'>): Promise<NewsItem | null> {
    try {
      const result = await directusClient.request(createItem('news', data));
      return result as NewsItem;
    } catch (error) {
      console.error('Error creating news item:', error);
      return null;
    }
  }

  // Events methods
  async getEvents(published: boolean = true): Promise<EventItem[]> {
    try {
      const filter = published ? { published: { _eq: true } } : {};
      const result = await directusClient.request(
        readItems('events', {
          fields: ['*'],
          filter,
          sort: ['event_date']
        })
      );
      return result as EventItem[];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  async getEventItem(id: number): Promise<EventItem | null> {
    try {
      const result = await directusClient.request(readItem('events', id));
      return result as EventItem;
    } catch (error) {
      console.error('Error fetching event item:', error);
      return null;
    }
  }

  async createEvent(data: Omit<EventItem, 'id'>): Promise<EventItem | null> {
    try {
      const result = await directusClient.request(createItem('events', data));
      return result as EventItem;
    } catch (error) {
      console.error('Error creating event item:', error);
      return null;
    }
  }

  // Publications methods
  async getPublications(published: boolean = true): Promise<PublicationItem[]> {
    try {
      const filter = published ? { published: { _eq: true } } : {};
      const result = await directusClient.request(
        readItems('publications', {
          fields: ['*'],
          filter,
          sort: ['-publication_date', '-date_created']
        })
      );
      return result as PublicationItem[];
    } catch (error) {
      console.error('Error fetching publications:', error);
      return [];
    }
  }

  async getPublicationItem(id: number): Promise<PublicationItem | null> {
    try {
      const result = await directusClient.request(readItem('publications', id));
      return result as PublicationItem;
    } catch (error) {
      console.error('Error fetching publication item:', error);
      return null;
    }
  }

  async createPublication(data: Omit<PublicationItem, 'id'>): Promise<PublicationItem | null> {
    try {
      const result = await directusClient.request(createItem('publications', data));
      return result as PublicationItem;
    } catch (error) {
      console.error('Error creating publication item:', error);
      return null;
    }
  }

  // Leadership methods
  async getLeadership(active: boolean = true): Promise<LeadershipItem[]> {
    try {
      const filter = active ? { active: { _eq: true } } : {};
      const result = await directusClient.request(
        readItems('leadership', {
          fields: ['*'],
          filter,
          sort: ['order', 'name']
        })
      );
      return result as LeadershipItem[];
    } catch (error) {
      console.error('Error fetching leadership:', error);
      return [];
    }
  }

  async getLeadershipItem(id: number): Promise<LeadershipItem | null> {
    try {
      const result = await directusClient.request(readItem('leadership', id));
      return result as LeadershipItem;
    } catch (error) {
      console.error('Error fetching leadership item:', error);
      return null;
    }
  }

  async createLeadership(data: Omit<LeadershipItem, 'id'>): Promise<LeadershipItem | null> {
    try {
      const result = await directusClient.request(createItem('leadership', data));
      return result as LeadershipItem;
    } catch (error) {
      console.error('Error creating leadership item:', error);
      return null;
    }
  }
}

export const cmsService = new DirectusCMSService();