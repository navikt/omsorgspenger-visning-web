import { ExpandablePanelBase } from 'app/components/ExpandablePanel/ExpandablePanel';
import KnappStyle from 'app/components/ExpandablePanel/KnappStyle';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import 'nav-frontend-tabell-style';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { default as BarnInterface } from '../../types/Barn';

interface Props {
  barn: BarnInterface[];
}

const Barn: React.FunctionComponent<Props> = ({barn = []}) => {
  return <>{barn.map((b, i) => <Barnekomponent {...b} key={`barn_${i}`}/>)}</>;
};

const Barnekomponent: React.FunctionComponent<BarnInterface> = barn => {
  const {t} = useTranslation();
  const [visDetaljer, setVisDetaljer] = useState<boolean>(false);
  const visEllerSkjulDetaljer = () => setVisDetaljer(!visDetaljer);
  return <PanelWrapper>
    <ExpandablePanelBase
      onClick={visEllerSkjulDetaljer}
      headerButton={
        <KnappForBarn onClick={visEllerSkjulDetaljer}>
          <InnholdIKnapp {...{visDetaljer, ...barn}}/>
        </KnappForBarn>
      }
      isOpen={visDetaljer}
    >
      <table className="tabell">
        <thead>
          <th>{t("barn.rammevedtak.rammevedtak")}</th>
          <th>{t("barn.rammevedtak.gyldigFom")}</th>
          <th>{t("barn.rammevedtak.gyldigTom")}</th>
          <th>{t("barn.rammevedtak.kilde")}</th>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>Test</td>
            <td>Test</td>
            <td>Test</td>
          </tr>
        </tbody>
      </table>
    </ExpandablePanelBase>
  </PanelWrapper>;
};

const KnappForBarn = styled.button`
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

const InnholdIKnapp: React.FunctionComponent<BarnInterface & {visDetaljer: boolean}> = barn => {
  const {t} = useTranslation();
  return <>
    <span>{barn.navn}</span>
    <span>{barn.ident}</span>
    <KnappStyle>
      {t(`ekspanderbartPanel.detaljer.${barn.visDetaljer ? 'skjul' : 'vis'}`)}
      <NavFrontendChevron type={barn.visDetaljer ? 'opp' : 'ned'}/>
    </KnappStyle>
  </>;
};

export default Barn;
