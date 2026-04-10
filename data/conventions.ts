// data/conventions.ts — Base de données des 40 principales conventions collectives françaises
// Source : DARES, Légifrance, accords de branche 2026

export interface Convention {
  idcc: string;                 // Code IDCC à 4 chiffres
  nom: string;                  // Nom officiel
  nomCourt: string;             // Nom court pour affichage
  secteur: string;              // Secteur d'activité
  naf: string[];                // Codes NAF/APE associés (auto-suggest)
  salaries?: number;            // Nombre de salariés couverts (approx.)
  // Mutuelle (complémentaire santé obligatoire depuis 2016)
  mutuelle?: {
    cotisationMensuelle: number;  // Cotisation totale mensuelle isolé (€)
    partPatronale: number;         // % à charge patronale (min 50%)
    source?: string;               // Accord de branche ou convention
  };
  // Prévoyance (taux appliqués sur brut)
  prevoyance?: {
    tauxSalCadre?: number;         // % salarial cadres
    tauxPatrCadre?: number;        // % patronal cadres
    tauxSalNonCadre?: number;      // % salarial non-cadres
    tauxPatrNonCadre?: number;     // % patronal non-cadres
    source?: string;
  };
  lienLegifrance?: string;
}

export const CONVENTIONS: Convention[] = [
  {
    idcc: '1596',
    nom: 'Convention collective nationale du bâtiment – Ouvriers',
    nomCourt: 'BTP – Bâtiment (Ouvriers)',
    secteur: 'BTP',
    naf: ['4110', '4120', '4211', '4212', '4213', '4221', '4291', '4311', '4312', '4313', '4321', '4322', '4329', '4331', '4332', '4333', '4334', '4339', '4391', '4399'],
    salaries: 700000,
    mutuelle: { cotisationMensuelle: 54, partPatronale: 50, source: 'Accord PRO BTP 2026' },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.2, tauxSalNonCadre: 0.5, tauxPatrNonCadre: 0.9, source: 'PRO BTP' },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635213',
  },
  {
    idcc: '1597',
    nom: 'Convention collective nationale du bâtiment – ETAM',
    nomCourt: 'BTP – Bâtiment (ETAM)',
    secteur: 'BTP',
    naf: ['4110', '4120', '4311', '4312', '4321', '4322', '4331', '4332', '4333', '4399'],
    salaries: 200000,
    mutuelle: { cotisationMensuelle: 58, partPatronale: 60, source: 'Accord PRO BTP 2026' },
    prevoyance: { tauxSalCadre: 1.0, tauxPatrCadre: 1.5, tauxSalNonCadre: 0.6, tauxPatrNonCadre: 1.0 },
  },
  {
    idcc: '2941',
    nom: 'Convention collective nationale de la métallurgie',
    nomCourt: 'Métallurgie',
    secteur: 'Industrie',
    naf: ['2410', '2420', '2431', '2432', '2433', '2434', '2441', '2442', '2443', '2444', '2445', '2446', '2451', '2452', '2453', '2454', '2461', '2511', '2512', '2513', '2521', '2529', '2530', '2540', '2550', '2561', '2562', '2563', '2571', '2572', '2573', '2574', '2591', '2592', '2593', '2594', '2599', '2611', '2612', '2620', '2630', '2640', '2651', '2652', '2660', '2670', '2680', '2710', '2720', '2731', '2732', '2733', '2740', '2751', '2752', '2790', '2811', '2812', '2813', '2814', '2815', '2821', '2822', '2823', '2824', '2825', '2829', '2830', '2841', '2849', '2891', '2892', '2893', '2894', '2895', '2896', '2899', '2910', '2920', '2931', '2932', '3311', '3312', '3313', '3314', '3315', '3316', '3317', '3319', '3320'],
    salaries: 700000,
    mutuelle: { cotisationMensuelle: 50, partPatronale: 55, source: 'Accord de branche métallurgie 2026' },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.2, tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.8 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000044594539',
  },
  {
    idcc: '1486',
    nom: 'Convention collective nationale des bureaux d\'études techniques, cabinets d\'ingénieurs-conseils et sociétés de conseils (SYNTEC)',
    nomCourt: 'SYNTEC – Bureaux d\'études / Conseil / Informatique',
    secteur: 'Services / Informatique',
    naf: ['6201', '6202', '6203', '6209', '6311', '6312', '6399', '7022', '7111', '7112', '7120', '7211', '7219', '7220', '7311', '7312', '7319', '7320', '7410', '7420', '7430', '7490', '7810', '7820', '7830'],
    salaries: 400000,
    mutuelle: { cotisationMensuelle: 60, partPatronale: 55, source: 'Accord SYNTEC 2016' },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.5, tauxSalNonCadre: 0.5, tauxPatrNonCadre: 1.0 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635173',
  },
  {
    idcc: '1979',
    nom: 'Convention collective nationale des hôtels, cafés, restaurants (HCR)',
    nomCourt: 'HCR – Hôtels, Cafés, Restaurants',
    secteur: 'Hôtellerie / Restauration',
    naf: ['5510', '5520', '5530', '5590', '5610', '5621', '5629', '5630'],
    salaries: 600000,
    mutuelle: { cotisationMensuelle: 40, partPatronale: 50, source: 'Accord HCR 2021' },
    prevoyance: { tauxSalCadre: 0.5, tauxPatrCadre: 1.0, tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635201',
  },
  {
    idcc: '0650',
    nom: 'Convention collective nationale de la restauration collective',
    nomCourt: 'Restauration collective',
    secteur: 'Restauration collective',
    naf: ['5629'],
    salaries: 350000,
    mutuelle: { cotisationMensuelle: 42, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.7 },
  },
  {
    idcc: '1090',
    nom: 'Convention collective nationale du commerce de détail et de gros à prédominance alimentaire',
    nomCourt: 'Commerce alimentaire (supermarché / épicerie)',
    secteur: 'Commerce',
    naf: ['4711', '4712', '4721', '4722', '4723', '4724', '4725', '4726', '4729'],
    salaries: 700000,
    mutuelle: { cotisationMensuelle: 38, partPatronale: 50, source: 'Accord de branche commerce alimentaire' },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635094',
  },
  {
    idcc: '0700',
    nom: 'Convention collective nationale du commerce de gros',
    nomCourt: 'Commerce de gros',
    secteur: 'Commerce',
    naf: ['4610', '4621', '4622', '4623', '4624', '4631', '4632', '4633', '4634', '4635', '4636', '4637', '4638', '4639', '4641', '4642', '4643', '4644', '4645', '4646', '4647', '4648', '4649', '4651', '4652', '4661', '4662', '4663', '4664', '4665', '4669', '4671', '4672', '4673', '4674', '4675', '4676', '4677', '4690'],
    salaries: 300000,
    mutuelle: { cotisationMensuelle: 40, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
  },
  {
    idcc: '0637',
    nom: 'Convention collective nationale des transports routiers et activités auxiliaires du transport',
    nomCourt: 'Transports routiers',
    secteur: 'Transport',
    naf: ['4941', '4942', '4950', '5221', '5222', '5223', '5224', '5229'],
    salaries: 500000,
    mutuelle: { cotisationMensuelle: 44, partPatronale: 50, source: 'Accord CARCEPT / AG2R 2024' },
    prevoyance: { tauxSalCadre: 0.6, tauxPatrCadre: 1.1, tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.8 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635213',
  },
  {
    idcc: '2120',
    nom: 'Convention collective nationale des services de l\'automobile',
    nomCourt: 'Services de l\'automobile (garage / carrosserie)',
    secteur: 'Automobile',
    naf: ['4511', '4519', '4520', '4531', '4532', '4540', '7711', '7712', '7719'],
    salaries: 380000,
    mutuelle: { cotisationMensuelle: 45, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.7 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635198',
  },
  {
    idcc: '0843',
    nom: 'Convention collective nationale de la boulangerie-pâtisserie artisanale',
    nomCourt: 'Boulangerie-pâtisserie artisanale',
    secteur: 'Artisanat / Alimentation',
    naf: ['1071', '1072'],
    salaries: 350000,
    mutuelle: { cotisationMensuelle: 36, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.5 },
    lienLegifrance: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635059',
  },
  {
    idcc: '1261',
    nom: 'Convention collective nationale de la pharmacie d\'officine',
    nomCourt: 'Pharmacie d\'officine',
    secteur: 'Santé / Pharmacie',
    naf: ['4773'],
    salaries: 120000,
    mutuelle: { cotisationMensuelle: 48, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.7 },
  },
  {
    idcc: '0029',
    nom: 'Convention collective nationale de l\'hospitalisation privée',
    nomCourt: 'Hospitalisation privée (cliniques)',
    secteur: 'Santé',
    naf: ['8610', '8621', '8622', '8690'],
    salaries: 180000,
    mutuelle: { cotisationMensuelle: 55, partPatronale: 55 },
    prevoyance: { tauxSalCadre: 0.6, tauxPatrCadre: 1.2, tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.9 },
  },
  {
    idcc: '3043',
    nom: 'Convention collective nationale de l\'aide à domicile',
    nomCourt: 'Aide à domicile',
    secteur: 'Services à la personne',
    naf: ['8810', '8891', '8899'],
    salaries: 200000,
    mutuelle: { cotisationMensuelle: 35, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '0573',
    nom: 'Convention collective nationale de la banque',
    nomCourt: 'Banques et établissements financiers',
    secteur: 'Banque / Finance',
    naf: ['6411', '6419', '6491', '6492', '6499'],
    salaries: 500000,
    mutuelle: { cotisationMensuelle: 65, partPatronale: 60 },
    prevoyance: { tauxSalCadre: 1.0, tauxPatrCadre: 1.5, tauxSalNonCadre: 0.5, tauxPatrNonCadre: 1.0 },
  },
  {
    idcc: '0678',
    nom: 'Convention collective nationale des sociétés d\'assurances',
    nomCourt: 'Assurances',
    secteur: 'Assurance',
    naf: ['6511', '6512', '6521', '6522', '6531', '6532', '6611', '6612', '6619', '6621', '6622', '6629'],
    salaries: 150000,
    mutuelle: { cotisationMensuelle: 70, partPatronale: 60 },
    prevoyance: { tauxSalCadre: 1.0, tauxPatrCadre: 1.5 },
  },
  {
    idcc: '0112',
    nom: 'Convention collective nationale de la coiffure et des professions connexes',
    nomCourt: 'Coiffure',
    secteur: 'Artisanat / Beauté',
    naf: ['9602'],
    salaries: 100000,
    mutuelle: { cotisationMensuelle: 32, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.25, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '1518',
    nom: 'Convention collective nationale de l\'animation',
    nomCourt: 'Animation socioculturelle',
    secteur: 'Animation / Culture',
    naf: ['8891', '9001', '9002', '9003', '9004', '9329'],
    salaries: 130000,
    mutuelle: { cotisationMensuelle: 38, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
  },
  {
    idcc: '1996',
    nom: 'Convention collective nationale du nettoyage',
    nomCourt: 'Nettoyage industriel',
    secteur: 'Services',
    naf: ['8121', '8122', '8129'],
    salaries: 450000,
    mutuelle: { cotisationMensuelle: 30, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.25, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '2609',
    nom: 'Convention collective nationale de l\'immobilier',
    nomCourt: 'Immobilier (agences, administrateurs de biens)',
    secteur: 'Immobilier',
    naf: ['6810', '6820', '6831', '6832'],
    salaries: 120000,
    mutuelle: { cotisationMensuelle: 50, partPatronale: 50 },
    prevoyance: { tauxSalCadre: 0.7, tauxPatrCadre: 1.2, tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.8 },
  },
  {
    idcc: '1527',
    nom: 'Convention collective nationale des cabinets d\'experts-comptables et commissaires aux comptes',
    nomCourt: 'Experts-comptables / Audit',
    secteur: 'Expertise comptable',
    naf: ['6920'],
    salaries: 120000,
    mutuelle: { cotisationMensuelle: 52, partPatronale: 55 },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.3, tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.8 },
  },
  {
    idcc: '0086',
    nom: 'Convention collective nationale de la publicité',
    nomCourt: 'Publicité / Communication',
    secteur: 'Publicité',
    naf: ['7311', '7312'],
    salaries: 50000,
    mutuelle: { cotisationMensuelle: 55, partPatronale: 55 },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.2 },
  },
  {
    idcc: '0292',
    nom: 'Convention collective nationale de la plasturgie',
    nomCourt: 'Plasturgie / Caoutchouc',
    secteur: 'Industrie',
    naf: ['2211', '2219', '2221', '2222', '2223', '2229'],
    salaries: 80000,
    mutuelle: { cotisationMensuelle: 45, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.35, tauxPatrNonCadre: 0.65 },
  },
  {
    idcc: '0044',
    nom: 'Convention collective nationale des industries chimiques et connexes',
    nomCourt: 'Industries chimiques',
    secteur: 'Industrie chimique',
    naf: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2020', '2030', '2041', '2042', '2051', '2052', '2053', '2059', '2060'],
    salaries: 170000,
    mutuelle: { cotisationMensuelle: 50, partPatronale: 55 },
    prevoyance: { tauxSalCadre: 0.7, tauxPatrCadre: 1.2, tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.8 },
  },
  {
    idcc: '0414',
    nom: 'Convention collective nationale de l\'industrie et des commerces en gros des viandes',
    nomCourt: 'Industrie agroalimentaire (viandes)',
    secteur: 'Agroalimentaire',
    naf: ['1011', '1012', '1013'],
    salaries: 90000,
    mutuelle: { cotisationMensuelle: 42, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
  },
  {
    idcc: '0459',
    nom: 'Convention collective nationale de l\'industrie textile',
    nomCourt: 'Industrie textile / habillement',
    secteur: 'Textile',
    naf: ['1310', '1320', '1330', '1391', '1392', '1393', '1394', '1395', '1396', '1399'],
    salaries: 60000,
    mutuelle: { cotisationMensuelle: 40, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
  },
  {
    idcc: '1505',
    nom: 'Convention collective nationale des gardiens, concierges et employés d\'immeubles',
    nomCourt: 'Gardiens / Concierges d\'immeubles',
    secteur: 'Immobilier / Services',
    naf: ['8110'],
    salaries: 40000,
    mutuelle: { cotisationMensuelle: 32, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.25, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '2205',
    nom: 'Convention collective nationale des agences de voyage et de tourisme',
    nomCourt: 'Agences de voyage / Tourisme',
    secteur: 'Tourisme',
    naf: ['7911', '7912', '7990'],
    salaries: 40000,
    mutuelle: { cotisationMensuelle: 48, partPatronale: 55 },
    prevoyance: { tauxSalNonCadre: 0.4, tauxPatrNonCadre: 0.7 },
  },
  {
    idcc: '0803',
    nom: 'Convention collective nationale des industries des matériaux de construction',
    nomCourt: 'Matériaux de construction (briqueterie, tuiles, céramique)',
    secteur: 'BTP / Industrie',
    naf: ['2311', '2312', '2313', '2314', '2319', '2320', '2331', '2332', '2341', '2342', '2343', '2344', '2349', '2351', '2352', '2361', '2362', '2363', '2364', '2365', '2369', '2370', '2391', '2399'],
    salaries: 60000,
    mutuelle: { cotisationMensuelle: 45, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.35, tauxPatrNonCadre: 0.65 },
  },
  {
    idcc: '2104',
    nom: 'Convention collective nationale de la production agricole et des CUMA',
    nomCourt: 'Agriculture générale',
    secteur: 'Agriculture',
    naf: ['0111', '0112', '0113', '0114', '0115', '0116', '0119', '0121', '0122', '0123', '0124', '0125', '0126', '0127', '0128', '0129', '0130', '0141', '0142', '0143', '0144', '0145', '0146', '0149', '0150', '0161', '0162', '0163', '0164'],
    salaries: 200000,
    mutuelle: { cotisationMensuelle: 38, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
  },
  {
    idcc: '1147',
    nom: 'Convention collective nationale du personnel des prestataires de services dans le secteur tertiaire',
    nomCourt: 'Prestataires de services (télémarketing, centres d\'appel)',
    secteur: 'Services',
    naf: ['8220', '8299'],
    salaries: 70000,
    mutuelle: { cotisationMensuelle: 36, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '1514',
    nom: 'Convention collective nationale du commerce d\'articles de sport et d\'équipements de loisirs',
    nomCourt: 'Commerce articles de sport',
    secteur: 'Commerce',
    naf: ['4764'],
    salaries: 40000,
    mutuelle: { cotisationMensuelle: 38, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '0176',
    nom: 'Convention collective nationale de la menuiserie, charpente et construction industrialisées et des portes planes',
    nomCourt: 'Menuiserie / Charpente',
    secteur: 'Artisanat / BTP',
    naf: ['1610', '1621', '1622', '1623', '1624', '1629', '2512', '4332', '4339'],
    salaries: 70000,
    mutuelle: { cotisationMensuelle: 42, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.6 },
  },
  {
    idcc: '2614',
    nom: 'Convention collective nationale des ETAM du bâtiment',
    nomCourt: 'BTP – ETAM Travaux publics',
    secteur: 'BTP',
    naf: ['4211', '4212', '4213', '4221', '4222', '4291', '4299'],
    salaries: 150000,
    mutuelle: { cotisationMensuelle: 52, partPatronale: 55, source: 'PRO BTP' },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.3, tauxSalNonCadre: 0.5, tauxPatrNonCadre: 0.9 },
  },
  {
    idcc: '0787',
    nom: 'Convention collective nationale applicable au personnel des bureaux d\'études techniques SYNTEC – professions libérales',
    nomCourt: 'Professions libérales (cabinet médical, vétérinaire, juridique)',
    secteur: 'Professions libérales',
    naf: ['6910', '7111', '7112', '7500', '8621', '8622', '8690'],
    salaries: 100000,
    mutuelle: { cotisationMensuelle: 50, partPatronale: 55 },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.2 },
  },
  {
    idcc: '0087',
    nom: 'Convention collective nationale de la mutualité',
    nomCourt: 'Mutuelles',
    secteur: 'Mutualité',
    naf: ['6512'],
    salaries: 70000,
    mutuelle: { cotisationMensuelle: 60, partPatronale: 60 },
    prevoyance: { tauxSalCadre: 0.8, tauxPatrCadre: 1.3 },
  },
  {
    idcc: '1400',
    nom: 'Convention collective nationale des industries des papiers et cartons',
    nomCourt: 'Papiers / Cartons / Imprimerie',
    secteur: 'Industrie',
    naf: ['1711', '1712', '1721', '1722', '1723', '1724', '1729', '1811', '1812', '1813', '1814'],
    salaries: 80000,
    mutuelle: { cotisationMensuelle: 46, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.35, tauxPatrNonCadre: 0.65 },
  },
  {
    idcc: '3248',
    nom: 'Convention collective nationale de la sécurité privée',
    nomCourt: 'Sécurité privée / Gardiennage',
    secteur: 'Sécurité',
    naf: ['8010', '8020'],
    salaries: 180000,
    mutuelle: { cotisationMensuelle: 36, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.5 },
  },
  {
    idcc: '2264',
    nom: 'Convention collective nationale de la distribution directe',
    nomCourt: 'Distribution directe (La Poste, messagerie)',
    secteur: 'Distribution',
    naf: ['5310', '5320'],
    salaries: 60000,
    mutuelle: { cotisationMensuelle: 38, partPatronale: 50 },
    prevoyance: { tauxSalNonCadre: 0.3, tauxPatrNonCadre: 0.5 },
  },
];

// Mapping NAF → conventions (plusieurs conventions peuvent correspondre)
export function getConventionsByNaf(naf: string): Convention[] {
  if (!naf) return [];
  const code = naf.replace(/\D/g, '').substring(0, 4); // Normalise: "47.11A" → "4711"
  return CONVENTIONS.filter(c => c.naf.some(n => n.replace(/\D/g, '').startsWith(code)));
}

// Recherche par IDCC ou nom
export function searchConventions(query: string): Convention[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return CONVENTIONS.filter(c =>
    c.idcc.startsWith(q) ||
    c.nom.toLowerCase().includes(q) ||
    c.nomCourt.toLowerCase().includes(q) ||
    c.secteur.toLowerCase().includes(q)
  ).slice(0, 8);
}

// Récupère une convention par IDCC
export function getConventionByIdcc(idcc: string): Convention | undefined {
  return CONVENTIONS.find(c => c.idcc === idcc);
}
