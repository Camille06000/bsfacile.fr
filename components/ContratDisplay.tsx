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

export default function ContratDisplay({ data, isPaid }: { data: ContratData; isPaid?: boolean }) {
  const isCDD = data.typeContrat === 'CDD';
  const isApp = data.typeContrat === 'Apprentissage';
  const isStage = data.typeContrat === 'Stage';
  const isCDI = data.typeContrat === 'CDI';

  const heuresAnnuelles = parseFloat(data.heuresSemaine || '35') * 52;
  const tauxH = data.tauxHoraire ||
    (data.salaireBrut && data.heuresSemaine
      ? (parseFloat(data.salaireBrut) / (parseFloat(data.heuresSemaine) * 52 / 12)).toFixed(4)
      : '');

  const titre = isApp ? "CONTRAT D'APPRENTISSAGE"
    : isStage ? 'CONVENTION DE STAGE'
    : isCDD ? 'CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE'
    : 'CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE';

  const dateGeneration = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  let artNum = 0;
  const nextArt = () => { artNum += 1; return artNum; };

  const prenom = data.salariéPrenom;
  const nom = data.salariéNom;
  const fullName = `${prenom} ${nom}`;

  const page: React.CSSProperties = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '11.5px',
    lineHeight: '1.65',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    maxWidth: '820px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  };

  const p: React.CSSProperties = { marginBottom: '9px', textAlign: 'justify' };

  const articleTitle = (text: string): React.CSSProperties => ({
    fontSize: '11.5px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1a3a5c',
    backgroundColor: '#eef3f8',
    borderLeft: '3px solid #1a3a5c',
    padding: '6px 10px',
    marginTop: '22px',
    marginBottom: '8px',
    letterSpacing: '0.3px',
  });

  const blocPartie: React.CSSProperties = {
    flex: 1,
    backgroundColor: '#f7f9fc',
    borderLeft: '3px solid #1a3a5c',
    borderRadius: '4px',
    padding: '14px 16px',
    fontSize: '11px',
  };

  const blocTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '11.5px',
    color: '#1a3a5c',
    textTransform: 'uppercase',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  };

  const row: React.CSSProperties = { marginBottom: '4px' };
  const label: React.CSSProperties = { color: '#555', marginRight: '4px' };

  return (
    <div id="contrat-pdf" className="bulletin-print shadow-lg" style={page}>

      {/* WATERMARK — visible only when not paid */}
      {!isPaid && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          overflow: 'hidden',
        }}>
          {/* Diagonal watermark tiles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${(i % 4) * 25}%`,
              left: `${Math.floor(i / 4) * 33}%`,
              transform: 'rotate(-35deg)',
              fontSize: '22px',
              fontWeight: 900,
              color: '#1a3a5c',
              opacity: 0.12,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              letterSpacing: '2px',
            }}>
              APERÇU — NON PAYÉ
            </div>
          ))}
        </div>
      )}

      {/* ══ BARRE EN-TÊTE ══ */}
      <div style={{
        backgroundColor: '#1a3a5c',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 24px',
        fontSize: '11px',
      }}>
        <span style={{ opacity: 0.8 }}>Généré le {dateGeneration}</span>
        <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>BULLETIN FACILE</span>
      </div>

      {/* ══ INFO ENTREPRISE ══ */}
      <div style={{ padding: '16px 24px 10px', borderBottom: '1px solid #d0dce8' }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#1a1a1a', marginBottom: '3px' }}>
          {data.employeurNom || "NOM DE L'ENTREPRISE"}
        </div>
        {data.employeurAdresse && (
          <div style={{ fontSize: '11px', color: '#555' }}>{data.employeurAdresse}</div>
        )}
        <div style={{ fontSize: '10.5px', color: '#777', marginTop: '2px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {data.employeurSiret && <span>SIRET : {data.employeurSiret}</span>}
          {data.employeurNaf && <span>NAF : {data.employeurNaf}</span>}
        </div>
      </div>

      {/* ══ TITRE CONTRAT ══ */}
      <div style={{ padding: '18px 24px 4px', textAlign: 'center' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1a3a5c', marginBottom: '4px' }}>
          {titre}
        </div>
        {isApp && (
          <div style={{ fontSize: '10.5px', color: '#666' }}>En application des articles L6221-1 et suivants du Code du travail</div>
        )}
        {isCDD && data.motifCDD && (
          <div style={{ fontSize: '10.5px', color: '#666' }}>Motif : {data.motifCDD}</div>
        )}
        <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic', marginTop: '3px' }}>
          Conforme Code du travail — Articles L1221-1 et suivants — 2026
        </div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>

        {/* ══ PARTIES ══ */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', marginBottom: '16px' }}>
          {/* Employeur */}
          <div style={blocPartie}>
            <div style={blocTitleStyle}>L&apos;Employeur</div>
            <div style={row}><span style={label}>Société :</span><strong>{data.employeurNom || '___'}</strong></div>
            {data.employeurAdresse && <div style={row}><span style={label}>Adresse :</span>{data.employeurAdresse}</div>}
            {data.employeurSiret && <div style={row}><span style={label}>SIRET :</span>{data.employeurSiret}</div>}
            {data.employeurNaf && <div style={row}><span style={label}>Code NAF :</span>{data.employeurNaf}</div>}
            {data.employeurConvention && <div style={row}><span style={label}>Convention :</span>{data.employeurConvention}</div>}
            {data.employeurRepresentant && (
              <div style={row}>
                <span style={label}>Représenté par :</span>
                <strong>{data.employeurRepresentant}</strong>
                {data.employeurQualiteRep && `, ${data.employeurQualiteRep}`}
              </div>
            )}
            <div style={{ marginTop: '8px', fontSize: '9.5px', color: '#888', fontStyle: 'italic' }}>ci-après dénommé « l&apos;Employeur »</div>
          </div>

          {/* Salarié */}
          <div style={blocPartie}>
            <div style={blocTitleStyle}>{isStage ? 'Le/La Stagiaire' : isApp ? "L'Apprenti(e)" : 'Le/La Salarié(e)'}</div>
            <div style={row}><span style={label}>Nom :</span><strong>{nom} {prenom}</strong></div>
            {data.salariéNaissance && <div style={row}><span style={label}>Né(e) le :</span>{fmtDate(data.salariéNaissance)}</div>}
            {data.salariéNationalite && <div style={row}><span style={label}>Nationalité :</span>{data.salariéNationalite}</div>}
            {data.salariéAdresse && <div style={row}><span style={label}>Adresse :</span>{data.salariéAdresse}</div>}
            {data.salariéNss && <div style={row}><span style={label}>N° SS :</span><span style={{ fontFamily: 'monospace' }}>{data.salariéNss}</span></div>}
            {isApp && data.diplome && <div style={row}><span style={label}>Diplôme préparé :</span>{data.diplome}</div>}
            <div style={{ marginTop: '8px', fontSize: '9.5px', color: '#888', fontStyle: 'italic' }}>ci-après dénommé(e) « le/la Salarié(e) »</div>
          </div>
        </div>

        <p style={p}>Il a été convenu et arrêté ce qui suit :</p>

        {/* ══ ARTICLE — ENGAGEMENT ══ */}
        <div style={articleTitle('')}>Article {nextArt()} — Engagement</div>
        <p style={p}>
          {isCDI && `La société ${data.employeurNom || '___'} engage ${fullName} en qualité de ${data.intitulePoste || '_______________'} à compter du ${fmtDate(data.dateDebut)}, pour une durée indéterminée.`}
          {isCDD && `La société ${data.employeurNom || '___'} engage ${fullName} en qualité de ${data.intitulePoste || '_______________'} à compter du ${fmtDate(data.dateDebut)} jusqu'au ${fmtDate(data.dateFin)}, pour le motif suivant : ${data.motifCDD || '_______________'}.`}
          {isApp && `La société ${data.employeurNom || '___'} conclut un contrat d'apprentissage avec ${fullName} en vue de préparer le diplôme : ${data.diplome || '_______________'}, du ${fmtDate(data.dateDebut)} au ${fmtDate(data.dateFin)}.`}
          {isStage && `La société ${data.employeurNom || '___'} accueille ${fullName} en stage pour la période du ${fmtDate(data.dateDebut)} au ${fmtDate(data.dateFin)}.`}
        </p>

        {/* ══ ARTICLE — FONCTIONS ══ */}
        <div style={articleTitle('')}>Article {nextArt()} — Fonctions et lieu de travail</div>
        <p style={p}>
          {fullName} est engagé(e) en qualité de <strong>{data.intitulePoste || '_______________'}</strong>
          {data.classification ? `, classification ${data.classification}` : ''}
          {data.coefficient ? `, coefficient ${data.coefficient}` : ''}
          . Ses fonctions s&apos;exercent principalement à <strong>{data.lieuTravail || '_______________'}</strong>.
        </p>
        {!isStage && (
          <p style={p}>
            {fullName} exercera ses fonctions avec diligence et loyauté. Il/Elle se conformera aux instructions de la hiérarchie et au règlement intérieur de l&apos;entreprise.
          </p>
        )}
        {isApp && data.maitreApprentissage && (
          <p style={p}>
            Le maître d&apos;apprentissage désigné est : <strong>{data.maitreApprentissage}</strong>.
            {data.cfa && ` L'apprenti(e) suivra sa formation au CFA : ${data.cfa}.`}
          </p>
        )}

        {/* ══ ARTICLE — PÉRIODE D'ESSAI ══ */}
        {data.periodEssai && !isStage && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Période d&apos;essai</div>
            <p style={p}>
              Le présent contrat est soumis à une période d&apos;essai de <strong>{DUREES_ESSAI[data.periodEssai] || data.periodEssai}</strong> à compter de la date d&apos;entrée dans la société.
              {data.renouvellement && " Cette période d'essai pourra être renouvelée une fois, avec accord écrit du salarié."}
            </p>
            <p style={p}>
              Durant cette période, chacune des parties pourra mettre fin au contrat sous réserve du respect des délais de prévenance légaux.
            </p>
          </>
        )}

        {/* ══ ARTICLE — DURÉE DU TRAVAIL ══ */}
        <div style={articleTitle('')}>Article {nextArt()} — Durée du travail</div>
        {data.forfaitJours ? (
          <p style={p}>
            En sa qualité de cadre, {fullName} est soumis(e) à un forfait annuel en jours de <strong>{data.forfaitJoursNb || '218'} jours</strong> travaillés par an, conformément aux articles L3121-53 et suivants du Code du travail et à la convention collective applicable.
          </p>
        ) : (
          <>
            <p style={p}>
              {fullName} est engagé(e) à <strong>temps {data.typeTemps}</strong> pour une durée hebdomadaire de <strong>{data.heuresSemaine || '35'} heures</strong>
              {data.repartitionHeures ? `, réparties ${data.repartitionHeures}` : ''}.
              La durée annuelle est de {heuresAnnuelles.toFixed(0)} heures.
            </p>
            {data.typeTemps === 'partiel' && (
              <p style={p}>
                Conformément à l&apos;article L3123-6 du Code du travail, la répartition des horaires est fixée au contrat et ne pourra être modifiée qu&apos;avec l&apos;accord écrit du/de la salarié(e).
              </p>
            )}
          </>
        )}

        {/* ══ ARTICLE — TÉLÉTRAVAIL ══ */}
        {data.teletravail && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Télétravail</div>
            <p style={p}>
              {fullName} bénéficie du télétravail à raison de <strong>{data.teletravailJours || '___'} jour(s) par semaine</strong>, conformément à l&apos;accord de télétravail en vigueur dans l&apos;entreprise et aux articles L1222-9 et suivants du Code du travail. Les modalités pratiques (plages horaires, équipements, frais) sont définies dans la charte de télétravail.
            </p>
          </>
        )}

        {/* ══ ARTICLE — RÉMUNÉRATION ══ */}
        {!isStage && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Rémunération</div>
            <p style={p}>
              En contrepartie de son travail, {fullName} percevra une rémunération brute mensuelle de <strong>{fmtEuro(data.salaireBrut)}</strong>
              {tauxH ? ` (soit ${parseFloat(tauxH).toFixed(4)}\u00a0€ brut de l'heure)` : ''}.
            </p>
            {data.primes && <p style={p}>En complément : {data.primes}.</p>}
            {data.avantages && <p style={p}>Avantages et bénéfices : {data.avantages}.</p>}
            <p style={p}>
              La rémunération est versée mensuellement par virement bancaire, accompagnée d&apos;un bulletin de paie. Elle sera révisée en fonction des augmentations générales et/ou individuelles décidées dans l&apos;entreprise, conformément à la convention collective applicable.
            </p>
          </>
        )}

        {/* ══ ARTICLE — CONGÉS PAYÉS ══ */}
        {!isStage && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Congés payés</div>
            <p style={p}>
              {fullName} bénéficie des congés payés prévus par la loi, soit 2,5 jours ouvrables par mois de travail effectif, dans la limite de 30 jours ouvrables par an (5 semaines).
            </p>
          </>
        )}

        {/* ══ ARTICLE — MUTUELLE ET PRÉVOYANCE ══ */}
        {data.mutuelle && !isStage && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Mutuelle et prévoyance</div>
            <p style={p}>
              {fullName} est tenu(e) d&apos;adhérer au régime collectif de mutuelle santé et de prévoyance mis en place dans l&apos;entreprise, à compter de son entrée en fonction. La part patronale est prise en charge à hauteur d&apos;au moins 50% de la cotisation, conformément à la loi ANI du 14 juin 2013.
            </p>
          </>
        )}

        {/* ══ ARTICLE — MATÉRIELS ET FRAIS PROFESSIONNELS ══ */}
        <div style={articleTitle('')}>Article {nextArt()} — Matériels et frais professionnels</div>
        <p style={p}>
          L&apos;employeur met à disposition de {fullName} le matériel nécessaire à l&apos;exercice de ses fonctions. Tout matériel confié reste la propriété de l&apos;entreprise et doit être restitué à la fin du contrat. Les frais engagés dans le cadre professionnel sont remboursés sur présentation de justificatifs, conformément à la politique de remboursement de frais de l&apos;entreprise.
        </p>

        {/* ══ CLAUSES OPTIONNELLES ══ */}
        {data.clauseConfidentialite && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Clause de confidentialité</div>
            <p style={p}>
              {fullName} s&apos;engage à ne divulguer à aucun tiers, pendant la durée du contrat et après sa rupture, les informations confidentielles relatives à l&apos;entreprise, à ses clients, procédés, méthodes ou projets dont il/elle aurait eu connaissance dans l&apos;exercice de ses fonctions.
            </p>
          </>
        )}

        {data.clauseNonConcurrence && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Clause de non-concurrence</div>
            <p style={p}>
              En raison de la nature des fonctions de {fullName} et pour protéger les intérêts légitimes de l&apos;entreprise, il/elle s&apos;interdit, pendant une durée de 2 ans à compter de la rupture du contrat, d&apos;exercer une activité concurrente à celle de l&apos;employeur.
              En contrepartie de cette obligation, {fullName} percevra une indemnité mensuelle de non-concurrence égale à 30% de la rémunération brute mensuelle moyenne des 12 derniers mois.
            </p>
          </>
        )}

        {data.clauseMobilite && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Clause de mobilité géographique</div>
            <p style={p}>
              En raison des nécessités du service, {fullName} accepte d&apos;être muté(e) dans tout établissement de la société situé dans la zone géographique suivante : <strong>{data.mobiliteZone || '_______________'}</strong>. Cette mutation ne constituera pas une modification substantielle du contrat de travail.
            </p>
          </>
        )}

        {/* ══ ARTICLE — PROTECTION DES DONNÉES (RGPD) ══ */}
        <div style={articleTitle('')}>Article {nextArt()} — Protection des données personnelles (RGPD)</div>
        <p style={p}>
          Dans le cadre de la relation de travail, l&apos;employeur est amené à collecter et traiter des données personnelles de {fullName} (identité, coordonnées, données de paie, données de santé pour la gestion des arrêts maladie). Ces traitements sont effectués conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés. {fullName} dispose d&apos;un droit d&apos;accès, de rectification et d&apos;effacement de ses données auprès du responsable de traitement.
        </p>

        {/* ══ NOTES / CLAUSES PARTICULIÈRES ══ */}
        {data.notes && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Dispositions particulières</div>
            <p style={p}>{data.notes}</p>
          </>
        )}

        {/* ══ CONVENTION COLLECTIVE ══ */}
        {data.employeurConvention && (
          <>
            <div style={articleTitle('')}>Article {nextArt()} — Convention collective</div>
            <p style={p}>
              Le présent contrat est soumis à la convention collective : <strong>{data.employeurConvention}</strong>. Les dispositions de cette convention sont applicables dans tous les cas où elles sont plus favorables que la loi.
            </p>
          </>
        )}

        {/* ══ LITIGES ══ */}
        <div style={articleTitle('')}>Article {nextArt()} — Juridiction compétente</div>
        <p style={p}>
          Tout litige relatif à l&apos;exécution ou la rupture du présent contrat sera soumis au Conseil de Prud&apos;hommes territorialement compétent.
        </p>

        {/* ══ SIGNATURES ══ */}
        <div style={{ marginTop: '40px', borderTop: '2px solid #1a3a5c', paddingTop: '20px' }}>
          <p style={{ ...p, marginBottom: '4px' }}>
            Fait en <strong>deux (2) exemplaires originaux</strong>, dont un remis à chaque partie,
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '11px' }}>
              <span style={{ color: '#555' }}>Le : </span>
              <span style={{ borderBottom: '1px solid #aaa', display: 'inline-block', minWidth: '160px' }}>&nbsp;</span>
            </div>
            <div style={{ fontSize: '11px' }}>
              <span style={{ color: '#555' }}>À : </span>
              <span style={{ borderBottom: '1px solid #aaa', display: 'inline-block', minWidth: '160px' }}>
                {data.lieuTravail ? data.lieuTravail.split(',')[0] : ''}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '10px', color: '#666', marginBottom: '24px' }}>
            (Faire précéder la signature de la mention manuscrite « Lu et approuvé »)
          </p>

          {/* Zones de signature */}
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ flex: 1, borderTop: '1.5px solid #555', paddingTop: '10px', fontSize: '10.5px', color: '#555' }}>
              <div style={{ fontWeight: 'bold', color: '#1a3a5c', marginBottom: '3px' }}>L&apos;Employeur</div>
              {data.employeurRepresentant && (
                <div style={{ marginBottom: '2px' }}>{data.employeurRepresentant}{data.employeurQualiteRep ? `, ${data.employeurQualiteRep}` : ''}</div>
              )}
              {data.employeurNom && <div style={{ marginBottom: '2px', fontSize: '10px', color: '#666' }}>{data.employeurNom}</div>}
              <div style={{ marginTop: '50px', fontSize: '9px', color: '#aaa', fontStyle: 'italic' }}>Signature et cachet</div>
            </div>
            <div style={{ flex: 1, borderTop: '1.5px solid #555', paddingTop: '10px', fontSize: '10.5px', color: '#555' }}>
              <div style={{ fontWeight: 'bold', color: '#1a3a5c', marginBottom: '3px' }}>{isStage ? 'Le/La Stagiaire' : isApp ? "L'Apprenti(e)" : 'Le/La Salarié(e)'}</div>
              <div style={{ marginBottom: '2px' }}>{prenom} {nom}</div>
              <div style={{ marginTop: '50px', fontSize: '9px', color: '#aaa', fontStyle: 'italic' }}>Signature précédée de la mention Lu et approuvé</div>
            </div>
          </div>
        </div>

      </div>

      {/* ══ PIED DE PAGE ══ */}
      <div style={{
        backgroundColor: '#f7f9fc',
        borderTop: '1px solid #d0dce8',
        padding: '8px 24px',
        fontSize: '9px',
        color: '#888',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>Contrat généré par BulletinFacile.fr</span>
        <span>Conforme Code du travail 2026 — Conservez ce document</span>
        <span>bulletinfacile.fr</span>
      </div>

      {/* ══ BANDEAU PAYWALL ══ */}
      {!isPaid && (
        <div style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#1a3a5c',
          color: '#ffffff',
          textAlign: 'center',
          padding: '10px 16px',
          fontSize: '13px',
          fontWeight: 600,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <span>🔒</span>
          <span>Contrat non payé — 10 € HT pour débloquer et télécharger</span>
        </div>
      )}

    </div>
  );
}
