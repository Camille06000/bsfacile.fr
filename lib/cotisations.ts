// lib/cotisations.ts — Moteur de calcul BS France 2025/2026

export const PARAMS = {
  2025: { pmss: 3925, smicMensuel: 1801.80, smicAnnuel: 21621.60 },
  2026: { pmss: 4005, smicMensuel: 1801.80, smicAnnuel: 21621.60 },
} as const;

export interface InputBS {
  brutMensuel: number;
  statut: 'cadre' | 'non-cadre';
  effectif: '<50' | '>=50';
  tauxPAS: number; // en %
  annee?: 2025 | 2026;
  mois?: number;
  // Infos entreprise
  entrepriseNom?: string;
  entrepriseSiret?: string;
  entrepriseAdresse?: string;
  entrepriseNaf?: string;
  entrepriseConvention?: string;
  // Infos salarié
  salariéNom?: string;
  salariéPrenom?: string;
  salariéNss?: string;
  salariéAdresse?: string;
  salariéPoste?: string;
  salariéCoefficient?: string;
  salariéMatricule?: string;
  // Rémunération
  heuresMensuelles?: number;
  tauxHoraire?: number;
}

export interface LigneBS {
  intitule: string;
  base: number;
  tauxSalarial: number | null; // null = ligne patronale uniquement
  montantSalarial: number;
  tauxPatronal: number | null; // null = ligne salariale uniquement
  montantPatronal: number;
  section?: 'retraite' | 'chomage' | 'sante' | 'famille' | 'csg' | 'autre';
}

export interface ResultBS {
  lignes: LigneBS[];
  totaux: {
    brutMensuel: number;
    totalCotisationsSalariales: number;
    totalCotisationsPatronales: number;
    reductionFillon: number;
    netAvantPAS: number;
    tauxPAS: number;
    montantPAS: number;
    netAPayer: number;
    coutEmployeur: number;
  };
  params: { pmss: number; smicMensuel: number; annee: number; mois: number };
  input: InputBS;
}

export function calculerBS(input: InputBS): ResultBS {
  const { brutMensuel, statut, effectif, tauxPAS } = input;
  const annee = input.annee ?? 2026;
  const mois = input.mois ?? new Date().getMonth() + 1;
  const { pmss, smicMensuel, smicAnnuel } = PARAMS[annee] ?? PARAMS[2026];

  const r = (n: number) => Math.round(n * 100) / 100;
  const T1 = Math.min(brutMensuel, pmss);            // Tranche 1 (≤ PMSS)
  const T2 = Math.max(0, Math.min(brutMensuel, 8 * pmss) - pmss); // T2 (PMSS → 8×PMSS)
  const T2chom = Math.max(0, Math.min(brutMensuel, 4 * pmss) - pmss); // T2 chômage (PMSS → 4×PMSS)
  const assietteCsg = r(brutMensuel * 0.9825);

  const lignes: LigneBS[] = [];

  // ── Maladie / Sécurité sociale (patronal uniquement)
  lignes.push({
    intitule: 'Maladie – maternité – invalidité – décès',
    base: brutMensuel, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 7, montantPatronal: r(brutMensuel * 0.07),
    section: 'sante',
  });

  // ── Vieillesse plafonnée
  lignes.push({
    intitule: 'Assurance vieillesse plafonnée',
    base: T1, tauxSalarial: 6.90, montantSalarial: r(T1 * 0.069),
    tauxPatronal: 8.55, montantPatronal: r(T1 * 0.0855),
    section: 'retraite',
  });

  // ── Vieillesse déplafonnée
  const tauxVDeplatPatronal = annee >= 2026 ? 2.02 : 2.02; // 2.02% standard (2.11% observé = conv. BTP)
  lignes.push({
    intitule: 'Assurance vieillesse déplafonnée',
    base: brutMensuel, tauxSalarial: 0.40, montantSalarial: r(brutMensuel * 0.004),
    tauxPatronal: tauxVDeplatPatronal, montantPatronal: r(brutMensuel * tauxVDeplatPatronal / 100),
    section: 'retraite',
  });

  // ── Allocations familiales
  const tauxAF = brutMensuel <= 3.5 * smicMensuel ? 3.45 : 5.25;
  lignes.push({
    intitule: 'Allocations familiales',
    base: brutMensuel, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: tauxAF, montantPatronal: r(brutMensuel * tauxAF / 100),
    section: 'famille',
  });

  // ── Accidents du travail (taux moyen)
  lignes.push({
    intitule: 'Accidents du travail – maladies professionnelles',
    base: brutMensuel, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 2.22, montantPatronal: r(brutMensuel * 0.0222),
    section: 'sante',
  });

  // ── AGIRC-ARRCO T1
  lignes.push({
    intitule: 'AGIRC-ARRCO Tranche 1',
    base: T1, tauxSalarial: 3.15, montantSalarial: r(T1 * 0.0315),
    tauxPatronal: 4.72, montantPatronal: r(T1 * 0.0472),
    section: 'retraite',
  });

  // ── AGIRC-ARRCO T2 (si brut > PMSS)
  if (T2 > 0) {
    lignes.push({
      intitule: 'AGIRC-ARRCO Tranche 2',
      base: T2, tauxSalarial: 8.64, montantSalarial: r(T2 * 0.0864),
      tauxPatronal: 12.95, montantPatronal: r(T2 * 0.1295),
      section: 'retraite',
    });
  }

  // ── CEG T1
  lignes.push({
    intitule: 'CEG Tranche 1',
    base: T1, tauxSalarial: 0.86, montantSalarial: r(T1 * 0.0086),
    tauxPatronal: 1.29, montantPatronal: r(T1 * 0.0129),
    section: 'retraite',
  });

  // ── CEG T2 (si brut > PMSS)
  if (T2 > 0) {
    lignes.push({
      intitule: 'CEG Tranche 2',
      base: T2, tauxSalarial: 1.08, montantSalarial: r(T2 * 0.0108),
      tauxPatronal: 1.62, montantPatronal: r(T2 * 0.0162),
      section: 'retraite',
    });
  }

  // ── CET (Contribution Exceptionnelle Temporaire)
  lignes.push({
    intitule: 'CET',
    base: brutMensuel, tauxSalarial: 0.14, montantSalarial: r(brutMensuel * 0.0014),
    tauxPatronal: 0.21, montantPatronal: r(brutMensuel * 0.0021),
    section: 'retraite',
  });

  // ── Assurance chômage (patronal uniquement depuis 10/2018)
  const assietteChomT1 = T1;
  lignes.push({
    intitule: 'Assurance chômage – Tranche A',
    base: assietteChomT1, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 4.00, montantPatronal: r(assietteChomT1 * 0.04),
    section: 'chomage',
  });

  if (T2chom > 0) {
    lignes.push({
      intitule: 'Assurance chômage – Tranche B',
      base: T2chom, tauxSalarial: null, montantSalarial: 0,
      tauxPatronal: 4.00, montantPatronal: r(T2chom * 0.04),
      section: 'chomage',
    });
  }

  // ── AGS / FNGS
  const assietteAGS = Math.min(brutMensuel, 4 * pmss);
  lignes.push({
    intitule: 'AGS – Garantie des salaires (FNGS)',
    base: assietteAGS, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 0.25, montantPatronal: r(assietteAGS * 0.0025),
    section: 'chomage',
  });

  // ── FNAL
  const tauxFNAL = effectif === '>=50' ? 0.50 : 0.10;
  const baseFNAL = effectif === '>=50' ? brutMensuel : T1;
  lignes.push({
    intitule: 'FNAL (Fonds National Aide au Logement)',
    base: baseFNAL, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: tauxFNAL, montantPatronal: r(baseFNAL * tauxFNAL / 100),
    section: 'autre',
  });

  // ── Taxe apprentissage
  lignes.push({
    intitule: 'Taxe d\'apprentissage',
    base: brutMensuel, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 0.68, montantPatronal: r(brutMensuel * 0.0068),
    section: 'autre',
  });

  // ── Formation professionnelle
  const tauxFP = effectif === '>=50' ? 1.00 : 1.00; // simplifié : 1% (<11 sal) / 1,68% (≥11 sal à préc.)
  lignes.push({
    intitule: 'Contribution formation professionnelle',
    base: brutMensuel, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: tauxFP, montantPatronal: r(brutMensuel * tauxFP / 100),
    section: 'autre',
  });

  // ── APEC (cadres uniquement)
  if (statut === 'cadre') {
    const assietteAPEC = Math.min(brutMensuel, 4 * pmss);
    lignes.push({
      intitule: 'APEC',
      base: assietteAPEC, tauxSalarial: 0.024, montantSalarial: r(assietteAPEC * 0.00024),
      tauxPatronal: 0.036, montantPatronal: r(assietteAPEC * 0.00036),
      section: 'autre',
    });
  }

  // ── CSG déductible
  lignes.push({
    intitule: 'CSG déductible de l\'impôt sur le revenu',
    base: assietteCsg, tauxSalarial: 6.80, montantSalarial: r(assietteCsg * 0.068),
    tauxPatronal: null, montantPatronal: 0,
    section: 'csg',
  });

  // ── CSG/CRDS non déductible
  lignes.push({
    intitule: 'CSG/CRDS non déductible',
    base: assietteCsg, tauxSalarial: 2.90, montantSalarial: r(assietteCsg * 0.029),
    tauxPatronal: null, montantPatronal: 0,
    section: 'csg',
  });

  // ── Réduction Fillon (allègement général)
  const brutAnnuel = brutMensuel * 12;
  const T_fillon = effectif === '>=50' ? 0.3233 : 0.3193;
  const limiteHaute = 1.6 * smicAnnuel;
  let coeffFillon = 0;
  if (brutAnnuel < limiteHaute) {
    coeffFillon = (T_fillon / 0.6) * ((1.6 * smicAnnuel / brutAnnuel) - 1);
    coeffFillon = Math.max(0, Math.min(coeffFillon, T_fillon));
  }
  const reductionFillon = r(coeffFillon * brutMensuel);

  // ── Totaux
  const totalSalarial = r(lignes.reduce((s, l) => s + l.montantSalarial, 0));
  const totalPatronalBrut = r(lignes.reduce((s, l) => s + l.montantPatronal, 0));
  const totalPatronal = r(totalPatronalBrut - reductionFillon);

  const netAvantPAS = r(brutMensuel - totalSalarial);
  const montantPAS = r(netAvantPAS * tauxPAS / 100);
  const netAPayer = r(netAvantPAS - montantPAS);
  const coutEmployeur = r(brutMensuel + totalPatronal);

  return {
    lignes,
    totaux: {
      brutMensuel,
      totalCotisationsSalariales: totalSalarial,
      totalCotisationsPatronales: totalPatronal,
      reductionFillon,
      netAvantPAS,
      tauxPAS,
      montantPAS,
      netAPayer,
      coutEmployeur,
    },
    params: { pmss, smicMensuel, annee, mois },
    input,
  };
}
