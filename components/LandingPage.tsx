'use client';
import { useState } from 'react';

const PRICE = 49; // € TTC — à modifier

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      alert('Erreur lors du paiement. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-blue-800 font-extrabold text-xl tracking-tight">BS Facile</span>
          <button onClick={handleBuy} disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
            Accès à vie — {PRICE} €
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-white/20">
            ✓ Conforme URSSAF 2025 / 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Générez vos fiches de paie<br />
            <span className="text-yellow-300">en 30 secondes</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Cotisations salariales &amp; patronales calculées automatiquement.
            AGIRC-ARRCO, CSG/CRDS, réduction Fillon — tout est inclus. Prêt à imprimer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleBuy} disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg px-10 py-4 rounded-xl shadow-xl transition-all hover:scale-105">
              {loading ? 'Redirection...' : `Obtenir l'accès à vie — ${PRICE} €`}
            </button>
            <a href="/generateur"
              className="border border-white/40 text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
              Essayer gratuitement →
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-4">Paiement unique · Pas d'abonnement · Mises à jour incluses</p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-gray-50 border-b py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { n: '< 30s', l: 'Bulletin généré' },
            { n: '2025/26', l: 'Taux légaux à jour' },
            { n: '100%', l: 'Conforme droit social' },
          ].map(s => (
            <div key={s.n}>
              <div className="text-3xl font-extrabold text-blue-800">{s.n}</div>
              <div className="text-sm text-gray-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
            Tout ce qu'un comptable ferait — en automatique
          </h2>
          <p className="text-center text-gray-500 mb-14">
            Plus besoin d'Excel, de formules manuelles ou d'un logiciel à 300€/an.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧮',
                title: 'Calcul automatique',
                desc: 'Entrez le brut mensuel — toutes les cotisations (salariales + patronales) se calculent instantanément.',
              },
              {
                icon: '⚖️',
                title: 'Conformité légale 2026',
                desc: 'PMSS 4 005 €, SMIC 1 801,80 €, réduction Fillon, AGIRC-ARRCO, CEG, CET — tous les taux officiels.',
              },
              {
                icon: '🖨️',
                title: 'Bulletin print-ready',
                desc: 'Bulletin structuré prêt à imprimer ou exporter en PDF depuis le navigateur en un clic.',
              },
              {
                icon: '👔',
                title: 'Cadre & Non-cadre',
                desc: 'Gestion du statut cadre (APEC, tranches AGIRC-ARRCO T2) et non-cadre avec les bons taux.',
              },
              {
                icon: '🏢',
                title: 'Effectif adaptatif',
                desc: 'FNAL, formation pro, taux Fillon ajustés selon que l\'entreprise fait < 50 ou ≥ 50 salariés.',
              },
              {
                icon: '📐',
                title: 'Taux horaire auto',
                desc: 'Remplissez 2 champs parmi brut / heures / taux horaire — le 3ème se calcule seul.',
              },
            ].map(f => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Saisissez le brut', desc: 'Entrez le salaire brut mensuel, le statut et l\'effectif.' },
              { step: '2', title: 'Calcul instantané', desc: 'Toutes les cotisations 2025/2026 sont calculées automatiquement.' },
              { step: '3', title: 'Imprimez ou exportez', desc: 'Bulletin prêt. Imprimez ou exportez en PDF depuis votre navigateur.' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-700 text-white text-xl font-extrabold flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-6" id="pricing">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Un seul prix. Pour toujours.</h2>
          <p className="text-gray-500 mb-10">Pas d'abonnement, pas de surprise. Payez une fois, utilisez à vie.</p>
          <div className="bg-white border-2 border-blue-600 rounded-3xl p-8 shadow-2xl">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Accès à vie</div>
            <div className="flex items-end justify-center gap-1 mb-1">
              <span className="text-6xl font-extrabold text-gray-900">{PRICE}</span>
              <span className="text-2xl text-gray-500 mb-2">€</span>
            </div>
            <div className="text-gray-400 text-sm mb-8">TTC · Paiement unique</div>
            <ul className="text-left space-y-3 mb-8">
              {[
                'Accès illimité au générateur',
                'Toutes les cotisations 2025 et 2026',
                'Bulletins illimités',
                'Export PDF navigateur',
                'Mises à jour légales incluses',
                'Support par email',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
            <button onClick={handleBuy} disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg">
              {loading ? 'Redirection...' : `Payer ${PRICE} € — Accès immédiat`}
            </button>
            <p className="text-xs text-gray-400 mt-3">Paiement sécurisé par Stripe · Remboursement 30j garanti</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Questions fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Les taux sont-ils à jour pour 2026 ?',
                a: 'Oui. PMSS 4 005 €, taux URSSAF, AGIRC-ARRCO, CSG/CRDS, réduction Fillon — tous intégrés. Mises à jour automatiques à chaque changement légal.',
              },
              {
                q: 'Fonctionne-t-il pour les cadres ET les non-cadres ?',
                a: 'Oui. Cadres : APEC, tranches AGIRC-ARRCO T2, CEG T2. Non-cadres : taux standards. Effectif < 50 ou ≥ 50 salariés également pris en compte.',
              },
              {
                q: 'Puis-je utiliser BS Facile pour mon cabinet comptable ?',
                a: 'L\'accès à vie est par compte. Pour un usage multi-clients en cabinet, contactez-nous pour une licence professionnelle.',
              },
              {
                q: 'C\'est vraiment sans abonnement ?',
                a: 'Oui. Vous payez une seule fois et accédez à vie, y compris toutes les futures mises à jour légales.',
              },
              {
                q: 'Puis-je me faire rembourser ?',
                a: 'Oui. Garantie satisfait ou remboursé pendant 30 jours après l\'achat, sans condition.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border border-gray-200 p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {q}
                  <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">+</span>
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
          <h2 className="text-3xl font-extrabold mb-4">Prêt à générer votre premier bulletin ?</h2>
          <p className="text-blue-200 mb-8">Rejoignez les RH et comptables qui gagnent du temps chaque mois.</p>
          <button onClick={handleBuy} disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-12 py-5 rounded-2xl shadow-xl transition-all hover:scale-105">
            {loading ? 'Redirection...' : `Accès à vie — ${PRICE} € une seule fois`}
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-8 px-6 text-center">
        <p>© {new Date().getFullYear()} BS Facile · Tous droits réservés</p>
        <p className="mt-1">Conforme droit social français 2025/2026 · Données hébergées en France</p>
      </footer>
    </div>
  );
}
