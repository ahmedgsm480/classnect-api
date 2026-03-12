import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';
import { users, otp_codes } from './db/schema';
import { eq, desc, and, gt } from 'drizzle-orm';

const app = new Hono<{ Bindings: { DB: D1Database } }>().basePath('/api');

// Apply CORS
app.use('/*', cors({ 
  origin: '*', 
  allowHeaders: ['Content-Type', 'Authorization'], 
  allowMethods: ['POST', 'GET', 'OPTIONS'] 
}));

// POST /auth/send-otp
app.post('/auth/send-otp', async (c) => {
  try {
    const { phoneNumber } = await c.req.json();
    if (!phoneNumber) {
      return c.json({ error: 'Phone number is required' }, 400);
    }

    // Generate a 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    // Calculate expiresAt (5 minutes from now)
    const expiresAt = Date.now() + 5 * 60 * 1000;

    const db = drizzle(c.env.DB);

    // Insert into otp_codes
    await db.insert(otp_codes).values({ 
      phoneNumber, 
      code, 
      expiresAt 
    });

    // Mock WhatsApp API
    console.log(`[WhatsApp Mock] Sending OTP ${code} to ${phoneNumber}`);

    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error in send-otp:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /auth/verify-otp
app.post('/auth/verify-otp', async (c) => {
  try {
    const { phoneNumber, code } = await c.req.json();
    if (!phoneNumber || !code) {
      return c.json({ error: 'Phone number and code are required' }, 400);
    }

    const db = drizzle(c.env.DB);

    // Query otp_codes
    const [validOtp] = await db
      .select()
      .from(otp_codes)
      .where(
        and(
          eq(otp_codes.phoneNumber, phoneNumber),
          eq(otp_codes.code, code),
          gt(otp_codes.expiresAt, Date.now())
        )
      )
      .limit(1);

    if (!validOtp) {
      return c.json({ error: 'Invalid or expired code' }, 400);
    }

    // Query user table by phoneNumber
    let [fetchedUser] = await db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, phoneNumber))
      .limit(1);

    // If user doesn't exist, insert new user
    if (!fetchedUser) {
      const newUser = { 
        id: crypto.randomUUID(), 
        phoneNumber, 
        name: 'Student', 
        currentTrackId: 'ma-3ac-math-biof' 
      };
      
      const [insertedUser] = await db
        .insert(users)
        .values(newUser)
        .returning();
      
      fetchedUser = insertedUser;
    }

    // Delete used OTP code
    await db.delete(otp_codes).where(eq(otp_codes.id, validOtp.id));

    return c.json({ user: fetchedUser });
  } catch (error: any) {
    console.error('Error in verify-otp:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// GET /leaderboard
app.get('/leaderboard', async (c) => {
  try {
    const trackId = c.req.query('trackId');
    if (!trackId) {
      return c.json({ error: 'trackId is required' }, 400);
    }

    const db = drizzle(c.env.DB);

    // Fetch top 50 users sorted by xp descending
    const topUsers = await db
      .select()
      .from(users)
      .where(eq(users.currentTrackId, trackId))
      .orderBy(desc(users.xp))
      .limit(50);

    return c.json(topUsers);
  } catch (error: any) {
    console.error('Error in leaderboard:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
