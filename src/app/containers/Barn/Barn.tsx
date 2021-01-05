import { ExpandablePanelBase } from 'app/components/ExpandablePanel/ExpandablePanel';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import React, { useState } from 'react';
import styled from 'styled-components';
import { default as BarnInterface } from '../../types/Barn';

interface Props {
  barn: BarnInterface[];
}

const Barn: React.FunctionComponent<Props> = ({barn = []}) => {
  return <>{barn.map(b => <Barnekomponent {...b}/>)}</>;
};

const Barnekomponent: React.FunctionComponent<BarnInterface> = barn => {
  const [visDetaljer, setVisDetaljer] = useState<boolean>(false);
  const visEllerSkjulDetaljer = () => setVisDetaljer(!visDetaljer);
  return <PanelWrapper>
    <ExpandablePanelBase
      onClick={visEllerSkjulDetaljer}
      headerButton={<KnappForBarn onClick={visEllerSkjulDetaljer}>{visDetaljer ? "Skjul detaljer" : "Vis detaljer"}</KnappForBarn>}
      isOpen={visDetaljer}
    >
      Detaljer
    </ExpandablePanelBase>
  </PanelWrapper>;
};

const KnappForBarn = styled.button`
  background-color: #f3f4f4;
  border: 0;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
`;

export default Barn;
