import { createDirectus, rest, authentication, createCollection, createField } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055')
  .with(rest())
  .with(authentication('json'));

async function setupCollections() {
  try {
    // Login with admin credentials
    await directus.login('admin@hcmsa.org', 'HCMSAAdmin2024!');
    console.log('✅ Logged in successfully');

    // Create News collection
    await directus.request(createCollection({
      collection: 'news',
      meta: {
        collection: 'news',
        icon: 'article',
        note: 'News articles and announcements',
        display_template: '{{title}}',
        hidden: false,
        singleton: false,
        sort_field: 'sort'
      },
      schema: {
        name: 'news'
      }
    }));

    // Add fields to News collection
    const newsFields = [
      { field: 'id', type: 'integer', meta: { hidden: true, readonly: true, interface: 'input', primary_key: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', required: true, width: 'full' } },
      { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full' } },
      { field: 'excerpt', type: 'text', meta: { interface: 'textarea', width: 'full' } },
      { field: 'featured_image', type: 'uuid', meta: { interface: 'file-image', width: 'half' } },
      { field: 'published', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: false } },
      { field: 'date_published', type: 'timestamp', meta: { interface: 'datetime', width: 'half' } },
      { field: 'date_created', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } },
      { field: 'date_updated', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } }
    ];

    for (const field of newsFields) {
      await directus.request(createField('news', field));
    }
    console.log('✅ News collection created');

    // Create Events collection
    await directus.request(createCollection({
      collection: 'events',
      meta: {
        collection: 'events',
        icon: 'event',
        note: 'HCMSA events and meetings',
        display_template: '{{title}}',
        hidden: false,
        singleton: false
      },
      schema: {
        name: 'events'
      }
    }));

    // Add fields to Events collection
    const eventsFields = [
      { field: 'id', type: 'integer', meta: { hidden: true, readonly: true, interface: 'input', primary_key: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', required: true, width: 'full' } },
      { field: 'description', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full' } },
      { field: 'location', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'event_date', type: 'timestamp', meta: { interface: 'datetime', width: 'half', required: true } },
      { field: 'end_date', type: 'timestamp', meta: { interface: 'datetime', width: 'half' } },
      { field: 'featured_image', type: 'uuid', meta: { interface: 'file-image', width: 'half' } },
      { field: 'registration_required', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: false } },
      { field: 'external_registration_url', type: 'string', meta: { interface: 'input', width: 'full' } },
      { field: 'published', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: false } },
      { field: 'date_created', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } },
      { field: 'date_updated', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } }
    ];

    for (const field of eventsFields) {
      await directus.request(createField('events', field));
    }
    console.log('✅ Events collection created');

    // Create Publications collection
    await directus.request(createCollection({
      collection: 'publications',
      meta: {
        collection: 'publications',
        icon: 'library_books',
        note: 'Publications and documents',
        display_template: '{{title}}',
        hidden: false,
        singleton: false
      },
      schema: {
        name: 'publications'
      }
    }));

    // Add fields to Publications collection
    const publicationsFields = [
      { field: 'id', type: 'integer', meta: { hidden: true, readonly: true, interface: 'input', primary_key: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', required: true, width: 'full' } },
      { field: 'description', type: 'text', meta: { interface: 'textarea', width: 'full' } },
      { field: 'document_file', type: 'uuid', meta: { interface: 'file', width: 'half' } },
      { field: 'category', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Guidelines', value: 'guidelines' }, { text: 'Reports', value: 'reports' }, { text: 'Newsletters', value: 'newsletters' }, { text: 'Research', value: 'research' }] }, width: 'half' } },
      { field: 'publication_date', type: 'date', meta: { interface: 'datetime', width: 'half' } },
      { field: 'author', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'published', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: false } },
      { field: 'date_created', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } },
      { field: 'date_updated', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } }
    ];

    for (const field of publicationsFields) {
      await directus.request(createField('publications', field));
    }
    console.log('✅ Publications collection created');

    // Create Leadership collection
    await directus.request(createCollection({
      collection: 'leadership',
      meta: {
        collection: 'leadership',
        icon: 'people',
        note: 'HCMSA leadership and office bearers',
        display_template: '{{name}} - {{position}}',
        hidden: false,
        singleton: false
      },
      schema: {
        name: 'leadership'
      }
    }));

    // Add fields to Leadership collection
    const leadershipFields = [
      { field: 'id', type: 'integer', meta: { hidden: true, readonly: true, interface: 'input', primary_key: true } },
      { field: 'name', type: 'string', meta: { interface: 'input', required: true, width: 'half' } },
      { field: 'position', type: 'string', meta: { interface: 'input', required: true, width: 'half' } },
      { field: 'bio', type: 'text', meta: { interface: 'textarea', width: 'full' } },
      { field: 'photo', type: 'uuid', meta: { interface: 'file-image', width: 'half' } },
      { field: 'email', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'order', type: 'integer', meta: { interface: 'input', width: 'half', default_value: 1 } },
      { field: 'active', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: true } },
      { field: 'date_created', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } },
      { field: 'date_updated', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true } }
    ];

    for (const field of leadershipFields) {
      await directus.request(createField('leadership', field));
    }
    console.log('✅ Leadership collection created');

    console.log('🎉 All collections created successfully!');
    console.log('✅ Directus CMS is ready for the HCMSA website');

  } catch (error) {
    console.error('❌ Error setting up collections:', error.message);
    if (error.errors) {
      console.error('Details:', error.errors);
    }
  }
}

setupCollections();