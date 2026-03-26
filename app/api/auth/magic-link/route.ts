/**
 * POST /api/auth/magic-link
 *
 * Corps : { email: string }
 * Génère un lien magique (token UUID), le stocke 15 min, envoie un email.
 *
 * Variables d'environnement requises :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 *   NEXT_PUBLIC_BASE_URL (ex. https://bulletinfacile.fr)
 */

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createMagicLink } from '@/lib/db';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body.email ?? '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    // Génère un token unique et une expiration à 15 minutes
    const token = crypto.randomUUID();
    const expiresAt = Math.floor(Date.now() / 1000) + 15 * 60;

    createMagicLink(email, token, expiresAt);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';
    const magicUrl = `${baseUrl}/api/auth/verify?token=${token}`;

    // Envoi de l'email via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Bulletin Facile" <noreply@bulletinfacile.fr>',
      to: email,
      subject: 'Votre lien de connexion — Bulletin Facile',
      text: `Bonjour,\n\nCliquez sur ce lien pour accéder à votre espace Bulletin Facile (valable 15 minutes) :\n\n${magicUrl}\n\nSi vous n'avez pas demandé ce lien, ignorez cet email.\n\nL'équipe Bulletin Facile`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8"></head>
        <body style="font-family:Inter,Arial,sans-serif;background:#f9fafb;margin:0;padding:32px;">
          <div style="max-width:480px;margin:0 auto;background:white;border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:36px;">📄</span>
              <h1 style="font-size:22px;font-weight:900;color:#111827;margin:12px 0 4px;">Bulletin Facile</h1>
              <p style="color:#6b7280;font-size:14px;margin:0;">Votre lien de connexion</p>
            </div>
            <p style="color:#374151;font-size:16px;line-height:1.6;">Bonjour,</p>
            <p style="color:#374151;font-size:16px;line-height:1.6;">
              Cliquez sur le bouton ci-dessous pour accéder à votre espace. Ce lien est valable <strong>15 minutes</strong>.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${magicUrl}"
                 style="display:inline-block;background:#2563eb;color:white;font-weight:800;font-size:16px;padding:16px 32px;border-radius:12px;text-decoration:none;">
                Accéder à mon espace →
              </a>
            </div>
            <p style="color:#9ca3af;font-size:13px;line-height:1.5;">
              Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
              <a href="${magicUrl}" style="color:#2563eb;word-break:break-all;">${magicUrl}</a>
            </p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
            <p style="color:#9ca3af;font-size:12px;">
              Si vous n'avez pas demandé ce lien, ignorez cet email.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[magic-link]', err);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 },
    );
  }
}
