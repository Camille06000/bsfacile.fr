'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import BulletinDisplay from './BulletinDisplay';
import type { ResultBS } from '@/lib/cotisations';

const MOIS = [
  { v: 1, l: 'Janvier' }, { v: 2, l: 'Février' }, { v: 3, l: 'Mars' },
  { v: 4, l: 'Avril' }, { v: 5, l: 'Mai' }, { v: 6, l: 'Juin' },
  { v: 7, l: 'Juillet' }, { v: 8, l: 'Août' }, { v: 9, l: 'Septembre' },
  { v: 10, l: 'Octobre' }, { v: 11, l: 'Novembre' }, { v: 12, l: 'Décembre' },
];
const now = new Date();

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

const inp = 'border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none';
const sel = inp;

interface EntrepriseResult {
  nom_complet: string;
  siren: string;
  siege?: { siret?: string; adresse?: string; activite_principale?: string; code_postal?: string; commune?: string };
  activite_principale?: string;
}

interface HeureMajoree { intitule: string; heures: string; majoration: string }

type TabType = 'principal' | 'entreprise' | 'salarie' | 'elements';

export default function BulletinForm() {
  const [form, setForm] = useState({
    brutMensuel: '',
    statut: 'non-cadre',
    effectif: '<50',
    tauxPAS: '0',
    mois: String(now.getMonth() + 1),
    annee: String(now.getFullYear() >= 2026 ? 2026 : 2025),
    entrepriseNom: '',
    entrepriseSiret: '',
    entrepriseAdresse: '',
    entrepriseNaf: '',
    entrepriseConvention: '',
    salariéNom: '',
    salariéPrenom: '',
    salariéNss: '',
    salariéAdresse: '',
    salariéPoste: '',
    salariéCoefficient: '',
    salariéMatricule: '',
    salariéEntreeDate: '',
    heuresMensuelles: '151.67',
    tauxHoraire: '',
    heuresSupp25: '',
    heuresSupp50: '',
    heuresCompl: '',
    prime: '',
    avantageNature: '',
    acompte: '',
  });

  const [heureMajorees, setHeureMajorees] = useState<HeureMajoree[]>([]);
  const [result, setResult] = useState<ResultBS | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<TabType>('principal');

  // Autocomplete entreprise
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<EntrepriseResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const r2 = (n: number) => Math.round(n * 100) / 100;

  const handleBrut = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brut = e.target.value;
    setForm(f => {
      const h = parseFloat(f.heuresMensuelles), b = parseFloat(brut);
      if (b > 0 && h > 0) return { ...f, brutMensuel: brut, tauxHoraire: String(r2(b / h)) };
      return { ...f, brutMensuel: brut };
    });
  };

  const handleHeures = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heures = e.target.value;
    setForm(f => {
      const h = parseFloat(heures), b = parseFloat(f.brutMensuel), t = parseFloat(f.tauxHoraire);
      if (h > 0 && b > 0) return { ...f, heuresMensuelles: heures, tauxHoraire: String(r2(b / h)) };
      if (h > 0 && t > 0) return { ...f, heuresMensuelles: heures, brutMensuel: String(r2(h * t)) };
      return { ...f, heuresMensuelles: heures };
    });
  };

  const handleTaux = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taux = e.target.value;
    setForm(f => {
      const t = parseFloat(taux), h = parseFloat(f.heuresMensuelles);
      if (t > 0 && h > 0) return { ...f, tauxHoraire: taux, brutMensuel: String(r2(t * h)) };
      return { ...f, tauxHoraire: taux };
    });
  };

  // Recherche entreprise
  const searchEntreprise = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return; }
    setSearching(true);
    try {
      const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(q)}&page=1&per_page=8`);
      const data = await res.json();
      setSuggestions(data.results || []);
      setShowSuggestions(true);
    } catch { setSuggestions([]); }
    finally { setSearching(false); }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchEntreprise(val), 400);
  };

  const selectEntreprise = (e: EntrepriseResult) => {
    const adresse = [e.siege?.adresse, e.siege?.code_postal, e.siege?.commune].filter(Boolean).join(', ') || '';
    setForm(f => ({
      ...f,
      entrepriseNom: e.nom_complet || '',
      entrepriseSiret: e.siege?.siret || '',
      entrepriseAdresse: adresse,
      entrepriseNaf: e.siege?.activite_principale || e.activite_principale || '',
    }));
    setSearchQuery(''); setSuggestions([]); setShowSuggestions(false);
  };

  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(ev.target as Node))
        setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Heures majorées
  const addHeureMajoree = () => setHeureMajorees(h => [...h, { intitule: 'Heures de nuit', heures: '', majoration: '100' }]);
  const removeHeureMajoree = (i: number) => setHeureMajorees(h => h.filter((_, j) => j !== i));
  const updateHeureMajoree = (i: number, k: keyof HeureMajoree, v: string) =>
    setHeureMajorees(h => h.map((hm, j) => j === i ? { ...hm, [k]: v } : hm));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const payload = {
        ...form,
        heuresMajorees: heureMajorees
          .filter(hm => parseFloat(hm.heures) > 0)
          .map(hm => ({ intitule: hm.intitule, heures: parseFloat(hm.heures), majoration: parseFloat(hm.majoration) || 100 })),
      };
      const res = await fetch('/api/generate-bs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      setResult(data);
      setTimeout(() => document.getElementById('bulletin-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  const handlePrint = () => window.print();

  const TabBtn = ({ t, label, badge }: { t: TabType; label: string; badge?: string }) => (
    <button type="button" onClick={() => setTab(t)}
      className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors flex items-center gap-1.5 ${
        tab === t ? 'bg-white text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'
      }`}>
      {label}
      {badge && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">{badge}</span>}
    </button>
  );

  // Indicateur de champs remplis dans "Éléments variables"
  const elementsCount = [form.heuresSupp25, form.heuresSupp50, form.heuresCompl, form.prime, form.avantageNature, form.acompte]
    .filter(v => v && parseFloat(v) > 0).length + heureMajorees.filter(hm => parseFloat(hm.heures) > 0).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="font-bold text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-full border border-blue-200">Bulletin de paie</span>
          <a href="/contrat" className="text-sm text-gray-500 hover:text-blue-700 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors">Contrat de travail →</a>
        </div>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">BS Facile</h1>
        <p className="text-gray-500 text-lg">Générateur de bulletin de salaire français — Droit social 2025 / 2026</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 no-print">
        <div className="bg-gray-100 border-b flex px-4 pt-2 gap-1 flex-wrap">
          <TabBtn t="principal" label="Paramètres" />
          <TabBtn t="entreprise" label="Entreprise" />
          <TabBtn t="salarie" label="Salarié" />
          <TabBtn t="elements" label="Éléments variables" badge={elementsCount > 0 ? String(elementsCount) : undefined} />
        </div>

        <form onSubmit={handleSubmit} className="p-6">

          {/* ── ONGLET PRINCIPAL ── */}
          {tab === 'principal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Salaire brut mensuel (€)" hint="Calculé auto si heures + taux remplis">
                <input type="number" min="1000" max="200000" step="0.01"
                  value={form.brutMensuel} onChange={handleBrut}
                  className={inp} placeholder="ex : 3 500,00" required />
              </Field>

              <Field label="Statut salarié">
                <select value={form.statut} onChange={set('statut')} className={sel}>
                  <option value="non-cadre">Non-cadre</option>
                  <option value="cadre">Cadre</option>
                </select>
              </Field>

              <Field label="Effectif entreprise">
                <select value={form.effectif} onChange={set('effectif')} className={sel}>
                  <option value="<50">Moins de 50 salariés</option>
                  <option value=">=50">50 salariés et plus</option>
                </select>
              </Field>

              <Field label="Taux PAS — Prélèvement à la source (%)" hint="0 à 45 %">
                <input type="number" min="0" max="45" step="0.1"
                  value={form.tauxPAS} onChange={set('tauxPAS')} className={inp} />
              </Field>

              <Field label="Mois">
                <select value={form.mois} onChange={set('mois')} className={sel}>
                  {MOIS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                </select>
              </Field>

              <Field label="Année">
                <select value={form.annee} onChange={set('annee')} className={sel}>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </Field>

              <Field label="Heures mensuelles normales" hint="Calculé auto si brut + taux remplis">
                <input type="number" min="0" max="400" step="0.01"
                  value={form.heuresMensuelles} onChange={handleHeures} className={inp} />
              </Field>

              <Field label="Taux horaire (€/h)" hint="Calculé auto si brut + heures remplis">
                <input type="number" min="0" step="0.0001"
                  value={form.tauxHoraire} onChange={handleTaux} className={inp} />
              </Field>
            </div>
          )}

          {/* ── ONGLET ENTREPRISE ── */}
          {tab === 'entreprise' && (
            <div className="space-y-4">
              <div ref={searchRef} className="relative">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Rechercher une entreprise (nom ou SIRET)
                </label>
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={handleSearchChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className={`${inp} pr-10`} placeholder="Tapez le nom ou le SIRET…" autoComplete="off" />
                  {searching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="animate-spin h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-72 overflow-y-auto">
                    {suggestions.map((e, i) => (
                      <button key={e.siren + i} type="button" onMouseDown={() => selectEntreprise(e)}
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors">
                        <div className="font-semibold text-sm text-gray-900">{e.nom_complet}</div>
                        <div className="text-xs text-gray-500 mt-0.5 flex gap-3 flex-wrap">
                          {e.siege?.siret && <span>SIRET : {e.siege.siret}</span>}
                          {(e.siege?.activite_principale || e.activite_principale) && <span>NAF : {e.siege?.activite_principale || e.activite_principale}</span>}
                          {e.siege?.adresse && <span className="truncate">{e.siege.adresse}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400">
                <div className="flex-1 border-t border-gray-200" />
                <span>ou remplissez manuellement</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Raison sociale">
                  <input value={form.entrepriseNom} onChange={set('entrepriseNom')} className={inp} />
                </Field>
                <Field label="SIRET">
                  <input value={form.entrepriseSiret} onChange={set('entrepriseSiret')} className={inp} placeholder="14 chiffres" maxLength={14} />
                </Field>
                <Field label="Adresse">
                  <input value={form.entrepriseAdresse} onChange={set('entrepriseAdresse')} className={inp} />
                </Field>
                <Field label="Code NAF / APE">
                  <input value={form.entrepriseNaf} onChange={set('entrepriseNaf')} className={inp} placeholder="ex : 6201Z" />
                </Field>
                <Field label="Convention collective (IDCC)" hint="Optionnel">
                  <input value={form.entrepriseConvention} onChange={set('entrepriseConvention')} className={inp} placeholder="ex : 1596 – BTP" />
                </Field>
              </div>

              {form.entrepriseNom && (
                <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 text-sm">
                  <div className="font-semibold text-blue-800">{form.entrepriseNom}</div>
                  {form.entrepriseAdresse && <div className="text-gray-600 text-xs mt-0.5">{form.entrepriseAdresse}</div>}
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    {form.entrepriseSiret && <span>SIRET : {form.entrepriseSiret}</span>}
                    {form.entrepriseNaf && <span>NAF : {form.entrepriseNaf}</span>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ONGLET SALARIÉ ── */}
          {tab === 'salarie' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nom">
                <input value={form.salariéNom} onChange={set('salariéNom')} className={inp} />
              </Field>
              <Field label="Prénom">
                <input value={form.salariéPrenom} onChange={set('salariéPrenom')} className={inp} />
              </Field>
              <Field label="N° Sécurité Sociale">
                <input value={form.salariéNss} onChange={set('salariéNss')} className={`${inp} font-mono`} placeholder="15 chiffres" maxLength={15} />
              </Field>
              <Field label="Date d'entrée">
                <input type="date" value={form.salariéEntreeDate} onChange={set('salariéEntreeDate')} className={inp} />
              </Field>
              <Field label="Adresse">
                <input value={form.salariéAdresse} onChange={set('salariéAdresse')} className={inp} />
              </Field>
              <Field label="Poste / Qualification">
                <input value={form.salariéPoste} onChange={set('salariéPoste')} className={inp} />
              </Field>
              <Field label="Coefficient">
                <input value={form.salariéCoefficient} onChange={set('salariéCoefficient')} className={inp} placeholder="ex : 440" />
              </Field>
              <Field label="Matricule">
                <input value={form.salariéMatricule} onChange={set('salariéMatricule')} className={inp} />
              </Field>
            </div>
          )}

          {/* ── ONGLET ÉLÉMENTS VARIABLES ── */}
          {tab === 'elements' && (
            <div className="space-y-6">

              {/* Heures supplémentaires */}
              <div>
                <h3 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs">H</span>
                  Heures supplémentaires / complémentaires
                </h3>
                <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mb-3 text-xs text-orange-700">
                  Les heures supplémentaires sont <strong>exonérées d&apos;impôt sur le revenu</strong> (PAS) — Loi TEPA
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Heures supp. à 25% (h)" hint="Semaine 36 à 43">
                    <input type="number" min="0" step="0.01" value={form.heuresSupp25} onChange={set('heuresSupp25')} className={inp} placeholder="0" />
                  </Field>
                  <Field label="Heures supp. à 50% (h)" hint="À partir de la semaine 44">
                    <input type="number" min="0" step="0.01" value={form.heuresSupp50} onChange={set('heuresSupp50')} className={inp} placeholder="0" />
                  </Field>
                  <Field label="Heures complémentaires à 10% (h)" hint="Temps partiel">
                    <input type="number" min="0" step="0.01" value={form.heuresCompl} onChange={set('heuresCompl')} className={inp} placeholder="0" />
                  </Field>
                </div>
              </div>

              {/* Heures majorées (nuit, dimanche, férié) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">M</span>
                    Heures majorées (nuit, dimanche, férié...)
                  </h3>
                  <button type="button" onClick={addHeureMajoree}
                    className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors">
                    + Ajouter
                  </button>
                </div>
                {heureMajorees.length === 0 && (
                  <p className="text-xs text-gray-400 italic">Aucune heure majorée. Cliquez sur &quot;+ Ajouter&quot; pour en saisir.</p>
                )}
                {heureMajorees.map((hm, i) => (
                  <div key={i} className="flex gap-3 items-end mb-3 bg-purple-50 p-3 rounded-md border border-purple-200">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Intitulé</label>
                      <select value={hm.intitule} onChange={e => updateHeureMajoree(i, 'intitule', e.target.value)} className={sel}>
                        <option>Heures de nuit</option>
                        <option>Heures du dimanche</option>
                        <option>Heures jours fériés</option>
                        <option>Heures d&apos;astreinte</option>
                        <option>Autre majoration</option>
                      </select>
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Nb heures</label>
                      <input type="number" min="0" step="0.01" value={hm.heures}
                        onChange={e => updateHeureMajoree(i, 'heures', e.target.value)} className={inp} placeholder="0" />
                    </div>
                    <div className="w-28">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Majoration %</label>
                      <input type="number" min="0" step="1" value={hm.majoration}
                        onChange={e => updateHeureMajoree(i, 'majoration', e.target.value)} className={inp} placeholder="100" />
                    </div>
                    <button type="button" onClick={() => removeHeureMajoree(i)}
                      className="text-red-400 hover:text-red-600 transition-colors mb-0.5 text-lg font-bold leading-none">×</button>
                  </div>
                ))}
              </div>

              {/* Prime et autres */}
              <div>
                <h3 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">€</span>
                  Éléments de rémunération complémentaires
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Prime (€)" hint="Brute — soumise à cotisations">
                    <input type="number" min="0" step="0.01" value={form.prime} onChange={set('prime')} className={inp} placeholder="0" />
                  </Field>
                  <Field label="Avantage en nature (€)" hint="Nourriture, logement, voiture...">
                    <input type="number" min="0" step="0.01" value={form.avantageNature} onChange={set('avantageNature')} className={inp} placeholder="0" />
                  </Field>
                  <Field label="Acompte versé (€)" hint="Déjà versé ce mois">
                    <input type="number" min="0" step="0.01" value={form.acompte} onChange={set('acompte')} className={inp} placeholder="0" />
                  </Field>
                </div>
              </div>

              {/* Récap si taux horaire rempli */}
              {form.tauxHoraire && parseFloat(form.tauxHoraire) > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                  <div className="font-semibold text-blue-800 mb-2">Récapitulatif brut estimé</div>
                  {(() => {
                    const t = parseFloat(form.tauxHoraire) || 0;
                    const h = parseFloat(form.heuresMensuelles) || 151.67;
                    const hs25 = parseFloat(form.heuresSupp25) || 0;
                    const hs50 = parseFloat(form.heuresSupp50) || 0;
                    const hc = parseFloat(form.heuresCompl) || 0;
                    const prime = parseFloat(form.prime) || 0;
                    const an = parseFloat(form.avantageNature) || 0;
                    const base = Math.round(t * h * 100) / 100;
                    const mHS25 = Math.round(hs25 * t * 1.25 * 100) / 100;
                    const mHS50 = Math.round(hs50 * t * 1.50 * 100) / 100;
                    const mHC = Math.round(hc * t * 1.10 * 100) / 100;
                    const total = Math.round((base + mHS25 + mHS50 + mHC + prime + an) * 100) / 100;
                    const fmtEuro = (n: number) => n.toFixed(2).replace('.', ',') + ' €';
                    return (
                      <table className="w-full text-xs">
                        <tbody>
                          <tr><td className="py-0.5 text-gray-600">Salaire de base ({h.toFixed(2)}h)</td><td className="text-right font-mono">{fmtEuro(base)}</td></tr>
                          {mHS25 > 0 && <tr><td className="py-0.5 text-gray-600">Heures supp. 25% ({hs25}h)</td><td className="text-right font-mono text-orange-600">{fmtEuro(mHS25)}</td></tr>}
                          {mHS50 > 0 && <tr><td className="py-0.5 text-gray-600">Heures supp. 50% ({hs50}h)</td><td className="text-right font-mono text-orange-600">{fmtEuro(mHS50)}</td></tr>}
                          {mHC > 0 && <tr><td className="py-0.5 text-gray-600">Heures compl. 10% ({hc}h)</td><td className="text-right font-mono">{fmtEuro(mHC)}</td></tr>}
                          {prime > 0 && <tr><td className="py-0.5 text-gray-600">Prime</td><td className="text-right font-mono">{fmtEuro(prime)}</td></tr>}
                          {an > 0 && <tr><td className="py-0.5 text-gray-600">Avantage en nature</td><td className="text-right font-mono">{fmtEuro(an)}</td></tr>}
                          <tr className="border-t border-blue-300 font-semibold"><td className="pt-1 text-blue-800">TOTAL BRUT</td><td className="text-right font-mono text-blue-800">{fmtEuro(total)}</td></tr>
                        </tbody>
                      </table>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">{error}</div>
          )}

          <div className="mt-6 flex gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
              {loading ? 'Calcul en cours…' : 'Générer le bulletin'}
            </button>
            {result && (
              <button type="button" onClick={handlePrint}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
                Imprimer / PDF
              </button>
            )}
          </div>
        </form>
      </div>

      {result && (
        <section id="bulletin-section">
          <BulletinDisplay data={result} />
        </section>
      )}
    </div>
  );
}
