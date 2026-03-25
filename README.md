# BS Facile — Générateur de Bulletin de Salaire France

Application web Next.js 14 pour générer des bulletins de salaire français légalement conformes aux paramètres **2025 / 2026**.

## Fonctionnalités

- Calcul complet des **cotisations salariales et patronales** (URSSAF, AGIRC-ARRCO, CSG/CRDS, CET, CEG…)
- Support **cadre / non-cadre**, effectif < 50 ou ≥ 50 salariés
- **Réduction Fillon** automatique pour les bas salaires
- **Prélèvement à la source (PAS)** intégré
- Paramètres **2025** (PMSS 3 925 €) et **2026** (PMSS 4 005 €)
- Bulletin **print-ready** (impression / export PDF navigateur)
- Saisie complète : entreprise, salarié, N° SS, convention collective

## Stack technique

- **Next.js 14** — App Router
- **TypeScript** — calculs typés à 100%
- **Tailwind CSS** — UI responsive
- **API Route** — `/api/generate-bs` (POST)

## Installation

```bash
git clone https://github.com/VOTRE-COMPTE/bsfacile.fr.git
cd bsfacile.fr
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure

```
bsfacile.fr/
├── app/
│   ├── page.tsx                   # Page principale
│   ├── layout.tsx
│   ├── globals.css
│   └── api/generate-bs/route.ts  # API de calcul
├── lib/
│   └── cotisations.ts            # Moteur de calcul pur (sans LLM)
└── components/
    ├── BulletinForm.tsx           # Formulaire 3 onglets
    └── BulletinDisplay.tsx        # Bulletin print-ready
```

## Paramètres légaux 2026

| Paramètre | Valeur |
|-----------|--------|
| PMSS | 4 005 € |
| SMIC mensuel brut | 1 801,80 € |
| Assiette CSG/CRDS | Brut × 98,25% |

## Cotisations incluses

**Salariales** : Vieillesse plafonnée (6,90%), Vieillesse déplafonnée (0,40%), AGIRC-ARRCO T1 (3,15%), AGIRC-ARRCO T2 (8,64%), CEG T1 (0,86%), CEG T2 (1,08%), CET (0,14%), CSG déductible (6,80%), CSG/CRDS non déductible (2,90%), APEC cadres (0,024%)

**Patronales** : Maladie (7%), Vieillesse plafonnée (8,55%), Vieillesse déplafonnée (2,02%), Allocations familiales (3,45%/5,25%), AT/MP (2,22%), AGIRC-ARRCO T1 (4,72%), AGIRC-ARRCO T2 (12,95%), CEG/CET, Chômage (4%), AGS (0,25%), FNAL, Taxe apprentissage, Formation prof., APEC cadres

## Déploiement Vercel

```bash
npm run build
# Déployer sur Vercel, Railway, ou tout hébergeur Node.js
```

## Licence

MIT — Libre d'utilisation et de modification.

---

> **Disclaimer** : Ce logiciel est fourni à titre indicatif. Les taux appliqués sont basés sur la législation française 2025/2026. Consultez un expert-comptable pour les situations particulières (conventions collectives spécifiques, taux AT personnalisés, etc.).
