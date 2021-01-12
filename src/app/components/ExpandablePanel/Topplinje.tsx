import styled from 'styled-components';
import KnappStyle from './KnappStyle';
import NavFrontendChevron from 'nav-frontend-chevron';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TopplinjeProps {
  visDetaljer: boolean;
  visEllerSkjulDetaljer: () => void;
}

const Topplinje: React.FunctionComponent<TopplinjeProps> = props => {
  const {t} = useTranslation();
  return <Topplinjeknapp onClick={props.visEllerSkjulDetaljer}>
    {props.children}
    <KnappStyle>
      {t(`ekspanderbartPanel.detaljer.${props.visDetaljer ? 'skjul' : 'vis'}`)}
      <NavFrontendChevron type={props.visDetaljer ? 'opp' : 'ned'}/>
    </KnappStyle>
  </Topplinjeknapp>;
};

const Topplinjeknapp = styled.button`
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

export default Topplinje;