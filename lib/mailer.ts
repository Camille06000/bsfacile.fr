import nodemailer from 'nodemailer';

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export function newsletterWelcomeEmail(prenom: string, email: string): { subject: string; html: string } {
  const unsubscribeUrl = `https://bulletinfacile.fr/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const year = new Date().getFullYear();

  return {
    subject: `Bienvenue ${prenom} ! Vos astuces paie arrivent 🎉`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue chez Bulletin Facile</title>
</head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:Inter,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(26,58,143,0.10);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a3a8f 0%,#2563eb 60%,#dc2626 100%);padding:40px 48px 32px;text-align:center;">
            <img src="https://bulletinfacile.fr/logo.svg" alt="Bulletin Facile" width="200" height="50"
              style="height:50px;width:auto;filter:brightness(0) invert(1);display:block;margin:0 auto 20px;" />
            <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:50px;padding:6px 20px;font-size:13px;color:white;font-weight:600;">
              ✨ Vous faites partie de la famille !
            </div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:48px 48px 32px;">
            <p style="margin:0 0 6px;font-size:15px;color:#6b7280;">Bonjour,</p>
            <h1 style="margin:0 0 24px;font-size:30px;font-weight:900;color:#111827;line-height:1.15;">
              Bienvenue <span style="color:#1a3a8f;">${prenom}</span>&nbsp;! 👋
            </h1>
            <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.7;">
              Merci de rejoindre <strong style="color:#1a3a8f;">Bulletin Facile</strong> — le générateur de bulletins de salaire
              le plus simple de France. On est vraiment ravis de vous avoir parmi nous !
            </p>

            <!-- Feature box -->
            <div style="background:#eff6ff;border-left:4px solid #1a3a8f;border-radius:0 12px 12px 0;padding:20px 24px;margin:24px 0;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1a3a8f;text-transform:uppercase;letter-spacing:0.5px;">Ce qui vous attend :</p>
              <ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:15px;line-height:2.1;">
                <li>📊 <strong>Calculs URSSAF 2026</strong> automatiques et conformes</li>
                <li>⚡ <strong>3 bulletins offerts</strong> pour démarrer sans engagement</li>
                <li>📄 <strong>PDF professionnel</strong> prêt en 2 minutes</li>
                <li>💡 <strong>Astuces paie</strong> exclusives chaque semaine</li>
              </ul>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin:32px 0;">
              <a href="https://bulletinfacile.fr/generateur"
                style="display:inline-block;background:linear-gradient(135deg,#1a3a8f,#2563eb);color:white;text-decoration:none;font-size:17px;font-weight:800;padding:16px 40px;border-radius:12px;box-shadow:0 4px 16px rgba(26,58,143,0.35);">
                Créer mon premier bulletin →
              </a>
            </div>

            <hr style="border:none;border-top:1px solid #f3f4f6;margin:32px 0;" />

            <!-- Tip -->
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">💡 Le saviez-vous ?</p>
            <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">
              La <strong>réduction Fillon</strong> peut vous faire économiser jusqu'à
              <strong style="color:#dc2626;">450 €/mois par salarié</strong> au SMIC.
              Bulletin Facile la calcule automatiquement pour vous.
            </p>
          </td>
        </tr>

        <!-- FOOTER EMAIL -->
        <tr>
          <td style="background:#f8fafc;padding:24px 48px;border-top:1px solid #e5e7eb;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#374151;">Bulletin Facile</p>
                  <p style="margin:0;font-size:12px;color:#9ca3af;">Le bulletin de paie plus facile que jamais</p>
                </td>
                <td align="right">
                  <a href="${unsubscribeUrl}" style="font-size:12px;color:#9ca3af;text-decoration:underline;">Se désinscrire</a>
                </td>
              </tr>
            </table>
            <p style="margin:12px 0 0;font-size:11px;color:#d1d5db;text-align:center;">
              © ${year} Bulletin Facile · Conforme URSSAF 2026 · bulletinfacile.fr
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}
