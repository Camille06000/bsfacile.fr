'use client';
import type { ResultBS, LigneBS } from '@/lib/cotisations';

const MOIS_FR = ['','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

const euro = (n: number) =>
  new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €';

const pct = (n: number | null) =>
  n === null ? '' : n === 0 ? '' : n.toFixed(n < 1 ? 3 : 2) + ' %';

const lastDay = (mois: number, annee: number) =>
  new Date(annee, mois, 0).getDate();

const fmt2 = (n: number) => String(n).padStart(2, '0');

export default function BulletinDisplay({ data }: { data: ResultBS }) {
  const { lignes, totaux, params, input } = data;
  const { mois, annee, pmss } = params;
  const last = lastDay(mois, annee);
  const periodeDebut = `01/${fmt2(mois)}/${annee}`;
  const periodeFin   = `${last}/${fmt2(mois)}/${annee}`;

  // sections
  const bySection: Record<string, LigneBS[]> = { sante: [], retraite: [], famille: [], chomage: [], csg: [], autre: [] };
  lignes.forEach(l => { if (l.section) bySection[l.section].push(l); });

  const SECTIONS: [string, string][] = [
    ['sante',    'SANTÉ'],
    ['retraite', 'RETRAITE'],
    ['famille',  'FAMILLE – SÉCURITÉ SOCIALE'],
    ['chomage',  'ASSURANCE CHÔMAGE'],
    ['csg',      'CSG / CRDS'],
    ['autre',    'AUTRES CONTRIBUTIONS'],
  ];

  // Totaux utiles
  const netImposable = totaux.netAvantPAS;
  const heures = input.heuresMensuelles ?? 151.67;
  const tauxH  = input.tauxHoraire ? parseFloat(String(input.tauxHoraire)) : 0;
  const salBase = tauxH > 0 ? tauxH * heures : totaux.brutMensuel;

  return (
    <div id="bulletin-pdf"
      className="bulletin-print bg-white text-gray-900 text-[11px] font-sans max-w-4xl mx-auto border border-gray-300 shadow-lg"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* ══ EN-TÊTE ══ */}
      <div className="flex border-b border-gray-400">

        {/* Employeur */}
        <div className="w-1/2 p-3 border-r border-gray-400">
          <div className="border border-blue-700 p-2 text-[10px] leading-snug">
            <div className="font-bold text-sm">{input.entrepriseNom || 'ENTREPRISE'}</div>
            {input.entrepriseAdresse && <div>{input.entrepriseAdresse}</div>}
            {input.entrepriseSiret   && <div>Siret : {input.entrepriseSiret}</div>}
            {input.entrepriseNaf     && <div>Code NAF : {input.entrepriseNaf}</div>}
            {input.entrepriseConvention && <div className="mt-1 text-[9px] text-gray-600">{input.entrepriseConvention}</div>}
          </div>
        </div>

        {/* Titre + salarié */}
        <div className="w-1/2 p-3">
          <div className="font-bold text-lg text-right text-blue-800 mb-2">Fiche de paie</div>
          <div className="text-[10px] space-y-0.5">
            <div><span className="font-semibold">Période du :</span> {periodeDebut} <span className="font-semibold">au :</span> {periodeFin}</div>
            <div><span className="font-semibold">Paiement le :</span> {periodeFin}</div>
            <div className="mt-2 font-bold">{input.salariéPrenom} {input.salariéNom}</div>
            {input.salariéAdresse && <div>{input.salariéAdresse}</div>}
          </div>
        </div>
      </div>

      {/* ══ INFO SALARIÉ ══ */}
      <div className="flex border-b border-gray-300 text-[10px] px-3 py-2 gap-8 bg-gray-50">
        <div className="space-y-0.5">
          {input.salariéMatricule  && <div><span className="font-semibold">Matricule :</span> {input.salariéMatricule}</div>}
          {input.salariéNss        && <div><span className="font-semibold">N° Sécurité Sociale :</span> {input.salariéNss}</div>}
          <div><span className="font-semibold">Qualification :</span> {input.statut === 'cadre' ? 'Cadre' : 'Non-cadre'}</div>
          {input.salariéCoefficient && <div><span className="font-semibold">Coefficient :</span> {input.salariéCoefficient}</div>}
        </div>
        <div className="space-y-0.5">
          {input.salariéPoste && <div><span className="font-semibold">Emploi :</span> {input.salariéPoste}</div>}
          <div><span className="font-semibold">Plafond Sécurité Sociale :</span> {euro(pmss)}</div>
          <div><span className="font-semibold">Contrat :</span> CDI</div>
          <div><span className="font-semibold">Effectif :</span> {input.effectif === '>=50' ? '≥ 50 salariés' : '< 50 salariés'}</div>
        </div>
      </div>

      {/* ══ TABLEAU PRINCIPAL ══ */}
      <table className="w-full border-collapse text-[10px]">
        <thead>
          <tr className="bg-blue-700 text-white text-center">
            <th className="text-left px-2 py-1 font-semibold w-[40%]">Rubriques</th>
            <th className="px-2 py-1 font-semibold">Base</th>
            <th className="px-2 py-1 font-semibold">Taux Salarial</th>
            <th className="px-2 py-1 font-semibold">Cot. Salariales</th>
            <th className="px-2 py-1 font-semibold">Taux Patronal</th>
            <th className="px-2 py-1 font-semibold">Cot. Patronales</th>
          </tr>
        </thead>
        <tbody>
          {/* Salaire de base */}
          <tr className="bg-gray-100">
            <td className="px-2 py-1 font-semibold" colSpan={6}>
              SALAIRE DE BASE
              {tauxH > 0 ? ` (${tauxH.toFixed(2)} €/h)` : ''}
              {' '}— {heures.toFixed(2)} h
            </td>
          </tr>
          <tr className="bg-white">
            <td className="px-2 py-1 pl-4">Salaire de base</td>
            <td className="px-2 py-1 text-right">{euro(salBase)}</td>
            <td className="px-2 py-1 text-center"></td>
            <td className="px-2 py-1 text-right"></td>
            <td className="px-2 py-1 text-center"></td>
            <td className="px-2 py-1 text-right"></td>
          </tr>

          {/* Ligne SALAIRE BRUT */}
          <tr className="bg-blue-50 font-bold border-t border-b border-blue-200">
            <td className="px-2 py-1">SALAIRE BRUT</td>
            <td className="px-2 py-1 text-right">{euro(totaux.brutMensuel)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {/* Sections de cotisations */}
          {SECTIONS.map(([key, label]) => {
            const rows = bySection[key];
            if (!rows || rows.length === 0) return null;
            return (
              <>
                <tr key={key + '_head'} className="bg-gray-200">
                  <td className="px-2 py-0.5 font-bold uppercase text-[9px] tracking-wide text-gray-700" colSpan={6}>
                    {label}
                  </td>
                </tr>
                {rows.map((l, i) => (
                  <tr key={key + i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-2 py-0.5 pl-4">{l.intitule}</td>
                    <td className="px-2 py-0.5 text-right">{euro(l.base)}</td>
                    <td className="px-2 py-0.5 text-center">{pct(l.tauxSalarial)}</td>
                    <td className="px-2 py-0.5 text-right">{l.montantSalarial > 0 ? euro(l.montantSalarial) : ''}</td>
                    <td className="px-2 py-0.5 text-center">{pct(l.tauxPatronal)}</td>
                    <td className="px-2 py-0.5 text-right">{l.montantPatronal > 0 ? euro(l.montantPatronal) : ''}</td>
                  </tr>
                ))}
              </>
            );
          })}

          {/* Réduction Fillon */}
          {totaux.reductionFillon > 0 && (
            <tr className="bg-green-50 text-[10px]">
              <td className="px-2 py-0.5 italic text-green-800 pl-4" colSpan={4}>
                Exonérations, écrêt. et allègem. de cotis. (Réduction Fillon)
              </td>
              <td className="px-2 py-0.5 text-center"></td>
              <td className="px-2 py-0.5 text-right text-green-700 font-semibold">
                − {euro(totaux.reductionFillon)}
              </td>
            </tr>
          )}

          {/* TOTAL DES RETENUES */}
          <tr className="bg-blue-800 text-white font-bold border-t-2 border-blue-900">
            <td className="px-2 py-1">TOTAL DES RETENUES</td>
            <td></td>
            <td></td>
            <td className="px-2 py-1 text-right">{euro(totaux.totalCotisationsSalariales)}</td>
            <td></td>
            <td className="px-2 py-1 text-right">{euro(totaux.totalCotisationsPatronales)}</td>
          </tr>

          {/* CSG/CRDS imposable */}
          <tr className="bg-white text-[10px]">
            <td className="px-2 py-0.5 italic text-gray-600 pl-4" colSpan={4}>
              CSG/CRDS non déductible de l'impôt sur le revenu (inclus ci-dessus)
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* ══ MONTANT NET SOCIAL / NET AVANT IMPÔT ══ */}
      <div className="border border-blue-700 mx-3 my-2 p-2">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-[10px]">MONTANT NET SOCIAL</span>
          <span className="font-bold text-[11px]">{euro(netImposable)}</span>
        </div>
        <div className="flex justify-between items-center border-t border-blue-300 pt-1">
          <span className="font-bold text-[11px] uppercase">Net à payer avant impôt sur le revenu</span>
          <span className="font-bold text-[13px] text-blue-800">{euro(netImposable)}</span>
        </div>
      </div>

      {/* ══ CUMULS ══ */}
      <div className="flex text-[9px] border-t border-gray-300 bg-gray-50 px-3 py-1.5 gap-6">
        <div className="space-y-0.5">
          <div><span className="font-semibold">Heures période :</span> {heures.toFixed(2)} h</div>
        </div>
        <div className="space-y-0.5">
          <div><span className="font-semibold">Cumul bruts :</span> {euro(totaux.brutMensuel)}</div>
          <div><span className="font-semibold">Cumul imposable :</span> {euro(netImposable)}</div>
        </div>
        <div className="space-y-0.5 ml-auto text-right">
          <div><span className="font-semibold">Total cot. patronales :</span> {euro(totaux.totalCotisationsPatronales)}</div>
          <div><span className="font-semibold">Total des retenues :</span> {euro(totaux.totalCotisationsSalariales)}</div>
          <div><span className="font-semibold">Coût global période :</span> {euro(totaux.coutEmployeur)}</div>
        </div>
      </div>

      {/* ══ IMPÔT SUR LE REVENU (PAS) ══ */}
      <div className="border-t border-gray-300 mx-3 my-2">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-2 py-0.5 font-bold" colSpan={2}>Impôt sur le revenu</th>
              <th className="px-2 py-0.5 font-semibold text-center">Base</th>
              <th className="px-2 py-0.5 font-semibold text-center">Taux</th>
              <th className="px-2 py-0.5 font-semibold text-center">Montant</th>
              <th className="px-2 py-0.5 font-semibold text-center">Cumul annuel</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-2 py-0.5" colSpan={2}>Montant net imposable</td>
              <td className="px-2 py-0.5 text-right">{euro(netImposable)}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-2 py-0.5" colSpan={2}>Impôt sur le revenu prélevé à la source</td>
              <td className="px-2 py-0.5 text-right">{euro(netImposable)}</td>
              <td className="px-2 py-0.5 text-center">{totaux.tauxPAS.toFixed(1)} %</td>
              <td className="px-2 py-0.5 text-right font-semibold">{euro(totaux.montantPAS)}</td>
              <td className="px-2 py-0.5 text-right">{euro(totaux.montantPAS)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ══ BAS DE PAGE : Congés + Net à payer ══ */}
      <div className="flex border-t border-gray-300 mx-3 mb-3 pt-2 gap-4">

        {/* Congés payés */}
        <div className="border border-gray-400 p-2 text-[10px] w-48">
          <div className="font-bold text-[10px] mb-1 uppercase">Congés Payés</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            <span className="text-gray-600">En cours :</span><span className="text-right">—</span>
            <span className="text-gray-600">Acquis :</span><span className="text-right">—</span>
            <span className="text-gray-600">Pris :</span><span className="text-right">—</span>
            <span className="text-gray-600">Solde :</span><span className="text-right">—</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Net à payer */}
        <div className="border-2 border-blue-700 p-3 text-right min-w-[200px]">
          <div className="text-[10px] text-gray-600 font-semibold uppercase mb-1">Net à payer au salarié</div>
          <div className="text-2xl font-extrabold text-blue-800">{euro(totaux.netAPayer)}</div>
          {totaux.tauxPAS > 0 && (
            <div className="text-[9px] text-gray-500 mt-0.5">
              Dont PAS {totaux.tauxPAS}% = {euro(totaux.montantPAS)}
            </div>
          )}
        </div>
      </div>

      {/* ══ PIED DE PAGE LÉGAL ══ */}
      <div className="border-t border-gray-300 px-3 py-1.5 text-[8px] text-gray-500 text-center">
        Bulletin de paie simplifié — Normes en vigueur | Conservez cette fiche de paie pendant toute la durée légale.
        Il existe une rubrique dédiée au bulletin de paie sur le site service-public.fr
      </div>
    </div>
  );
}
