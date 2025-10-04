import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// CMS Tables in public schema
export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featured_image: text("featured_image"),
  published: boolean("published").default(false).notNull(),
  date_published: timestamp("date_published", { withTimezone: true }),
  date_created: timestamp("date_created", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  event_date: timestamp("event_date", { withTimezone: true }).notNull(),
  end_date: timestamp("end_date", { withTimezone: true }),
  featured_image: text("featured_image"),
  registration_required: boolean("registration_required").default(false).notNull(),
  external_registration_url: text("external_registration_url"),
  published: boolean("published").default(false).notNull(),
  date_created: timestamp("date_created", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const publications = pgTable("publications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  document_file: text("document_file"),
  category: text("category", { enum: ["guidelines", "reports", "newsletters", "research"] }).notNull(),
  publication_date: timestamp("publication_date", { withTimezone: true }),
  author: text("author"),
  published: boolean("published").default(false).notNull(),
  date_created: timestamp("date_created", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const leadership = pgTable("leadership", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio"),
  photo: text("photo"),
  email: text("email"),
  phone: text("phone"),
  "order": integer("order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  date_created: timestamp("date_created", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  category: text("category", { enum: ["events", "activities", "awards", "conferences", "other"] }).notNull(),
  "order": integer("order").default(0).notNull(),
  published: boolean("published").default(false).notNull(),
  date_created: timestamp("date_created", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  date_updated: timestamp("date_updated", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull()
});

// Insert schemas for CMS content
export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  date_created: true,
  date_updated: true
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  date_created: true,
  date_updated: true
}).extend({
  event_date: z.coerce.date(),
  end_date: z.coerce.date().optional()
});

export const insertPublicationSchema = createInsertSchema(publications).omit({
  id: true,
  date_created: true,
  date_updated: true
}).extend({
  publication_date: z.coerce.date().optional().nullable()
});

export const insertLeadershipSchema = createInsertSchema(leadership).omit({
  id: true,
  date_created: true,
  date_updated: true
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  date_created: true,
  date_updated: true
});

// Types for CMS content
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publications.$inferSelect;

export type InsertLeadership = z.infer<typeof insertLeadershipSchema>;
export type Leadership = typeof leadership.$inferSelect;

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;
