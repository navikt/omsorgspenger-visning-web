import Dato from '../Dato';
import Personidentifikator from '../Personidentifikator';

export enum OverføringStatus {
  Gjeldende = 'Gjeldende',
  IkkeGjeldende = 'IkkeGjeldende',
}

export interface Begrunnelse {
  gjelderFraOgMed: Dato;
  gjelderTilOgMed: Dato;
  tekst: string;
}

export interface BegrunnelserForPeriode {
  gjelderFraOgMed: Dato;
  gjelderTilOgMed: Dato;
  begrunnelser: string[];
}

export interface Overføring {
  dagerOverført: number;
  dagerØnsketOverført: number;
  gjelderFraOgMed: Dato;
  gjelderTilOgMed: Dato;
  status: OverføringStatus;
  begrunnelserForPeriode: BegrunnelserForPeriode[];
  til?: Personidentifikator;
  fra?: Personidentifikator;
}

export interface Overføringer {
  gitt: Overføring[];
  fått: Overføring[];
}
