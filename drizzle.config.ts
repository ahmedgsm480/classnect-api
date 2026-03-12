import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    // Note: The hash 'YOUR_DATABASE_HASH_HERE' needs to be replaced with the actual 
    // local sqlite file name found in your .wrangler directory after running wrangler d1 migrations apply
    url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/9b9b5afc67bd05f5700f2fa9b695a1a2383d76ff91016319e937a3ff88d7970f.sqlite',
  },
});
