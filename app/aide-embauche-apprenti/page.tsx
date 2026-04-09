import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Aide embauche apprenti 2026 : montants, conditions et démarches',
  description:
    'Tout sur l\'aide à l\'embauche d\'un apprenti en 2026 : 5 000 € pour les TPE, nouveaux montants depuis le 8 mars 2026, grille de salaire, exonérations de charges et bulletin de paie apprenti.',
  alternates: { canonical: 'https://bulletinfacile.fr/aide-embauche-apprenti' },
  openGraph: {
    title: 'Aide embauche apprenti 2026 : montants, conditions et démarches',
    description:
      'Montants, conditions, grille de salaire et exonérations de charges pour l\'embauche d\'un apprenti en 2026. Mis à jour après le décret du 8 mars 2026.',
    type: 'article',
    publishedTime: '2026-04-09',
    url: 'https://bulletinfacile.fr/aide-embauche-apprenti',
  },
};

const SALARY_GRID = [
  { age: '16 – 17 ans', y1: '27 % du SMIC', y1e: '492 €', y2: '39 % du SMIC', y2e: '711 €', y3: '55 % du SMIC', y3e: '1 003 €' },
  { age: '18 – 20 ans', y1: '43 % du SMIC', y1e: '784 €', y2: '51 % du SMIC', y2e: '930 €', y3: '67 % du SMIC', y3e: '1 221 €' },
  { age: '21 – 25 ans', y1: '53 % du SMIC', y1e: '966 €', y2: '61 % du SMIC', y2e: '1 112 €', y3: '78 % du SMIC', y3e: '1 422 €' },
  { age: '26 ans et +', y1: '100 % du SMIC', y1e: '1 823 €', y2: '100 % du SMIC', y2e: '1 823 €', y3: '100 % du SMIC', y3e: '1 823 €' },
];

const AIDE_GRID = [
  { niveau: 'Niveau 3–4 (CAP, Bac)', inf250: '5 000 €', sup250: '4 500 €', handicap: '6 000 €' },
  { niveau: 'Niveau 5 (BTS, BUT)', inf250: '4 500 €', sup250: '1 500 €', handicap: '6 000 €' },
  { niveau: 'Niveau 6–7 (Licence, Master)', inf250: '2 000 €', sup250: '750 €', handicap: '6 000 €' },
];

const FAQ = [
  {
    q: 'Quel est le montant de l\'aide à l\'embauche d\'un apprenti en 2026 ?',
    a: 'Depuis le 8 mars 2026, l\'aide est graduée selon le niveau du diplôme : 5 000 € pour un CAP ou un Bac (niveaux 3-4), 4 500 € pour un BTS/BUT (niveau 5) et 2 000 € pour une Licence ou un Master (niveaux 6-7), pour les entreprises de moins de 250 salariés. Elle monte à 6 000 € lorsque l\'apprenti est en situation de handicap.',
  },
  {
    q: 'Quelles entreprises peuvent bénéficier de l\'aide à l\'apprentissage en 2026 ?',
    a: 'Toutes les entreprises peuvent bénéficier de l\'aide, quelle que soit leur taille. Les montants sont cependant plus élevés pour les entreprises de moins de 250 salariés. Les grandes entreprises (250 salariés et plus) doivent en outre justifier d\'un quota de 5 % de contrats favorisant l\'insertion professionnelle dans leur effectif.',
  },
  {
    q: 'Comment est versée l\'aide à l\'embauche d\'un apprenti ?',
    a: 'L\'aide est versée automatiquement par l\'Agence de services et de paiement (ASP), chaque mois, pendant la première année du contrat d\'apprentissage. Aucune démarche spécifique n\'est nécessaire : le versement est déclenché par l\'enregistrement du contrat auprès de l\'OPCO.',
  },
  {
    q: 'Quel salaire brut faut-il verser à un apprenti en 2026 ?',
    a: 'Le salaire est calculé en pourcentage du SMIC (1 823,03 € brut/mois depuis le 1er janvier 2026), selon l\'âge et l\'année de formation. Par exemple, un apprenti de 18 ans en 1re année perçoit 43 % du SMIC, soit environ 784 € brut. Ce montant évolue chaque année du contrat et à chaque anniversaire.',
  },
  {
    q: 'Quelles exonérations de charges sociales s\'appliquent au contrat d\'apprentissage ?',
    a: 'Les cotisations patronales sont totalement exonérées jusqu\'à 50 % du SMIC (seuil 2026 : 911,51 €). En dessous de ce seuil, l\'apprenti est également exonéré de cotisations salariales, de CSG et de CRDS. Au-delà, les cotisations normales s\'appliquent sur la fraction excédentaire.',
  },
  {
    q: 'Comment faire le bulletin de salaire d\'un apprenti ?',
    a: 'Le bulletin de paie d\'un apprenti comporte des spécificités : exonérations de charges jusqu\'à 50 % du SMIC (CTP 803 en DSN), cotisations normales sur la partie au-dessus du seuil. Bulletin Facile prend en charge ces règles automatiquement : il vous suffit de saisir le profil "apprenti" et le générateur calcule les bons montants.',
  },
];

export default function AideEmbaucheApprentiPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>
      <Nav />

      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #1a3a8f 60%, #2563eb 100%)',
          color: 'white',
          padding: '72px 24px 90px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 50,
              padding: '6px 18px',
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            🎓 Mis à jour · Décret du 8 mars 2026
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.12,
              marginBottom: 20,
            }}
          >
            Aide embauche apprenti 2026 :<br />
            montants, conditions et démarches
          </h1>
          <p
            style={{
              fontSize: 18,
              opacity: 0.88,
              maxWidth: 700,
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            Jusqu&apos;à <strong>5 000 €</strong> d&apos;aide pour les TPE-PME, versée
            automatiquement. Grille de salaire, exonérations de charges et bulletin de paie
            apprenti — tout ce que l&apos;employeur doit savoir en 2026.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/generateur"
              style={{
                background: 'white',
                color: '#1a3a8f',
                fontWeight: 800,
                fontSize: 16,
                padding: '14px 32px',
                borderRadius: 10,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              Générer le bulletin d&apos;un apprenti →
            </Link>
            <Link
              href="/tarifs"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.4)',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 24px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Voir les tarifs
            </Link>
          </div>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              gap: 24,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: 13,
              opacity: 0.8,
            }}
          >
            <span>✅ Aide versée automatiquement par l&apos;ASP</span>
            <span>✅ Exonérations de charges intégrées</span>
            <span>✅ Bulletin apprenti conforme 2026</span>
          </div>
        </div>
      </section>

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* ALERTE NOUVEAUTÉ */}
        <div
          style={{
            background: '#fefce8',
            border: '1px solid #fde68a',
            borderLeft: '4px solid #f59e0b',
            borderRadius: 10,
            padding: '18px 22px',
            marginBottom: 48,
          }}
        >
          <p style={{ margin: 0, fontSize: 15, color: '#78350f', lineHeight: 1.7 }}>
            <strong>⚠️ Nouveauté mars 2026 :</strong> Le{' '}
            <strong>décret n° 2026-168 du 6 mars 2026</strong> a modifié les montants de l&apos;aide
            exceptionnelle à l&apos;embauche d&apos;apprentis. Les nouveaux barèmes s&apos;appliquent
            aux contrats conclus{' '}
            <strong>à partir du 8 mars 2026</strong> et débutant avant le 1er janvier 2027.
          </p>
        </div>

        {/* INTRO DÉFINITION */}
        <div
          style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 12,
            padding: '24px 28px',
            marginBottom: 48,
          }}
        >
          <h2
            style={{ fontSize: 19, fontWeight: 800, color: '#1a3a8f', margin: '0 0 12px' }}
          >
            Qu&apos;est-ce que l&apos;aide à l&apos;embauche d&apos;un apprenti ?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#1e3a5f', margin: 0 }}>
            L&apos;<strong>aide à l&apos;embauche d&apos;un apprenti</strong> (également appelée aide
            exceptionnelle ou aide unique selon la période) est une subvention versée directement à
            l&apos;employeur par l&apos;
            <strong>Agence de services et de paiement (ASP)</strong>. Elle couvre la{' '}
            <strong>première année du contrat d&apos;apprentissage</strong> et vise à réduire le coût
            d&apos;embauche pour les entreprises, en particulier les TPE et PME. En 2026, son montant
            peut atteindre <strong>5 000 € pour une entreprise de moins de 250 salariés</strong>, et
            jusqu&apos;à <strong>6 000 € pour un apprenti en situation de handicap</strong>.
          </p>
        </div>

        {/* CHIFFRES CLÉS */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 20 }}>
          L&apos;aide en chiffres (2026)
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 14,
            marginBottom: 48,
          }}
        >
          {[
            { val: '5 000 €', label: 'Aide max pour une entreprise < 250 salariés' },
            { val: '6 000 €', label: 'Aide si l\'apprenti est en situation de handicap' },
            { val: '8 mars 2026', label: 'Date d\'application des nouveaux montants' },
            { val: '12 mois', label: 'Durée de versement (1re année du contrat)' },
            { val: '911 €', label: 'Seuil d\'exonération de charges (50 % SMIC 2026)' },
            { val: '1 823 €', label: 'SMIC brut mensuel 2026 (base de calcul)' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: 16,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: '#1a3a8f' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4, lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* MONTANTS AIDE */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 16 }}>
          Montants de l&apos;aide selon le niveau de diplôme (depuis le 8 mars 2026)
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>
          Depuis la réforme de mars 2026, l&apos;aide est <strong>dégressive selon le niveau de
          qualification</strong> préparé par l&apos;apprenti. Les montants diffèrent également selon
          la taille de l&apos;entreprise.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#1a3a8f', color: 'white' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0', minWidth: 200 }}>
                  Niveau de diplôme
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#1e40af' }}>
                  Entreprise &lt; 250 salariés
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>
                  Entreprise ≥ 250 salariés
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>
                  Apprenti en situation de handicap
                </th>
              </tr>
            </thead>
            <tbody>
              {AIDE_GRID.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>
                    {row.niveau}
                  </td>
                  <td
                    style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center',
                      background: i % 2 === 0 ? '#eff6ff' : '#f0f7ff',
                      fontWeight: 800,
                      color: '#1a3a8f',
                      fontSize: 15,
                    }}
                  >
                    {row.inf250}
                  </td>
                  <td
                    style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center',
                      color: '#374151',
                      fontWeight: 600,
                    }}
                  >
                    {row.sup250}
                  </td>
                  <td
                    style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center',
                      color: '#16a34a',
                      fontWeight: 800,
                    }}
                  >
                    {row.handicap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CONDITIONS */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 16 }}>
          Conditions pour bénéficier de l&apos;aide en 2026
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            marginBottom: 48,
          }}
        >
          {[
            {
              icon: '📅',
              titre: 'Date de conclusion du contrat',
              desc: 'Le contrat doit être signé entre le 8 mars 2026 et le 31 décembre 2026, et débuter avant le 1er janvier 2027.',
            },
            {
              icon: '🎓',
              titre: 'Niveau de diplôme',
              desc: 'L\'apprenti doit préparer un diplôme ou titre à finalité professionnelle inscrit au RNCP, du CAP au niveau Master (Bac +5 maximum).',
            },
            {
              icon: '🚫',
              titre: 'Non-cumul',
              desc: 'L\'employeur ne doit pas avoir déjà bénéficié d\'une aide pour le même apprenti et la même certification professionnelle.',
            },
            {
              icon: '🏢',
              titre: 'Entreprises ≥ 250 salariés',
              desc: 'Les grandes entreprises doivent justifier d\'au moins 5 % de contrats favorisant l\'insertion professionnelle dans leur effectif au 31 décembre de l\'année suivante.',
            },
            {
              icon: '📋',
              titre: 'Enregistrement OPCO',
              desc: 'Le contrat doit être déposé et enregistré auprès de l\'OPCO compétent dans les 5 jours ouvrables suivant le début d\'exécution.',
            },
            {
              icon: '💼',
              titre: 'Maître d\'apprentissage',
              desc: 'L\'entreprise doit désigner un maître d\'apprentissage qualifié et répondant aux conditions de l\'article L6223-8 du Code du travail.',
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: '#f8fafc',
                borderRadius: 12,
                padding: 20,
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15, marginBottom: 6 }}>
                {f.titre}
              </div>
              <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* GRILLE DE SALAIRE */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 16 }}>
          Grille de rémunération de l&apos;apprenti 2026
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>
          Le salaire de l&apos;apprenti est calculé en <strong>pourcentage du SMIC</strong> (
          <strong>1 823,03 € brut/mois</strong> depuis le 1er janvier 2026), selon son âge et son
          année de formation. Il augmente automatiquement à chaque anniversaire (à compter du 1er
          du mois suivant) et à chaque changement d&apos;année de contrat.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#1a3a8f', color: 'white' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0', minWidth: 130 }}>
                  Âge
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#1e40af' }}>
                  1re année
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>
                  2e année
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>
                  3e année
                </th>
              </tr>
            </thead>
            <tbody>
              {SALARY_GRID.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 700, color: '#1a1a2e' }}>
                    {row.age}
                  </td>
                  <td
                    style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center',
                      background: i % 2 === 0 ? '#eff6ff' : '#f0f7ff',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#1a3a8f' }}>{row.y1}</span>
                    <br />
                    <span style={{ fontSize: 12, color: '#6b7280' }}>≈ {row.y1e} brut</span>
                  </td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{row.y2}</span>
                    <br />
                    <span style={{ fontSize: 12, color: '#6b7280' }}>≈ {row.y2e} brut</span>
                  </td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{row.y3}</span>
                    <br />
                    <span style={{ fontSize: 12, color: '#6b7280' }}>≈ {row.y3e} brut</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 48, fontStyle: 'italic' }}>
          * Montants bruts estimatifs sur la base du SMIC 2026 (1 823,03 €/mois). Si la convention
          collective applicable prévoit un salaire minimum conventionnel plus favorable pour les
          apprentis de 21 ans et plus, c&apos;est ce dernier qui s&apos;applique.
        </p>

        {/* EXONERATIONS */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 16 }}>
          Exonérations de charges sociales sur le contrat d&apos;apprentissage
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 24 }}>
          Au-delà de l&apos;aide financière, le contrat d&apos;apprentissage ouvre droit à des{' '}
          <strong>exonérations de cotisations sociales</strong> significatives, aussi bien pour
          l&apos;employeur que pour l&apos;apprenti.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 10 }}>🏭</div>
            <div style={{ fontWeight: 700, color: '#14532d', fontSize: 15, marginBottom: 8 }}>
              Exonération patronale totale
            </div>
            <p style={{ fontSize: 14, color: '#166534', lineHeight: 1.7, margin: 0 }}>
              Les <strong>cotisations patronales</strong> (maladie, vieillesse, chômage,
              accidents du travail…) sont <strong>totalement exonérées</strong> sur la fraction du
              salaire ne dépassant pas <strong>50 % du SMIC</strong> (soit 911,51 € en 2026). Au-delà
              de ce seuil, les cotisations normales s&apos;appliquent.
            </p>
          </div>
          <div
            style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 10 }}>👤</div>
            <div style={{ fontWeight: 700, color: '#1e3a8f', fontSize: 15, marginBottom: 8 }}>
              Exonération salariale (incl. CSG/CRDS)
            </div>
            <p style={{ fontSize: 14, color: '#1e40af', lineHeight: 1.7, margin: 0 }}>
              En dessous de <strong>50 % du SMIC</strong>, l&apos;apprenti est exonéré de toutes
              les cotisations salariales, de CSG et de CRDS (règle applicable aux contrats signés
              depuis le 1er mars 2025). Au-delà, les cotisations normales (dont CSG 9,2 % et CRDS
              0,5 %) s&apos;appliquent sur la fraction excédentaire.
            </p>
          </div>
          <div
            style={{
              background: '#fef9c3',
              border: '1px solid #fde68a',
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 10 }}>📊</div>
            <div style={{ fontWeight: 700, color: '#78350f', fontSize: 15, marginBottom: 8 }}>
              Déclaration DSN : codes CTP
            </div>
            <p style={{ fontSize: 14, color: '#92400e', lineHeight: 1.7, margin: 0 }}>
              En DSN, déclarez la fraction exonérée sur le <strong>CTP 803</strong> (ou 805 pour
              l&apos;Alsace-Moselle) et la fraction soumise à cotisations sur le{' '}
              <strong>CTP 518</strong> (ou 520 pour l&apos;Alsace-Moselle). C&apos;est via ces codes
              que les exonérations sont appliquées automatiquement par l&apos;URSSAF.
            </p>
          </div>
        </div>

        {/* DEMARCHES ETAPES */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 20 }}>
          Comment bénéficier de l&apos;aide : 5 étapes clés
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 56 }}>
          {[
            {
              n: '01',
              titre: 'Trouver l\'apprenti et signer le contrat (CERFA n° 10103*14)',
              desc: 'Le contrat d\'apprentissage doit être formalisé sur le formulaire CERFA n° 10103*14, signé par l\'employeur, l\'apprenti (ou son représentant légal s\'il est mineur) et le CFA. Indiquez la date de début de formation, le diplôme visé, la durée et la rémunération.',
            },
            {
              n: '02',
              titre: 'Effectuer la DPAE auprès de l\'URSSAF',
              desc: 'Avant toute prise de poste, envoyez la Déclaration Préalable À l\'Embauche (DPAE) à votre URSSAF. Cette formalité est obligatoire pour tous les salariés, y compris les apprentis. Elle peut être effectuée via le service en ligne de l\'URSSAF.',
            },
            {
              n: '03',
              titre: 'Déposer le contrat auprès de l\'OPCO (délai : 5 jours)',
              desc: 'Transmettez le contrat signé à votre OPCO (opérateur de compétences) dans les 5 jours ouvrables suivant le début de la formation. L\'OPCO dispose de 20 jours pour instruire le dossier et confirmer la prise en charge financière. C\'est l\'enregistrement du contrat qui déclenche le droit à l\'aide.',
            },
            {
              n: '04',
              titre: 'Versement automatique de l\'aide par l\'ASP',
              desc: 'Aucune demande supplémentaire n\'est nécessaire. L\'Agence de services et de paiement (ASP) verse l\'aide automatiquement, chaque mois, avant le paiement du salaire, pendant les 12 premiers mois du contrat. Le virement est effectué sur le compte bancaire déclaré à l\'URSSAF.',
            },
            {
              n: '05',
              titre: 'Établir chaque mois le bulletin de salaire de l\'apprenti',
              desc: 'Le bulletin de paie de l\'apprenti comporte des spécificités (exonérations partielles, codes CTP). Bulletin Facile intègre ces règles automatiquement : saisissez le profil "apprenti", le salaire brut et l\'outil calcule les cotisations exactes, les exonérations et le net à payer.',
            },
          ].map((step) => (
            <div
              key={step.n}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '20px 22px',
                display: 'flex',
                gap: 18,
              }}
            >
              <div
                style={{
                  minWidth: 44,
                  height: 44,
                  background: '#1a3a8f',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {step.n}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15, marginBottom: 6 }}>
                  {step.titre}
                </div>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BULLETIN APPRENTI CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1a1a2e, #1a3a8f)',
            borderRadius: 16,
            padding: '40px 32px',
            marginBottom: 56,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>
            Bulletin de salaire d&apos;apprenti en 30 secondes
          </h2>
          <p style={{ fontSize: 16, opacity: 0.88, marginBottom: 28, lineHeight: 1.6, maxWidth: 540, margin: '0 auto 28px' }}>
            Exonérations calculées automatiquement, grille de rémunération intégrée, PDF conforme au
            Code du travail. Aucune connaissance comptable requise.
          </p>
          <Link
            href="/generateur"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#1a3a8f',
              fontWeight: 800,
              fontSize: 16,
              padding: '14px 36px',
              borderRadius: 10,
              textDecoration: 'none',
              marginBottom: 14,
            }}
          >
            ✨ Créer le bulletin de mon apprenti →
          </Link>
          <div style={{ fontSize: 13, opacity: 0.7 }}>
            À partir de 8,90 € HT · Sans abonnement obligatoire
          </div>
        </div>

        {/* CUMUL AUTRES AIDES */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginTop: 56, marginBottom: 16 }}>
          Peut-on cumuler l&apos;aide avec d&apos;autres dispositifs ?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>
          L&apos;aide exceptionnelle est{' '}
          <strong>non cumulable avec une autre aide à l&apos;embauche d&apos;apprentis</strong> pour
          le même apprenti et la même certification. En revanche, elle est compatible avec plusieurs
          autres avantages :
        </p>
        <ul
          style={{
            paddingLeft: 20,
            marginBottom: 48,
            lineHeight: 2,
            color: '#374151',
            fontSize: 15,
          }}
        >
          <li>
            <strong>Exonérations de cotisations sociales</strong> (patronales et salariales)
            cumulables avec l&apos;aide financière
          </li>
          <li>
            <strong>Crédit d&apos;impôt apprentissage</strong> (selon conditions et branche
            professionnelle)
          </li>
          <li>
            <strong>Aide régionale à l&apos;apprentissage</strong> selon votre région (montants
            variables, cumulable)
          </li>
          <li>
            <strong>Prise en charge des frais de formation</strong> par l&apos;OPCO, intégrale ou
            partielle selon les fonds disponibles
          </li>
          <li>
            <strong>Aide au permis de conduire</strong> pour certains apprentis (financement AGEFIPH
            ou convention collective)
          </li>
        </ul>

        {/* FAQ */}
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 24 }}>
          Questions fréquentes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 56 }}>
          {FAQ.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#f8fafc',
                borderRadius: 10,
                padding: '20px 22px',
                border: '1px solid #e2e8f0',
              }}
            >
              <h3
                style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* LIENS UTILES */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: '22px 24px',
            marginBottom: 48,
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: '0 0 14px' }}>
            📌 Sources officielles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                label: 'Décret n° 2026-168 du 6 mars 2026 (Légifrance)',
                url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053634597',
              },
              {
                label: 'Aides à l\'embauche en contrat d\'apprentissage — Service Public',
                url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23556',
              },
              {
                label: 'Embaucher un apprenti — URSSAF',
                url: 'https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/embaucher/contrat-apprentissage.html',
              },
              {
                label: 'Aides aux employeurs d\'apprentis — Ministère du travail',
                url: 'https://travail-emploi.gouv.fr/aides-aux-employeurs-dapprentis',
              },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1a3a8f', fontSize: 14, textDecoration: 'underline' }}
              >
                → {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ARTICLES LIÉS */}
        <div style={{ paddingTop: 32, borderTop: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginBottom: 14 }}>
            À lire aussi
          </h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/calculer-cotisations-sociales-embauche"
              style={{
                background: '#eff6ff',
                color: '#1a3a8f',
                padding: '9px 15px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Cotisations à l&apos;embauche →
            </Link>
            <Link
              href="/combien-coute-un-salarie"
              style={{
                background: '#fdf4ff',
                color: '#6b21a8',
                padding: '9px 15px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Coût réel d&apos;un salarié →
            </Link>
            <Link
              href="/reduction-fillon"
              style={{
                background: '#fffbeb',
                color: '#92400e',
                padding: '9px 15px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Réduction Fillon →
            </Link>
            <Link
              href="/creer-une-fiche-de-paie"
              style={{
                background: '#f0fdf4',
                color: '#065f46',
                padding: '9px 15px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Créer une fiche de paie →
            </Link>
            <Link
              href="/smic-2026"
              style={{
                background: '#f8fafc',
                color: '#374151',
                padding: '9px 15px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              SMIC 2026 →
            </Link>
          </div>
        </div>
      </article>

      {/* Schema.org — @graph (Article + FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                '@id': 'https://bulletinfacile.fr/aide-embauche-apprenti#article',
                headline: 'Aide embauche apprenti 2026 : montants, conditions et démarches',
                datePublished: '2026-04-09',
                dateModified: '2026-04-09',
                author: {
                  '@type': 'Organization',
                  name: 'Bulletin Facile',
                  url: 'https://bulletinfacile.fr',
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'Bulletin Facile',
                  url: 'https://bulletinfacile.fr',
                },
                description:
                  'Montants de l\'aide à l\'embauche d\'un apprenti en 2026 (jusqu\'à 5 000 €), conditions, grille de salaire, exonérations de charges et démarches employeur. Mis à jour après le décret du 8 mars 2026.',
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': 'https://bulletinfacile.fr/aide-embauche-apprenti',
                },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://bulletinfacile.fr/aide-embauche-apprenti#faq',
                mainEntity: FAQ.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />

      <Footer />
    </div>
  );
}
