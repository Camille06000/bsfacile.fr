'use client';
import { useState } from 'react';
import BulletinDisplay from './BulletinDisplay';
import type { ResultBS } from '@/lib/cotisations';

const MOIS = [
  { v: 1, l: 'Janvier' }, { v: 2, l: 'Février' }, { v: 3, l: 'Mars' },
  { v: 4, l: 'Avril' }, { v: 5, l: 'Mai' }, { v: 6, l: 'Juin' },
  { v: 7, l: 'Juillet' }, { v: 8, l: 'Août' }, { v: 9, l: 'Septembre' },
  { v: 10, l: 'Octobre' }, { v: 11, l: 'Novembre' }, { v: 12, l: 'Décembre' },
];

const now = new Date();

const Field = ({
  label, children, hint,
}: {
  label: string; children: React.ReactNode; hint?: string;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

const inp = 'border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none';
const sel = inp;

export default function BulletinForm() {
  const [form, setForm] = useState({
    // Paramètres principaux
    brutMensuel: '',
    statut: 'non-cadre',
    effectif: '<50',
    tauxPAS: '0',
    mois: String(now.getMonth() + 1),
    annee: String(now.getFullYear() >= 2026 ? 2026 : 2025),
    // Entreprise
    entrepriseNom: '',
    entrepriseSiret: '',
    entrepriseAdresse: '',
    entrepriseNaf: '',
    entrepriseConvention: '',
    // Salarié
    salariéNom: '',
    salariéPrenom: '',
    salariéNss: '',
    salariéAdresse: '',
    salariéPoste: '',
    salariéCoefficient: '',
    salariéMatricule: '',
    // Rémunération
    heuresMensuelles: '151.67',
    tauxHoraire: '',
  });

  const [result, setResult] = useState<ResultBS | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'principal' | 'entreprise' | 'salarié'>('principal');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  // ── Calcul automatique brut / heures / taux horaire ──
  const r2 = (n: number) => Math.round(n * 100) / 100;

  const handleBrut = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brut = e.target.value;
    setForm(f => {
      const h = parseFloat(f.heuresMensuelles);
      const b = parseFloat(brut);
      if (b > 0 && h > 0) return { ...f, brutMensuel: brut, tauxHoraire: String(r2(b / h)) };
      return { ...f, brutMensuel: brut };
    });
  };

  const handleHeures = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heures = e.target.value;
    setForm(f => {
      const h = parseFloat(heures);
      const b = parseFloat(f.brutMensuel);
      const t = parseFloat(f.tauxHoraire);
      if (h > 0 && b > 0) return { ...f, heuresMensuelles: heures, tauxHoraire: String(r2(b / h)) };
      if (h > 0 && t > 0) return { ...f, heuresMensuelles: heures, brutMensuel: String(r2(h * t)) };
      return { ...f, heuresMensuelles: heures };
    });
  };

  const handleTaux = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taux = e.target.value;
    setForm(f => {
      const t = parseFloat(taux);
      const h = parseFloat(f.heuresMensuelles);
      if (t > 0 && h > 0) return { ...f, tauxHoraire: taux, brutMensuel: String(r2(t * h)) };
      return { ...f, tauxHoraire: taux };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-bs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      setResult(data);
      setTimeout(() => document.getElementById('bulletin-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  const TabBtn = ({ t, label }: { t: typeof tab; label: string }) => (
    <button type="button" onClick={() => setTab(t)}
      className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
        tab === t ? 'bg-white text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'
      }`}>
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* HERO */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">BS Facile</h1>
        <p className="text-gray-500 text-lg">
          Générateur de bulletin de salaire français — Droit social 2025 / 2026
        </p>
      </div>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 no-print">
        <div className="bg-gray-100 border-b flex px-4 pt-2 gap-1">
          <TabBtn t="principal" label="Paramètres principaux" />
          <TabBtn t="entreprise" label="Entreprise" />
          <TabBtn t="salarié" label="Salarié" />
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

              <Field label="Heures mensuelles" hint="Calculé auto si brut + taux remplis">
                <input type="number" min="0" max="400" step="0.01"
                  value={form.heuresMensuelles} onChange={handleHeures} className={inp} />
              </Field>

              <Field label="Taux horaire (€/h)" hint="Calculé auto si brut + heures remplis">
                <input type="number" min="0" step="0.01"
                  value={form.tauxHoraire} onChange={handleTaux} className={inp} />
              </Field>
            </div>
          )}

          {/* ── ONGLET ENTREPRISE ── */}
          {tab === 'entreprise' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Raison sociale">
                <input value={form.entrepriseNom} onChange={set('entrepriseNom')} className={inp} />
              </Field>
              <Field label="SIRET">
                <input value={form.entrepriseSiret} onChange={set('entrepriseSiret')}
                  className={inp} placeholder="14 chiffres" maxLength={14} />
              </Field>
              <Field label="Adresse">
                <input value={form.entrepriseAdresse} onChange={set('entrepriseAdresse')} className={inp} />
              </Field>
              <Field label="Code NAF / APE">
                <input value={form.entrepriseNaf} onChange={set('entrepriseNaf')}
                  className={inp} placeholder="ex : 6201Z" />
              </Field>
              <Field label="Convention collective (IDCC)">
                <input value={form.entrepriseConvention} onChange={set('entrepriseConvention')}
                  className={inp} placeholder="ex : 1596 – BTP" />
              </Field>
            </div>
          )}

          {/* ── ONGLET SALARIÉ ── */}
          {tab === 'salarié' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nom">
                <input value={form.salariéNom} onChange={set('salariéNom')} className={inp} />
              </Field>
              <Field label="Prénom">
                <input value={form.salariéPrenom} onChange={set('salariéPrenom')} className={inp} />
              </Field>
              <Field label="N° Sécurité Sociale">
                <input value={form.salariéNss} onChange={set('salariéNss')}
                  className={`${inp} font-mono`} placeholder="15 chiffres" maxLength={15} />
              </Field>
              <Field label="Adresse">
                <input value={form.salariéAdresse} onChange={set('salariéAdresse')} className={inp} />
              </Field>
              <Field label="Poste / Qualification">
                <input value={form.salariéPoste} onChange={set('salariéPoste')} className={inp} />
              </Field>
              <Field label="Coefficient">
                <input value={form.salariéCoefficient} onChange={set('salariéCoefficient')}
                  className={inp} placeholder="ex : 440" />
              </Field>
              <Field label="Matricule">
                <input value={form.salariéMatricule} onChange={set('salariéMatricule')} className={inp} />
              </Field>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
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

      {/* BULLETIN */}
      {result && (
        <section id="bulletin-section">
          <BulletinDisplay data={result} />
        </section>
      )}
    </div>
  );
}
