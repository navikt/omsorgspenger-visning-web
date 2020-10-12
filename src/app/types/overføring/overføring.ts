import Dato from '../Dato';
import Personidentifikator from '../Personidentifikator';

export enum OverføringStatus {
  Gjeldende = 'Gjeldende',
  IkkeGjeldende = 'IkkeGjeldende',
}

export interface Overføring {
  dagerOverført: number;
  dagerØnsketOverført: number;
  gjelderFraOgMed: Dato;
  gjelderTilOgMed: Dato;
  status: OverføringStatus;
  begrunnelser: string[];
  til?: Personidentifikator;
  fra?: Personidentifikator;
}

export interface Overføringer {
  gitt: Overføring[];
  fått: Overføring[];
}
