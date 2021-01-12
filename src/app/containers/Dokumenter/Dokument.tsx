import { ExpandablePanelBase } from 'app/components/ExpandablePanel/ExpandablePanel';
import Topplinje from 'app/components/ExpandablePanel/Topplinje';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import React, { useState } from 'react';
import Dokument from '../../types/Dokument';

interface Props {
  dokumenter: Dokument[];
}

const Dokumenter: React.FunctionComponent<Props> = ({dokumenter = []}) => {
  return <>{dokumenter.map((b, i) => <Dokumentkomponent {...b} key={`dokument_${i}`}/>)}</>;
};

const Dokumentkomponent: React.FunctionComponent<Dokument> = dokument => {
  const [visDetaljer, setVisDetaljer] = useState<boolean>(false);
  const visEllerSkjulDetaljer = () => setVisDetaljer(!visDetaljer);
  return <PanelWrapper>
    <ExpandablePanelBase
      onClick={visEllerSkjulDetaljer}
      headerButton={
        <Topplinje {...{visDetaljer, visEllerSkjulDetaljer}}>
          <span>{dokument.filnavn}</span>
        </Topplinje>
      }
      isOpen={visDetaljer}
    >
      Detaljer
    </ExpandablePanelBase>
  </PanelWrapper>;
};

export default Dokumenter;
