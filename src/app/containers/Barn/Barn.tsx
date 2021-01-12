import { ExpandablePanelBase } from 'app/components/ExpandablePanel/ExpandablePanel';
import Topplinje from 'app/components/ExpandablePanel/Topplinje';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import 'nav-frontend-tabell-style';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
        <Topplinje {...{visDetaljer, visEllerSkjulDetaljer}}>
          <span>{barn.navn}</span>
          <span>{barn.ident}</span>
        </Topplinje>
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

export default Barn;
