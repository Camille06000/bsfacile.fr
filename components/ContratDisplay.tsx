'use client';
import type { ContratData } from './ContratForm';

const fmtDate = (d: string) => {
  if (!d) return '_______________';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
};

const fmtEuro = (n: string) =>
  n ? new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(parseFloat(n)) + '\u00a0€' : '_______________';

const DUREES_ESSAI: Record<string, string> = {
  '1 mois': '1 (un) mois',
  '2 mois': '2 (deux) mois',
  '3 mois': '3 (trois) mois',
  '4 mois': '4 (quatre) mois',
  '1 semaine': '1 (une) semaine',
  '2 semaines': '2 (deux) semaines',
};

export default function ContratDisplay({ data }: { data: ContratData }) {
  const isCDD = data.typeContrat === 'CDD';
  const isApp = data.typeContrat === 'Apprentissage';
  const isStage = data.typeContrat === 'Stage';
  const isCDI = data.typeContrat === 'CDI';

  const heuresAnnuelles = parseFloat(data.heuresSemaine || '35') * 52;
  const tauxH = data.tauxHoraire ||
    (data.salaireBrut && data.heuresSemaine
      ? (parseFloat(data.salaireBrut) / (parseFloat(data.heuresSemaine) * 52 / 12)).toFixed(4)
      : '');

  const titre = isApp ? 'CONTRAT D\'APPRENTISSAGE'
    : isStage ? 'CONVENTION DE STAGE'
    : isCDD ? 'CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE'
    : 'CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE';

  const s = {
    page: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '11px',
      lineHeight: '1.6',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      padding: '40px 50px',
      maxWidth: '800px',
      margin: '0 auto',
    } as React.CSSProperties,
    titre: {
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      marginBottom: '6px',
      color: '#1a3a5c',
    },
    sousTitre: {
      fontSize: '12px',
      textAlign: 'center' as const,
      color: '#666',
      marginBottom: '30px',
    },
    h2: {
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase' as const,
      color: '#1a3a5c',
      borderBottom: '1.5px solid #1a3a5c',
      paddingBottom: '3px',
      marginTop: '22px',
      marginBottom: '10px',
      letterSpacing: '0.5px',
    },
    p: {
      marginBottom: '8px',
      textAlign: 'justify' as const,
    },
    parties: {
      display: 'flex',
      gap: '30px',
      marginBottom: '20px',
    },
    bloc: {
      flex: 1,
      backgroundColor: '#f7f9fc',
      border: '1px solid #d0dce8',
      borderRadius: '4px',
      padding: '12px',
      fontSize: '10px',
    } as React.CSSProperties,
    blocTitle: {
      fontWeight: 'bold',
      fontSize: '11px',
      color: '#1a3a5c',
      marginBottom: '6px',
      textTransform: 'uppercase' as const,
    },
    row: { marginBottom: '3px' },
    label: { color: '#666', marginRight: '4px' },
    sig: {
      display: 'flex',
      gap: '30px',
      marginTop: '50px',
    },
    sigBloc: {
      flex: 1,
      borderTop: '1px solid #555',
      paddingTop: '8px',
      fontSize: '10px',
      color: '#555',
    },
  };

  return (
    <div id="contrat-pdf" className="bulletin-print shadow-lg" style={s.page}>

      {/* ══ EN-TÊTE ══ */}
      <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #1a3a5c', paddingBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a3a5c', marginBottom: '4px' }}>
          {data.employeurNom || 'NOM DE L\'ENTREPRISE'}
        </div>
        {data.employeurAdresse && <div style={{ fontSize: '10px', color: '#666' }}>{data.employeurAdresse}</div>}
        {data.employeurSiret && <div style={{ fontSize: '10px', color: '#666' }}>SIRET : {data.employeurSiret}</div>}
      </div>

      <div style={s.titre}>{titre}</div>
      {isApp && <div style={s.sousTitre}>En application des articles L6221-1 et suivants du Code du travail</div>}
      {isCDD && data.motifCDD && <div style={s.sousTitre}>Motif : {data.motifCDD}</div>}

      {/* ══ PARTIES ══ */}
      <div style={s.parties}>
        {/* Employeur */}
        <div style={s.bloc}>
          <div style={s.blocTitle}>L&apos;Employeur</div>
          <div style={s.row}><span style={s.label}>Société :</span><strong>{data.employeurNom}</strong></div>
          {data.employeurAdresse && <div style={s.row}><span style={s.label}>Adresse :</span>{data.employeurAdresse}</div>}
          {data.employeurSiret   && <div style={s.row}><span style={s.label}>SIRET :</span>{data.employeurSiret}</div>}
          {data.employeurNaf     && <div style={s.row}><span style={s.label}>Code NAF :</span>{data.employeurNaf}</div>}
          {data.employeurConvention && <div style={s.row}><span style={s.label}>Convention :</span>{data.employeurConvention}</div>}
          {data.employeurRepresentant && (
            <div style={s.row}><span style={s.label}>Représenté par :</span><strong>{data.employeurRepresentant}</strong>, {data.employeurQualiteRep}</div>
          )}
          <div style={{ marginTop: '6px', fontSize: '9px', color: '#888' }}>ci-après dénommé « l&apos;Employeur »</div>
        </div>

        {/* Salarié */}
        <div style={s.bloc}>
          <div style={s.blocTitle}>{isStage ? 'Le/La Stagiaire' : isApp ? 'L\'Apprenti(e)' : 'Le/La Salarié(e)'}</div>
          <div style={s.row}><span style={s.label}>Nom :</span><strong>{data.salariéNom} {data.salariéPrenom}</strong></div>
          {data.salariéNaissance  && <div style={s.row}><span style={s.label}>Né(e) le :</span>{fmtDate(data.salariéNaissance)}</div>}
          {data.salariéNationalite && <div style={s.row}><span style={s.label}>Nationalité :</span>{data.salariéNationalite}</div>}
          {data.salariéAdresse    && <div style={s.row}><span style={s.label}>Adresse :</span>{data.salariéAdresse}</div>}
          {data.salariéNss        && <div style={s.row}><span style={s.label}>N° SS :</span><span style={{ fontFamily: 'monospace' }}>{data.salariéNss}</span></div>}
          {isApp && data.diplome  && <div style={s.row}><span style={s.label}>Diplôme préparé :</span>{data.diplome}</div>}
          <div style={{ marginTop: '6px', fontSize: '9px', color: '#888' }}>ci-après dénommé(e) « le/la Salarié(e) »</div>
        </div>
      </div>

      <p style={s.p}>Il a été convenu et arrêté ce qui suit :</p>

      {/* ══ ARTICLE 1 — ENGAGEMENT ══ */}
      <div style={s.h2}>Article 1 — Engagement</div>
      <p style={s.p}>
        {isCDI && `La société ${data.employeurNom || '___'} engage ${data.salariéPrenom} ${data.salariéNom} en qualité de ${data.intitulePoste || '_______________'} à compter du ${fmtDate(data.dateDebut)}, pour une durée indéterminée.`}
        {isCDD && `La société ${data.employeurNom || '___'} engage ${data.salariéPrenom} ${data.salariéNom} en qualité de ${data.intitulePoste || '_______________'} à compter du ${fmtDate(data.dateDebut)} jusqu'au ${fmtDate(data.dateFin)}, pour le motif suivant : ${data.motifCDD || '_______________'}.`}
        {isApp && `La société ${data.employeurNom || '___'} conclut un contrat d'apprentissage avec ${data.salariéPrenom} ${data.salariéNom} en vue de préparer le diplôme : ${data.diplome || '_______________'}, du ${fmtDate(data.dateDebut)} au ${fmtDate(data.dateFin)}.`}
        {isStage && `La société ${data.employeurNom || '___'} accueille ${data.salariéPrenom} ${data.salariéNom} en stage pour la période du ${fmtDate(data.dateDebut)} au ${fmtDate(data.dateFin)}.`}
      </p>

      {/* ══ ARTICLE 2 — FONCTIONS ══ */}
      <div style={s.h2}>Article 2 — Fonctions et lieu de travail</div>
      <p style={s.p}>
        {data.salariéPrenom} {data.salariéNom} est engagé(e) en qualité de <strong>{data.intitulePoste || '_______________'}</strong>
        {data.classification ? `, classification ${data.classification}` : ''}
        {data.coefficient ? `, coefficient ${data.coefficient}` : ''}
        . Ses fonctions s&apos;exercent principalement à <strong>{data.lieuTravail || '_______________'}</strong>.
      </p>
      {!isStage && (
        <p style={s.p}>
          {data.salariéPrenom} {data.salariéNom} exercera ses fonctions avec diligence et loyauté. Il/Elle se conformera aux instructions de la hiérarchie et au règlement intérieur de l&apos;entreprise.
        </p>
      )}
      {isApp && data.maitreApprentissage && (
        <p style={s.p}>
          Le maître d&apos;apprentissage désigné est : <strong>{data.maitreApprentissage}</strong>.
          {data.cfa && ` L'apprenti(e) suivra sa formation au CFA : ${data.cfa}.`}
        </p>
      )}

      {/* ══ ARTICLE 3 — PÉRIODE D'ESSAI ══ */}
      {data.periodEssai && !isStage && (
        <>
          <div style={s.h2}>Article 3 — Période d&apos;essai</div>
          <p style={s.p}>
            Le présent contrat est soumis à une période d&apos;essai de <strong>{DUREES_ESSAI[data.periodEssai] || data.periodEssai}</strong> à compter de la date d&apos;entrée dans la société.
            {data.renouvellement && ' Cette période d\'essai pourra être renouvelée une fois, avec accord écrit du salarié.'}
          </p>
          <p style={s.p}>
            Durant cette période, chacune des parties pourra mettre fin au contrat sous réserve du respect des délais de prévenance légaux.
          </p>
        </>
      )}

      {/* ══ ARTICLE 4 — DURÉE DU TRAVAIL ══ */}
      <div style={s.h2}>Article {data.periodEssai && !isStage ? '4' : '3'} — Durée du travail</div>
      <p style={s.p}>
        {data.salariéPrenom} {data.salariéNom} est engagé(e) à <strong>temps {data.typeTemps}</strong> pour une durée hebdomadaire de <strong>{data.heuresSemaine || '35'} heures</strong>
        {data.repartitionHeures ? `, réparties ${data.repartitionHeures}` : ''}.
        La durée annuelle est de {heuresAnnuelles.toFixed(0)} heures.
      </p>
      {data.typeTemps === 'partiel' && (
        <p style={s.p}>
          Conformément à l&apos;article L3123-6 du Code du travail, la répartition des horaires est fixée au contrat et ne pourra être modifiée qu&apos;avec l&apos;accord écrit du/de la salarié(e).
        </p>
      )}

      {/* ══ ARTICLE 5 — RÉMUNÉRATION ══ */}
      {!isStage && (
        <>
          <div style={s.h2}>Article {data.periodEssai ? '5' : '4'} — Rémunération</div>
          <p style={s.p}>
            En contrepartie de son travail, {data.salariéPrenom} {data.salariéNom} percevra une rémunération brute mensuelle de <strong>{fmtEuro(data.salaireBrut)}</strong>
            {tauxH ? ` (soit ${parseFloat(tauxH).toFixed(4)}\u00a0€ brut de l'heure)` : ''}.
          </p>
          {data.primes && (
            <p style={s.p}>
              En complément : {data.primes}.
            </p>
          )}
          {data.avantages && (
            <p style={s.p}>
              Avantages et bénéfices : {data.avantages}.
            </p>
          )}
          <p style={s.p}>
            La rémunération est versée mensuellement par virement bancaire, accompagnée d&apos;un bulletin de paie.
            Elle sera révisée en fonction des augmentations générales et/ou individuelles décidées dans l&apos;entreprise, conformément à la convention collective applicable.
          </p>
        </>
      )}

      {/* ══ ARTICLE — CONGÉS PAYÉS ══ */}
      {!isStage && (
        <>
          <div style={s.h2}>Article — Congés payés</div>
          <p style={s.p}>
            {data.salariéPrenom} {data.salariéNom} bénéficie des congés payés prévus par la loi, soit 2,5 jours ouvrables par mois de travail effectif, dans la limite de 30 jours ouvrables par an (5 semaines).
          </p>
        </>
      )}

      {/* ══ CLAUSES OPTIONNELLES ══ */}
      {data.clauseConfidentialite && (
        <>
          <div style={s.h2}>Clause de confidentialité</div>
          <p style={s.p}>
            {data.salariéPrenom} {data.salariéNom} s&apos;engage à ne divulguer à aucun tiers, pendant la durée du contrat et après sa rupture, les informations confidentielles relatives à l&apos;entreprise, à ses clients, procédés, méthodes ou projets dont il/elle aurait eu connaissance dans l&apos;exercice de ses fonctions.
          </p>
        </>
      )}

      {data.clauseNonConcurrence && (
        <>
          <div style={s.h2}>Clause de non-concurrence</div>
          <p style={s.p}>
            En raison de la nature des fonctions de {data.salariéPrenom} {data.salariéNom} et pour protéger les intérêts légitimes de l&apos;entreprise, il/elle s&apos;interdit, pendant une durée de 2 ans à compter de la rupture du contrat, d&apos;exercer une activité concurrente à celle de l&apos;employeur.
            En contrepartie de cette obligation, {data.salariéPrenom} {data.salariéNom} percevra une indemnité mensuelle de non-concurrence égale à 30% de la rémunération brute mensuelle moyenne des 12 derniers mois.
          </p>
        </>
      )}

      {data.clauseMobilite && (
        <>
          <div style={s.h2}>Clause de mobilité géographique</div>
          <p style={s.p}>
            En raison des nécessités du service, {data.salariéPrenom} {data.salariéNom} accepte d&apos;être muté(e) dans tout établissement de la société situé dans la zone géographique suivante : <strong>{data.mobiliteZone || '_______________'}</strong>. Cette mutation ne constituera pas une modification substantielle du contrat de travail.
          </p>
        </>
      )}

      {/* ══ NOTES / CLAUSES PARTICULIÈRES ══ */}
      {data.notes && (
        <>
          <div style={s.h2}>Dispositions particulières</div>
          <p style={s.p}>{data.notes}</p>
        </>
      )}

      {/* ══ CONVENTION COLLECTIVE ══ */}
      {data.employeurConvention && (
        <>
          <div style={s.h2}>Convention collective</div>
          <p style={s.p}>
            Le présent contrat est soumis à la convention collective : <strong>{data.employeurConvention}</strong>. Les dispositions de cette convention sont applicables dans tous les cas où elles sont plus favorables que la loi.
          </p>
        </>
      )}

      {/* ══ LITIGES ══ */}
      <div style={s.h2}>Juridiction compétente</div>
      <p style={s.p}>
        Tout litige relatif à l&apos;exécution ou la rupture du présent contrat sera soumis au Conseil de Prud&apos;hommes territorialement compétent.
      </p>

      {/* ══ SIGNATURES ══ */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <p style={{ ...s.p, marginBottom: '6px' }}>
          Fait en deux exemplaires originaux, dont un remis à chaque partie,
          le ___________________________
          {data.lieuTravail ? ` à ${data.lieuTravail.split(',')[0]}` : ''}.
        </p>
        <p style={{ fontSize: '10px', color: '#666', marginBottom: '20px' }}>
          (Faire précéder la signature de la mention manuscrite « Lu et approuvé »)
        </p>

        <div style={s.sig}>
          <div style={s.sigBloc}>
            <div><strong>L&apos;Employeur</strong></div>
            <div style={{ marginTop: '2px' }}>{data.employeurRepresentant && `${data.employeurRepresentant}, ${data.employeurQualiteRep}`}</div>
            <div style={{ marginTop: '2px' }}>{data.employeurNom}</div>
            <div style={{ marginTop: '30px', fontSize: '9px', color: '#aaa' }}>Signature et cachet</div>
          </div>
          <div style={s.sigBloc}>
            <div><strong>{isStage ? 'Le/La Stagiaire' : isApp ? 'L\'Apprenti(e)' : 'Le/La Salarié(e)'}</strong></div>
            <div style={{ marginTop: '2px' }}>{data.salariéPrenom} {data.salariéNom}</div>
            <div style={{ marginTop: '30px', fontSize: '9px', color: '#aaa' }}>Signature précédée de « Lu et approuvé »</div>
          </div>
        </div>
      </div>

      {/* ══ PIED DE PAGE ══ */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '8px', fontSize: '8px', color: '#aaa', textAlign: 'center' }}>
        Document généré par Bulletin Facile — À titre indicatif uniquement. Consultez un professionnel du droit pour validation.
      </div>

    </div>
  );
}
