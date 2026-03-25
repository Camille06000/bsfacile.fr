import { NextRequest, NextResponse } from 'next/server';
import { calculerBS } from '@/lib/cotisations';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    brutMensuel, statut, effectif, tauxPAS,
    annee, mois,
    entrepriseNom, entrepriseSiret, entrepriseAdresse, entrepriseNaf, entrepriseConvention,
    salariéNom, salariéPrenom, salariéNss, salariéAdresse, salariéPoste,
    salariéCoefficient, salariéMatricule,
    heuresMensuelles, tauxHoraire,
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
    salariéCoefficient, salariéMatricule,
    heuresMensuelles: heuresMensuelles ? parseFloat(heuresMensuelles) : undefined,
    tauxHoraire: tauxHoraire ? parseFloat(tauxHoraire) : undefined,
  });

  return NextResponse.json(result);
}
