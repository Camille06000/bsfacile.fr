import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Qui sommes-nous ? — Bulletin Facile',
  description: 'Découvrez l\'équipe derrière Bulletin Facile, notre mission : simplifier la paie française pour les TPE, PME, RH et experts-comptables. Conformité URSSAF 2025/2026.',
  alternates: { canonical: 'https://bulletinfacile.fr/qui-sommes-nous' },
};

const VALEURS = [
  { icon: '⚖️', titre: 'Conformité légale', desc: 'Chaque taux, chaque cotisation est mis à jour dès publication au Journal Officiel. PMSS, SMIC, AGIRC-ARRCO, réduction Fillon — rien n\'est laissé au hasard.' },
  { icon: '⚡', titre: 'Simplicité radicale', desc: 'Un bulletin de salaire complet en 30 secondes. Pas de formation, pas de logiciel à installer, pas de comptable requis. Juste saisir le brut.' },
  { icon: '🔒', titre: 'Transparence totale', desc: 'Nos calculs sont affichés ligne par ligne. Vous voyez exactement d\'où vient chaque centième. Pas de boîte noire.' },
  { icon: '🇫🇷', titre: 'Fait en France', desc: 'Conçu par des Français, pour le droit social français. Chaque particularité du Code du travail est intégrée : cadres, non-cadres, effectifs, conventions collectives.' },
];

const CHIFFRES = [
  { n: '< 30s', l: 'Pour générer un bulletin complet' },
  { n: '100 %', l: 'Taux URSSAF officiels 2026' },
  { n: '2025–2026', l: 'Paramètres toujours à jour' },
  { n: '30 jours', l: 'Garantie satisfait ou remboursé' },
];

export default function QuiSommesNousPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #e5e7eb', zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: 900, fontSize: 20, color: '#1e40af', textDecoration: 'none' }}>Bulletin Facile</Link>
          <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <Link href="/generateur" style={{ color: '#6b7280', textDecoration: 'none' }}>Générateur</Link>
            <Link href="/tarifs" style={{ color: '#6b7280', textDecoration: 'none' }}>Tarifs</Link>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none' }}>Guides</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)', color: 'white', padding: '80px 24px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Cercles décoratifs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <div style={{ maxWidth: 750, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            🇫🇷 Générateur de bulletin de salaire 100% français
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            Qui sommes-nous ?
          </h1>
          <p style={{ fontSize: 20, opacity: 0.88, lineHeight: 1.7, marginBottom: 32 }}>
            Bulletin Facile est né d'un constat simple : générer une fiche de paie conforme au droit social français ne devrait pas nécessiter un diplôme en comptabilité.
          </p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
            Essayer gratuitement →
          </Link>
        </div>
      </section>

      {/* CHIFFRES */}
      <section style={{ background: '#f0f7ff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, textAlign: 'center' }}>
          {CHIFFRES.map(c => (
            <div key={c.n} style={{ padding: '24px 16px' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#1d4ed8' }}>{c.n}</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 6 }}>{c.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1d4ed8', borderRadius: 50, padding: '4px 16px', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Notre histoire</div>
        <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 24, lineHeight: 1.2 }}>
          Une mission claire : rendre la paie accessible à tous
        </h2>
        <div style={{ fontSize: 16, lineHeight: 1.9, color: '#374151' }}>
          <p style={{ marginBottom: 20 }}>
            Bulletin Facile est né de la frustration de gérants de TPE, d'auto-entrepreneurs et de responsables RH qui perdaient des heures chaque mois sur des calculs de cotisations sociales. Entre les taux URSSAF qui changent chaque année, la réduction Fillon dont le coefficient est un casse-tête, et les tranches AGIRC-ARRCO à calculer selon le statut cadre ou non-cadre — établir un bulletin conforme était devenu un vrai parcours du combattant.
          </p>
          <p style={{ marginBottom: 20 }}>
            Nous avons décidé d'encoder <strong>l'intégralité du droit social français</strong> dans un moteur de calcul automatique. Le résultat : vous saisissez le salaire brut, et en 30 secondes vous obtenez un bulletin de paie complet, structuré et conforme à l'article L.3243-2 du Code du travail.
          </p>
          <p>
            Aujourd'hui, Bulletin Facile est utilisé par des RH de PME, des gérants de SARL, des experts-comptables indépendants et des particuliers employeurs. Notre engagement reste le même depuis le premier jour : <strong>des calculs exacts, une interface simple, des tarifs transparents.</strong>
          </p>
        </div>
      </section>

      {/* NOS VALEURS */}
      <section style={{ background: '#f9fafb', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-block', background: '#dcfce7', color: '#15803d', borderRadius: 50, padding: '4px 16px', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Ce qui nous guide</div>
            <h2 style={{ fontSize: 36, fontWeight: 900 }}>Nos 4 valeurs fondamentales</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {VALEURS.map((v, i) => (
              <article key={i} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#111827' }}>{v.titre}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CE QU'ON CALCULE */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 32, textAlign: 'center' }}>Ce que Bulletin Facile calcule automatiquement</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            'Cotisations vieillesse plafonnée et déplafonnée',
            'AGIRC-ARRCO tranche 1 (T1) et tranche 2 (T2)',
            'CEG et CET (cadres uniquement)',
            'CSG déductible 6,80 % et non-déductible 2,90 %',
            'CRDS 0,50 %',
            'Assurance chômage 4 %',
            'Complémentaire santé (selon convention)',
            'AT/MP (taux d\'accident du travail)',
            'Allocations familiales 3,45 % / 5,25 %',
            'FNAL 0,10 % (< 50 sal.) / 0,50 % (≥ 50 sal.)',
            'Réduction Fillon automatique',
            'Prélèvement à la source (PAS)',
            'Heures supplémentaires exonérées IR (Loi TEPA)',
            'Absences avec calcul IJSS et subrogation',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#374151', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', color: 'white', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Prêt à simplifier votre paie ?</h2>
          <p style={{ opacity: 0.85, fontSize: 18, marginBottom: 36 }}>Générez votre premier bulletin en 30 secondes. Aperçu gratuit, sans inscription.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/generateur" style={{ background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Créer un bulletin →
            </Link>
            <Link href="/tarifs" style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontWeight: 700, fontSize: 17, padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', color: '#9ca3af', padding: '40px 24px', textAlign: 'center', fontSize: 13 }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'white', fontWeight: 700 }}>Bulletin Facile</span> · Générateur de bulletin de salaire français
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Accueil</Link>
          <Link href="/generateur" style={{ color: '#9ca3af', textDecoration: 'none' }}>Générateur</Link>
          <Link href="/tarifs" style={{ color: '#9ca3af', textDecoration: 'none' }}>Tarifs</Link>
          <Link href="/smic-2026" style={{ color: '#9ca3af', textDecoration: 'none' }}>SMIC 2026</Link>
          <Link href="/comment-lire-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Lire une fiche de paie</Link>
        </div>
        <p style={{ marginTop: 20 }}>© {new Date().getFullYear()} Bulletin Facile · Conformité URSSAF 2025/2026</p>
      </footer>
    </div>
  );
}
