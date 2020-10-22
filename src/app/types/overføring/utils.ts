import { Overføring as OverføringType } from './overføring';

export const overføringKey = ({
  til,
  fra,
  status,
  gjelderFraOgMed,
  gjelderTilOgMed,
  dagerOverført,
}: OverføringType) =>
  `${
    til || fra
  }-${status}-${gjelderFraOgMed}-${gjelderTilOgMed}-${dagerOverført}`;
