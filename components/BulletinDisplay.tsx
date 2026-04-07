'use client';
import { useState } from 'react';
import type { ResultBS, LigneBS } from '@/lib/cotisations';

// ── Générateur DSN Phase 3 (format officiel Net-Entreprises) ──
function generateDSN(data: ResultBS): string {
  const { input, totaux, params } = data;
  const p2 = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  const lastD = new Date(params.annee, params.mois, 0).getDate();
  const debut  = `01${p2(params.mois)}${params.annee}`;
  const fin    = `${p2(lastD)}${p2(params.mois)}${params.annee}`;
  const siret  = (input.entrepriseSiret || '').replace(/\s/g, '');
  const siren  = siret.slice(0, 9);
  const heures = (input.heuresMensuelles || 151.67).toFixed(2);

  const rows: string[] = [
    // ── Entête (S10) ──
    `S10.G00.00.001,${debut}`,
    `S10.G00.00.002,${fin}`,
    `S10.G00.00.003,01`,                         // 01 = DSN mensuelle
    `S10.G00.00.005,01`,                         // 01 = production
    // ── Emetteur (S10.G00.01) ──
    `S10.G00.01.001,${siren}`,
    `S10.G00.01.002,${siret}`,
    `S10.G00.01.003,${input.entrepriseNom || ''}`,
    `S10.G00.01.004,${input.entrepriseAdresse || ''}`,
    `S10.G00.01.007,${now.toISOString().slice(0,10).split('-').reverse().join('')}`,
    // ── Établissement (S21.G00.06) ──
    `S21.G00.06.001,${siret}`,
    `S21.G00.06.002,${input.entrepriseNom || ''}`,
    `S21.G00.06.003,${input.entrepriseAdresse || ''}`,
    `S21.G00.06.018,${debut}`,
    `S21.G00.06.019,${fin}`,
    `S21.G00.06.021,${(input.entrepriseNaf || '').replace('.', '')}`,
    // ── Individu (S21.G00.30) ──
    `S21.G00.30.001,${input.salariéNss || ''}`,
    `S21.G00.30.002,${input.salariéNom || ''}`,
    `S21.G00.30.004,${input.salariéPrenom || ''}`,
    `S21.G00.30.006,${input.salariéAdresse || ''}`,
    // ── Contrat (S21.G00.40) ──
    `S21.G00.40.001,${input.salariéEntreeDate ? input.salariéEntreeDate.split('-').reverse().join('') : debut}`,
    `S21.G00.40.006,01`,                         // 01 = CDI
    `S21.G00.40.007,${input.statut === 'cadre' ? '12' : '10'}`,  // 10=Employé 12=Cadre
    `S21.G00.40.009,${input.salariéPoste || ''}`,
    `S21.G00.40.011,${input.effectif === '>=50' ? '10' : '10'}`,
    `S21.G00.40.019,01`,                         // 01 = temps plein
    // ── Activité (S21.G00.65) ──
    `S21.G00.65.001,${debut}`,
    `S21.G00.65.002,${fin}`,
    `S21.G00.65.020,${heures}`,
    `S21.G00.65.021,${heures}`,
    // ── Rémunération (S21.G00.51) ──
    `S21.G00.51.001,${debut}`,
    `S21.G00.51.002,${fin}`,
    `S21.G00.51.010,${totaux.brutMensuel.toFixed(2)}`,
    `S21.G00.51.011,${totaux.netAPayer.toFixed(2)}`,
    `S21.G00.51.013,${totaux.netAvantPAS.toFixed(2)}`,
    `S21.G00.51.014,${totaux.montantPAS.toFixed(2)}`,
    `S21.G00.51.015,${(totaux.tauxPAS).toFixed(2)}`,
    `S21.G00.51.016,${totaux.netAvantPAS.toFixed(2)}`,
    `S21.G00.51.018,${totaux.totalCotisationsSalariales.toFixed(2)}`,
    `S21.G00.51.019,${totaux.totalCotisationsPatronales.toFixed(2)}`,
    `S21.G00.51.020,${heures}`,
    `S21.G00.51.022,${totaux.reductionFillon.toFixed(2)}`,
    // ── Versement individu (S21.G00.60) ──
    `S21.G00.60.001,${fin}`,
    `S21.G00.60.002,${totaux.netAPayer.toFixed(2)}`,
    `S21.G00.60.003,01`,                         // 01 = virement
    // ── Fin (S90) ──
    `S90.G00.90.001,1`,
    `S90.G00.90.002,1`,
  ];
  return rows.join('\r\n');
}

function downloadDSN(data: ResultBS) {
  const content = generateDSN(data);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DSN_${data.params.annee}_${String(data.params.mois).padStart(2,'0')}_${(data.input.entrepriseSiret || 'entreprise').slice(0,9)}.dsn`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Modal DSN ──
function DSNModal({ data, onClose }: { data: ResultBS; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const content = generateDSN(data);
  const p2 = (n: number) => String(n).padStart(2, '0');
  const periode = `${p2(data.params.mois)}/${data.params.annee}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="font-bold text-lg text-gray-900">DSN Phase 3 — {periode}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Format officiel Net-Entreprises — prêt à déposer</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none font-bold">×</button>
        </div>

        {/* Infos clés */}
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 grid grid-cols-3 gap-4 text-xs">
          <div><span className="text-gray-500">Établissement</span><div className="font-semibold truncate">{data.input.entrepriseNom || '—'}</div></div>
          <div><span className="text-gray-500">Salarié</span><div className="font-semibold">{data.input.salariéPrenom} {data.input.salariéNom || '—'}</div></div>
          <div><span className="text-gray-500">Net à payer</span><div className="font-semibold text-blue-700">{data.totaux.netAPayer.toFixed(2)} €</div></div>
        </div>

        {/* Contenu DSN */}
        <div className="flex-1 overflow-auto px-4 py-3">
          <pre className="text-[10px] font-mono text-gray-700 bg-gray-50 rounded border p-3 whitespace-pre-wrap leading-relaxed">
            {content}
          </pre>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 space-y-3">
          {/* Étapes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <div className="font-bold mb-1">📋 Comment déposer votre DSN :</div>
            <ol className="list-decimal list-inside space-y-0.5">
              <li>Téléchargez le fichier .dsn ci-dessous</li>
              <li>Connectez-vous sur <strong>net-entreprises.fr</strong> avec votre compte</li>
              <li>Allez dans <strong>DSN &gt; Déposer une DSN</strong></li>
              <li>Sélectionnez le fichier téléchargé et validez</li>
            </ol>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => downloadDSN(data)}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
              Télécharger le fichier .dsn
            </button>
            <button
              onClick={handleCopy}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors"
            >
              {copied ? '✓ Copié !' : 'Copier'}
            </button>
            <a
              href="https://www.net-entreprises.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center gap-1.5 transition-colors"
            >
              Ouvrir Net-Entreprises
              <svg width="11" height="11" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const euro = (n: number) =>
  new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + '\u00a0€';

const pct = (n: number | null) =>
  n === null ? '' : n === 0 ? '' : n.toFixed(n < 1 ? 3 : 2) + '\u00a0%';

const lastDay = (mois: number, annee: number) => new Date(annee, mois, 0).getDate();
const fmt2 = (n: number) => String(n).padStart(2, '0');

export default function BulletinDisplay({ data, logoDataUrl, isFree }: { data: ResultBS; logoDataUrl?: string; isFree?: boolean }) {
  const [showDSN, setShowDSN] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle'|'ok'|'err'>('idle');

  // ── Thèmes visuels ──────────────────────────────────────────────────────────
  const THEMES = {
    bleu: { label: 'Bleu Classique',       primary: '#1a3a5c', sectionBg: '#d6ecf8', infoBg: '#eef3f8', rowOdd: '#f5fafd', brutBg: '#d8ecf9', cumulsBg: '#dde8f0', irBg: '#e8f0f8', border: '#bbd4e8' },
    gris: { label: 'Gris Professionnel',   primary: '#1f2937', sectionBg: '#e5e7eb', infoBg: '#f3f4f6', rowOdd: '#f9fafb', brutBg: '#e5e7eb', cumulsBg: '#e5e7eb', irBg: '#f3f4f6', border: '#d1d5db' },
    vert: { label: 'Vert Émeraude',        primary: '#14532d', sectionBg: '#dcfce7', infoBg: '#f0fdf4', rowOdd: '#f7fef9', brutBg: '#d1fae5', cumulsBg: '#d1fae5', irBg: '#e0fce7', border: '#86efac' },
  } as const;
  type ThemeId = keyof typeof THEMES;
  const [themeId, setThemeId] = useState<ThemeId>('bleu');
  const t = THEMES[themeId];

  const handleSendEmail = async () => {
    if (!emailTo) return;
    setEmailSending(true);
    setEmailStatus('idle');
    try {
      const bulletinEl = document.getElementById('bulletin-pdf');
      const bulletinHtml = bulletinEl ? bulletinEl.innerHTML : '';
      const p2 = (n: number) => String(n).padStart(2, '0');
      const periode = `${p2(data.params.mois)}/${data.params.annee}`;
      const res = await fetch('/api/send-bulletin-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailTo,
          bulletinHtml,
          salariePrenom: data.input.salariéPrenom || '',
          salarieNom: data.input.salariéNom || '',
          entrepriseNom: data.input.entrepriseNom || '',
          periode,
        }),
      });
      setEmailStatus(res.ok ? 'ok' : 'err');
    } catch {
      setEmailStatus('err');
    } finally {
      setEmailSending(false);
    }
  };
  const { lignes, elementsSalaire, lignesAbsences, totaux, params, input } = data;
  const { mois, annee, pmss } = params;
  const hasAbsences = lignesAbsences && lignesAbsences.length > 0;
  const last = lastDay(mois, annee);
  const periodeDebut = `01/${fmt2(mois)}/${annee}`;
  const periodeFin   = `${last}/${fmt2(mois)}/${annee}`;

  const heures = input.heuresMensuelles ?? 151.67;
  // Salaire de base affiché = brut mensuel directement (pas de recalcul par tauxHoraire)
  const salBase = totaux.brutMensuel;

  // Regrouper cotisations par section
  const bySection: Record<string, LigneBS[]> = {
    sante: [], retraite: [], famille: [], chomage: [], csg: [], autre: []
  };
  lignes.forEach(l => { if (l.section) bySection[l.section].push(l); });

  const SECTIONS: [string, string][] = [
    ['sante',    'SANTÉ'],
    ['retraite', 'RETRAITE'],
    ['famille',  'FAMILLE – SÉCURITÉ SOCIALE'],
    ['chomage',  'ASSURANCE CHÔMAGE'],
    ['csg',      'CSG / CRDS'],
    ['autre',    'AUTRES CONTRIBUTIONS DUES PAR L\'EMPLOYEUR'],
  ];

  const netAvantImpot = totaux.netAvantPAS;
  const hasElementsVariables = elementsSalaire && elementsSalaire.length > 1;

  // Styles inline (compatibles PDF/impression) — dynamiques selon thème
  const s = {
    headerBlue: { backgroundColor: t.primary } as React.CSSProperties,
    sectionBg:  { backgroundColor: t.sectionBg } as React.CSSProperties,
    rowEven:    { backgroundColor: '#ffffff' } as React.CSSProperties,
    rowOdd:     { backgroundColor: t.rowOdd } as React.CSSProperties,
    hsBg:       { backgroundColor: '#fff8ed' } as React.CSSProperties,
  };

  return (
    <div style={{ position: 'relative' }}>
      {isFree && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i % 4) * 28 - 5}%`,
                top: `${Math.floor(i / 4) * 32 + 8}%`,
                transform: 'rotate(-30deg)',
                fontSize: '32px',
                fontWeight: 900,
                color: 'rgba(100, 100, 100, 0.15)',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              DÉMO – bulletinfacile.fr
            </div>
          ))}
        </div>
      )}
    <div
      id="bulletin-pdf"
      className="bulletin-print bg-white text-gray-900 font-sans max-w-4xl mx-auto shadow-lg"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', lineHeight: '1.3', paddingTop: '18px' }}
    >

      {/* ══ EN-TÊTE ══ */}
      <div style={{ display: 'flex', borderBottom: '2px solid ' + t.primary }}>
        <div style={{ width: '55%', padding: '8px 10px', borderRight: '1px solid #bbb' }}>
          {logoDataUrl && (
            <img src={logoDataUrl} alt="Logo" style={{ maxHeight: 36, maxWidth: 100, objectFit: 'contain', marginBottom: 4, display: 'block' }} />
          )}
          <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '2px', color: t.primary }}>{input.entrepriseNom || 'Nom de l\'entreprise'}</div>
          {input.entrepriseAdresse && <div style={{ fontSize: '9px', color: '#444' }}>{input.entrepriseAdresse}</div>}
          <div style={{ fontSize: '9px', display: 'flex', gap: '12px', marginTop: '2px', flexWrap: 'wrap' }}>
            {input.entrepriseSiret && <span>Siret : {input.entrepriseSiret}</span>}
            {input.entrepriseNaf && <span>NAF : {input.entrepriseNaf}</span>}
          </div>
          {input.entrepriseConvention && <div style={{ fontSize: '8px', color: '#666', marginTop: '2px' }}>CCN : {input.entrepriseConvention}</div>}
        </div>
        <div style={{ width: '45%', padding: '8px 10px', backgroundColor: '#f7f9fc' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: t.primary, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bulletin de paie</div>
          <div style={{ fontSize: '9px', marginBottom: '1px' }}>
            <span style={{ fontWeight: 'bold' }}>Période :</span> {periodeDebut} au {periodeFin}
          </div>
          <div style={{ fontSize: '9px', marginBottom: '8px' }}><span style={{ fontWeight: 'bold' }}>Paiement le</span> {periodeFin}</div>
          {/* Nom + Prénom sur une ligne */}
          <div style={{ fontWeight: 'bold', fontSize: '11px', color: t.primary, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {input.salariéNom} {input.salariéPrenom}
          </div>
          {/* Adresse sur la ligne suivante */}
          {input.salariéAdresse && (
            <div style={{ fontSize: '9px', color: '#555', marginTop: '3px', lineHeight: '1.4' }}>
              {input.salariéAdresse}
            </div>
          )}
        </div>
      </div>

      {/* ══ INFOS SALARIÉ — 2 lignes grille ══ */}
      <div style={{ padding: '4px 10px', borderBottom: '1px solid #bbb', backgroundColor: t.infoBg, fontSize: '9px' }}>
        {/* Ligne 1 : Matricule | Emploi | Statut | Contrat */}
        <div style={{ display: 'flex', gap: '0', flexWrap: 'nowrap', marginBottom: '3px' }}>
          {input.salariéMatricule  && <span style={{ marginRight: '14px' }}><b>Matricule :</b> {input.salariéMatricule}</span>}
          {input.salariéPoste      && <span style={{ marginRight: '14px' }}><b>Emploi :</b> {input.salariéPoste}</span>}
          <span style={{ marginRight: '14px' }}><b>Statut :</b> {input.statut === 'cadre' ? 'Cadre' : 'Non cadre'}</span>
          <span><b>Contrat :</b> CDI</span>
        </div>
        {/* Ligne 2 : N°SS | Entrée | Coeff | PSS */}
        <div style={{ display: 'flex', gap: '0', flexWrap: 'nowrap' }}>
          {input.salariéNss        && <span style={{ marginRight: '14px' }}><b>N° SS :</b> {input.salariéNss}</span>}
          {input.salariéEntreeDate && <span style={{ marginRight: '14px' }}><b>Entrée :</b> {input.salariéEntreeDate}</span>}
          {input.salariéCoefficient && <span style={{ marginRight: '14px' }}><b>Coeff. :</b> {input.salariéCoefficient}</span>}
          <span><b>PSS :</b> {euro(pmss)}</span>
        </div>
      </div>

      {/* ══ TABLEAU PRINCIPAL ══ */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
        <thead>
          <tr style={{ ...s.headerBlue, color: 'white', textAlign: 'center' }}>
            <th style={{ textAlign: 'left', padding: '3px 6px', fontWeight: 'bold', width: '40%' }}>Rubriques</th>
            <th style={{ padding: '4px 6px', fontWeight: 'bold' }}>Base</th>
            <th style={{ padding: '4px 6px', fontWeight: 'bold' }}>Taux Salarial</th>
            <th style={{ padding: '4px 6px', fontWeight: 'bold' }}>Cot. Salariales</th>
            <th style={{ padding: '4px 6px', fontWeight: 'bold' }}>Taux Patronal</th>
            <th style={{ padding: '4px 6px', fontWeight: 'bold' }}>Cot. Patronales</th>
          </tr>
        </thead>
        <tbody>

          {/* ── Éléments de salaire ── */}
          {hasElementsVariables ? (
            <>
              {/* Section salaire de base */}
              <tr style={{ backgroundColor: '#eaf3fb' }}>
                <td style={{ padding: '3px 6px', fontWeight: 'bold', fontSize: '10px' }} colSpan={6}>
                  ÉLÉMENTS DE RÉMUNÉRATION
                </td>
              </tr>
              {elementsSalaire.map((el, i) => (
                <tr key={i} style={el.exonereeIR ? s.hsBg : (i % 2 === 0 ? s.rowEven : s.rowOdd)}>
                  <td style={{ padding: '2px 6px 2px 14px' }}>
                    {el.intitule}
                    {el.exonereeIR && (
                      <span style={{ marginLeft: '4px', fontSize: '8px', color: '#d97706', fontWeight: 'bold' }}>EXONÉRÉ IR</span>
                    )}
                  </td>
                  <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(el.montant)}</td>
                  <td></td><td></td><td></td><td></td>
                </tr>
              ))}
              {/* SALAIRE BRUT */}
              <tr style={{ backgroundColor: t.brutBg, fontWeight: 'bold', borderBottom: '1px solid ' + t.border }}>
                <td style={{ padding: '3px 6px' }}>SALAIRE BRUT</td>
                <td style={{ padding: '3px 6px', textAlign: 'right' }}>{euro(totaux.brutMensuel)}</td>
                <td></td><td></td><td></td><td></td>
              </tr>
            </>
          ) : (
            <tr style={{ backgroundColor: t.brutBg, fontWeight: 'bold', borderBottom: '1px solid ' + t.border }}>
              <td style={{ padding: '3px 6px' }}>SALAIRE DE BASE — {heures.toFixed(2)} h</td>
              <td style={{ padding: '3px 6px', textAlign: 'right' }}>{euro(salBase)}</td>
              <td></td><td></td><td></td><td></td>
            </tr>
          )}

          {/* ── Absences ── */}
          {hasAbsences && (
            <>
              <tr style={{ backgroundColor: '#fef2f2', borderTop: '1px solid #fca5a5' }}>
                <td colSpan={6} style={{ padding: '2px 6px', fontWeight: 'bold', fontSize: '10px', color: '#991b1b' }}>
                  ABSENCES
                </td>
              </tr>
              {lignesAbsences.map((ab, i) => (
                <tr key={'abs' + i} style={{ backgroundColor: i % 2 === 0 ? '#fff5f5' : '#fef9f9' }}>
                  <td style={{ padding: '2px 6px 2px 14px', color: '#7f1d1d' }}>
                    Absence — {ab.motif}
                    <span style={{ marginLeft: '6px', fontSize: '9px', color: '#999' }}>
                      {ab.jours > 0 ? `${ab.jours} j` : ''}{ab.heures > 0 ? ` / ${ab.heures} h` : ''}
                    </span>
                  </td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: '#991b1b' }}>− {euro(ab.deduction)}</td>
                  <td></td><td></td><td></td><td></td>
                </tr>
              ))}
              {totaux.totalIJSS > 0 && lignesAbsences.filter(ab => ab.maintienSalaire && ab.ijss > 0).map((ab, i) => (
                <tr key={'ijss' + i} style={{ backgroundColor: '#f0fdf4' }}>
                  <td style={{ padding: '2px 6px 2px 14px', color: '#166534', fontStyle: 'italic' }}>
                    IJSS estimée — {ab.motif} (subrogation)
                  </td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: '#166534' }}>+ {euro(ab.ijss)}</td>
                  <td></td><td></td><td></td><td></td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#fce7e7', fontWeight: 'bold', borderBottom: '1px solid #fca5a5' }}>
                <td style={{ padding: '3px 6px', color: '#991b1b' }}>BRUT SOUMIS AUX COTISATIONS</td>
                <td style={{ padding: '3px 6px', textAlign: 'right', color: '#991b1b' }}>{euro(totaux.brutApresAbsences)}</td>
                <td></td><td></td><td></td><td></td>
              </tr>
            </>
          )}

          {/* ── Sections de cotisations ── */}
          {SECTIONS.map(([key, label]) => {
            const rows = bySection[key];
            if (!rows || rows.length === 0) return null;
            return (
              <>
                <tr key={key + '_head'} style={{ ...s.sectionBg, borderTop: '1px solid ' + t.border }}>
                  <td colSpan={6} style={{ padding: '2px 6px', fontWeight: 'bold', fontSize: '10px', color: t.primary }}>
                    {label}
                  </td>
                </tr>
                {rows.map((l, i) => (
                  <tr key={key + i} style={i % 2 === 0 ? s.rowEven : s.rowOdd}>
                    <td style={{ padding: '2px 6px 2px 14px' }}>{l.intitule}</td>
                    <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(l.base)}</td>
                    <td style={{ padding: '2px 6px', textAlign: 'center' }}>{pct(l.tauxSalarial)}</td>
                    <td style={{ padding: '2px 6px', textAlign: 'right' }}>{l.montantSalarial > 0 ? euro(l.montantSalarial) : ''}</td>
                    <td style={{ padding: '2px 6px', textAlign: 'center' }}>{pct(l.tauxPatronal)}</td>
                    <td style={{ padding: '2px 6px', textAlign: 'right' }}>{l.montantPatronal > 0 ? euro(l.montantPatronal) : ''}</td>
                  </tr>
                ))}
              </>
            );
          })}

          {/* Réduction Fillon */}
          {totaux.reductionFillon > 0 && (
            <tr style={{ backgroundColor: '#f0faf0' }}>
              <td colSpan={4} style={{ padding: '2px 6px 2px 14px', fontStyle: 'italic', color: '#2d7a2d', fontSize: '10px' }}>
                Exonérations et allègements de cotisations patronales (Réduction Fillon)
              </td>
              <td></td>
              <td style={{ padding: '2px 6px', textAlign: 'right', color: '#2d7a2d', fontWeight: 'bold' }}>
                − {euro(totaux.reductionFillon)}
              </td>
            </tr>
          )}

          {/* TOTAL DES RETENUES */}
          <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', borderTop: '2px solid ' + t.primary, borderBottom: '1px solid #bbb' }}>
            <td style={{ padding: '3px 6px' }}>TOTAL DES RETENUES</td>
            <td></td><td></td>
            <td style={{ padding: '3px 6px', textAlign: 'right' }}>{euro(totaux.totalCotisationsSalariales)}</td>
            <td></td>
            <td style={{ padding: '3px 6px', textAlign: 'right' }}>{euro(totaux.totalCotisationsPatronales)}</td>
          </tr>

          {/* CSG/CRDS imposable */}
          <tr style={s.rowEven}>
            <td style={{ padding: '2px 6px 2px 14px', fontStyle: 'italic', color: '#555' }}>
              CSG/CRDS imposable à l&apos;impôt sur le revenu
            </td>
            <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.brutMensuel * 0.9825)}</td>
            <td style={{ padding: '2px 6px', textAlign: 'center' }}>2,90&nbsp;%</td>
            <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.brutMensuel * 0.9825 * 0.029)}</td>
            <td></td>
            <td style={{ padding: '2px 6px', textAlign: 'right', color: '#888' }}>0,00&nbsp;€</td>
          </tr>

          {/* HS exonérées IR */}
          {totaux.montantExonereeIR > 0 && (
            <tr style={s.hsBg}>
              <td style={{ padding: '2px 6px 2px 14px', fontStyle: 'italic', color: '#d97706' }}>
                Montant net des heures supplémentaires exonérées d&apos;impôt (Loi TEPA)
              </td>
              <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.montantExonereeIR)}</td>
              <td colSpan={4}></td>
            </tr>
          )}

          {/* MONTANT NET SOCIAL */}
          <tr style={{ backgroundColor: t.infoBg, fontWeight: 'bold' }}>
            <td style={{ padding: '3px 6px' }}>MONTANT NET SOCIAL</td>
            <td></td><td></td><td></td><td></td>
            <td style={{ padding: '3px 6px', textAlign: 'right' }}>{euro(netAvantImpot)}</td>
          </tr>

        </tbody>
      </table>

      {/* ══ NET À PAYER AVANT IMPÔT ══ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: t.primary, color: 'white', padding: '8px 12px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Net à payer avant impôt sur le revenu</div>
        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{euro(netAvantImpot)}</div>
      </div>

      {/* Note */}
      <div style={{ fontSize: '9px', color: '#666', padding: '4px 12px', backgroundColor: '#f7f9fc', borderBottom: '1px solid #ddd' }}>
        Dont évolution de la rémunération liée à la suppression des cotisations chômage et maladie
        {totaux.montantExonereeIR > 0 && ` — Heures supp. exonérées IR : ${euro(totaux.montantExonereeIR)}`}
      </div>

      {/* ══ CUMULS DEPUIS ENTRÉE ══ */}
      {(() => {
        const entreeDate = input.salariéEntreeDate ? new Date(input.salariéEntreeDate) : new Date(annee, 0, 1);
        const entreeAnnee = entreeDate.getFullYear();
        const entreeMois  = entreeDate.getMonth() + 1;
        const debutMois   = entreeAnnee === annee ? entreeMois : 1;
        const nbMois      = Math.max(1, mois - debutMois + 1);
        const dateLabel   = `${fmt2(debutMois)}/${entreeAnnee === annee ? annee : annee}`;
        const cumBrut     = totaux.brutMensuel * nbMois;
        const cumNetImp   = netAvantImpot * nbMois;
        const cumCotSal   = totaux.totalCotisationsSalariales * nbMois;
        const cumPAS      = totaux.montantPAS * nbMois;
        const cumNet      = totaux.netAPayer * nbMois;
        return (
          <div style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f7f9fc' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
              <thead>
                <tr style={{ backgroundColor: t.cumulsBg }}>
                  <th style={{ textAlign: 'left', padding: '2px 6px', fontWeight: 'bold', color: t.primary }}>
                    Cumuls depuis le 01/{dateLabel}
                  </th>
                  <th style={{ padding: '2px 6px', textAlign: 'right', fontWeight: 'bold', color: t.primary }}>Salaire brut</th>
                  <th style={{ padding: '2px 6px', textAlign: 'right', fontWeight: 'bold', color: t.primary }}>Net imposable</th>
                  <th style={{ padding: '2px 6px', textAlign: 'right', fontWeight: 'bold', color: t.primary }}>Cotis. salariales</th>
                  <th style={{ padding: '2px 6px', textAlign: 'right', fontWeight: 'bold', color: t.primary }}>Impôt (PAS)</th>
                  <th style={{ padding: '2px 6px', textAlign: 'right', fontWeight: 'bold', color: t.primary }}>Net à payer</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#f0f5f8' }}>
                  <td style={{ padding: '2px 6px', color: '#555' }}>Ce mois</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.brutMensuel)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(netAvantImpot)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.totalCotisationsSalariales)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.montantPAS)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.netAPayer)}</td>
                </tr>
                <tr style={{ fontWeight: 'bold', borderTop: '1px solid ' + t.border }}>
                  <td style={{ padding: '2px 6px', color: t.primary }}>Cumul ({nbMois} mois)</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: t.primary }}>{euro(cumBrut)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: t.primary }}>{euro(cumNetImp)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: t.primary }}>{euro(cumCotSal)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: t.primary }}>{euro(cumPAS)}</td>
                  <td style={{ padding: '2px 6px', textAlign: 'right', color: t.primary }}>{euro(cumNet)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* ══ IMPÔT SUR LE REVENU ══ */}
      <div style={{ padding: '0 12px 8px', borderBottom: '1px solid #ddd' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginTop: '6px' }}>
          <thead>
            <tr style={{ backgroundColor: t.irBg }}>
              <th style={{ textAlign: 'left', padding: '3px 6px', fontWeight: 'bold' }} colSpan={2}>Impôt sur le revenu</th>
              <th style={{ padding: '3px 6px', textAlign: 'right', fontWeight: 'bold' }}>Base</th>
              <th style={{ padding: '3px 6px', textAlign: 'center', fontWeight: 'bold' }}>Taux</th>
              <th style={{ padding: '3px 6px', textAlign: 'right', fontWeight: 'bold' }}>Montant</th>
              <th style={{ padding: '3px 6px', textAlign: 'right', fontWeight: 'bold' }}>Cumul annuel</th>
            </tr>
          </thead>
          <tbody>
            <tr style={s.rowEven}>
              <td colSpan={2} style={{ padding: '2px 6px' }}>Impôt sur le revenu prélevé à la source</td>
              <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(netAvantImpot - totaux.montantExonereeIR)}</td>
              <td style={{ padding: '2px 6px', textAlign: 'center' }}>{totaux.tauxPAS > 0 ? totaux.tauxPAS.toFixed(1) + '\u00a0%' : '0,0\u00a0%'}</td>
              <td style={{ padding: '2px 6px', textAlign: 'right', fontWeight: 'bold' }}>{euro(totaux.montantPAS)}</td>
              <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.montantPAS)}</td>
            </tr>
            {totaux.montantExonereeIR > 0 && (
              <tr style={s.hsBg}>
                <td colSpan={2} style={{ padding: '2px 6px', fontStyle: 'italic', fontSize: '9px', color: '#d97706' }}>
                  Montant net des heures supplémentaires exonérées
                </td>
                <td style={{ padding: '2px 6px', textAlign: 'right' }}>{euro(totaux.montantExonereeIR)}</td>
                <td></td>
                <td style={{ padding: '2px 6px', textAlign: 'right' }}>0,00&nbsp;€</td>
                <td style={{ padding: '2px 6px', textAlign: 'right' }}>0,00&nbsp;€</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ══ CONGÉS + NET À PAYER ══ */}
      <div style={{ display: 'flex', gap: '12px', padding: '8px 12px', alignItems: 'flex-start' }}>
        {/* Congés payés calculés */}
        {(() => {
          // Période de référence CP : 1er juin N-1 → 31 mai N
          const entreeCP = input.salariéEntreeDate ? new Date(input.salariéEntreeDate) : null;
          const refDebut = mois >= 6 ? new Date(annee, 5, 1) : new Date(annee - 1, 5, 1);
          const refPreDebut = mois >= 6 ? new Date(annee - 1, 5, 1) : new Date(annee - 2, 5, 1);
          // Acquis = CP de la période précédente (disponibles depuis le 1er juin)
          let moisPrec = 0;
          if (!entreeCP || entreeCP <= refPreDebut) {
            moisPrec = 12;
          } else if (entreeCP < refDebut) {
            moisPrec = (refDebut.getFullYear() - entreeCP.getFullYear()) * 12
              + refDebut.getMonth() - entreeCP.getMonth();
          }
          const joursAcquis = parseFloat(Math.min(30, moisPrec * 2.5).toFixed(1));
          // En cours = CP qui s'accumulent sur la période courante (inclus mois actuel)
          const debutCpt = entreeCP && entreeCP > refDebut ? entreeCP : refDebut;
          const moisCour = Math.max(0,
            (annee - debutCpt.getFullYear()) * 12 + mois - (debutCpt.getMonth() + 1) + 1
          );
          const joursEnCours = parseFloat(Math.min(30, moisCour * 2.5).toFixed(1));
          const fj = (n: number) => n.toFixed(1).replace('.', ',') + ' j';
          return (
            <div style={{ border: '1px solid #bbb', padding: '6px 10px', fontSize: '9px', minWidth: '150px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '10px' }}>Congés Payés</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={{ color: '#555', paddingRight: '8px' }}>Acquis (N-1)</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{fj(joursAcquis)}</td></tr>
                  <tr><td style={{ color: '#555', paddingRight: '8px' }}>En cours (N)</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{fj(joursEnCours)}</td></tr>
                  <tr><td style={{ color: '#555', paddingRight: '8px' }}>Pris ce mois</td><td style={{ textAlign: 'right' }}>0,0 j</td></tr>
                  <tr style={{ borderTop: '1px solid #ddd' }}><td style={{ color: '#555', paddingRight: '8px', fontWeight: 'bold' }}>Solde</td><td style={{ textAlign: 'right', fontWeight: 'bold', color: '#1a3a5c' }}>{fj(joursAcquis)}</td></tr>
                </tbody>
              </table>
            </div>
          );
        })()}
        {/* Cumul d'heures */}
        {(() => {
          const entreeH = input.salariéEntreeDate ? new Date(input.salariéEntreeDate) : new Date(annee, 0, 1);
          const debutAnnee = new Date(annee, 0, 1);
          const debutCumAnn = entreeH > debutAnnee ? entreeH : debutAnnee;
          const nbMoisAnn = Math.max(1,
            (annee - debutCumAnn.getFullYear()) * 12 + mois - debutCumAnn.getMonth()
          );
          const heuresAnn = parseFloat((heures * nbMoisAnn).toFixed(2));
          return (
            <div style={{ border: '1px solid #bbb', padding: '6px 10px', fontSize: '9px', minWidth: '130px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '10px' }}>Cumul heures</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={{ color: '#555', paddingRight: '8px' }}>Période</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{heures.toFixed(2)} h</td></tr>
                  <tr><td style={{ color: '#555', paddingRight: '8px' }}>Annuel</td><td style={{ textAlign: 'right', fontWeight: 'bold', color: '#1a3a5c' }}>{heuresAnn.toFixed(2)} h</td></tr>
                </tbody>
              </table>
            </div>
          );
        })()}

        {/* Acompte si présent */}
        {totaux.acompte > 0 && (
          <div style={{ border: '1px solid #ddd', padding: '8px 10px', fontSize: '10px', minWidth: '140px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#555' }}>Acompte versé</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>− {euro(totaux.acompte)}</div>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* NET À PAYER AU SALARIÉ */}
        <div style={{ border: '2px solid ' + t.primary, padding: '10px 16px', textAlign: 'right', minWidth: '220px' }}>
          <div style={{ fontSize: '10px', color: '#555', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
            Net à payer au salarié
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '24px', color: t.primary }}>
            {euro(totaux.acompte > 0 ? totaux.netAPayerApresAcompte : totaux.netAPayer)}
          </div>
          {totaux.tauxPAS > 0 && (
            <div style={{ fontSize: '9px', color: '#888', marginTop: '2px' }}>
              Dont PAS {totaux.tauxPAS.toFixed(1)}% = {euro(totaux.montantPAS)}
            </div>
          )}
          {totaux.acompte > 0 && (
            <div style={{ fontSize: '9px', color: '#888', marginTop: '2px' }}>
              Avant acompte : {euro(totaux.netAPayer)}
            </div>
          )}
        </div>
      </div>

      {/* ══ PIED DE PAGE LÉGAL ══ */}
      <div style={{ borderTop: '1px solid #ddd', padding: '6px 12px', fontSize: '8px', color: '#888', textAlign: 'center' }}>
        Bulletin de paie simplifié — Normes en vigueur | Conservez cette fiche de paie pendant toute la durée légale.
        Il existe une rubrique dédiée au bulletin de paie sur le site service-public.fr
      </div>

      {/* ══ BOUTONS DSN / CONTRAT ══ */}
      <div className="no-print" style={{ borderTop: '1px solid #eee', padding: '12px 16px', backgroundColor: '#f7f9fc' }}>

        {/* Sélecteur de thème */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
          <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '700', letterSpacing: '0.05em' }}>THÈME :</span>
          {(Object.keys(THEMES) as ThemeId[]).map(id => (
            <button
              key={id}
              onClick={() => setThemeId(id)}
              title={THEMES[id].label}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px',
                borderRadius: '20px',
                border: themeId === id ? '2px solid ' + THEMES[id].primary : '2px solid #e5e7eb',
                backgroundColor: themeId === id ? THEMES[id].primary : 'white',
                color: themeId === id ? 'white' : '#374151',
                fontSize: '11px', fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: themeId === id ? 'rgba(255,255,255,0.5)' : THEMES[id].primary, display: 'inline-block', flexShrink: 0 }} />
              {THEMES[id].label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => setShowDSN(true)}
          style={{ backgroundColor: '#1a3a5c', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
          Transmettre la DSN
        </button>
        <a
          href="/contrat"
          style={{ backgroundColor: '#15803d', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/></svg>
          Générer contrat de travail
        </a>
        {/* Bouton envoyer par email */}
        <button
          onClick={() => { setShowEmailModal(true); setEmailStatus('idle'); setEmailTo(''); }}
          style={{ backgroundColor: '#0369a1', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
          Envoyer par email
        </button>

        <div style={{ fontSize: '10px', color: '#999', marginLeft: 'auto' }}>
          DSN Phase 3 — Net-Entreprises
        </div>
        </div>{/* fin flex boutons */}
      </div>

      {/* Modal Email */}
      {showEmailModal && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={e => { if (e.target === e.currentTarget) setShowEmailModal(false); }}
        >
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '440px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 'bold', color: '#1a3a5c' }}>Envoyer le bulletin par email</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#666' }}>
              Le bulletin de <strong>{data.input.salariéPrenom} {data.input.salariéNom}</strong> sera envoyé à l&apos;adresse indiquée.
            </p>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Adresse email du destinataire
            </label>
            <input
              type="email"
              value={emailTo}
              onChange={e => setEmailTo(e.target.value)}
              placeholder="exemple@email.com"
              style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              onKeyDown={e => e.key === 'Enter' && handleSendEmail()}
            />
            {emailStatus === 'ok' && (
              <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', fontSize: '13px', color: '#15803d', fontWeight: '600' }}>
                ✅ Email envoyé avec succès !
              </div>
            )}
            {emailStatus === 'err' && (
              <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', fontSize: '13px', color: '#dc2626' }}>
                ❌ Erreur lors de l&apos;envoi. Vérifiez l&apos;adresse email.
              </div>
            )}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={handleSendEmail}
                disabled={emailSending || !emailTo}
                style={{ flex: 1, backgroundColor: emailSending || !emailTo ? '#94a3b8' : '#0369a1', color: 'white', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 'bold', cursor: emailSending || !emailTo ? 'not-allowed' : 'pointer' }}
              >
                {emailSending ? 'Envoi en cours...' : 'Envoyer'}
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal DSN */}
      {showDSN && <DSNModal data={data} onClose={() => setShowDSN(false)} />}
    </div>
    </div>
  );
}
