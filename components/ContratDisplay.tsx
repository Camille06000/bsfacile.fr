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

  const dateGeneration = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Article numbering
  let artNum = 0;
  const nextArt = () => { artNum += 1; return artNum; };

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
      marginBottom: '4px',
      color: '#1a3a5c',
    },
    sousTitre: {
      fontSize: '11px',
      textAlign: 'center' as const,
      color: '#666',
      marginBottom: '6px',
    },
    conformite: {
      fontSize: '10px',
      textAlign: 'center' as const,
      color: '#888',
      marginBottom: '24px',
      fontStyle: 'italic' as const,
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

  const prenom = data.salariéPrenom;
  const nom = data.salariéNom;
  const fullName = `${prenom} ${nom}`;

  return (
    <div id="contrat-pdf" className="bulletin-print shadow-lg" style={s.page}>

      {/* ══ EN-TÊTE ══ */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #1a3a5c', paddingBottom: '16px' }}>
        {/* Mention Bulletin Facile + date en haut à droite */}
        <div style={{ position: 'absolute', top: 0, right: 0, fontSize: '9px', color: '#aaa', textAlign: 'right' as const }}>
          <div>Bulletin Facile</div>
          <div>Généré le {dateGeneration}</div>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a3a5c', marginBottom: '4px' }}>
          {data.employeurNom || 'NOM DE L\'ENTREPRISE'}
        </div>
        {data.employeurAdresse && <div style={{ fontSize: '10px', color: '#666' }}>{data.employeurAdresse}</div>}
        {data.employeurSiret && <div style={{ fontSize: '10px', color: '#666' }}>SIRET : {data.employeurSiret}</div>}
      </div>

      <div style={s.titre}>{titre}</div>
      {isApp && <div style={s.sousTitre}>En application des articles L6221-1 et suivants du Code du travail</div>}
      {isCDD && data.motifCDD && <div style={s.sousTitre}>Motif : {data.motifCDD}</div>}
      <div style={s.conformite}>Conforme Code du travail — Articles L1221-1 et suivants</div>

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
          <div style={s.row}><span style={s.label}>Nom :</span><strong>{nom} {prenom}</strong></div>
          {data.salariéNaissance  && <div style={s.row}><span style={s.label}>Né(e) le :</span>{fmtDate(data.salariéNaissance)}</div>}
          {data.salariéNationalite && <div style={s.row}><span style={s.label}>Nationalité :</span>{data.salariéNationalite}</div>}
          {data.salariéAdresse    && <div style={s.row}><span style={s.label}>Adresse :</span>{data.salariéAdresse}</div>}
          {data.salariéNss        && <div style={s.row}><span style={s.label}>N° SS :</span><span style={{ fontFamily: 'monospace' }}>{data.salariéNss}</span></div>}
          {isApp && data.diplome  && <div style={s.row}><span style={s.label}>Diplôme préparé :</span>{data.diplome}</div>}
          <div style={{ marginTop: '6px', fontSize: '9px', color: '#888' }}>ci-après dénommé(e) « le/la Salarié(e) »</div>
        </div>
      </div>

      <p style={s.p}>Il a été convenu et arrêté ce qui suit :</p>

      {/* ══ ARTICLE — ENGAGEMENT ══ */}
      <div style={s.h2}>Article {nextArt()} — Engagement</div>
      <p style={s.p}>
        {isCDI && `La société ${data.employeurNom || '___'} engage ${fullName} en qualité de ${data.intitulePoste || '_______________'} à compter du ${fmtDate(data.dateDebut)}, pour une durée indéterminée.`}
        {isCDD && `La société ${data.employeurNom || '___'} engage ${fullName} en qualité de ${data.intitulePoste || '_______________'} à compter du ${fmtDate(data.dateDebut)} jusqu'au ${fmtDate(data.dateFin)}, pour le motif suivant : ${data.motifCDD || '_______________'}.`}
        {isApp && `La société ${data.employeurNom || '___'} conclut un contrat d'apprentissage avec ${fullName} en vue de préparer le diplôme : ${data.diplome || '_______________'}, du ${fmtDate(data.dateDebut)} au ${fmtDate(data.dateFin)}.`}
        {isStage && `La société ${data.employeurNom || '___'} accueille ${fullName} en stage pour la période du ${fmtDate(data.dateDebut)} au ${fmtDate(data.dateFin)}.`}
      </p>

      {/* ══ ARTICLE — FONCTIONS ══ */}
      <div style={s.h2}>Article {nextArt()} — Fonctions et lieu de travail</div>
      <p style={s.p}>
        {fullName} est engagé(e) en qualité de <strong>{data.intitulePoste || '_______________'}</strong>
        {data.classification ? `, classification ${data.classification}` : ''}
        {data.coefficient ? `, coefficient ${data.coefficient}` : ''}
        . Ses fonctions s&apos;exercent principalement à <strong>{data.lieuTravail || '_______________'}</strong>.
      </p>
      {!isStage && (
        <p style={s.p}>
          {fullName} exercera ses fonctions avec diligence et loyauté. Il/Elle se conformera aux instructions de la hiérarchie et au règlement intérieur de l&apos;entreprise.
        </p>
      )}
      {isApp && data.maitreApprentissage && (
        <p style={s.p}>
          Le maître d&apos;apprentissage désigné est : <strong>{data.maitreApprentissage}</strong>.
          {data.cfa && ` L'apprenti(e) suivra sa formation au CFA : ${data.cfa}.`}
        </p>
      )}

      {/* ══ ARTICLE — PÉRIODE D'ESSAI ══ */}
      {data.periodEssai && !isStage && (
        <>
          <div style={s.h2}>Article {nextArt()} — Période d&apos;essai</div>
          <p style={s.p}>
            Le présent contrat est soumis à une période d&apos;essai de <strong>{DUREES_ESSAI[data.periodEssai] || data.periodEssai}</strong> à compter de la date d&apos;entrée dans la société.
            {data.renouvellement && ' Cette période d\'essai pourra être renouvelée une fois, avec accord écrit du salarié.'}
          </p>
          <p style={s.p}>
            Durant cette période, chacune des parties pourra mettre fin au contrat sous réserve du respect des délais de prévenance légaux.
          </p>
        </>
      )}

      {/* ══ ARTICLE — DURÉE DU TRAVAIL ══ */}
      <div style={s.h2}>Article {nextArt()} — Durée du travail</div>
      {data.forfaitJours ? (
        <p style={s.p}>
          En sa qualité de cadre, {fullName} est soumis(e) à un forfait annuel en jours de <strong>{data.forfaitJoursNb || '218'} jours</strong> travaillés par an, conformément aux articles L3121-53 et suivants du Code du travail et à la convention collective applicable.
        </p>
      ) : (
        <>
          <p style={s.p}>
            {fullName} est engagé(e) à <strong>temps {data.typeTemps}</strong> pour une durée hebdomadaire de <strong>{data.heuresSemaine || '35'} heures</strong>
            {data.repartitionHeures ? `, réparties ${data.repartitionHeures}` : ''}.
            La durée annuelle est de {heuresAnnuelles.toFixed(0)} heures.
          </p>
          {data.typeTemps === 'partiel' && (
            <p style={s.p}>
              Conformément à l&apos;article L3123-6 du Code du travail, la répartition des horaires est fixée au contrat et ne pourra être modifiée qu&apos;avec l&apos;accord écrit du/de la salarié(e).
            </p>
          )}
        </>
      )}

      {/* ══ ARTICLE — TÉLÉTRAVAIL ══ */}
      {data.teletravail && (
        <>
          <div style={s.h2}>Article {nextArt()} — Télétravail</div>
          <p style={s.p}>
            {fullName} bénéficie du télétravail à raison de <strong>{data.teletravailJours || '___'} jour(s) par semaine</strong>, conformément à l&apos;accord de télétravail en vigueur dans l&apos;entreprise et aux articles L1222-9 et suivants du Code du travail. Les modalités pratiques (plages horaires, équipements, frais) sont définies dans la charte de télétravail.
          </p>
        </>
      )}

      {/* ══ ARTICLE — RÉMUNÉRATION ══ */}
      {!isStage && (
        <>
          <div style={s.h2}>Article {nextArt()} — Rémunération</div>
          <p style={s.p}>
            En contrepartie de son travail, {fullName} percevra une rémunération brute mensuelle de <strong>{fmtEuro(data.salaireBrut)}</strong>
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
          <div style={s.h2}>Article {nextArt()} — Congés payés</div>
          <p style={s.p}>
            {fullName} bénéficie des congés payés prévus par la loi, soit 2,5 jours ouvrables par mois de travail effectif, dans la limite de 30 jours ouvrables par an (5 semaines).
          </p>
        </>
      )}

      {/* ══ ARTICLE — MUTUELLE ET PRÉVOYANCE ══ */}
      {data.mutuelle && !isStage && (
        <>
          <div style={s.h2}>Article {nextArt()} — Mutuelle et prévoyance</div>
          <p style={s.p}>
            {fullName} est tenu(e) d&apos;adhérer au régime collectif de mutuelle santé et de prévoyance mis en place dans l&apos;entreprise, à compter de son entrée en fonction. La part patronale est prise en charge à hauteur d&apos;au moins 50% de la cotisation, conformément à la loi ANI du 14 juin 2013.
          </p>
        </>
      )}

      {/* ══ ARTICLE — MATÉRIELS ET FRAIS PROFESSIONNELS ══ */}
      <div style={s.h2}>Article {nextArt()} — Matériels et frais professionnels</div>
      <p style={s.p}>
        L&apos;employeur met à disposition de {fullName} le matériel nécessaire à l&apos;exercice de ses fonctions. Tout matériel confié reste la propriété de l&apos;entreprise et doit être restitué à la fin du contrat. Les frais engagés dans le cadre professionnel sont remboursés sur présentation de justificatifs, conformément à la politique de remboursement de frais de l&apos;entreprise.
      </p>

      {/* ══ CLAUSES OPTIONNELLES ══ */}
      {data.clauseConfidentialite && (
        <>
          <div style={s.h2}>Article {nextArt()} — Clause de confidentialité</div>
          <p style={s.p}>
            {fullName} s&apos;engage à ne divulguer à aucun tiers, pendant la durée du contrat et après sa rupture, les informations confidentielles relatives à l&apos;entreprise, à ses clients, procédés, méthodes ou projets dont il/elle aurait eu connaissance dans l&apos;exercice de ses fonctions.
          </p>
        </>
      )}

      {data.clauseNonConcurrence && (
        <>
          <div style={s.h2}>Article {nextArt()} — Clause de non-concurrence</div>
          <p style={s.p}>
            En raison de la nature des fonctions de {fullName} et pour protéger les intérêts légitimes de l&apos;entreprise, il/elle s&apos;interdit, pendant une durée de 2 ans à compter de la rupture du contrat, d&apos;exercer une activité concurrente à celle de l&apos;employeur.
            En contrepartie de cette obligation, {fullName} percevra une indemnité mensuelle de non-concurrence égale à 30% de la rémunération brute mensuelle moyenne des 12 derniers mois.
          </p>
        </>
      )}

      {data.clauseMobilite && (
        <>
          <div style={s.h2}>Article {nextArt()} — Clause de mobilité géographique</div>
          <p style={s.p}>
            En raison des nécessités du service, {fullName} accepte d&apos;être muté(e) dans tout établissement de la société situé dans la zone géographique suivante : <strong>{data.mobiliteZone || '_______________'}</strong>. Cette mutation ne constituera pas une modification substantielle du contrat de travail.
          </p>
        </>
      )}

      {/* ══ ARTICLE — PROTECTION DES DONNÉES (RGPD) ══ */}
      <div style={s.h2}>Article {nextArt()} — Protection des données personnelles (RGPD)</div>
      <p style={s.p}>
        Dans le cadre de la relation de travail, l&apos;employeur est amené à collecter et traiter des données personnelles de {fullName} (identité, coordonnées, données de paie, données de santé pour la gestion des arrêts maladie). Ces traitements sont effectués conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés. {fullName} dispose d&apos;un droit d&apos;accès, de rectification et d&apos;effacement de ses données auprès du responsable de traitement.
      </p>

      {/* ══ NOTES / CLAUSES PARTICULIÈRES ══ */}
      {data.notes && (
        <>
          <div style={s.h2}>Article {nextArt()} — Dispositions particulières</div>
          <p style={s.p}>{data.notes}</p>
        </>
      )}

      {/* ══ CONVENTION COLLECTIVE ══ */}
      {data.employeurConvention && (
        <>
          <div style={s.h2}>Article {nextArt()} — Convention collective</div>
          <p style={s.p}>
            Le présent contrat est soumis à la convention collective : <strong>{data.employeurConvention}</strong>. Les dispositions de cette convention sont applicables dans tous les cas où elles sont plus favorables que la loi.
          </p>
        </>
      )}

      {/* ══ LITIGES ══ */}
      <div style={s.h2}>Article {nextArt()} — Juridiction compétente</div>
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
            <div style={{ marginTop: '2px' }}>{prenom} {nom}</div>
            <div style={{ marginTop: '30px', fontSize: '9px', color: '#aaa' }}>Signature précédée de « Lu et approuvé »</div>
          </div>
        </div>
      </div>

      {/* ══ PIED DE PAGE ══ */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '8px', fontSize: '8px', color: '#aaa', display: 'flex', justifyContent: 'space-between' as const }}>
        <span>Bulletins Facile — bulletinfacile.fr</span>
        <span>Contrat conforme Code du travail 2025</span>
        <span>Page 1/1 — Document indicatif</span>
      </div>

    </div>
  );
}
