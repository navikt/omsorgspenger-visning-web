import Dato from '../Dato';
import Personidentifikator from '../Personidentifikator';

export enum OverføringStatus {
  Aktiv = 'Aktiv',
  Inaktiv = 'Inaktiv',
}

export interface Overføring {
  antallDager: number;
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
