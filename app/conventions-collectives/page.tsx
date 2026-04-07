import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Conventions collectives et bulletin de salaire : guide 2026',
  description: 'Quelle convention collective s\'applique à votre entreprise ? Comment l\'identifier avec le code NAF et l\'intégrer dans vos bulletins de salaire. Guide complet 2026.',
  alternates: { canonical: 'https://bulletinfacile.fr/conventions-collectives' },
  openGraph: {
    title: 'Conventions collectives et bulletin de salaire : guide 2026',
    description: 'Code NAF, IDCC, conventions les plus courantes en France. Comment identifier et appliquer la bonne convention dans vos bulletins de salaire.',
    type: 'article',
    publishedTime: '2026-04-07',
    url: 'https://bulletinfacile.fr/conventions-collectives',
  },
};

const CONVENTIONS = [
  { idcc: '3239', nom: 'Particuliers employeurs et emploi à domicile', secteur: 'Services à la personne', salaries: '~3,5M' },
  { idcc: '1483', nom: 'Commerce de détail et de gros à prédominance alimentaire', secteur: 'Grande distribution', salaries: '~700K' },
  { idcc: '1090', nom: 'Bureaux d\'études techniques (SYNTEC)', secteur: 'Ingénierie, conseil, numérique', salaries: '~700K' },
  { idcc: '1702', nom: 'Bâtiment — ouvriers (entreprises > 10 salariés)', secteur: 'BTP', salaries: '~600K' },
  { idcc: '2098', nom: 'Hospitalisation privée', secteur: 'Santé privée', salaries: '~350K' },
  { idcc: '1996', nom: 'Coiffure', secteur: 'Beauté / Esthétique', salaries: '~130K' },
  { idcc: '1979', nom: 'Hôtels, cafés, restaurants (HCR)', secteur: 'Restauration', salaries: '~900K' },
  { idcc: '2120', nom: 'Immobilier', secteur: 'Agences immobilières', salaries: '~120K' },
  { idcc: '2596', nom: 'Professions libérales de la santé', secteur: 'Médical libéral', salaries: '~200K' },
  { idcc: '1996', nom: 'Nettoyage de locaux', secteur: 'Propreté', salaries: '~500K' },
];

const FAQ = [
  {
    q: 'Comment savoir quelle convention collective s\'applique à mon entreprise ?',
    a: 'La convention collective applicable dépend de l\'activité principale de votre entreprise, identifiée par son code NAF (ou APE) attribué par l\'INSEE lors de la création. Vous pouvez consulter la liste des conventions sur legifrance.gouv.fr ou via le service Mon compte pro. Le numéro IDCC (Identifiant de Convention Collective) identifie chaque convention de façon unique.',
  },
  {
    q: 'Faut-il obligatoirement mentionner la convention collective sur le bulletin de salaire ?',
    a: 'Oui. Depuis 2016, la mention de la convention collective applicable est obligatoire sur chaque bulletin de salaire (article R3243-1 du Code du travail). L\'absence de cette mention peut exposer l\'employeur à une amende. Bulletin Facile vous permet de saisir la convention et de l\'afficher sur le bulletin.',
  },
  {
    q: 'Que se passe-t-il si aucune convention collective ne s\'applique à mon secteur ?',
    a: 'Si aucune convention collective sectorielle ne couvre votre activité, c\'est le droit commun du travail (Code du travail) qui s\'applique intégralement. Les minima légaux URSSAF, le SMIC et les règles du Code du travail constituent alors le cadre exclusif. C\'est le cas traité par défaut par Bulletin Facile.',
  },
  {
    q: 'Bulletin Facile gère-t-il toutes les conventions collectives ?',
    a: 'Bulletin Facile applique le droit commun du travail (Code du travail) avec tous les calculs URSSAF, AGIRC-ARRCO, réduction Fillon et PAS. Les minima conventionnels spécifiques à chaque convention (grilles de salaires, primes conventionnelles, ancienneté majorée) doivent être saisis manuellement par l\'utilisateur. C\'est identique à la plupart des outils de paie : la convention fixe des minima que l\'employeur doit respecter, les calculs de cotisations restent les mêmes.',
  },
  {
    q: 'La convention collective peut-elle prévoir des cotisations différentes de celles de l\'URSSAF ?',
    a: 'Non. Les taux de cotisations URSSAF, AGIRC-ARRCO, CSG/CRDS sont définis par la loi et s\'appliquent uniformément, quelle que soit la convention. La convention peut en revanche prévoir des cotisations supplémentaires (prévoyance, mutuelle complémentaire) dont les taux varient selon l\'accord de branche.',
  },
];

export default function ConventionsCollectivesPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>
      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a8f 55%, #2563eb 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            ⚖️ Droit du travail · Guide 2026
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            Conventions collectives<br />et bulletin de salaire
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, maxWidth: 680, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Comment identifier votre convention collective, la faire figurer sur vos bulletins de salaire et comprendre ce qu'elle implique concrètement pour votre paie.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', fontSize: 13, opacity: 0.75 }}>
            <span>📅 Publié le 7 avril 2026</span>
            <span>·</span>
            <span>🕐 6 min de lecture</span>
            <span>·</span>
            <span>📌 Source : service-public.gouv.fr</span>
          </div>
        </div>
      </section>

      <article style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* Définition bloc LLM */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '24px 28px', marginBottom: 48 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#1a3a8f', margin: '0 0 12px' }}>Qu'est-ce qu'une convention collective ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#1e3a5f', margin: 0 }}>
            Une <strong>convention collective</strong> est un accord négocié entre organisations patronales et syndicats de salariés d'un même secteur d'activité. Elle fixe les <strong>conditions de travail, les salaires minima, les congés et les droits spécifiques</strong> applicables dans ce secteur — souvent plus favorables que le Code du travail. Elle s'impose à tout employeur relevant du secteur couvert, quelle que soit la taille de l'entreprise. Source : <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F78" target="_blank" rel="noopener noreferrer" style={{ color: '#1a3a8f' }}>service-public.gouv.fr</a>
          </p>
        </div>

        {/* Section 1 */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 48, marginBottom: 16 }}>
          Comment identifier la convention collective de votre entreprise ?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 16 }}>
          La convention applicable dépend de l'<strong>activité principale</strong> de votre entreprise, identifiée par son <strong>code NAF/APE</strong> attribué par l'INSEE à la création.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 40 }}>
          {[
            { etape: '1', titre: 'Trouvez votre code NAF', desc: 'Il figure sur votre extrait Kbis, votre avis de situation SIRENE ou votre bulletin URSSAF.' },
            { etape: '2', titre: 'Identifiez votre convention', desc: 'Sur legifrance.gouv.fr ou via la recherche sur moncompte.pro avec votre code NAF.' },
            { etape: '3', titre: 'Notez le numéro IDCC', desc: 'L\'Identifiant de Convention Collective (IDCC) est le code unique à 4 chiffres de votre convention.' },
            { etape: '4', titre: 'Mentionnez-la sur les bulletins', desc: 'Obligatoire depuis 2016 : le nom et l\'IDCC doivent figurer sur chaque fiche de paie.' },
          ].map(s => (
            <div key={s.etape} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a3a8f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, marginBottom: 10 }}>{s.etape}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e', marginBottom: 6 }}>{s.titre}</div>
              <p style={{ fontSize: 13, color: '#4b5563', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Section 2 — Tableau conventions */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 16 }}>
          Les conventions collectives les plus courantes en France (2026)
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 24 }}>
          La France compte plus de <strong>700 conventions collectives actives</strong>. Voici les principales par nombre de salariés couverts :
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#1a3a8f', color: 'white' }}>
                <th style={{ padding: '11px 14px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>IDCC</th>
                <th style={{ padding: '11px 14px', textAlign: 'left' }}>Convention collective</th>
                <th style={{ padding: '11px 14px', textAlign: 'left' }}>Secteur</th>
                <th style={{ padding: '11px 14px', textAlign: 'right', borderRadius: '0 8px 0 0' }}>Salariés couverts</th>
              </tr>
            </thead>
            <tbody>
              {CONVENTIONS.map((c, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#6b7280', fontSize: 13 }}>{c.idcc}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>{c.nom}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', color: '#6b7280', fontSize: 13 }}>{c.secteur}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', textAlign: 'right', fontWeight: 700, color: '#1a3a8f' }}>{c.salaries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3 — Ce que la CC change sur le bulletin */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 48, marginBottom: 16 }}>
          Ce que la convention collective change sur votre bulletin de salaire
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 40 }}>
          {[
            { titre: 'Ce qu\'elle change', couleur: '#dc2626', bg: '#fef2f2', border: '#fecaca', items: ['Salaires minima par classification', 'Durée légale du préavis', 'Calcul de l\'ancienneté', 'Primes conventionnelles', 'Congés supplémentaires'] },
            { titre: 'Ce qu\'elle ne change PAS', couleur: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', items: ['Taux URSSAF et cotisations légales', 'AGIRC-ARRCO', 'CSG/CRDS', 'Réduction Fillon', 'Prélèvement à la source (PAS)'] },
          ].map(col => (
            <div key={col.titre} style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 12, padding: '20px 22px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: col.couleur, margin: '0 0 12px' }}>{col.titre}</h3>
              <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 2.1, color: '#374151', fontSize: 14 }}>
                {col.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Encadré clé */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '20px 24px', marginBottom: 48 }}>
          <p style={{ fontSize: 15, color: '#92400e', margin: 0, lineHeight: 1.75 }}>
            💡 <strong>Point clé :</strong> Les cotisations sociales (URSSAF, AGIRC-ARRCO, CSG/CRDS) sont fixées par la <strong>loi</strong> et sont identiques pour tous les employeurs, quelle que soit leur convention collective. La convention influence uniquement les <strong>minima de salaire et les avantages contractuels</strong>. Bulletin Facile calcule correctement toutes ces cotisations légales, pour toutes les entreprises.
          </p>
        </div>

        {/* Section 4 — Obligations */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 48, marginBottom: 16 }}>
          Obligations de l'employeur vis-à-vis de la convention collective
        </h2>
        <ul style={{ paddingLeft: 24, marginBottom: 40, lineHeight: 2.3, color: '#374151', fontSize: 16 }}>
          <li>Informer le salarié de la convention applicable <strong>dans le mois suivant l'embauche</strong></li>
          <li>Afficher le texte de la convention dans les locaux (ou sur l'intranet)</li>
          <li>Mentionner la convention sur <strong>chaque bulletin de salaire</strong> (obligatoire depuis 2016)</li>
          <li>Respecter les <strong>salaires minima conventionnels</strong> — toujours supérieurs ou égaux au SMIC</li>
          <li>Informer les représentants du personnel de toute modification annuellement</li>
        </ul>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1a3a8f, #2563eb)', borderRadius: 14, padding: '32px 28px', marginTop: 48, marginBottom: 56, textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Générez vos bulletins conformes en 30 secondes</h3>
          <p style={{ fontSize: 15, opacity: 0.88, marginBottom: 24, lineHeight: 1.6 }}>
            Saisissez votre convention collective une fois, et tous vos bulletins l'afficheront automatiquement. Calculs URSSAF, AGIRC-ARRCO et réduction Fillon inclus.
          </p>
          <Link href="/generateur" style={{ display: 'inline-block', background: 'white', color: '#1a3a8f', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, textDecoration: 'none' }}>
            Générer mon bulletin →
          </Link>
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 24 }}>Questions fréquentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '18px 22px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>{item.q}</h3>
              <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Articles liés */}
        <div style={{ paddingTop: 32, borderTop: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 14 }}>À lire aussi</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/calculer-cotisations-sociales-embauche" style={{ background: '#f0fdf4', color: '#065f46', padding: '9px 15px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Cotisations à l'embauche →</Link>
            <Link href="/reduction-fillon" style={{ background: '#eff6ff', color: '#1a3a8f', padding: '9px 15px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Réduction Fillon →</Link>
            <Link href="/smic-2026" style={{ background: '#fffbeb', color: '#92400e', padding: '9px 15px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>SMIC 2026 →</Link>
            <Link href="/dsn-declaration-sociale-nominative" style={{ background: '#fdf4ff', color: '#6b21a8', padding: '9px 15px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>DSN : ce qu'il faut savoir →</Link>
          </div>
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #e5e7eb', fontSize: 13, color: '#9ca3af' }}>
          <strong style={{ color: '#6b7280' }}>Source :</strong>{' '}
          <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F78" target="_blank" rel="noopener noreferrer" style={{ color: '#1a3a8f' }}>
            Service-Public — Convention collective (F78)
          </a>
          {' '}· Code du travail, article R3243-1 · Legifrance.gouv.fr
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Conventions collectives et bulletin de salaire : guide 2026',
        datePublished: '2026-04-07', dateModified: '2026-04-07',
        author: { '@type': 'Organization', name: 'Bulletin Facile', url: 'https://bulletinfacile.fr' },
        publisher: { '@type': 'Organization', name: 'Bulletin Facile', url: 'https://bulletinfacile.fr' },
        description: 'Comment identifier votre convention collective, la mentionner sur les bulletins de salaire et comprendre ce qu\'elle implique pour la paie en 2026.',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://bulletinfacile.fr/conventions-collectives' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })}} />

      <Footer />
    </div>
  );
}
