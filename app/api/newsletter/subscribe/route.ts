import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDb } from '@/lib/db';
import { createTransporter, newsletterWelcomeEmail } from '@/lib/mailer';

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prenom = (body.prenom ?? '').trim();
    const email  = (body.email  ?? '').trim().toLowerCase();

    if (!prenom || prenom.length < 2) {
      return NextResponse.json({ error: 'Prénom requis (min. 2 caractères).' }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    const db = getDb();

    const existing = db
      .prepare('SELECT id, status FROM newsletter WHERE email = ?')
      .get(email) as { id: number; status: string } | undefined;

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({ message: 'Vous êtes déjà inscrit(e) !' }, { status: 200 });
      }
      db.prepare('UPDATE newsletter SET status = ?, prenom = ? WHERE email = ?').run('active', prenom, email);
    } else {
      db.prepare('INSERT INTO newsletter (prenom, email) VALUES (?, ?)').run(prenom, email);
    }

    // Envoyer le mail de bienvenue
    try {
      const transporter = createTransporter();
      const { subject, html } = newsletterWelcomeEmail(prenom, email);
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'Bulletin Facile <noreply@bulletinfacile.fr>',
        to: email,
        subject,
        html,
      });
    } catch (mailErr) {
      console.error('Newsletter mail error:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: `Bienvenue ${prenom} ! Vérifiez votre boîte mail 📬`,
    });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
