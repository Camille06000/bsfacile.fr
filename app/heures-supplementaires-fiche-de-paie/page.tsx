import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Heures supplémentaires sur la fiche de paie 2026 : calcul et exonération — Bulletin Facile',
  description: 'Heures supplémentaires 2026 : taux de majoration 25% et 50%, exonération d\'impôt Loi TEPA, plafond 7 500 €. Comment les calculer et les afficher sur le bulletin.',
  alternates: { canonical: 'https://bulletinfacile.fr/heures-supplementaires-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'Comment calculer le taux horaire des heures supplémentaires ?',
    a: "Le taux horaire de base est obtenu en divisant le salaire mensuel brut par le nombre d'heures mensuelles contractuelles (151,67h pour un temps plein à 35h/semaine). Les heures supplémentaires sont ensuite majorées : taux horaire × 1,25 pour les heures de la 36e à la 43e, et taux horaire × 1,50 à partir de la 44e heure hebdomadaire.",
  },
  {
    q: "Les heures supplémentaires sont-elles soumises à cotisations ?",
    a: "Oui, les heures supplémentaires sont soumises aux cotisations sociales de droit commun. Cependant, la loi TEPA prévoit une déduction forfaitaire de cotisations salariales de 11,31 % en 2026 sur la rémunération des heures supplémentaires, ainsi qu'une déduction forfaitaire de cotisations patronales. Ces déductions s'appliquent dans la limite du plafond annuel d'exonération.",
  },
  {
    q: "Y a-t-il un plafond d'heures supplémentaires par an ?",
    a: "Le contingent annuel d'heures supplémentaires est fixé par accord de branche ou d'entreprise. À défaut, le contingent légal est de 220 heures par salarié et par an. Au-delà du contingent, les heures doivent faire l'objet d'une consultation des représentants du personnel et donnent droit à une contrepartie obligatoire en repos (COR) en plus de la majoration salariale.",
  },
  {
    q: "Qu'est-ce que le repos compensateur de remplacement ?",
    a: "Le repos compensateur de remplacement (RCR) permet à l'employeur, par accord collectif, de remplacer le paiement des heures supplémentaires (ou de leur majoration) par un repos équivalent. Par exemple, une heure supplémentaire majorée à 25 % peut donner lieu à 1h15 de repos au lieu d'un paiement majoré. Ce repos doit être pris dans un délai fixé par accord.",
  },
];

export default function HeuresSupplementairesFichePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Loi TEPA — Plafond 2026
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            Heures supplémentaires : calcul et exonération sur la fiche de paie
          </h1>
          <p style={{ fontSize: 19, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Majoration de 25 % et 50 %, déduction Loi TEPA, plafond de 7 500 € : tout ce qu'il faut savoir pour calculer et afficher les heures supplémentaires sur le bulletin 2026.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, maxWidth: 620, margin: '0 auto' }}>
            {[
              { val: '+25 %', label: '36e → 43e heure', sub: 'Majoration légale' },
              { val: '+50 %', label: 'À partir 44e heure', sub: 'Majoration légale' },
              { val: '7 500 €', label: 'Plafond exonération IR', sub: 'Par an (Loi TEPA)' },
              { val: '11,31 %', label: 'Déduction cotis. sal.', sub: '2026' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '18px 14px' }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{c.val}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{c.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE HERO */}
      <div style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=300&fit=crop&q=80"
          alt="Employé travaillant des heures supplémentaires"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Définition et décompte */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Définition et décompte des heures supplémentaires</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Constituent des <strong>heures supplémentaires</strong> toutes les heures de travail effectuées au-delà de la <strong>durée légale du travail</strong>, fixée à 35 heures par semaine, soit 151,67 heures par mois (art. L.3121-28 du Code du travail).
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Le décompte s'effectue <strong>à la semaine civile</strong> (du lundi 0h au dimanche 24h), sauf accord collectif prévoyant un autre mode de décompte (annualisation, modulation). Pour un salarié à temps partiel, les heures supplémentaires ne commencent qu'après avoir atteint la durée légale de 35h — en deçà, il s'agit d'heures complémentaires, soumises à un régime différent.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { titre: 'Durée légale', val: '35 h/semaine', sub: '151,67 h/mois' },
              { titre: 'Durée maximale', val: '48 h/semaine', sub: 'En cas de circonstance exceptionnelle' },
              { titre: 'Durée maximale moyenne', val: '44 h/semaine', sub: 'Sur 12 semaines consécutives' },
              { titre: 'Contingent légal annuel', val: '220 h/salarié', sub: 'À défaut d\'accord collectif' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{card.titre}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#b45309' }}>{card.val}</div>
                <div style={{ fontSize: 12, color: '#78350f', marginTop: 4 }}>{card.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Taux de majoration */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Taux de majoration légaux</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Les taux de majoration sont fixés par la loi à titre indicatif mais peuvent être modifiés par accord de branche ou d'entreprise, à condition de ne pas descendre en dessous du <strong>minimum légal de 10 %</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              {
                heures: '36e à 43e heure',
                majoration: '+25 %',
                color: '#d97706',
                bg: '#fff7ed',
                border: '#fed7aa',
                desc: 'Taux légal applicable aux 8 premières heures supplémentaires. Peut être réduit à 10 % minimum par accord collectif.',
              },
              {
                heures: 'À partir de la 44e heure',
                majoration: '+50 %',
                color: '#b45309',
                bg: '#fef3c7',
                border: '#fcd34d',
                desc: 'Taux légal applicable au-delà de la 8e heure supplémentaire par semaine. Ce taux ne peut pas être réduit en dessous de 10 %.',
              },
            ].map((card, i) => (
              <div key={i} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: 12, padding: '20px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: card.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{card.heures}</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: card.color, marginBottom: 12 }}>{card.majoration}</div>
                <p style={{ fontSize: 14, color: '#78350f', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 20px' }}>
            <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
              <strong>Convention collective :</strong> certaines branches prévoient des taux plus favorables (ex. BTP, transport). Vérifiez toujours l'accord applicable à votre secteur avant d'établir le bulletin.
            </p>
          </div>
        </section>

        {/* Tableau exemple de calcul */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Tableau de calcul — Exemple</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 24 }}>Pour un salarié avec un taux horaire brut de base de 15,00 €</p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#b45309', color: 'white' }}>
                  {['Situation', 'Taux horaire base', 'Majoration', 'Taux heure supp.'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { sit: 'Heures normales (1–35h)', base: '15,00 €', maj: '—', taux: '15,00 €', highlight: false },
                  { sit: '36e–43e heure (+25 %)', base: '15,00 €', maj: '+25 %', taux: '18,75 €', highlight: true },
                  { sit: '44e heure et au-delà (+50 %)', base: '15,00 €', maj: '+50 %', taux: '22,50 €', highlight: false },
                ].map((row, i) => (
                  <tr key={i} style={{ background: row.highlight ? '#fff7ed' : i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{row.sit}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.base}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: row.maj !== '—' ? '#b45309' : '#6b7280' }}>{row.maj}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: row.highlight ? '#d97706' : '#b45309' }}>{row.taux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>Le taux horaire de base = Salaire mensuel brut ÷ 151,67 heures (pour un temps plein 35h/semaine).</p>
        </section>

        {/* Exonération TEPA */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exonération d'impôt — Loi TEPA 2026</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Depuis la loi TEPA (Travail, Emploi et Pouvoir d'Achat), renforcée par la loi pouvoir d'achat de 2022, les heures supplémentaires bénéficient d'un régime fiscal et social avantageux.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
                titre: 'Exonération d\'impôt sur le revenu',
                desc: 'La rémunération des heures supplémentaires (et heures complémentaires pour les temps partiels) est exonérée d\'impôt sur le revenu dans la limite de 7 500 € par an. Au-delà de ce plafond, les sommes sont imposables dans les conditions normales.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                ),
                titre: 'Déduction forfaitaire de cotisations salariales',
                desc: 'En 2026, une déduction forfaitaire de 11,31 % s\'applique sur la rémunération des heures supplémentaires pour les salariés. Cette déduction vient réduire les cotisations salariales dues sur ces heures (vieillesse, maladie, AGIRC-ARRCO), augmentant d\'autant le net perçu.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                ),
                titre: 'Déduction forfaitaire patronale',
                desc: 'L\'employeur bénéficie également d\'une déduction forfaitaire de cotisations patronales sur les heures supplémentaires. En 2026, elle est de 0,50 € par heure supplémentaire pour les entreprises de moins de 20 salariés et de 0,10 € pour les entreprises de 20 salariés et plus.',
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: '20px' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, background: '#fef3c7', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#92400e' }}>{item.titre}</h3>
                  <p style={{ fontSize: 15, color: '#78350f', margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comment les HS apparaissent sur le bulletin */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Comment les heures supp. apparaissent sur le bulletin</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Les heures supplémentaires doivent figurer sur des <strong>lignes distinctes</strong> du bulletin de salaire, séparées du salaire de base. Voici la structure habituelle :
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire de base (151,67h × 15,00 €)', val: '2 275,05 €', type: 'base' },
              { label: 'Heures supp. 25 % (4h × 18,75 €)', val: '75,00 €', type: 'add' },
              { label: 'Heures supp. 50 % (2h × 22,50 €)', val: '45,00 €', type: 'add' },
              { label: '= Salaire brut total', val: '2 395,05 €', type: 'total' },
              { label: '— Cotisations salariales (dont déduction TEPA)', val: '− 475,00 €', type: 'deduct' },
              { label: '= Net imposable', val: '1 920,05 €', type: 'mid' },
              { label: '— Prélèvement à la source (taux applicable)', val: '− xx,xx €', type: 'deduct' },
              { label: '= Net à payer', val: '1 xxx,xx €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < 7 ? '1px solid #e2e8f0' : 'none', background: row.type === 'result' ? '#fff7ed' : row.type === 'total' ? '#fef3c7' : row.type === 'base' ? '#f8fafc' : 'transparent' }}>
                <span style={{ fontSize: 14, color: row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : row.type === 'result' || row.type === 'total' ? '#92400e' : '#374151', fontWeight: row.type === 'result' || row.type === 'total' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : row.type === 'result' || row.type === 'total' ? '#b45309' : '#374151' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>La mention "Exonération Loi TEPA" peut figurer en bas du bulletin pour indiquer le montant exonéré d'IR cumulé sur l'année.</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#b45309', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #78350f, #92400e)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin avec heures supplémentaires</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Notre générateur calcule automatiquement les majorations 25 %/50 % et applique la déduction TEPA selon la réglementation 2026.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin avec HS →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
