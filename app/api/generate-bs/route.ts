import { NextRequest, NextResponse } from 'next/server';
import { calculerBS } from '@/lib/cotisations';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    brutMensuel, statut, effectif, tauxPAS,
    annee, mois,
    entrepriseNom, entrepriseSiret, entrepriseAdresse, entrepriseNaf, entrepriseConvention,
    salariéNom, salariéPrenom, salariéNss, salariéAdresse, salariéPoste,
    salariéCoefficient, salariéMatricule, salariéEntreeDate,
    heuresMensuelles, tauxHoraire,
    heuresSupp25, heuresSupp50, heuresCompl, heuresMajorees,
    prime, avantageNature, acompte,
    absences,
  } = body;

  const brut = parseFloat(brutMensuel);
  if (!brut || brut < 1 || brut > 200000) {
    return NextResponse.json({ error: 'Salaire brut invalide (1 – 200 000 €)' }, { status: 400 });
  }

  const result = calculerBS({
    brutMensuel: brut,
    statut: statut || 'non-cadre',
    effectif: effectif || '<50',
    tauxPAS: parseFloat(tauxPAS) || 0,
    annee: (parseInt(annee) as 2025 | 2026) || 2026,
    mois: parseInt(mois) || new Date().getMonth() + 1,
    entrepriseNom, entrepriseSiret, entrepriseAdresse, entrepriseNaf, entrepriseConvention,
    salariéNom, salariéPrenom, salariéNss, salariéAdresse, salariéPoste,
    salariéCoefficient, salariéMatricule, salariéEntreeDate,
    heuresMensuelles: heuresMensuelles ? parseFloat(heuresMensuelles) : undefined,
    tauxHoraire: tauxHoraire ? parseFloat(tauxHoraire) : undefined,
    heuresSupp25: heuresSupp25 ? parseFloat(heuresSupp25) : undefined,
    heuresSupp50: heuresSupp50 ? parseFloat(heuresSupp50) : undefined,
    heuresCompl: heuresCompl ? parseFloat(heuresCompl) : undefined,
    heuresMajorees: Array.isArray(heuresMajorees) ? heuresMajorees : undefined,
    prime: prime ? parseFloat(prime) : undefined,
    avantageNature: avantageNature ? parseFloat(avantageNature) : undefined,
    acompte: acompte ? parseFloat(acompte) : undefined,
    absences: Array.isArray(absences) ? absences : undefined,
  });

  return NextResponse.json(result);
}
