import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { calculerBS } from '@/lib/cotisations';
import { getUserById, getActiveSubscription, incrementBulletinUsed, saveBulletin } from '@/lib/db';

const COOKIE_NAME = 'session';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET non défini.");
  return new TextEncoder().encode(secret);
}

export async function POST(req: NextRequest) {
  // --- Auth check ---
  const sessionCookie = req.cookies.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'Non authentifié. Connectez-vous pour générer un bulletin.' }, { status: 401 });
  }

  let userId: number;
  try {
    const { payload } = await jwtVerify(sessionCookie.value, getJwtSecret());
    userId = Number(payload.sub);
    if (!userId) throw new Error('Invalid sub');
  } catch {
    return NextResponse.json({ error: 'Session expirée. Reconnectez-vous.' }, { status: 401 });
  }

  const user = getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 401 });
  }

  const subscription = getActiveSubscription(userId);
  if (!subscription) {
    return NextResponse.json({ error: 'Aucun abonnement actif. Achetez un accès pour générer des bulletins.', redirect: '/tarifs' }, { status: 403 });
  }
  // ---
  const body = await req.json();
  const {
    brutMensuel, statut, effectif, tauxPAS,
    annee, mois,
    entrepriseNom, entrepriseSiret, entrepriseAdresse, entrepriseNaf, entrepriseConvention,
    salariéNom, salariéPrenom, salariéNss, salariéAdresse, salariéPoste,
    salariéCoefficient, salariéMatricule, salariéEntreeDate,
    heuresMensuelles, tauxHoraire,
    heuresSupp25, heuresSupp50, heuresCompl, heuresMajorees,
    prime, avantageNature, acompte,
    absences,
  } = body;

  const brut = parseFloat(brutMensuel);
  if (!brut || brut < 1 || brut > 200000) {
    return NextResponse.json({ error: 'Salaire brut invalide (1 – 200 000 €)' }, { status: 400 });
  }

  const result = calculerBS({
    brutMensuel: brut,
    statut: statut || 'non-cadre',
    effectif: effectif || '<50',
    tauxPAS: parseFloat(tauxPAS) || 0,
    annee: (parseInt(annee) as 2025 | 2026) || 2026,
    mois: parseInt(mois) || new Date().getMonth() + 1,
    entrepriseNom, entrepriseSiret, entrepriseAdresse, entrepriseNaf, entrepriseConvention,
    salariéNom, salariéPrenom, salariéNss, salariéAdresse, salariéPoste,
    salariéCoefficient, salariéMatricule, salariéEntreeDate,
    heuresMensuelles: heuresMensuelles ? parseFloat(heuresMensuelles) : undefined,
    tauxHoraire: tauxHoraire ? parseFloat(tauxHoraire) : undefined,
    heuresSupp25: heuresSupp25 ? parseFloat(heuresSupp25) : undefined,
    heuresSupp50: heuresSupp50 ? parseFloat(heuresSupp50) : undefined,
    heuresCompl: heuresCompl ? parseFloat(heuresCompl) : undefined,
    heuresMajorees: Array.isArray(heuresMajorees) ? heuresMajorees : undefined,
    prime: prime ? parseFloat(prime) : undefined,
    avantageNature: avantageNature ? parseFloat(avantageNature) : undefined,
    acompte: acompte ? parseFloat(acompte) : undefined,
    absences: Array.isArray(absences) ? absences : undefined,
  });

  // Track usage
  if (subscription.bulletins_total > 0) {
    incrementBulletinUsed(subscription.id);
  }
  saveBulletin({ userId, subscriptionId: subscription.id, data: body });

  return NextResponse.json(result);
}
