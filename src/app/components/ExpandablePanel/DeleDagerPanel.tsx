import styled from 'styled-components/macro';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NavFrontendChevron from 'nav-frontend-chevron';
import navColors from '../../../styles/designSystemColors';
import { ExpandablePanelBase } from './ExpandablePanel';
import KnappStyle from './KnappStyle';

interface Props {
  visInnhold: boolean;
  setVisInnhold: () => void;
  farge: navColors;
  overskrift: {
    antallDager: number;
    overskrifttekstId: string;
  };
}

const DeleDagerPanelStyle = styled.article`
  margin-bottom: 1em;
  box-shadow: 0 3px 3px -1px #c6c2bf;
  border: 1px solid #c6c2bf;
`;

const DeleDagerPanel: React.FunctionComponent<Props> = ({
  farge,
  overskrift,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <DeleDagerPanelStyle>
      <ExpandablePanelBase
        headerButton={(skalViseInnhold, visEllerSkjulInnhold) => (
          <Overskrift farge={farge} onClick={visEllerSkjulInnhold}>
            <Dager>{overskrift.antallDager}</Dager>
            <Banner>
              <OverskriftTekst>
                {t(overskrift.overskrifttekstId, {count: overskrift.antallDager})}
              </OverskriftTekst>
              <KnappStyle>
                {skalViseInnhold
                  ? t('deleDagerPanel.skjulInnhold')
                  : t('deleDagerPanel.visInnhold')}
                <NavFrontendChevron type={skalViseInnhold ? 'opp' : 'ned'} />
              </KnappStyle>
            </Banner>
          </Overskrift>
        )}
        isOpenAsDefault={false}
      >
        {children}
      </ExpandablePanelBase>
    </DeleDagerPanelStyle>
  );
};

export const Overskrift = styled.button<{ farge: string }>`
  border-left: ${({ farge }) => `5px solid ${farge}`};
  display: flex;
  flex-wrap: nowrap;
  border-right: none;
  border-top: none;
  border-bottom: none;
  width: 100%;
  background-color: inherit;
  align-items: stretch;
  padding: 0;
  font-size: 1em;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    ${KnappStyle} {
      outline: 2px solid #0067c5;
      border-radius: 5px;
    }
  }

  > * {
    padding: 0.1em 0;
  }
`;

export const Dager = styled.span`
  margin-left: 0.5em;
  flex: 0 0 80px;
  font-size: 1.3em;
  display: flex;
  align-items: center;

  > * {
    display: inline;
  }
`;

export const OverskriftTekst = styled.b`
  font-size: 0.8em;
`;

export const Banner = styled.span`
  flex-grow: 1;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f4;
  > * {
    margin: 0 0.5em;
  }

  ${OverskriftTekst} {
    font-size: 1em;
  }
`;

export default DeleDagerPanel;
