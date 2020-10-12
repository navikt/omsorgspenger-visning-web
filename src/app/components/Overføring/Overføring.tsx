import React, { useState } from 'react';
import DeleDagerPanel from '../ExpandablePanel/DeleDagerPanel';
import navColors from '../../../styles/designSystemColors';
import { Overføring as OverføringType } from '../../types';
import Dato from '../../types/Dato';

interface Props {
  overføring: OverføringType;
}

const isoDateToLocale = (date: Dato) => new Date(date).toLocaleDateString();

const Overføring: React.FunctionComponent<Props> = ({ overføring }) => {
  const {
    til,
    fra,
    status,
    gjelderFraOgMed,
    gjelderTilOgMed,
    dagerOverført,
    begrunnelser,
  } = overføring;
  const [visDagerGittInnhold, setVisDagerGittInnhold] = useState<boolean>(true);

  return (
    <DeleDagerPanel
      visInnhold={visDagerGittInnhold}
      setVisInnhold={() => setVisDagerGittInnhold(current => !current)}
      farge={til ? navColors.navLysBla : navColors.navDypBla}
      overskrift={{
        antallDager: dagerOverført,
        overskrifttekstId: til ? 'overføring.dagerGir' : 'overføring.dagerFår',
      }}
    >
      <>
        {til && <div>{`Overført til: ${til}`}</div>}
        {fra && <div>{`Overført fra: ${fra}`}</div>}
        <div>{`Gyldighetsperiode: ${isoDateToLocale(
          gjelderFraOgMed,
        )} til og med ${isoDateToLocale(gjelderTilOgMed)}`}</div>
        <div>{`Status: ${status}`}</div>
        <div>Begrunnelser:</div>
        {begrunnelser.map(begrunnelse => (
          <div style={{ marginLeft: '2em' }} key={begrunnelse}>
            {begrunnelse}
          </div>
        ))}
      </>
    </DeleDagerPanel>
  );
};

export default Overføring;
