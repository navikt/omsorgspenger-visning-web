import { ExpandablePanelBase } from 'app/components/ExpandablePanel/ExpandablePanel';
import KnappStyle from 'app/components/ExpandablePanel/KnappStyle';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
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
        <KnappForDokument onClick={visEllerSkjulDetaljer}>
          <InnholdIKnapp {...{visDetaljer, ...dokument}}/>
        </KnappForDokument>
      }
      isOpen={visDetaljer}
    >
      Detaljer
    </ExpandablePanelBase>
  </PanelWrapper>;
};

const KnappForDokument = styled.button`
  background-color: #f3f4f4;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: .9rem;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  span {padding: 0}
`;

const InnholdIKnapp: React.FunctionComponent<Dokument & {visDetaljer: boolean}> = dokument => {
  const {t} = useTranslation();
  return <>
    <span>{dokument.filnavn}</span>
    <KnappStyle>
      {t(`ekspanderbartPanel.detaljer.${dokument.visDetaljer ? 'skjul' : 'vis'}`)}
      <NavFrontendChevron type={dokument.visDetaljer ? 'opp' : 'ned'}/>
    </KnappStyle>
  </>;
};

export default Dokumenter;
