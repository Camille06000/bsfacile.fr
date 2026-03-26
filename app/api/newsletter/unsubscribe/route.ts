import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email') ?? '';
  if (!email) {
    return new NextResponse('<h2>Email manquant.</h2>', { headers: { 'Content-Type': 'text/html' } });
  }
  try {
    getDb()
      .prepare("UPDATE newsletter SET status = 'unsubscribed' WHERE email = ?")
      .run(email.toLowerCase());

    return new NextResponse(
      `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Désinscription</title></head>
<body style="font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f0f4ff;margin:0">
  <div style="background:white;padding:48px;border-radius:16px;text-align:center;max-width:400px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="font-size:48px;margin-bottom:16px">👋</div>
    <h2 style="color:#111827;margin:0 0 12px">Désinscription confirmée</h2>
    <p style="color:#6b7280;line-height:1.6">Vous ne recevrez plus nos emails. Vous pouvez vous réinscrire à tout moment depuis le site.</p>
    <a href="https://bulletinfacile.fr" style="display:inline-block;margin-top:24px;background:#1a3a8f;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700">
      Retour au site
    </a>
  </div>
</body>
</html>`,
      { headers: { 'Content-Type': 'text/html' } },
    );
  } catch {
    return new NextResponse('<h2>Erreur.</h2>', { headers: { 'Content-Type': 'text/html' } });
  }
}
