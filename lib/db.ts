/**
 * lib/db.ts
 *
 * Base de données SQLite via better-sqlite3.
 * Installation requise : npm install better-sqlite3 @types/better-sqlite3
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'bsfacile.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);

    _db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        email      TEXT    UNIQUE NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        last_login INTEGER
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id          INTEGER NOT NULL REFERENCES users(id),
        type             TEXT    NOT NULL,
        checkout_id      TEXT    UNIQUE,
        amount_cents     INTEGER NOT NULL,
        status           TEXT    NOT NULL DEFAULT 'active',
        bulletins_total  INTEGER NOT NULL DEFAULT 0,
        bulletins_used   INTEGER NOT NULL DEFAULT 0,
        expires_at       INTEGER,
        created_at       INTEGER NOT NULL DEFAULT (unixepoch())
      );

      CREATE TABLE IF NOT EXISTS bulletins (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id         INTEGER REFERENCES users(id),
        subscription_id INTEGER REFERENCES subscriptions(id),
        data            TEXT    NOT NULL,
        pdf_path        TEXT,
        created_at      INTEGER NOT NULL DEFAULT (unixepoch())
      );

      CREATE TABLE IF NOT EXISTS magic_links (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        email      TEXT    NOT NULL,
        token      TEXT    UNIQUE NOT NULL,
        expires_at INTEGER NOT NULL,
        used       INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL DEFAULT (unixepoch())
      );
    `);

    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
  }
  return _db;
}

// ---------------------------------------------------------------------------
// User helpers
// ---------------------------------------------------------------------------

export interface DbUser {
  id: number;
  email: string;
  created_at: number;
  last_login: number | null;
}

export function findOrCreateUser(email: string): DbUser {
  const db = getDb();
  const existing = db
    .prepare('SELECT id, email, created_at, last_login FROM users WHERE email = ?')
    .get(email) as DbUser | undefined;
  if (existing) return existing;

  const result = db.prepare('INSERT INTO users (email) VALUES (?)').run(email);
  return {
    id: result.lastInsertRowid as number,
    email,
    created_at: Math.floor(Date.now() / 1000),
    last_login: null,
  };
}

export function updateLastLogin(userId: number): void {
  const db = getDb();
  db.prepare('UPDATE users SET last_login = unixepoch() WHERE id = ?').run(userId);
}

export function getUserByEmail(email: string): DbUser | undefined {
  return getDb()
    .prepare('SELECT id, email, created_at, last_login FROM users WHERE email = ?')
    .get(email) as DbUser | undefined;
}

export function getUserById(id: number): DbUser | undefined {
  return getDb()
    .prepare('SELECT id, email, created_at, last_login FROM users WHERE id = ?')
    .get(id) as DbUser | undefined;
}

// ---------------------------------------------------------------------------
// Subscription helpers
// ---------------------------------------------------------------------------

export interface DbSubscription {
  id: number;
  user_id: number;
  type: string;
  checkout_id: string | null;
  amount_cents: number;
  status: string;
  bulletins_total: number;
  bulletins_used: number;
  expires_at: number | null;
  created_at: number;
}

export function createSubscription(params: {
  userId: number;
  type: string;
  checkoutId: string;
  amountCents: number;
  bulletinsTotal: number;
  expiresAt?: number;
}): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO subscriptions (user_id, type, checkout_id, amount_cents, bulletins_total, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    params.userId,
    params.type,
    params.checkoutId,
    params.amountCents,
    params.bulletinsTotal,
    params.expiresAt ?? null,
  );
}

export function getActiveSubscription(userId: number): DbSubscription | undefined {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  return db.prepare(`
    SELECT * FROM subscriptions
    WHERE user_id = ?
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > ?)
      AND (bulletins_total = 0 OR bulletins_used < bulletins_total)
    ORDER BY created_at DESC LIMIT 1
  `).get(userId, now) as DbSubscription | undefined;
}

export function incrementBulletinUsed(subscriptionId: number): void {
  getDb()
    .prepare('UPDATE subscriptions SET bulletins_used = bulletins_used + 1 WHERE id = ?')
    .run(subscriptionId);
}

// ---------------------------------------------------------------------------
// Magic link helpers
// ---------------------------------------------------------------------------

export interface DbMagicLink {
  id: number;
  email: string;
  token: string;
  expires_at: number;
  used: number;
  created_at: number;
}

export function createMagicLink(email: string, token: string, expiresAt: number): void {
  getDb()
    .prepare('INSERT INTO magic_links (email, token, expires_at) VALUES (?, ?, ?)')
    .run(email, token, expiresAt);
}

export function getMagicLink(token: string): DbMagicLink | undefined {
  return getDb()
    .prepare('SELECT * FROM magic_links WHERE token = ?')
    .get(token) as DbMagicLink | undefined;
}

export function markMagicLinkUsed(token: string): void {
  getDb()
    .prepare('UPDATE magic_links SET used = 1 WHERE token = ?')
    .run(token);
}

// ---------------------------------------------------------------------------
// Bulletin helpers
// ---------------------------------------------------------------------------

export function saveBulletin(params: {
  userId: number | null;
  subscriptionId: number | null;
  data: object;
  pdfPath?: string;
}): number {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO bulletins (user_id, subscription_id, data, pdf_path)
    VALUES (?, ?, ?, ?)
  `).run(
    params.userId,
    params.subscriptionId,
    JSON.stringify(params.data),
    params.pdfPath ?? null,
  );
  return result.lastInsertRowid as number;
}

export function getBulletinsByUser(userId: number): DbSubscription[] {
  return getDb()
    .prepare('SELECT * FROM bulletins WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId) as DbSubscription[];
}

export function getFreeBulletinsCount(userId: number): number {
  const row = getDb()
    .prepare('SELECT COUNT(*) as cnt FROM bulletins WHERE user_id = ? AND subscription_id IS NULL')
    .get(userId) as { cnt: number };
  return row?.cnt ?? 0;
}
