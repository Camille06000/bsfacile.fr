/**
 * GET /api/auth/me
 *
 * Retourne l'utilisateur courant et son abonnement actif depuis le cookie JWT.
 * 200 : { user: { id, email }, subscription: DbSubscription | null }
 * 401 : { error: 'Non authentifié' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getUserById, getActiveSubscription, getFreeBulletinsCount } from '@/lib/db';

const COOKIE_NAME = 'session';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET non défini dans les variables d'environnement.");
  return new TextEncoder().encode(secret);
}

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(sessionCookie.value, getJwtSecret());

    const userId = Number(payload.sub);
    if (!userId) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 401 });
    }

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 401 });
    }

    const subscription = getActiveSubscription(userId) ?? null;
    const freeBulletinsUsed = subscription ? 0 : getFreeBulletinsCount(userId);

    return NextResponse.json({
      user: { id: user.id, email: user.email },
      subscription,
      freeBulletinsUsed,
    });
  } catch {
    // JWT invalide ou expiré
    return NextResponse.json({ error: 'Session expirée' }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  // Déconnexion : supprime le cookie de session
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}
