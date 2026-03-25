'use client';
import type { ResultBS, LigneBS } from '@/lib/cotisations';

const MOIS_FR = [
  '', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const euro = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

const pct = (n: number | null) =>
  n === null ? '' : n === 0 ? '–' : `${n.toFixed(n < 1 ? 3 : 2)} %`;

function TableSection({
  title, lignes, colSal, colPat,
}: {
  title: string;
  lignes: LigneBS[];
  colSal: boolean;
  colPat: boolean;
}) {
  return (
    <>
      <tr className="bg-blue-700">
        <td colSpan={colSal && colPat ? 7 : 5}
          className="px-3 py-1 text-white font-semibold text-xs uppercase tracking-wider">
          {title}
        </td>
      </tr>
      {lignes.map((l, i) => (
        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          <td className="px-3 py-1 text-xs">{l.intitule}</td>
          <td className="px-3 py-1 text-xs text-right">{euro(l.base)}</td>
          {colSal && <>
            <td className="px-3 py-1 text-xs text-center">{pct(l.tauxSalarial)}</td>
            <td className="px-3 py-1 text-xs text-right font-medium">
              {l.montantSalarial > 0 ? euro(l.montantSalarial) : ''}
            </td>
          </>}
          {colPat && <>
            <td className="px-3 py-1 text-xs text-center">{pct(l.tauxPatronal)}</td>
            <td className="px-3 py-1 text-xs text-right font-medium">
              {l.montantPatronal > 0 ? euro(l.montantPatronal) : ''}
            </td>
          </>}
        </tr>
      ))}
    </>
  );
}

export default function BulletinDisplay({ data }: { data: ResultBS }) {
  const { lignes, totaux, params, input } = data;
  const periode = `${MOIS_FR[params.mois] ?? params.mois} ${params.annee}`;

  const sections: Record<string, LigneBS[]> = {
    sante: [], famille: [], retraite: [], chomage: [], csg: [], autre: [],
  };
  lignes.forEach(l => { if (l.section) sections[l.section].push(l); });

  const SECTIONS_ORDER: [string, string][] = [
    ['sante', 'Santé'],
    ['famille', 'Famille & Prévoyance'],
    ['retraite', 'Retraite'],
    ['chomage', 'Chômage'],
    ['csg', 'CSG / CRDS'],
    ['autre', 'Autres contributions'],
  ];

  return (
    <div className="bulletin-print bg-white shadow-lg rounded-lg overflow-hidden text-gray-800 font-sans text-sm"
      id="bulletin-pdf">

      {/* ── EN-TÊTE ── */}
      <div className="bg-blue-800 text-white p-4 grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold text-base">{input.entrepriseNom || 'ENTREPRISE'}</div>
          <div className="text-xs opacity-80">{input.entrepriseAdresse}</div>
          {input.entrepriseSiret && (
            <div className="text-xs opacity-80 mt-1">SIRET : {input.entrepriseSiret}</div>
          )}
          {input.entrepriseNaf && (
            <div className="text-xs opacity-80">Code NAF : {input.entrepriseNaf}</div>
          )}
          {input.entrepriseConvention && (
            <div className="text-xs opacity-80">Convention : {input.entrepriseConvention}</div>
          )}
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">BULLETIN DE SALAIRE</div>
          <div className="text-sm opacity-90">{periode}</div>
          <div className="text-xs opacity-70 mt-1">
            PMSS : {euro(params.pmss)} | SMIC : {euro(params.smicMensuel)}
          </div>
        </div>
      </div>

      {/* ── SALARIÉ ── */}
      <div className="bg-blue-50 border-b border-blue-200 p-4 grid grid-cols-3 gap-2">
        <div>
          <div className="text-xs text-gray-500 uppercase">Salarié</div>
          <div className="font-bold">
            {input.salariéPrenom} {input.salariéNom}
          </div>
          {input.salariéAdresse && <div className="text-xs">{input.salariéAdresse}</div>}
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase">Poste</div>
          <div className="font-medium">{input.salariéPoste || '–'}</div>
          {input.salariéCoefficient && <div className="text-xs">Coeff. {input.salariéCoefficient}</div>}
          <div className="text-xs">Statut : {input.statut === 'cadre' ? 'Cadre' : 'Non-cadre'}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase">N° SS</div>
          <div className="font-mono text-xs">{input.salariéNss || '–'}</div>
          {input.salariéMatricule && (
            <div className="text-xs text-gray-500">Matricule : {input.salariéMatricule}</div>
          )}
          {input.heuresMensuelles && (
            <div className="text-xs">Durée : {input.heuresMensuelles} h/mois</div>
          )}
        </div>
      </div>

      {/* ── RÉMUNÉRATION BRUTE ── */}
      <div className="p-4 border-b">
        <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
          Rémunération brute
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Salaire de base
            {input.heuresMensuelles && input.tauxHoraire
              ? ` (${input.heuresMensuelles} h × ${input.tauxHoraire} €/h)`
              : ''}
          </div>
          <div className="font-bold text-base">{euro(totaux.brutMensuel)}</div>
        </div>
      </div>

      {/* ── TABLEAU COTISATIONS ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white text-xs">
              <th className="px-3 py-2">Nature de la cotisation</th>
              <th className="px-3 py-2 text-right">Base</th>
              <th className="px-3 py-2 text-center">Taux sal.</th>
              <th className="px-3 py-2 text-right">Sal. (€)</th>
              <th className="px-3 py-2 text-center">Taux pat.</th>
              <th className="px-3 py-2 text-right">Pat. (€)</th>
            </tr>
          </thead>
          <tbody>
            {SECTIONS_ORDER.map(([key, label]) =>
              sections[key]?.length > 0 ? (
                <TableSection
                  key={key}
                  title={label}
                  lignes={sections[key]}
                  colSal={true}
                  colPat={true}
                />
              ) : null
            )}

            {/* Réduction Fillon */}
            {totaux.reductionFillon > 0 && (
              <tr className="bg-green-50">
                <td className="px-3 py-1 text-xs italic text-green-700" colSpan={5}>
                  Allègement général (réduction Fillon)
                </td>
                <td className="px-3 py-1 text-xs text-right font-medium text-green-700">
                  − {euro(totaux.reductionFillon)}
                </td>
              </tr>
            )}

            {/* Totaux */}
            <tr className="bg-gray-800 text-white font-bold">
              <td className="px-3 py-2 text-xs uppercase">Total cotisations</td>
              <td className="px-3 py-2"></td>
              <td className="px-3 py-2"></td>
              <td className="px-3 py-2 text-right">{euro(totaux.totalCotisationsSalariales)}</td>
              <td className="px-3 py-2"></td>
              <td className="px-3 py-2 text-right">{euro(totaux.totalCotisationsPatronales)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── RÉCAPITULATIF ── */}
      <div className="p-4 grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase text-gray-500">Récapitulatif net</div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Salaire brut</span>
            <span className="font-semibold">{euro(totaux.brutMensuel)}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm text-gray-600">– Cotisations salariales</span>
            <span className="text-red-600">− {euro(totaux.totalCotisationsSalariales)}</span>
          </div>
          <div className="flex justify-between border-b pb-1 font-semibold">
            <span>NET AVANT IMPÔT</span>
            <span>{euro(totaux.netAvantPAS)}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm text-gray-600">
              – Prélèvement à la source ({totaux.tauxPAS} %)
            </span>
            <span className="text-red-600">− {euro(totaux.montantPAS)}</span>
          </div>
          <div className="flex justify-between bg-blue-800 text-white px-3 py-2 rounded font-bold text-base">
            <span>NET À PAYER</span>
            <span>{euro(totaux.netAPayer)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase text-gray-500">Coût employeur</div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Salaire brut</span>
            <span className="font-semibold">{euro(totaux.brutMensuel)}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm text-gray-600">+ Cotisations patronales</span>
            <span>{euro(totaux.totalCotisationsPatronales)}</span>
          </div>
          {totaux.reductionFillon > 0 && (
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm text-green-700">– Réduction Fillon</span>
              <span className="text-green-700">− {euro(totaux.reductionFillon)}</span>
            </div>
          )}
          <div className="flex justify-between bg-gray-700 text-white px-3 py-2 rounded font-bold text-base">
            <span>COÛT TOTAL EMPLOYEUR</span>
            <span>{euro(totaux.coutEmployeur)}</span>
          </div>
        </div>
      </div>

      {/* ── MENTION LÉGALE ── */}
      <div className="bg-gray-100 border-t px-4 py-2 text-xs text-gray-500">
        Conformément à l'article L.3243-2 du Code du travail. Ce bulletin doit être conservé sans limitation de durée (DSN / DADS). Période : {periode}.
      </div>
    </div>
  );
}
