import { ExpandablePanelBase } from 'app/components/ExpandablePanel/ExpandablePanel';
import KnappStyle from 'app/components/ExpandablePanel/KnappStyle';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import navColors from "../../../styles/designSystemColors";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import UidentifisertRammemelding from '../../types/UidentifisertRammemelding';

interface Props {
  rammemelding: UidentifisertRammemelding[];
}

const UidentifiserteRammemeldinger: React.FunctionComponent<Props> = ({rammemelding = []}) => {
  return <>{rammemelding.map((b, i) => <UidentifisertRammemeldingKomponent {...b} key={`UidentifisertRammemelding_${i}`}/>)}</>;
};

const UidentifisertRammemeldingKomponent: React.FunctionComponent<UidentifisertRammemelding> = rammemelding => {
  const [visDetaljer, setVisDetaljer] = useState<boolean>(false);
  const visEllerSkjulDetaljer = () => setVisDetaljer(!visDetaljer);
  return <PanelWrapper>
    <PanelKnappStyle farge={navColors.navOransje}>
    <ExpandablePanelBase
      onClick={visEllerSkjulDetaljer}
      headerButton={
        <KnappForUidentifisertRammemelding onClick={visEllerSkjulDetaljer}>
          <InnholdIKnapp {...{visDetaljer, ...rammemelding}}/>
        </KnappForUidentifisertRammemelding>
      }
      isOpen={visDetaljer}
    >
      <p>Det finnes 1 rammevedtak om utvidet rett fra infotrygd som ikke er automatisk kan kobles til ett barn. Vennligst korriger i infotrygd.</p>
      <p><b>Utolkbar tekst: "@9-6 2 L UTV.OMSD*10/</b></p>
    </ExpandablePanelBase>
    </PanelKnappStyle>
  </PanelWrapper>;
};


const PanelKnappStyle = styled.div<{farge : string}>`
  > button {
    border-left: ${({ farge }) => `5px solid ${farge}`}
  }
`;


const KnappForUidentifisertRammemelding = styled.button`
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

const InnholdIKnapp: React.FunctionComponent<UidentifisertRammemelding & {visDetaljer: boolean}> = rammemelding => {
  const {t} = useTranslation();
  return <>
    <span>{t(`uidentifiserteRammemeldinger.${rammemelding.type}`)}</span>
    <KnappStyle>
      {t(`ekspanderbartPanel.detaljer.${rammemelding.visDetaljer ? 'skjul' : 'vis'}`)}
      <NavFrontendChevron type={rammemelding.visDetaljer ? 'opp' : 'ned'}/>
    </KnappStyle>
  </>;
};

export default UidentifiserteRammemeldinger;
