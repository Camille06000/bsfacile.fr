/**
 * lib/subscription-tiers.ts
 *
 * Source unique de vérité pour le mapping prix → type d'abonnement + quota.
 * Importé par /api/webhook et /api/checkout/verify pour éviter tout drift.
 *
 * Règles métier :
 *  - Mensuel  : quota one-shot valable jusqu'à la fin du mois calendaire en cours.
 *  - Annuel   : même quota mensuel, mais renouvelé chaque 1er du mois (calculé dynamiquement
 *               côté DB via getBulletinsThisCalendarMonth — voir lib/db.ts).
 *  - Quotas par palier (mensuel & annuel) : 1-3 sal → 6 / 4-9 → 18 / 10-24 → 48 / 25-49 → 98.
 */

export interface SubscriptionMeta {
  type: string;
  bulletinsTotal: number;
  expiresAt?: number;
}

function endOfCurrentMonth(): number {
  const now = new Date();
  return Math.floor(new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime() / 1000);
}

function plusOneYear(): number {
  const now = new Date();
  return Math.floor(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()).getTime() / 1000);
}

export function resolveSubscription(amountCents: number): SubscriptionMeta {
  switch (amountCents) {
    // Bulletins unitaires & packs
    case 890:   return { type: 'single', bulletinsTotal: 1 };
    case 2270:  return { type: 'pack3',  bulletinsTotal: 3 };
    case 2900:  return { type: 'pack5',  bulletinsTotal: 5 };  // legacy
    case 3695:  return { type: 'pack5',  bulletinsTotal: 5 };
    case 6890:  return { type: 'pack10', bulletinsTotal: 10 };
    case 12780: return { type: 'pack20', bulletinsTotal: 20 };

    // Abonnements mensuels — quota valable jusqu'à fin du mois calendaire
    case 2885:  return { type: 'monthly', bulletinsTotal: 6,  expiresAt: endOfCurrentMonth() };
    case 4485:  return { type: 'monthly', bulletinsTotal: 18, expiresAt: endOfCurrentMonth() };
    case 7485:  return { type: 'monthly', bulletinsTotal: 48, expiresAt: endOfCurrentMonth() };
    case 13485: return { type: 'monthly', bulletinsTotal: 98, expiresAt: endOfCurrentMonth() };

    // Abonnements annuels — quota mensuel renouvelé chaque 1er du mois, sub valide 1 an
    case 19800: return { type: 'annual', bulletinsTotal: 6,  expiresAt: plusOneYear() };
    case 32800: return { type: 'annual', bulletinsTotal: 18, expiresAt: plusOneYear() };
    case 59800: return { type: 'annual', bulletinsTotal: 48, expiresAt: plusOneYear() };
    case 99800: return { type: 'annual', bulletinsTotal: 98, expiresAt: plusOneYear() };

    default: {
      const euros = amountCents / 100;
      if (euros <= 9)   return { type: 'single',  bulletinsTotal: 1 };
      if (euros <= 25)  return { type: 'pack3',   bulletinsTotal: 3 };
      if (euros <= 40)  return { type: 'pack5',   bulletinsTotal: 5 };
      if (euros <= 80)  return { type: 'pack10',  bulletinsTotal: 10 };
      if (euros <= 140) return { type: 'monthly', bulletinsTotal: 6, expiresAt: endOfCurrentMonth() };
      return { type: 'annual', bulletinsTotal: 6, expiresAt: plusOneYear() };
    }
  }
}
