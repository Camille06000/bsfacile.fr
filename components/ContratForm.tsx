'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import ContratDisplay from './ContratDisplay';

interface EntrepriseResult {
  nom_complet: string;
  siren: string;
  siege?: { siret?: string; adresse?: string; activite_principale?: string; code_postal?: string; commune?: string };
  activite_principale?: string;
}

const inp = 'border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none';
const sel = inp;

const Field = ({ label, children, hint, col2 }: { label: string; children: React.ReactNode; hint?: string; col2?: boolean }) => (
  <div className={col2 ? 'md:col-span-2' : ''}>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

export interface ContratData {
  // Type
  typeContrat: string;
  motifCDD: string;
  // Employeur
  employeurNom: string;
  employeurSiret: string;
  employeurAdresse: string;
  employeurNaf: string;
  employeurConvention: string;
  employeurRepresentant: string;
  employeurQualiteRep: string;
  // Salarié
  salariéPrenom: string;
  salariéNom: string;
  salariéNaissance: string;
  salariéNationalite: string;
  salariéAdresse: string;
  salariéNss: string;
  // Poste
  intitulePoste: string;
  classification: string;
  coefficient: string;
  lieuTravail: string;
  // Durée
  dateDebut: string;
  dateFin: string;          // CDD
  periodEssai: string;
  renouvellement: boolean;
  // Temps de travail
  typeTemps: string;        // plein / partiel
  heuresSemaine: string;
  repartitionHeures: string;
  // Rémunération
  salaireBrut: string;
  tauxHoraire: string;
  primes: string;
  // Clauses optionnelles
  clauseNonConcurrence: boolean;
  clauseConfidentialite: boolean;
  clauseMobilite: boolean;
  mobiliteZone: string;
  // Formation (apprentissage)
  cfa: string;
  maitreApprentissage: string;
  diplome: string;
  // Autres
  periodeEssaiApp: string;
  avantages: string;
  notes: string;
}

const defaultData: ContratData = {
  typeContrat: 'CDI',
  motifCDD: '',
  employeurNom: '',
  employeurSiret: '',
  employeurAdresse: '',
  employeurNaf: '',
  employeurConvention: '',
  employeurRepresentant: '',
  employeurQualiteRep: 'Gérant',
  salariéPrenom: '',
  salariéNom: '',
  salariéNaissance: '',
  salariéNationalite: 'Française',
  salariéAdresse: '',
  salariéNss: '',
  intitulePoste: '',
  classification: '',
  coefficient: '',
  lieuTravail: '',
  dateDebut: '',
  dateFin: '',
  periodEssai: '',
  renouvellement: false,
  typeTemps: 'plein',
  heuresSemaine: '35',
  repartitionHeures: 'du lundi au vendredi',
  salaireBrut: '',
  tauxHoraire: '',
  primes: '',
  clauseNonConcurrence: false,
  clauseConfidentialite: true,
  clauseMobilite: false,
  mobiliteZone: '',
  cfa: '',
  maitreApprentissage: '',
  diplome: '',
  periodeEssaiApp: '',
  avantages: '',
  notes: '',
};

type TabType = 'employeur' | 'salarie' | 'poste' | 'remuneration' | 'clauses';

export default function ContratForm() {
  const [form, setForm] = useState<ContratData>(defaultData);
  const [tab, setTab] = useState<TabType>('employeur');
  const [generated, setGenerated] = useState(false);
  const displayRef = useRef<HTMLDivElement>(null);

  // Autocomplete entreprise
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<EntrepriseResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      employeurNom: e.nom_complet || '',
      employeurSiret: e.siege?.siret || '',
      employeurAdresse: adresse,
      employeurNaf: e.siege?.activite_principale || e.activite_principale || '',
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

  const set = (k: keyof ContratData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const setBool = (k: keyof ContratData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.checked }));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    setTimeout(() => displayRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handlePrint = () => window.print();

  const TabBtn = ({ t, label }: { t: TabType; label: string }) => (
    <button type="button" onClick={() => setTab(t)}
      className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
        tab === t ? 'bg-white text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'
      }`}>
      {label}
    </button>
  );

  const isCDD = form.typeContrat === 'CDD';
  const isApp = form.typeContrat === 'Apprentissage';
  const isStage = form.typeContrat === 'Stage';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <a href="/generateur" className="text-sm text-blue-600 hover:underline">← Bulletin de paie</a>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-700">Contrat de travail</span>
        </div>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Contrat de travail</h1>
        <p className="text-gray-500 text-lg">Générez votre contrat en quelques minutes — CDI, CDD, Apprentissage, Stage</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 no-print">

        {/* Sélecteur type de contrat */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-4">
          <div className="text-white font-semibold text-sm mb-2">Type de contrat</div>
          <div className="flex gap-3 flex-wrap">
            {['CDI', 'CDD', 'Apprentissage', 'Stage', 'Interim'].map(t => (
              <button key={t} type="button"
                onClick={() => setForm(f => ({ ...f, typeContrat: t }))}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  form.typeContrat === t
                    ? 'bg-white text-blue-800'
                    : 'bg-blue-700 text-white hover:bg-blue-600 border border-blue-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Motif CDD */}
        {isCDD && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
            <Field label="Motif du CDD (obligatoire)">
              <select value={form.motifCDD} onChange={set('motifCDD')} className={sel}>
                <option value="">— Sélectionnez un motif —</option>
                <option>Remplacement d&apos;un salarié absent</option>
                <option>Accroissement temporaire d&apos;activité</option>
                <option>Emploi saisonnier</option>
                <option>Mission export ou implantation à l&apos;étranger</option>
                <option>Recrutement dans l&apos;attente d&apos;un CDI</option>
                <option>Contrat d&apos;usage (secteur spécifique)</option>
              </select>
            </Field>
          </div>
        )}

        {/* Onglets */}
        <div className="bg-gray-100 border-b flex px-4 pt-2 gap-1 flex-wrap">
          <TabBtn t="employeur" label="Employeur" />
          <TabBtn t="salarie" label="Salarié" />
          <TabBtn t="poste" label="Poste & Durée" />
          <TabBtn t="remuneration" label="Rémunération" />
          <TabBtn t="clauses" label="Clauses" />
        </div>

        <form onSubmit={handleGenerate} className="p-6">

          {/* ── EMPLOYEUR ── */}
          {tab === 'employeur' && (
            <div className="space-y-4">

              {/* Recherche autocomplete */}
              <div ref={searchRef} className="relative">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Rechercher une entreprise (nom ou SIRET)
                </label>
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={handleSearchChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className={`${inp} pr-10`} placeholder="Tapez le nom ou le SIRET de l'employeur…" autoComplete="off" />
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
              <Field label="Raison sociale *">
                <input required value={form.employeurNom} onChange={set('employeurNom')} className={inp} />
              </Field>
              <Field label="SIRET">
                <input value={form.employeurSiret} onChange={set('employeurSiret')} className={inp} maxLength={14} placeholder="14 chiffres" />
              </Field>
              <Field label="Adresse du siège social *" col2>
                <input required value={form.employeurAdresse} onChange={set('employeurAdresse')} className={inp} />
              </Field>
              <Field label="Code NAF / APE">
                <input value={form.employeurNaf} onChange={set('employeurNaf')} className={inp} placeholder="ex : 6201Z" />
              </Field>
              <Field label="Convention collective">
                <input value={form.employeurConvention} onChange={set('employeurConvention')} className={inp} placeholder="ex : Convention nationale du bâtiment" />
              </Field>
              <Field label="Représentant légal (nom complet) *">
                <input required value={form.employeurRepresentant} onChange={set('employeurRepresentant')} className={inp} />
              </Field>
              <Field label="Qualité du représentant">
                <select value={form.employeurQualiteRep} onChange={set('employeurQualiteRep')} className={sel}>
                  <option>Gérant</option>
                  <option>PDG</option>
                  <option>DRH</option>
                  <option>Directeur général</option>
                  <option>Président</option>
                  <option>Responsable RH</option>
                </select>
              </Field>
            </div>

            {/* Preview si rempli */}
            {form.employeurNom && (
              <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 text-sm">
                <div className="font-semibold text-blue-800">{form.employeurNom}</div>
                {form.employeurAdresse && <div className="text-gray-600 text-xs mt-0.5">{form.employeurAdresse}</div>}
                <div className="flex gap-4 text-xs text-gray-500 mt-1 flex-wrap">
                  {form.employeurSiret && <span>SIRET : {form.employeurSiret}</span>}
                  {form.employeurNaf && <span>NAF : {form.employeurNaf}</span>}
                  {form.employeurRepresentant && <span>Représentant : {form.employeurRepresentant}</span>}
                </div>
              </div>
            )}
            </div>
          )}

          {/* ── SALARIÉ ── */}
          {tab === 'salarie' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Prénom *">
                <input required value={form.salariéPrenom} onChange={set('salariéPrenom')} className={inp} />
              </Field>
              <Field label="Nom *">
                <input required value={form.salariéNom} onChange={set('salariéNom')} className={inp} />
              </Field>
              <Field label="Date de naissance">
                <input type="date" value={form.salariéNaissance} onChange={set('salariéNaissance')} className={inp} />
              </Field>
              <Field label="Nationalité">
                <input value={form.salariéNationalite} onChange={set('salariéNationalite')} className={inp} />
              </Field>
              <Field label="Adresse complète *" col2>
                <input required value={form.salariéAdresse} onChange={set('salariéAdresse')} className={inp} />
              </Field>
              <Field label="N° Sécurité Sociale">
                <input value={form.salariéNss} onChange={set('salariéNss')} className={`${inp} font-mono`} maxLength={15} placeholder="15 chiffres" />
              </Field>
              {isApp && (
                <>
                  <Field label="Diplôme préparé">
                    <input value={form.diplome} onChange={set('diplome')} className={inp} placeholder="ex : BTS Comptabilité" />
                  </Field>
                  <Field label="Maître d'apprentissage">
                    <input value={form.maitreApprentissage} onChange={set('maitreApprentissage')} className={inp} />
                  </Field>
                  <Field label="CFA (Centre de Formation)">
                    <input value={form.cfa} onChange={set('cfa')} className={inp} />
                  </Field>
                </>
              )}
            </div>
          )}

          {/* ── POSTE & DURÉE ── */}
          {tab === 'poste' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Intitulé du poste *">
                <input required value={form.intitulePoste} onChange={set('intitulePoste')} className={inp} placeholder="ex : Développeur logiciel" />
              </Field>
              <Field label="Classification / Niveau">
                <input value={form.classification} onChange={set('classification')} className={inp} placeholder="ex : Cadre niveau III" />
              </Field>
              <Field label="Coefficient">
                <input value={form.coefficient} onChange={set('coefficient')} className={inp} placeholder="ex : 440" />
              </Field>
              <Field label="Lieu de travail *">
                <input required value={form.lieuTravail} onChange={set('lieuTravail')} className={inp} placeholder="Adresse ou 'télétravail'" />
              </Field>
              <Field label="Date de début *">
                <input required type="date" value={form.dateDebut} onChange={set('dateDebut')} className={inp} />
              </Field>
              {(isCDD || isApp || isStage) && (
                <Field label="Date de fin *">
                  <input required type="date" value={form.dateFin} onChange={set('dateFin')} className={inp} />
                </Field>
              )}
              <Field label="Période d'essai">
                <select value={form.periodEssai} onChange={set('periodEssai')} className={sel}>
                  <option value="">Sans période d&apos;essai</option>
                  <option value="1 mois">1 mois</option>
                  <option value="2 mois">2 mois (non-cadre standard)</option>
                  <option value="3 mois">3 mois (technicien / agent de maîtrise)</option>
                  <option value="4 mois">4 mois (cadre standard)</option>
                  <option value="1 semaine">1 semaine (CDD &lt; 6 mois)</option>
                  <option value="2 semaines">2 semaines (CDD &gt; 6 mois)</option>
                </select>
              </Field>
              {isCDD && form.periodEssai && (
                <Field label="Renouvellement période d'essai">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.renouvellement} onChange={setBool('renouvellement')} className="rounded" />
                    <span className="text-sm">Prévoir le renouvellement (une fois)</span>
                  </label>
                </Field>
              )}
              <Field label="Type de temps de travail">
                <select value={form.typeTemps} onChange={set('typeTemps')} className={sel}>
                  <option value="plein">Temps plein</option>
                  <option value="partiel">Temps partiel</option>
                </select>
              </Field>
              <Field label="Durée hebdomadaire (heures)">
                <input type="number" step="0.01" value={form.heuresSemaine} onChange={set('heuresSemaine')} className={inp} />
              </Field>
              <Field label="Répartition des horaires" col2>
                <input value={form.repartitionHeures} onChange={set('repartitionHeures')} className={inp}
                  placeholder="ex : lundi au vendredi 9h–17h" />
              </Field>
            </div>
          )}

          {/* ── RÉMUNÉRATION ── */}
          {tab === 'remuneration' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Salaire brut mensuel (€) *">
                <input required type="number" step="0.01" value={form.salaireBrut} onChange={set('salaireBrut')} className={inp} placeholder="ex : 2 500,00" />
              </Field>
              <Field label="Taux horaire brut (€/h)">
                <input type="number" step="0.0001" value={form.tauxHoraire} onChange={set('tauxHoraire')} className={inp} placeholder="Calculé auto si non renseigné" />
              </Field>
              <Field label="Primes et avantages" col2>
                <textarea value={form.primes} onChange={set('primes')} rows={2} className={inp}
                  placeholder="ex : Prime d'objectifs annuelle, tickets restaurant, mutuelle..." />
              </Field>
              <Field label="Avantages en nature / Autres" col2>
                <textarea value={form.avantages} onChange={set('avantages')} rows={2} className={inp}
                  placeholder="ex : Véhicule de fonction, téléphone portable, ordinateur..." />
              </Field>
            </div>
          )}

          {/* ── CLAUSES ── */}
          {tab === 'clauses' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" checked={form.clauseConfidentialite} onChange={setBool('clauseConfidentialite')} className="mt-0.5 rounded" />
                  <div>
                    <div className="font-semibold text-sm">Clause de confidentialité</div>
                    <div className="text-xs text-gray-500">Obligation de discrétion sur les informations de l&apos;entreprise</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" checked={form.clauseNonConcurrence} onChange={setBool('clauseNonConcurrence')} className="mt-0.5 rounded" />
                  <div>
                    <div className="font-semibold text-sm">Clause de non-concurrence</div>
                    <div className="text-xs text-gray-500">Interdiction d&apos;exercer une activité concurrente après la rupture</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" checked={form.clauseMobilite} onChange={setBool('clauseMobilite')} className="mt-0.5 rounded" />
                  <div>
                    <div className="font-semibold text-sm">Clause de mobilité géographique</div>
                    <div className="text-xs text-gray-500">Possibilité de mutation dans une zone définie</div>
                  </div>
                </label>
              </div>
              {form.clauseMobilite && (
                <Field label="Zone de mobilité géographique">
                  <input value={form.mobiliteZone} onChange={set('mobiliteZone')} className={inp}
                    placeholder="ex : Île-de-France, France métropolitaine..." />
                </Field>
              )}
              <Field label="Notes / clauses particulières">
                <textarea value={form.notes} onChange={set('notes')} rows={4} className={inp}
                  placeholder="Ajoutez ici toute clause spécifique à votre contrat..." />
              </Field>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-xs text-amber-800">
                <strong>⚠️ Avertissement légal :</strong> Ce contrat est généré à titre indicatif. Consultez un juriste ou expert-comptable pour valider le document avant signature. Le générateur ne remplace pas un conseil juridique professionnel.
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button type="submit"
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
              Générer le contrat
            </button>
            {generated && (
              <button type="button" onClick={handlePrint}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
                Imprimer / PDF
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CONTRAT GÉNÉRÉ */}
      {generated && (
        <div ref={displayRef}>
          <ContratDisplay data={form} />
        </div>
      )}
    </div>
  );
}
