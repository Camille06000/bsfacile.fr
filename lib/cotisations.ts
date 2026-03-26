// lib/cotisations.ts — Moteur de calcul BS France 2025/2026

export const PARAMS = {
  2025: { pmss: 3925, smicMensuel: 1801.80, smicAnnuel: 21621.60 },
  2026: { pmss: 4005, smicMensuel: 1801.80, smicAnnuel: 21621.60 },
} as const;

export interface ElementVariable {
  intitule: string;
  heures?: number;
  taux?: number;    // taux horaire ou taux de majoration (ex: 25 pour 25%)
  montant: number;  // montant brut total
  exonereeIR?: boolean; // exonéré impôt sur le revenu (HS)
}

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
  salariéEntreeDate?: string;
  // Rémunération de base
  heuresMensuelles?: number;
  tauxHoraire?: number;
  // Heures supplémentaires / majorées
  heuresSupp25?: number;   // nombre d'heures supp à 25%
  heuresSupp50?: number;   // nombre d'heures supp à 50%
  heuresCompl?: number;    // heures complémentaires (temps partiel, 10%)
  heuresMajorees?: Array<{ intitule: string; heures: number; majoration: number }>; // nuit, dimanche, férié...
  // Éléments variables
  prime?: number;
  avantageNature?: number;
  acompte?: number;
  // Absences
  absences?: Absence[];
}

export interface Absence {
  motif: string;           // 'Maladie', 'AT', 'Maternité/Paternité', 'Sans solde', 'Injustifiée', 'CP pris', 'RTT', 'Autre'
  jours?: number;          // nb jours (méthode 30e ou ouvrés)
  heures?: number;         // OU nb heures
  methode: '30e' | 'ouvres' | 'heures';
  joursOuvresMois?: number;// nb jours ouvrés du mois (méthode ouvrés, défaut 22)
  carence: number;         // jours de carence non indemnisés (3 maladie, 0 AT/maternité)
  maintienSalaire: boolean;// subrogation : employeur maintient et récupère IJSS
  tauxIJSS: number;        // taux IJSS en % (50 maladie, 66.67 AT/maternité)
}

export interface LigneBS {
  intitule: string;
  base: number;
  tauxSalarial: number | null;
  montantSalarial: number;
  tauxPatronal: number | null;
  montantPatronal: number;
  section?: 'retraite' | 'chomage' | 'sante' | 'famille' | 'csg' | 'autre';
}

export interface LigneAbsence {
  motif: string;
  jours: number;
  heures: number;
  deduction: number;       // montant déduit du brut
  ijss: number;            // IJSS estimée (si maintien)
  maintienSalaire: boolean;
}

export interface ResultBS {
  lignes: LigneBS[];
  elementsSalaire: ElementVariable[];
  lignesAbsences: LigneAbsence[];
  totaux: {
    brutMensuel: number;           // brut avant absences
    brutApresAbsences: number;     // brut net d'absences
    totalDeductionsAbsences: number;
    totalIJSS: number;
    totalCotisationsSalariales: number;
    totalCotisationsPatronales: number;
    reductionFillon: number;
    netAvantPAS: number;
    tauxPAS: number;
    montantPAS: number;
    montantExonereeIR: number;
    netAPayer: number;
    coutEmployeur: number;
    acompte: number;
    netAPayerApresAcompte: number;
  };
  params: { pmss: number; smicMensuel: number; annee: number; mois: number };
  input: InputBS;
}

export function calculerBS(input: InputBS): ResultBS {
  const { statut, effectif, tauxPAS } = input;
  const annee = input.annee ?? 2026;
  const mois = input.mois ?? new Date().getMonth() + 1;
  const { pmss, smicMensuel, smicAnnuel } = PARAMS[annee] ?? PARAMS[2026];
  const heures = input.heuresMensuelles ?? 151.67;
  const tauxH = input.tauxHoraire ?? 0;

  const r = (n: number) => Math.round(n * 100) / 100;

  // ── Calcul des éléments de salaire ──
  const elementsSalaire: ElementVariable[] = [];

  // Salaire de base
  const salaireBase = r(tauxH > 0 ? tauxH * heures : input.brutMensuel);
  if (tauxH > 0) {
    elementsSalaire.push({
      intitule: `Salaire de base (${heures.toFixed(2)} h × ${tauxH.toFixed(4)} €/h)`,
      heures,
      taux: tauxH,
      montant: salaireBase,
      exonereeIR: false,
    });
  }

  // Heures supplémentaires 25%
  let montantHS25 = 0;
  if (input.heuresSupp25 && input.heuresSupp25 > 0 && tauxH > 0) {
    montantHS25 = r(input.heuresSupp25 * tauxH * 1.25);
    elementsSalaire.push({
      intitule: `Heures supplémentaires 25% (${input.heuresSupp25}h × ${tauxH.toFixed(4)} × 1,25)`,
      heures: input.heuresSupp25,
      taux: 25,
      montant: montantHS25,
      exonereeIR: true,
    });
  }

  // Heures supplémentaires 50%
  let montantHS50 = 0;
  if (input.heuresSupp50 && input.heuresSupp50 > 0 && tauxH > 0) {
    montantHS50 = r(input.heuresSupp50 * tauxH * 1.50);
    elementsSalaire.push({
      intitule: `Heures supplémentaires 50% (${input.heuresSupp50}h × ${tauxH.toFixed(4)} × 1,50)`,
      heures: input.heuresSupp50,
      taux: 50,
      montant: montantHS50,
      exonereeIR: true,
    });
  }

  // Heures complémentaires (temps partiel, majoration 10%)
  let montantHC = 0;
  if (input.heuresCompl && input.heuresCompl > 0 && tauxH > 0) {
    montantHC = r(input.heuresCompl * tauxH * 1.10);
    elementsSalaire.push({
      intitule: `Heures complémentaires 10% (${input.heuresCompl}h)`,
      heures: input.heuresCompl,
      taux: 10,
      montant: montantHC,
      exonereeIR: false,
    });
  }

  // Heures majorées (nuit, dimanche, férié)
  let montantHM = 0;
  if (input.heuresMajorees && input.heuresMajorees.length > 0 && tauxH > 0) {
    for (const hm of input.heuresMajorees) {
      if (hm.heures > 0) {
        const m = r(hm.heures * tauxH * (1 + hm.majoration / 100));
        montantHM += m;
        elementsSalaire.push({
          intitule: `${hm.intitule} (${hm.heures}h, maj. ${hm.majoration}%)`,
          heures: hm.heures,
          taux: hm.majoration,
          montant: m,
          exonereeIR: false,
        });
      }
    }
    montantHM = r(montantHM);
  }

  // Prime
  let montantPrime = 0;
  if (input.prime && input.prime > 0) {
    montantPrime = r(input.prime);
    elementsSalaire.push({
      intitule: 'Prime',
      montant: montantPrime,
      exonereeIR: false,
    });
  }

  // Avantage en nature
  let montantAN = 0;
  if (input.avantageNature && input.avantageNature > 0) {
    montantAN = r(input.avantageNature);
    elementsSalaire.push({
      intitule: 'Avantage en nature',
      montant: montantAN,
      exonereeIR: false,
    });
  }

  // ── Brut total ──
  let brutMensuel: number;
  if (tauxH > 0) {
    brutMensuel = r(salaireBase + montantHS25 + montantHS50 + montantHC + montantHM + montantPrime + montantAN);
  } else {
    brutMensuel = r(input.brutMensuel + montantPrime + montantAN);
    if (elementsSalaire.length === 0) {
      elementsSalaire.unshift({
        intitule: `Salaire de base (${heures.toFixed(2)} h)`,
        heures,
        montant: input.brutMensuel,
        exonereeIR: false,
      });
    }
  }

  // Montant exonéré IR (HS)
  const montantExonereeIR = r(montantHS25 + montantHS50);

  // ── Absences ──
  const lignesAbsences: LigneAbsence[] = [];
  let totalDeductionsAbsences = 0;
  let totalIJSS = 0;

  if (input.absences && input.absences.length > 0) {
    for (const abs of input.absences) {
      const joursAbs = abs.jours ?? 0;
      const heuresAbs = abs.heures ?? 0;
      const joursOuvres = abs.joursOuvresMois ?? 22;

      // Calcul de la déduction
      let deduction = 0;
      let heuresEquiv = heuresAbs;
      let joursEquiv = joursAbs;

      if (abs.methode === '30e' && joursAbs > 0) {
        deduction = r(brutMensuel / 30 * joursAbs);
        heuresEquiv = r(joursAbs * heures / 30);
      } else if (abs.methode === 'ouvres' && joursAbs > 0) {
        deduction = r(brutMensuel / joursOuvres * joursAbs);
        heuresEquiv = r(joursAbs * heures / joursOuvres);
      } else if (abs.methode === 'heures' && heuresAbs > 0) {
        const tauxCalc = tauxH > 0 ? tauxH : brutMensuel / heures;
        deduction = r(tauxCalc * heuresAbs);
        joursEquiv = r(heuresAbs / (heures / joursOuvres));
      }

      // IJSS estimée (jours indemnisables = max(0, jours - carence))
      let ijss = 0;
      if (abs.maintienSalaire && deduction > 0) {
        const joursIndemnisables = Math.max(0, joursEquiv - abs.carence);
        const salJournalier = brutMensuel * 12 / 365;
        ijss = r(salJournalier * (abs.tauxIJSS / 100) * joursIndemnisables);
        // Plafond IJSS (1.8× PMSS / 30.42)
        const plafondIJSSJour = r(pmss * 1.8 / 30.42);
        ijss = Math.min(ijss, r(plafondIJSSJour * joursIndemnisables));
      }

      totalDeductionsAbsences = r(totalDeductionsAbsences + deduction);
      totalIJSS = r(totalIJSS + ijss);
      lignesAbsences.push({ motif: abs.motif, jours: joursEquiv, heures: heuresEquiv, deduction, ijss, maintienSalaire: abs.maintienSalaire });
    }
  }

  // Brut soumis aux cotisations = brut - déductions absences + IJSS (subrogation)
  const brutApresAbsences = r(Math.max(0, brutMensuel - totalDeductionsAbsences + totalIJSS));
  const brutCotisations = brutApresAbsences;

  const T1 = Math.min(brutCotisations, pmss);
  const T2 = Math.max(0, Math.min(brutCotisations, 8 * pmss) - pmss);
  const T2chom = Math.max(0, Math.min(brutCotisations, 4 * pmss) - pmss);
  const assietteCsg = r(brutCotisations * 0.9825);

  const lignes: LigneBS[] = [];

  // ── Maladie / SS
  lignes.push({
    intitule: 'Maladie – maternité – invalidité – décès',
    base: brutCotisations, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 7, montantPatronal: r(brutCotisations * 0.07),
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
  lignes.push({
    intitule: 'Assurance vieillesse déplafonnée',
    base: brutCotisations, tauxSalarial: 0.40, montantSalarial: r(brutCotisations * 0.004),
    tauxPatronal: 2.02, montantPatronal: r(brutCotisations * 0.0202),
    section: 'retraite',
  });

  // ── Allocations familiales
  const tauxAF = brutCotisations <= 3.5 * smicMensuel ? 3.45 : 5.25;
  lignes.push({
    intitule: 'Allocations familiales',
    base: brutCotisations, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: tauxAF, montantPatronal: r(brutCotisations * tauxAF / 100),
    section: 'famille',
  });

  // ── Accidents du travail
  lignes.push({
    intitule: 'Accidents du travail – maladies professionnelles',
    base: brutCotisations, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 2.22, montantPatronal: r(brutCotisations * 0.0222),
    section: 'sante',
  });

  // ── AGIRC-ARRCO T1
  lignes.push({
    intitule: 'AGIRC-ARRCO Tranche 1',
    base: T1, tauxSalarial: 3.15, montantSalarial: r(T1 * 0.0315),
    tauxPatronal: 4.72, montantPatronal: r(T1 * 0.0472),
    section: 'retraite',
  });

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

  if (T2 > 0) {
    lignes.push({
      intitule: 'CEG Tranche 2',
      base: T2, tauxSalarial: 1.08, montantSalarial: r(T2 * 0.0108),
      tauxPatronal: 1.62, montantPatronal: r(T2 * 0.0162),
      section: 'retraite',
    });
  }

  // ── CET
  lignes.push({
    intitule: 'CET',
    base: brutCotisations, tauxSalarial: 0.14, montantSalarial: r(brutCotisations * 0.0014),
    tauxPatronal: 0.21, montantPatronal: r(brutCotisations * 0.0021),
    section: 'retraite',
  });

  // ── Assurance chômage
  lignes.push({
    intitule: 'Assurance chômage – Tranche A',
    base: T1, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 4.00, montantPatronal: r(T1 * 0.04),
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
  const assietteAGS = Math.min(brutCotisations, 4 * pmss);
  lignes.push({
    intitule: 'AGS – Garantie des salaires (FNGS)',
    base: assietteAGS, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 0.25, montantPatronal: r(assietteAGS * 0.0025),
    section: 'chomage',
  });

  // ── FNAL
  const tauxFNAL = effectif === '>=50' ? 0.50 : 0.10;
  const baseFNAL = effectif === '>=50' ? brutCotisations : T1;
  lignes.push({
    intitule: 'FNAL (Fonds National Aide au Logement)',
    base: baseFNAL, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: tauxFNAL, montantPatronal: r(baseFNAL * tauxFNAL / 100),
    section: 'autre',
  });

  // ── Taxe apprentissage
  lignes.push({
    intitule: 'Taxe d\'apprentissage',
    base: brutCotisations, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 0.68, montantPatronal: r(brutCotisations * 0.0068),
    section: 'autre',
  });

  // ── Formation professionnelle
  lignes.push({
    intitule: 'Contribution formation professionnelle',
    base: brutCotisations, tauxSalarial: null, montantSalarial: 0,
    tauxPatronal: 1.00, montantPatronal: r(brutCotisations * 0.01),
    section: 'autre',
  });

  // ── APEC (cadres)
  if (statut === 'cadre') {
    const assietteAPEC = Math.min(brutCotisations, 4 * pmss);
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

  // ── Réduction Fillon (basée sur brut avant absences pour le coefficient)
  const brutAnnuel = brutCotisations * 12;
  const T_fillon = effectif === '>=50' ? 0.3233 : 0.3193;
  const limiteHaute = 1.6 * smicAnnuel;
  let coeffFillon = 0;
  if (brutAnnuel < limiteHaute) {
    coeffFillon = (T_fillon / 0.6) * ((1.6 * smicAnnuel / brutAnnuel) - 1);
    coeffFillon = Math.max(0, Math.min(coeffFillon, T_fillon));
  }
  const reductionFillon = r(coeffFillon * brutCotisations);

  // ── Totaux
  const totalSalarial = r(lignes.reduce((s, l) => s + l.montantSalarial, 0));
  const totalPatronalBrut = r(lignes.reduce((s, l) => s + l.montantPatronal, 0));
  const totalPatronal = r(totalPatronalBrut - reductionFillon);

  const netAvantPAS = r(brutCotisations - totalSalarial);
  const assiettePAS = r(netAvantPAS - montantExonereeIR);
  const montantPAS = r(assiettePAS * tauxPAS / 100);
  const acompte = r(input.acompte ?? 0);
  const netAPayer = r(netAvantPAS - montantPAS);
  const netAPayerApresAcompte = r(netAPayer - acompte);
  const coutEmployeur = r(brutCotisations + totalPatronal);

  return {
    lignes,
    elementsSalaire,
    lignesAbsences,
    totaux: {
      brutMensuel,
      brutApresAbsences,
      totalDeductionsAbsences,
      totalIJSS,
      totalCotisationsSalariales: totalSalarial,
      totalCotisationsPatronales: totalPatronal,
      reductionFillon,
      netAvantPAS,
      tauxPAS,
      montantPAS,
      montantExonereeIR,
      netAPayer,
      coutEmployeur,
      acompte,
      netAPayerApresAcompte,
    },
    params: { pmss, smicMensuel, annee, mois },
    input,
  };
}
