import React, { useState } from 'react';
import DeleDagerPanel from '../ExpandablePanel/DeleDagerPanel';
import navColors from '../../../styles/designSystemColors';
import { Overføring as OverføringType } from '../../types';

interface Props {
  overføring: OverføringType;
}

const Overføring: React.FunctionComponent<Props> = ({ overføring }) => {
  const {
    til,
    fra,
    status,
    gjelderFraOgMed,
    gjelderTilOgMed,
    antallDager,
    begrunnelser,
  } = overføring;
  const [visDagerGittInnhold, setVisDagerGittInnhold] = useState<boolean>(true);

  return (
    <DeleDagerPanel
      visInnhold={visDagerGittInnhold}
      setVisInnhold={() => setVisDagerGittInnhold(current => !current)}
      farge={til ? navColors.navLysBla : navColors.navDypBla}
      overskrift={{
        antallDager,
        overskrifttekstId: til ? 'overføring.dagerGir' : 'overføring.dagerFår',
      }}
    >
      <>
        {til && <div>{`Overført til: ${til}`}</div>}
        {fra && <div>{`Overført fra: ${fra}`}</div>}
        <div>{`Gyldighetsperiode: ${gjelderFraOgMed} til og med ${gjelderTilOgMed}`}</div>
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
