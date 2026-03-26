import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Congés payés sur fiche de paie 2026 : calcul, indemnité, acquisition — Bulletin Facile',
  description: 'Comment sont calculés les congés payés sur le bulletin de salaire 2026 ? Acquisition, prise, indemnité (10e ou maintien), report. Guide complet avec exemples.',
  alternates: { canonical: 'https://bulletinfacile.fr/conges-payes-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'Les congés payés s\'acquièrent-ils pendant un arrêt maladie ?',
    a: 'Depuis la loi du 22 avril 2024 (transposant la directive européenne), les congés payés s\'acquièrent pendant toute la durée d\'un arrêt maladie, qu\'il soit d\'origine professionnelle ou non. Pour les arrêts non professionnels, l\'acquisition est plafonnée à 2 jours ouvrables par mois (24 jours/an). Les arrêts pour accident du travail ou maladie professionnelle donnent droit aux 2,5 jours/mois habituels.',
  },
  {
    q: 'Que se passe-t-il si je n\'ai pas pris tous mes congés au 31 mai ?',
    a: 'En principe, les congés non pris au 31 mai sont perdus. Toutefois, un report est possible si le salarié n\'a pas pu prendre ses congés pour des raisons indépendantes de sa volonté (arrêt maladie, maternité, congé parental). Dans ce cas, la loi 2024 prévoit un délai de report de 15 mois. Certaines conventions collectives peuvent prévoir des règles de report plus favorables.',
  },
  {
    q: 'Quelle méthode de calcul est appliquée : 1/10e ou maintien de salaire ?',
    a: 'La loi impose d\'appliquer la méthode la plus avantageuse pour le salarié. L\'employeur doit donc calculer les deux montants et retenir le plus élevé. La méthode du maintien de salaire est souvent plus favorable pour les salariés dont la rémunération a augmenté au cours de l\'année de référence, ou pour ceux dont la rémunération variable représente une part importante.',
  },
  {
    q: 'Les congés payés sont-ils soumis à cotisations sociales ?',
    a: 'Oui, l\'indemnité de congés payés est soumise aux mêmes cotisations sociales que le salaire ordinaire (URSSAF, retraite, prévoyance, mutuelle) et au prélèvement à la source (PAS). Elle est intégrée au salaire brut sur le bulletin de paie du mois de prise des congés.',
  },
];

export default function CongesPayesFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 55%, #059669 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit social 2026 — Congés payés
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Congés payés sur la fiche de paie
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Acquisition, calcul de l'indemnité, affichage sur le bulletin 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: '2,5 jours', label: 'Par mois travaillé', sub: 'Jours ouvrables' },
              { val: '30 jours', label: 'Maximum annuel', sub: 'Jours ouvrables/an' },
              { val: '1/10e ou maintien', label: "Méthode d'indemnisation", sub: 'La plus favorable' },
              { val: '1er juin → 31 mai', label: 'Période de référence', sub: 'Année N-1 → N' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 16px' }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{c.val}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{c.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE HERO */}
      <div style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=300&fit=crop&q=80"
          alt="Congés payés et fiche de paie 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Règle d'acquisition */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Règle d'acquisition des congés payés</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Tout salarié acquiert <strong>2,5 jours ouvrables de congés payés par mois de travail effectif</strong>, soit 30 jours ouvrables (5 semaines) par an. Ce droit est ouvert dès le premier jour de travail — il n'y a plus de période d'attente depuis la suppression de la condition d'ancienneté d'un an.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            La <strong>période de référence</strong> court du <strong>1er juin de l'année N-1 au 31 mai de l'année N</strong>. Les congés acquis sur cette période doivent en principe être pris avant le 31 mai suivant.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#065f46', margin: '0 0 8px' }}>Jours ouvrables vs ouvrés</p>
              <p style={{ fontSize: 14, color: '#14532d', lineHeight: 1.65, margin: 0 }}>
                Par défaut, la loi raisonne en <strong>jours ouvrables</strong> (du lundi au samedi, sauf jours fériés), soit 6 jours/semaine. Certaines entreprises utilisent les <strong>jours ouvrés</strong> (5 jours/sem) si cela est plus favorable : 25 jours ouvrés = 30 jours ouvrables.
              </p>
            </div>
            <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#065f46', margin: '0 0 8px' }}>Périodes assimilées à du travail effectif</p>
              <p style={{ fontSize: 14, color: '#14532d', lineHeight: 1.65, margin: 0 }}>
                Congé maternité/paternité, accident du travail, maladie professionnelle, formation, arrêt maladie (depuis 2024). Ces périodes génèrent des droits à congés comme si le salarié était présent.
              </p>
            </div>
          </div>
        </section>

        {/* Deux méthodes de calcul */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Les deux méthodes de calcul de l'indemnité</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'indemnité de congés payés est calculée selon la méthode la plus avantageuse pour le salarié, parmi deux méthodes légales :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#f0fdf4', border: '2px solid #059669', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#065f46', margin: '0 0 10px' }}>Méthode du 1/10e</p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 10px' }}>
                Indemnité = <strong>10 % de la rémunération brute totale</strong> perçue pendant la période de référence, multiplié par le nombre de jours de CP pris.
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Formule : (Brut annuel × 10 %) ÷ 30 × jours pris</p>
            </div>
            <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#1e40af', margin: '0 0 10px' }}>Méthode du maintien de salaire</p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 10px' }}>
                Indemnité = <strong>salaire que le salarié aurait perçu s'il avait travaillé</strong> pendant la durée du congé (reconstitué sur la base de l'horaire pratiqué).
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Formule : Salaire mensuel ÷ jours ouvrables du mois × jours pris</p>
            </div>
          </div>
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, padding: '16px 20px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#92400e', margin: '0 0 4px' }}>Règle d'or</p>
            <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>L'employeur est tenu d'appliquer la méthode qui donne le résultat le plus élevé. Il doit calculer les deux et comparer avant chaque bulletin.</p>
          </div>
        </section>

        {/* Tableau exemple */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exemple chiffré : salarié à 2 000 €, 20 jours de CP pris</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Salarié rémunéré 2 000 € brut/mois (24 000 € bruts sur l'année de référence), prenant 20 jours ouvrables de congés. Mois comportant 22 jours ouvrables.
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#059669', color: 'white' }}>
                  {['Méthode', 'Calcul détaillé', 'Indemnité obtenue'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f0fdf4', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#065f46' }}>1/10e de la rémunération</td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>24 000 € × 10 % = 2 400 €<br /><span style={{ color: '#6b7280', fontSize: 13 }}>2 400 € ÷ 30 jours × 20 jours</span></td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#065f46' }}>1 600 €</td>
                </tr>
                <tr style={{ background: '#eff6ff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e40af' }}>Maintien de salaire</td>
                  <td style={{ padding: '14px 16px', color: '#374151' }}>2 000 € ÷ 22 jours × 20 jours<br /><span style={{ color: '#6b7280', fontSize: 13 }}>Salaire reconstitué sur la durée du congé</span></td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e40af' }}>1 818,18 €</td>
                </tr>
                <tr style={{ background: '#dcfce7' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#065f46' }}>Méthode retenue</td>
                  <td style={{ padding: '14px 16px', color: '#374151', fontWeight: 600 }}>Maintien de salaire (plus favorable)</td>
                  <td style={{ padding: '14px 16px', fontWeight: 900, color: '#059669', fontSize: 16 }}>1 818,18 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280' }}>* Le nombre de jours ouvrables dans le mois varie. L'employeur doit recalculer chaque mois de prise de congés.</p>
        </section>

        {/* Affichage sur le bulletin */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Comment ça apparaît sur le bulletin de paie</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Lors d'un mois de prise de congés, le bulletin fait apparaître plusieurs lignes spécifiques :
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            {[
              { label: 'Salaire brut mensuel de base', val: '2 000,00 €', type: 'base' },
              { label: '— Absence congés payés (déduction des jours non travaillés)', val: '− 1 818,18 €', type: 'deduct' },
              { label: '+ Indemnités de congés payés (ligne distincte)', val: '+ 1 818,18 €', type: 'add' },
              { label: 'Brut total soumis aux cotisations', val: '2 000,00 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #e2e8f0', background: row.type === 'result' ? '#dcfce7' : row.type === 'base' ? '#f0fdf4' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : '#0f172a', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : '#065f46', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#374151' }}>
            Le bulletin mentionne également le <strong>solde de congés payés</strong> (acquis, pris, restants) en bas de page ou dans une rubrique dédiée, ce qui permet au salarié de suivre ses droits en temps réel.
          </p>
        </section>

        {/* Cas particuliers */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Cas particuliers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#991b1b', margin: '0 0 8px' }}>Congés payés pendant un arrêt maladie (loi 2024)</p>
              <p style={{ fontSize: 14, color: '#7f1d1d', lineHeight: 1.65, margin: 0 }}>
                Depuis le 24 avril 2024, les congés payés s'acquièrent pendant tout arrêt maladie. Pour les arrêts non professionnels, l'acquisition est limitée à 2 jours/mois (24 jours/an). La loi prévoit également un droit de report de 15 mois pour les congés non pris en raison d'un arrêt.
              </p>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#065f46', margin: '0 0 8px' }}>Convention collective plus favorable</p>
              <p style={{ fontSize: 14, color: '#14532d', lineHeight: 1.65, margin: 0 }}>
                De nombreuses conventions collectives accordent des congés supplémentaires (congés d'ancienneté, congés supplémentaires pour enfants à charge). La convention collective prime sur les règles légales si elle est plus favorable au salarié.
              </p>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1e40af', margin: '0 0 8px' }}>Indemnité compensatrice à la rupture du contrat</p>
              <p style={{ fontSize: 14, color: '#1e3a8a', lineHeight: 1.65, margin: 0 }}>
                En cas de rupture du contrat (démission, licenciement, fin de CDD), les congés acquis non pris donnent lieu au versement d'une <strong>indemnité compensatrice de congés payés</strong>, calculée selon les mêmes méthodes et figurant sur le dernier bulletin.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur les congés payés</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#059669', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin avec congés payés</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile calcule automatiquement l'indemnité de congés payés selon la méthode la plus favorable.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
