'use client';
import { useState } from 'react';

const PACK_OPTIONS = [
  { label: '3 Fiches',  total: 22.70, perFiche: 7.57 },
  { label: '5 Fiches',  total: 36.95, perFiche: 7.39 },
  { label: '10 Fiches', total: 68.90, perFiche: 6.89 },
  { label: '20 Fiches', total: 127.80, perFiche: 6.39 },
];

const MENSUEL_OPTIONS = [
  { label: '1 à 3 salariés',  prix: 28.85 },
  { label: '4 à 9 salariés',  prix: 44.85 },
  { label: '10 à 24 salariés', prix: 74.85 },
  { label: '25 à 49 salariés', prix: 134.85 },
];

const ANNUEL_OPTIONS = [
  { label: '1 à 3 salariés',  prix: 198.00, parMois: 16.50 },
  { label: '4 à 9 salariés',  prix: 328.00, parMois: 27.33 },
  { label: '10 à 24 salariés', prix: 598.00, parMois: 49.83 },
  { label: '25 à 49 salariés', prix: 998.00, parMois: 83.17 },
];

const FEATURES_FICHE = [
  'Logo & couleur modifiables',
  'Journal de paie inclus',
  'DSN en 3 clics',
  'Téléchargement PDF',
  'Calculs URSSAF 2025/2026',
];

const FEATURES_PACK = [
  'Pour un ou plusieurs salariés',
  'Pour une ou plusieurs entreprises',
  'Logo & couleur modifiables',
  'Journal de paie inclus',
  'DSN en 3 clics',
  'Téléchargement PDF',
];

const FEATURES_SUB = [
  'Fiches illimitées',
  'Pour une ou plusieurs entreprises',
  'Logo & couleur modifiables',
  'Journal de paie inclus',
  'DSN en 3 clics',
  'Mises à jour légales incluses',
  'Support prioritaire',
];

const fmt = (n: number) => {
  const [int, dec] = n.toFixed(2).split('.');
  return { int, dec };
};

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function TarifsPage() {
  const [packIdx, setPackIdx] = useState(0);
  const [mensuelIdx, setMensuelIdx] = useState(0);
  const [annuelIdx, setAnnuelIdx] = useState(0);

  const pack = PACK_OPTIONS[packIdx];
  const mensuel = MENSUEL_OPTIONS[mensuelIdx];
  const annuel = ANNUEL_OPTIONS[annuelIdx];

  const pPack = fmt(pack.total);
  const pMensuel = fmt(mensuel.prix);
  const pAnnuel = fmt(annuel.prix);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-blue-800 font-extrabold text-xl tracking-tight">BS Facile</a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/generateur" className="text-gray-600 hover:text-blue-700">Bulletin de paie</a>
            <a href="/contrat" className="text-gray-600 hover:text-blue-700">Contrat de travail</a>
            <a href="/tarifs" className="text-blue-700 font-semibold">Tarifs</a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div className="text-center pt-14 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Tarifs de nos bulletins de paie
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Sans abonnement ou avec abonnement, choisissez la formule adaptée à votre activité.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── SANS ENGAGEMENT ── */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <h2 className="text-center font-extrabold text-green-700 text-xl tracking-wide mb-6 uppercase">
              Sans engagement
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* 1 Fiche */}
              <div className="bg-white rounded-xl border border-green-200 p-5 flex flex-col">
                <div className="text-center font-bold text-gray-800 text-lg mb-4">1 Bulletin de paie</div>
                <div className="text-center mb-5">
                  <span className="text-5xl font-extrabold text-green-600">8</span>
                  <span className="text-2xl font-bold text-green-600 align-super">,90</span>
                  <span className="text-sm text-gray-400 ml-1">€ HT</span>
                </div>
                <a href="/generateur"
                  className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg transition-colors mb-5 text-sm">
                  Créer un bulletin
                </a>
                <ul className="space-y-2 mt-auto">
                  {FEATURES_FICHE.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>

              {/* Pack */}
              <div className="bg-white rounded-xl border-2 border-green-400 p-5 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                  Populaire
                </div>
                <div className="text-center font-bold text-gray-800 text-lg mb-3">Pack</div>

                {/* Sélecteur pack */}
                <div className="relative mb-4">
                  <select
                    value={packIdx}
                    onChange={e => setPackIdx(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    {PACK_OPTIONS.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">▾</div>
                </div>

                <div className="text-center mb-1">
                  <span className="text-5xl font-extrabold text-green-600">{pPack.int}</span>
                  <span className="text-2xl font-bold text-green-600 align-super">,{pPack.dec}</span>
                  <span className="text-sm text-gray-400 ml-1">€ HT</span>
                </div>
                <div className="text-center text-xs text-gray-400 mb-5">
                  soit {pack.perFiche.toFixed(2).replace('.', ',')} € HT / la fiche
                </div>

                <a href="/generateur"
                  className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg transition-colors mb-5 text-sm">
                  Choisir
                </a>
                <ul className="space-y-2 mt-auto">
                  {FEATURES_PACK.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── ABONNEMENT ── */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h2 className="text-center font-extrabold text-blue-700 text-xl tracking-wide mb-6 uppercase">
              Abonnement
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Mensuel */}
              <div className="bg-white rounded-xl border border-blue-200 p-5 flex flex-col">
                <div className="text-center font-bold text-gray-800 text-lg mb-3">Mensuel</div>

                <div className="relative mb-4">
                  <select
                    value={mensuelIdx}
                    onChange={e => setMensuelIdx(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {MENSUEL_OPTIONS.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">▾</div>
                </div>

                <div className="text-center mb-5">
                  <span className="text-5xl font-extrabold text-blue-600">{pMensuel.int}</span>
                  <span className="text-2xl font-bold text-blue-600 align-super">,{pMensuel.dec}</span>
                  <span className="text-sm text-gray-400 ml-1">€ HT</span>
                  <div className="text-sm text-gray-500 font-semibold">/mois</div>
                </div>

                <a href="/generateur"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mb-5 text-sm">
                  Choisir
                </a>
                <ul className="space-y-2 mt-auto">
                  {FEATURES_SUB.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>

              {/* Annuel */}
              <div className="bg-white rounded-xl border-2 border-blue-400 p-5 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                  Économique
                </div>
                <div className="text-center font-bold text-gray-800 text-lg mb-3">Annuel</div>

                <div className="relative mb-4">
                  <select
                    value={annuelIdx}
                    onChange={e => setAnnuelIdx(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {ANNUEL_OPTIONS.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">▾</div>
                </div>

                <div className="text-center mb-1">
                  <span className="text-5xl font-extrabold text-blue-600">{pAnnuel.int}</span>
                  <span className="text-2xl font-bold text-blue-600 align-super">,{pAnnuel.dec}</span>
                  <span className="text-sm text-gray-400 ml-1">€ HT</span>
                  <div className="text-sm text-gray-500 font-semibold">/an</div>
                </div>
                <div className="text-center text-xs text-gray-400 mb-5">
                  soit {annuel.parMois.toFixed(2).replace('.', ',')} € HT / Mois
                </div>

                <a href="/generateur"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mb-5 text-sm">
                  Choisir
                </a>
                <ul className="space-y-2 mt-auto">
                  {FEATURES_SUB.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* GARANTIE */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="font-bold text-gray-800 text-lg mb-1">Satisfait ou remboursé 30 jours</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Pas convaincu ? Contactez-nous dans les 30 jours suivant votre achat pour un remboursement complet, sans questions.
          </p>
        </div>

        {/* ESSAI GRATUIT */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-3">Pas encore décidé ?</p>
          <a href="/generateur"
            className="inline-block border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold px-8 py-3 rounded-xl transition-colors">
            Essayer gratuitement →
          </a>
        </div>

      </div>
    </div>
  );
}
