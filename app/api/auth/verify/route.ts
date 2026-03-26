/**
 * GET /api/auth/verify?token=XXX
 *
 * Vérifie le token magique, crée un cookie de session JWT, redirige vers /dashboard.
 *
 * Variables d'environnement requises :
 *   JWT_SECRET       — secret de signature (au moins 32 caractères)
 *   NEXT_PUBLIC_BASE_URL
 */

import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import {
  getMagicLink,
  markMagicLinkUsed,
  findOrCreateUser,
  updateLastLogin,
} from '@/lib/db';

const COOKIE_NAME = 'session';
const SESSION_DAYS = 30;

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET non défini dans les variables d'environnement.");
  return new TextEncoder().encode(secret);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') ?? '';

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=token_manquant`);
  }

  try {
    const link = getMagicLink(token);

    if (!link) {
      return NextResponse.redirect(`${baseUrl}/dashboard?error=token_invalide`);
    }

    if (link.used === 1) {
      return NextResponse.redirect(`${baseUrl}/dashboard?error=token_deja_utilise`);
    }

    const now = Math.floor(Date.now() / 1000);
    if (link.expires_at < now) {
      return NextResponse.redirect(`${baseUrl}/dashboard?error=token_expire`);
    }

    // Marque le lien comme utilisé
    markMagicLinkUsed(token);

    // Crée ou retrouve l'utilisateur
    const user = findOrCreateUser(link.email);
    updateLastLogin(user.id);

    // Crée le JWT (valable SESSION_DAYS jours)
    const expiresIn = SESSION_DAYS * 24 * 60 * 60; // en secondes
    const jwt = await new SignJWT({ sub: String(user.id), email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${SESSION_DAYS}d`)
      .sign(getJwtSecret());

    // Crée la réponse de redirection avec le cookie de session
    const response = NextResponse.redirect(`${baseUrl}/dashboard`);
    response.cookies.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: expiresIn,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[verify]', err);
    return NextResponse.redirect(`${baseUrl}/dashboard?error=erreur_serveur`);
  }
}
