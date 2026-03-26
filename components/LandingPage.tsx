'use client';
import { useState } from 'react';

const PACK_OPTIONS = [
  { label: '3 Fiches', total: 22.70, perFiche: 7.57 },
  { label: '5 Fiches', total: 36.95, perFiche: 7.39 },
  { label: '10 Fiches', total: 68.90, perFiche: 6.89 },
  { label: '20 Fiches', total: 127.80, perFiche: 6.39 },
];

const MENSUEL_OPTIONS = [
  { label: '1 à 3 salariés', prix: 28.85 },
  { label: '4 à 9 salariés', prix: 44.85 },
  { label: '10 à 24 salariés', prix: 74.85 },
  { label: '25 à 49 salariés', prix: 134.85 },
];

const ANNUEL_OPTIONS = [
  { label: '1 à 3 salariés', prix: 198.00, parMois: 16.50 },
  { label: '4 à 9 salariés', prix: 328.00, parMois: 27.33 },
  { label: '10 à 24 salariés', prix: 598.00, parMois: 49.83 },
  { label: '25 à 49 salariés', prix: 998.00, parMois: 83.17 },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function LandingPage() {
  const [packIdx, setPackIdx] = useState(0);
  const [mensuelIdx, setMensuelIdx] = useState(0);
  const [annuelIdx, setAnnuelIdx] = useState(0);

  const pack = PACK_OPTIONS[packIdx];
  const mensuel = MENSUEL_OPTIONS[mensuelIdx];
  const annuel = ANNUEL_OPTIONS[annuelIdx];

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-gray-100 z-50" aria-label="Navigation principale">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-blue-800 font-extrabold text-xl tracking-tight">BS Facile</span>
          <div className="flex items-center gap-4">
            <a href="/contrat" className="text-sm text-gray-600 hover:text-blue-700 hidden sm:block">Contrat de travail</a>
            <a href="/generateur" className="text-sm text-gray-600 hover:text-blue-700 hidden sm:block">Bulletin de paie</a>
            <a href="/tarifs" className="text-sm text-gray-600 hover:text-blue-700 hidden sm:block">Tarifs</a>
            <a href="#pricing"
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
              Voir les tarifs
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-white/20">
            ✓ Conforme URSSAF · AGIRC-ARRCO · Droit social 2025/2026
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Générez votre{' '}
            <span className="text-yellow-300">bulletin de salaire</span>
            <br />en 30 secondes
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
            Calcul automatique des cotisations salariales &amp; patronales 2025/2026.
            AGIRC-ARRCO, CSG/CRDS, réduction Fillon — tout est intégré.
          </p>
          <p className="text-blue-200 text-base mb-10">
            Pour les RH, TPE/PME, auto-entrepreneurs et cabinets comptables.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#pricing"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg px-10 py-4 rounded-xl shadow-xl transition-all hover:scale-105">
              Voir les tarifs — dès 8,90 €
            </a>
            <a href="/generateur"
              className="border border-white/40 text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
              Tester gratuitement →
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-4">Aperçu gratuit · Sans abonnement obligatoire · Bulletins illimités en abonnement</p>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-gray-50 border-b border-t py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: '< 30s', l: 'Bulletin généré' },
            { n: '100%', l: 'Taux légaux 2026' },
            { n: 'PMSS 4 005 €', l: 'Plafond SS 2026' },
            { n: '30 jours', l: 'Garantie remboursement' },
          ].map(s => (
            <div key={s.n}>
              <div className="text-2xl font-extrabold text-blue-800">{s.n}</div>
              <div className="text-xs text-gray-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLÈME / SOLUTION ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Calculer les cotisations sociales à la main, c'est terminé
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="font-bold text-red-700 mb-3">❌ Avant BS Facile</div>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Formules Excel interminables', 'Taux URSSAF à chercher manuellement', 'Réduction Fillon complexe à calculer', 'Bulletin peu présentable', 'Risque d\'erreur sur les montants'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="text-red-400">✗</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <div className="font-bold text-green-700 mb-3">✅ Avec BS Facile</div>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Saisir le brut — tout le reste est calculé', 'Tous les taux 2025/2026 intégrés', 'Fillon calculé automatiquement', 'Bulletin structuré prêt à imprimer', 'Conformité légale garantie'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="text-green-500">✓</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
            Un générateur de fiche de paie complet et conforme
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
            Toutes les cotisations du Code du travail français, calculées automatiquement selon les paramètres officiels URSSAF 2025 et 2026.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🧮', title: 'Cotisations calculées auto', desc: 'Vieillesse, maladie, AGIRC-ARRCO T1/T2, CEG, CET, CSG/CRDS, AT/MP, allocations familiales, chômage, AGS, FNAL.' },
              { icon: '⚖️', title: 'Paramètres 2025 et 2026', desc: 'PMSS 3 925 € (2025) / 4 005 € (2026), SMIC 1 801,80 €, réduction Fillon — tout bascule automatiquement selon l\'année choisie.' },
              { icon: '🖨️', title: 'Bulletin print-ready', desc: 'Bulletin de salaire complet structuré en sections : rémunération brute, cotisations salariales, patronales, net avant/après PAS.' },
              { icon: '👔', title: 'Cadre & Non-cadre', desc: 'Cadres : APEC (0,024%/0,036%), tranche 2 AGIRC-ARRCO. Non-cadres : taux standards. Sélection en 1 clic.' },
              { icon: '📋', title: 'Absences & Heures supp', desc: 'Maladie, AT, CP, RTT, sans solde. Heures supplémentaires 25%/50% exonérées IR (Loi TEPA), heures de nuit, dimanche, férié.' },
              { icon: '📄', title: 'DSN & Contrats de travail', desc: 'Export DSN Phase 3 pour Net-Entreprises. Générateur de contrats CDI, CDD, apprentissage, stage et intérim.' },
            ].map(f => (
              <article key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Générer un bulletin de salaire en 3 étapes
          </h2>
          <p className="text-gray-500 mb-12">Aucune formation requise. Aucun logiciel à installer.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Saisissez le salaire brut', desc: 'Entrez le brut mensuel, le statut (cadre / non-cadre), l\'effectif et le taux PAS.' },
              { step: '2', title: 'Calcul instantané', desc: 'Toutes les cotisations URSSAF 2025/2026 apparaissent en temps réel — salariales et patronales.' },
              { step: '3', title: 'Imprimez ou exportez PDF', desc: 'Un clic suffit. Bulletin conforme à l\'article L.3243-2 du Code du travail.' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-700 text-white text-2xl font-extrabold flex items-center justify-center mb-4 shadow-lg">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <a href="/generateur"
            className="inline-block mt-10 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-8 py-3 rounded-xl transition-colors border border-blue-200">
            Essayer le générateur gratuitement →
          </a>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Ce que disent nos utilisateurs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Marie L.', role: 'Responsable RH, PME 12 salariés', stars: 5, text: 'J\'utilisais Excel depuis 5 ans. BS Facile m\'a fait gagner 2h par mois dès la première fiche de paie. Les taux sont toujours à jour.' },
              { name: 'Thomas R.', role: 'Gérant, SARL BTP', stars: 5, text: 'Réduction Fillon calculée automatiquement, c\'est ce qui m\'a convaincu. Économie nette sur le coût employeur visible immédiatement.' },
              { name: 'Sandrine M.', role: 'Expert-comptable indépendante', stars: 5, text: 'Je l\'utilise pour mes petits clients qui n\'ont pas de logiciel de paie. Simple, rapide, bulletin présentable. Excellent rapport qualité/prix.' },
            ].map(t => (
              <figure key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array(t.stars).fill(0).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
                </div>
                <blockquote className="text-gray-600 text-sm leading-relaxed mb-4">« {t.text} »</blockquote>
                <figcaption>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-6 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-3">
            Tarifs transparents
          </h2>
          <p className="text-center text-gray-500 mb-2 text-lg">
            Toujours <span className="font-bold text-blue-700">1 € moins cher</span> que la concurrence. Sans engagement ou avec abonnement.
          </p>
          <p className="text-center text-gray-400 text-sm mb-12">Aperçu gratuit illimité — vous ne payez que pour télécharger</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── SANS ENGAGEMENT ── */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <h3 className="text-center font-extrabold text-green-700 text-lg tracking-wide mb-5 uppercase">Sans engagement</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* 1 Bulletin */}
                <div className="bg-white rounded-xl border border-green-200 p-5 flex flex-col">
                  <div className="text-center font-bold text-gray-800 mb-3">1 Bulletin</div>
                  <div className="text-center mb-4">
                    <span className="text-5xl font-extrabold text-green-600">8</span>
                    <span className="text-xl font-bold text-green-600 align-super">,90</span>
                    <span className="text-sm text-gray-400 ml-1">€ HT</span>
                  </div>
                  <a href="/generateur"
                    className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg transition-colors mb-4 text-sm">
                    Créer un bulletin
                  </a>
                  <ul className="space-y-1.5 mt-auto">
                    {['Logo & couleur modifiables', 'Journal de paie inclus', 'DSN Phase 3 incluse', 'PDF immédiat', 'Calculs URSSAF 2026'].map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                    ))}
                  </ul>
                </div>

                {/* Pack */}
                <div className="bg-white rounded-xl border-2 border-green-400 p-5 flex flex-col relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                    Populaire
                  </div>
                  <div className="text-center font-bold text-gray-800 mb-2">Pack</div>
                  <div className="relative mb-3">
                    <select value={packIdx} onChange={e => setPackIdx(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-green-400">
                      {PACK_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▾</div>
                  </div>
                  <div className="text-center mb-0.5">
                    <span className="text-5xl font-extrabold text-green-600">{pack.total.toFixed(0)}</span>
                    <span className="text-xl font-bold text-green-600 align-super">,{pack.total.toFixed(2).split('.')[1]}</span>
                    <span className="text-sm text-gray-400 ml-1">€ HT</span>
                  </div>
                  <div className="text-center text-xs text-gray-400 mb-3">soit {pack.perFiche.toFixed(2).replace('.', ',')} € HT / fiche</div>
                  <a href="/generateur"
                    className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg transition-colors mb-4 text-sm">
                    Choisir
                  </a>
                  <ul className="space-y-1.5 mt-auto">
                    {['Multi-salariés', 'Multi-entreprises', 'Logo & couleur modifiables', 'Journal de paie inclus', 'DSN Phase 3 incluse'].map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── ABONNEMENT ── */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-center font-extrabold text-blue-700 text-lg tracking-wide mb-5 uppercase">Abonnement</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Mensuel */}
                <div className="bg-white rounded-xl border border-blue-200 p-5 flex flex-col">
                  <div className="text-center font-bold text-gray-800 mb-2">Mensuel</div>
                  <div className="relative mb-3">
                    <select value={mensuelIdx} onChange={e => setMensuelIdx(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {MENSUEL_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▾</div>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-5xl font-extrabold text-blue-600">{mensuel.prix.toFixed(0)}</span>
                    <span className="text-xl font-bold text-blue-600 align-super">,{mensuel.prix.toFixed(2).split('.')[1]}</span>
                    <span className="text-sm text-gray-400 ml-1">€ HT</span>
                    <div className="text-sm text-gray-500 font-semibold">/mois</div>
                  </div>
                  <a href="/tarifs"
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mb-4 text-sm">
                    Choisir
                  </a>
                  <ul className="space-y-1.5 mt-auto">
                    {['Fiches illimitées', 'Multi-entreprises', 'DSN illimitée', 'Mises à jour légales', 'Support prioritaire'].map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                    ))}
                  </ul>
                </div>

                {/* Annuel */}
                <div className="bg-white rounded-xl border-2 border-blue-400 p-5 flex flex-col relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                    Économique
                  </div>
                  <div className="text-center font-bold text-gray-800 mb-2">Annuel</div>
                  <div className="relative mb-3">
                    <select value={annuelIdx} onChange={e => setAnnuelIdx(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {ANNUEL_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▾</div>
                  </div>
                  <div className="text-center mb-0.5">
                    <span className="text-5xl font-extrabold text-blue-600">{annuel.prix.toFixed(0)}</span>
                    <span className="text-xl font-bold text-blue-600 align-super">,{annuel.prix.toFixed(2).split('.')[1]}</span>
                    <span className="text-sm text-gray-400 ml-1">€ HT</span>
                    <div className="text-sm text-gray-500 font-semibold">/an</div>
                  </div>
                  <div className="text-center text-xs text-gray-400 mb-3">soit {annuel.parMois.toFixed(2).replace('.', ',')} € HT / mois</div>
                  <a href="/tarifs"
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mb-4 text-sm">
                    Choisir
                  </a>
                  <ul className="space-y-1.5 mt-auto">
                    {['Fiches illimitées', 'Multi-entreprises', 'DSN illimitée', 'Mises à jour légales', 'Support prioritaire'].map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckIcon />{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Garantie */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center text-sm text-gray-500">
            <div className="flex items-center gap-2">🛡️ <span><strong>Satisfait ou remboursé</strong> 30 jours</span></div>
            <div className="hidden sm:block">·</div>
            <div className="flex items-center gap-2">👁️ <span><strong>Aperçu gratuit</strong> illimité avant achat</span></div>
            <div className="hidden sm:block">·</div>
            <div className="flex items-center gap-2">🔒 <span><strong>Paiement sécurisé</strong></span></div>
          </div>
        </div>
      </section>

      {/* ── FAQ SEO ── */}
      <section className="bg-gray-50 py-20 px-6" aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto">
          <h2 id="faq-heading" className="text-3xl font-extrabold text-center text-gray-900 mb-4">
            Questions fréquentes sur la génération de bulletins de salaire
          </h2>
          <p className="text-center text-gray-500 mb-10">Tout ce que vous devez savoir sur BS Facile et le calcul des cotisations sociales.</p>
          <div className="space-y-4">
            {[
              {
                q: 'Comment calculer le salaire net à partir du brut en 2026 ?',
                a: 'Avec BS Facile, saisissez simplement le salaire brut mensuel. Le net à payer est calculé automatiquement après déduction de toutes les cotisations salariales (vieillesse, AGIRC-ARRCO, CSG/CRDS…) et du prélèvement à la source (PAS). Pour 2026 : PMSS 4 005 €, SMIC 1 801,80 €.',
              },
              {
                q: 'Les taux URSSAF et AGIRC-ARRCO 2026 sont-ils intégrés ?',
                a: 'Oui. Tous les taux officiels 2025 et 2026 sont intégrés : vieillesse plafonnée (6,90% / 8,55%), AGIRC-ARRCO T1 (3,15% / 4,72%), T2 (8,64% / 12,95%), CEG, CET (0,14% / 0,21%), CSG déductible (6,80%), CSG/CRDS non déductible (2,90%), allocations familiales, AT/MP, chômage, AGS.',
              },
              {
                q: 'Comment fonctionne la réduction Fillon dans BS Facile ?',
                a: 'La réduction Fillon (allègement général de cotisations patronales) est calculée automatiquement si le salaire brut est inférieur à 1,6 × SMIC annuel. Le coefficient et le montant apparaissent dans le tableau des cotisations patronales.',
              },
              {
                q: 'BS Facile gère-t-il les heures supplémentaires et les absences ?',
                a: 'Oui. Les heures supplémentaires 25%/50% sont calculées avec exonération IR (Loi TEPA). Les absences (maladie, AT, CP, RTT, sans solde) sont déduites automatiquement avec calcul de l\'IJSS en cas de maintien de salaire.',
              },
              {
                q: 'Quelle est la différence entre sans engagement et abonnement ?',
                a: 'En sans engagement, vous achetez des bulletins à l\'unité ou en pack — idéal pour 1 à 20 bulletins/mois. L\'abonnement mensuel ou annuel offre des bulletins illimités — idéal pour les employeurs avec plusieurs salariés. Dans les deux cas, l\'aperçu est gratuit et illimité avant paiement.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border border-gray-200 p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{q}</span>
                  <span className="text-blue-600 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-blue-800 py-20 px-6 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">
            Prêt à générer votre premier bulletin de salaire ?
          </h2>
          <p className="text-blue-200 mb-8">
            Rejoignez les RH, gérants de TPE/PME et comptables qui gagnent du temps chaque mois.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/generateur"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition-all hover:scale-105">
              Essayer gratuitement →
            </a>
            <a href="/tarifs"
              className="border-2 border-white/50 text-white hover:bg-white/10 font-bold text-xl px-10 py-4 rounded-2xl transition-colors">
              Voir tous les tarifs
            </a>
          </div>
          <p className="text-blue-300 text-sm mt-4">Aperçu gratuit · Dès 8,90 € · Conforme droit social 2026</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-white">BS Facile</span>
            <span className="ml-2">· Générateur de bulletin de salaire français</span>
          </div>
          <div className="flex gap-6">
            <a href="/generateur" className="hover:text-white transition-colors">Bulletin de paie</a>
            <a href="/contrat" className="hover:text-white transition-colors">Contrat de travail</a>
            <a href="/tarifs" className="hover:text-white transition-colors">Tarifs</a>
            <a href="#faq-heading" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <p>© {new Date().getFullYear()} BS Facile · Conformité URSSAF 2025/2026</p>
        </div>
      </footer>
    </div>
  );
}
