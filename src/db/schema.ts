import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  image: text('image'),
  emailVerified: integer('emailVerified'),
  phoneNumber: text('phoneNumber').unique(),
  currentTrackId: text('currentTrackId').default('ma-2bac-math'),
  xp: integer('xp').default(0),
});

export const otp_codes = sqliteTable('otp_codes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  phoneNumber: text('phoneNumber').notNull(),
  code: text('code').notNull(),
  expiresAt: integer('expiresAt').notNull(),
  createdAt: integer('createdAt').default(sql`CURRENT_TIMESTAMP`),
});

export const progress = sqliteTable('progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  unitId: text('unitId').notNull(),
  isCompleted: integer('isCompleted').default(0),
  score: integer('score').default(0),
  updatedAt: integer('updatedAt'),
}, (table) => ({
  uniqueProgress: uniqueIndex('progress_userId_unitId_unique').on(table.userId, table.unitId),
}));

export const feedback = sqliteTable('feedback', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  message: text('message').notNull(),
  status: text('status').default('pending'),
  createdAt: integer('createdAt').default(sql`CURRENT_TIMESTAMP`),
});

export const errorLogs = sqliteTable('error_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('userId').references(() => users.id, { onDelete: 'set null' }),
  message: text('message').notNull(),
  stack: text('stack'),
  signature: text('signature').notNull().unique(),
  occurrences: integer('occurrences').default(1),
  resolved: integer('resolved').default(0),
  updatedAt: integer('updatedAt').default(sql`CURRENT_TIMESTAMP`),
  createdAt: integer('createdAt').default(sql`CURRENT_TIMESTAMP`),
});
