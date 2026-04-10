import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DSN (Déclaration Sociale Nominative) : à quoi ça sert vraiment pour une TPE ?',
  description: 'La DSN est obligatoire pour déclarer les salariés à l\'URSSAF, mais vous n\'avez pas à la gérer vous-même. Bulletin Facile prend en charge les calculs — la DSN, c\'est l\'affaire de votre expert-comptable.',
  alternates: { canonical: 'https://bulletinfacile.fr/dsn-declaration-sociale-nominative' },
  openGraph: {
    title: 'DSN (Déclaration Sociale Nominative) : à quoi ça sert pour une TPE ?',
    description: 'Comprendre la DSN sans la gérer soi-même. Bulletin Facile génère vos bulletins conformes — la transmission DSN reste facultative pour vous.',
    type: 'article',
    publishedTime: '2026-04-07',
    url: 'https://bulletinfacile.fr/dsn-declaration-sociale-nominative',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'DSN (Déclaration Sociale Nominative) : à quoi ça sert vraiment pour une TPE ?',
  description: 'La DSN est obligatoire pour déclarer les salariés, mais une TPE peut déléguer cette transmission à son expert-comptable. Bulletin Facile gère les calculs de paie.',
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
  author: { '@type': 'Organization', name: 'Bulletin Facile', url: 'https://bulletinfacile.fr' },
  publisher: { '@type': 'Organization', name: 'Bulletin Facile', url: 'https://bulletinfacile.fr' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://bulletinfacile.fr/dsn-declaration-sociale-nominative' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Est-ce que Bulletin Facile gère la DSN ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bulletin Facile génère des bulletins de salaire conformes aux taux URSSAF 2026. La transmission DSN mensuelle est une étape distincte, généralement gérée par votre expert-comptable ou un logiciel de paie dédié (Silae, PayFit, etc.). Notre outil couvre l\'essentiel pour les TPE : calcul exact des cotisations et bulletin PDF conforme.',
      },
    },
    {
      '@type': 'Question',
      name: 'La DSN est-elle obligatoire pour les TPE ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La DSN est obligatoire pour tout employeur depuis 2017. Cependant, son dépôt est souvent délégué à l\'expert-comptable de l\'entreprise. Une TPE qui utilise Bulletin Facile reçoit un bulletin PDF conforme ; la transmission DSN se fait ensuite via son cabinet comptable ou un logiciel agréé.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre un bulletin de salaire et une DSN ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le bulletin de salaire est le document remis au salarié chaque mois. La DSN est une déclaration mensuelle envoyée de façon dématérialisée aux organismes sociaux (URSSAF, AGIRC-ARRCO, Prévoyance, Pôle Emploi…). Les deux sont basés sur les mêmes données de paie mais ont des usages différents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je utiliser Bulletin Facile sans gérer la DSN moi-même ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. La majorité des TPE utilisant Bulletin Facile délèguent la DSN à leur expert-comptable. Vous générez votre bulletin conforme sur notre plateforme, vous le transmettez à votre salarié et à votre comptable, qui se charge de la déclaration DSN.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quand la DSN doit-elle être transmise ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La DSN mensuelle doit être transmise au plus tard le 5 du mois suivant la période de paie (ou le 15 pour les entreprises de moins de 50 salariés qui paient leurs cotisations trimestriellement). Le non-respect de ces délais expose à des pénalités URSSAF.',
      },
    },
  ],
};

export default function DSNPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg,#1a3a8f 0%,#2563eb 100%)', color: 'white', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 16px', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
            📡 COMPRENDRE LA DSN
          </div>
          <h1 style={{ fontSize: 'clamp(26px,5vw,40px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.2 }}>
            DSN — Déclaration Sociale Nominative :<br />ce que vous devez savoir en tant que TPE
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 640, lineHeight: 1.7 }}>
            La DSN est souvent présentée comme une contrainte complexe. En réalité, pour une TPE, elle est généralement gérée par votre expert-comptable. Votre mission : un bulletin de salaire correct. On s'occupe de ça.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* DÉFINITION BLOCK — LLM extractable */}
        <div style={{ background: '#eff6ff', border: '2px solid #2563eb', borderRadius: 14, padding: '28px 32px', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', letterSpacing: 1, marginBottom: 8 }}>DÉFINITION</div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#1e3a8a', fontWeight: 500 }}>
            La <strong>Déclaration Sociale Nominative (DSN)</strong> est un fichier numérique mensuel envoyé aux organismes de protection sociale (URSSAF, AGIRC-ARRCO, Pôle Emploi, Prévoyance…) à partir des données de paie de l'entreprise. Elle est <strong>obligatoire pour tous les employeurs français depuis 2017</strong> et remplace une vingtaine d'anciennes déclarations papier.
          </p>
        </div>

        {/* SECTION : CE QUE LA DSN N'EST PAS */}
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#1a1a2e' }}>
          La DSN n'est pas un outil que vous utilisez au quotidien
        </h2>
        <p style={{ lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>
          Beaucoup de gérants de TPE pensent qu'ils doivent "faire la DSN" eux-mêmes. En pratique, la grande majorité des petites entreprises <strong>délèguent cette transmission à leur expert-comptable</strong> ou à un cabinet de gestion sociale.
        </p>
        <p style={{ lineHeight: 1.8, color: '#374151', marginBottom: 32 }}>
          Votre rôle se limite à fournir les données de paie exactes chaque mois. C'est exactement ce que génère <strong>Bulletin Facile</strong> : un bulletin conforme, avec tous les taux à jour, que vous transmettez à votre salarié et à votre comptable.
        </p>

        {/* SCHÉMA SIMPLIFIÉ */}
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#1a1a2e' }}>
          Le flux de la paie en pratique pour une TPE
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { num: '1', titre: 'Vous saisissez les données', desc: 'Salaire brut, heures, primes, absences — dans Bulletin Facile' },
            { num: '2', titre: 'Bulletin généré', desc: 'PDF conforme aux taux URSSAF 2026, prêt en 2 minutes' },
            { num: '3', titre: 'Remise au salarié', desc: 'Vous téléchargez et remettez le bulletin à votre employé' },
            { num: '4', titre: 'Expert-comptable', desc: 'Il intègre vos données et transmet la DSN dans les délais' },
          ].map(step => (
            <div key={step.num} style={{ background: '#f8fafc', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ width: 36, height: 36, background: '#2563eb', borderRadius: '50%', color: 'white', fontSize: 18, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{step.num}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#1a1a2e' }}>{step.titre}</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>

        {/* CE QUE CONTIENT LA DSN */}
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#1a1a2e' }}>
          Que contient une DSN ?
        </h2>
        <p style={{ lineHeight: 1.8, color: '#374151', marginBottom: 16 }}>
          La DSN rassemble, pour chaque salarié, les données suivantes issues de la paie :
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            '🆔 Identité complète du salarié (NIR, nom, prénom)',
            '💶 Rémunération brute du mois',
            '📅 Dates d\'entrée et de sortie',
            '⏱️ Temps de travail (contrat, heures réelles)',
            '🏥 Arrêts de travail, congés, absences',
            '💊 Données de prévoyance et mutuelle',
            '📊 Cotisations URSSAF détaillées',
            '📋 Cotisations AGIRC-ARRCO (retraite)',
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#374151', border: '1px solid #e2e8f0' }}>
              {item}
            </div>
          ))}
        </div>

        {/* DÉLAIS */}
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#1a1a2e' }}>
          Délais de transmission de la DSN
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#1e3a8a', color: 'white' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cas</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date limite de dépôt</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date limite de paiement</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cas: 'Entreprises ≥ 50 salariés', depot: '5 du mois suivant', paiement: '5 du mois suivant' },
                { cas: 'Entreprises < 50 salariés (cotisations mensuelles)', depot: '15 du mois suivant', paiement: '15 du mois suivant' },
                { cas: 'Entreprises < 50 salariés (cotisations trimestrielles)', depot: '15 du mois suivant', paiement: 'Échéance trimestrielle' },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.cas}</td>
                  <td style={{ padding: '12px 16px' }}>{row.depot}</td>
                  <td style={{ padding: '12px 16px' }}>{row.paiement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ lineHeight: 1.8, color: '#374151', marginBottom: 40, background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, padding: '14px 18px', fontSize: 14 }}>
          ⚠️ <strong>Pénalité en cas de retard :</strong> 7,50 € par salarié et par mois de retard (hors mise en demeure). La régularité de la transmission DSN est importante même pour les petites structures.
        </p>

        {/* CE QUE BULLETIN FACILE COUVRE */}
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#1a1a2e' }}>
          Ce que Bulletin Facile couvre pour vous
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          <div style={{ border: '2px solid #22c55e', borderRadius: 14, padding: '24px' }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#16a34a', marginBottom: 16 }}>✅ Ce qu'on fait pour vous</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2, color: '#374151', fontSize: 14 }}>
              <li>Calcul de toutes les cotisations sociales 2026</li>
              <li>Réduction Fillon automatique</li>
              <li>Prélèvement à la source (PAS)</li>
              <li>Heures supplémentaires exonérées</li>
              <li>Bulletins PDF prêts en 2 minutes</li>
              <li>Mise à jour SMIC et taux URSSAF</li>
              <li>Conformité légale droit commun</li>
            </ul>
          </div>
          <div style={{ border: '2px solid #e5e7eb', borderRadius: 14, padding: '24px', background: '#f9fafb' }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#6b7280', marginBottom: 16 }}>⚙️ Envoi automatisé (logiciel lourd)</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2, color: '#6b7280', fontSize: 14 }}>
              <li>Dépôt automatique sur Net-Entreprises via API</li>
              <li>Signalement de fin de contrat automatisé</li>
              <li>Gestion des arrêts maladie en temps réel</li>
              <li>Interface N4DS / CRM organismes sociaux</li>
              <li>Archivage automatisé multi-dossiers</li>
            </ul>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 12, lineHeight: 1.5 }}>
              Ces automatisations (PayFit, Silae, Cegid) sont utiles pour les grandes structures. Pour une TPE, déposer soi-même son fichier DSN sur Net-Entreprises prend moins de 2 minutes.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg,#1a3a8f 0%,#2563eb 100%)', borderRadius: 16, padding: '36px 32px', textAlign: 'center', marginBottom: 56, color: 'white' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 900 }}>
            Bulletin + fichier DSN prêts en 2 minutes
          </h3>
          <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>
            Calculs URSSAF 2026 inclus. Votre fichier DSN Phase 3 est généré automatiquement — déposez-le vous-même sur Net-Entreprises ou remettez-le à votre expert-comptable.
          </p>
          <Link
            href="/generateur"
            style={{ display: 'inline-block', background: 'white', color: '#1a3a8f', fontWeight: 800, borderRadius: 10, padding: '14px 32px', textDecoration: 'none', fontSize: 16 }}
          >
            Créer mon bulletin maintenant →
          </Link>
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: '#1a1a2e' }}>
          Questions fréquentes sur la DSN
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {[
            {
              q: 'Est-ce que Bulletin Facile gère la DSN ?',
              r: 'Bulletin Facile génère des bulletins de salaire conformes aux taux URSSAF 2026. La transmission DSN mensuelle est une étape distincte, généralement gérée par votre expert-comptable. Notre outil couvre l\'essentiel pour les TPE : calcul exact des cotisations et bulletin PDF conforme.',
            },
            {
              q: 'La DSN est-elle obligatoire pour les TPE ?',
              r: 'Oui, la DSN est obligatoire pour tout employeur depuis 2017. Mais son dépôt est souvent délégué à l\'expert-comptable de l\'entreprise. Une TPE qui utilise Bulletin Facile reçoit un bulletin PDF conforme ; la transmission DSN se fait via son cabinet comptable ou un logiciel agréé.',
            },
            {
              q: 'Quelle est la différence entre un bulletin de salaire et une DSN ?',
              r: 'Le bulletin de salaire est le document remis au salarié chaque mois. La DSN est une déclaration mensuelle envoyée aux organismes sociaux (URSSAF, AGIRC-ARRCO, Pôle Emploi…). Les deux se basent sur les mêmes données de paie mais ont des usages et destinataires différents.',
            },
            {
              q: 'Puis-je utiliser Bulletin Facile sans gérer la DSN moi-même ?',
              r: 'Oui. La majorité des TPE utilisant Bulletin Facile délèguent la DSN à leur expert-comptable. Vous générez votre bulletin conforme sur notre plateforme, vous le transmettez à votre salarié et à votre comptable, qui se charge de la déclaration DSN.',
            },
            {
              q: 'Quand la DSN doit-elle être transmise ?',
              r: 'La DSN mensuelle doit être transmise au plus tard le 5 du mois suivant (grandes entreprises) ou le 15 du mois suivant (TPE < 50 salariés). Le non-respect de ces délais expose à une pénalité de 7,50 € par salarié et par mois de retard.',
            },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#1a1a2e' }}>{item.q}</div>
              <p style={{ margin: 0, lineHeight: 1.8, color: '#374151', fontSize: 15 }}>{item.r}</p>
            </div>
          ))}
        </div>

        {/* LIENS INTERNES */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 32 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#1a1a2e' }}>Articles liés</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/generateur" style={{ color: '#2563eb', textDecoration: 'none', fontSize: 15 }}>→ Générateur de bulletin de salaire en ligne</Link>
            <Link href="/reduction-fillon" style={{ color: '#2563eb', textDecoration: 'none', fontSize: 15 }}>→ Réduction générale Fillon : calcul et conditions</Link>
            <Link href="/conventions-collectives" style={{ color: '#2563eb', textDecoration: 'none', fontSize: 15 }}>→ Conventions collectives et bulletin de salaire</Link>
            <Link href="/calculer-cotisations-sociales-embauche" style={{ color: '#2563eb', textDecoration: 'none', fontSize: 15 }}>→ Comment calculer les cotisations sociales à l'embauche</Link>
            <Link href="/net-social" style={{ color: '#2563eb', textDecoration: 'none', fontSize: 15 }}>→ Net social : définition et calcul</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
