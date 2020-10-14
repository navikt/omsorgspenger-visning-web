import React from 'react';
import { useTranslation } from 'react-i18next';
import { Overføring as OverføringType } from '../../types';
import Overføring from '../../components/Overføring/Overføring';
import ExpandablePanel from '../../components/ExpandablePanel/ExpandablePanel';
import { GoBackInTimeIcon } from '../../components/icons';
import styled, { css } from 'styled-components/macro';
import navColors from '../../../styles/designSystemColors';

interface Props {
  overføringer: OverføringType[];
}

const Overføringer: React.FunctionComponent<Props> = ({
  overføringer = [],
}) => {
  const { t } = useTranslation();

  const gjeldendeOverføringerNå = React.useMemo(() => {
    const nå = new Date();

    return overføringer.filter(
      ({ gjelderFraOgMed, gjelderTilOgMed }) =>
        new Date(gjelderFraOgMed) <= nå && new Date(gjelderTilOgMed) >= nå,
    );
  }, [overføringer]);

  const tidligereOverføringer = React.useMemo(() => {
    const nå = new Date();

    return overføringer.filter(
      ({ gjelderTilOgMed }) => new Date(gjelderTilOgMed) < nå,
    );
  }, [overføringer]);

  const senereOverføringer = React.useMemo(() => {
    const nå = new Date();

    return overføringer.filter(
      ({ gjelderFraOgMed }) => new Date(gjelderFraOgMed) > nå,
    );
  }, [overføringer]);

  const overføringKey = React.useCallback(
    ({
      til,
      fra,
      status,
      gjelderFraOgMed,
      gjelderTilOgMed,
      dagerOverført,
    }: OverføringType) =>
      `${
        til || fra
      }-${status}-${gjelderFraOgMed}-${gjelderTilOgMed}-${dagerOverført}`,
    [],
  );

  const [visTidligere, setVisTidligere] = React.useState<boolean>(false);
  const [visSenere, setVisSenere] = React.useState<boolean>(false);

  const flipXAxis = css`
    transform: scaleX(-1);
  `;

  return (
    <>
      {gjeldendeOverføringerNå.length === 0 && t('overføringer.ingenGjeldende')}
      {gjeldendeOverføringerNå.map(overføring => (
        <Overføring
          overføring={overføring}
          key={overføringKey(overføring)}
          defaultOpen={true}
          farge={overføring.til ? navColors.navLysBla : navColors.navDypBla}
        />
      ))}
      {tidligereOverføringer.length > 0 && (
        <>
          <ExpandablePanel
            onClick={() => setVisTidligere(current => !current)}
            heading={
              <>
                <GoBackInTimeIcon />
                <span>
                  {visTidligere
                    ? t('overføringer.skjulTidligere')
                    : t('overføringer.visTidligere')}
                </span>
              </>
            }
            isOpen={visTidligere}
          >
            {tidligereOverføringer.map(overføring => (
              <OverføringWrapper key={overføringKey(overføring)}>
                <Overføring
                  overføring={overføring}
                  defaultOpen={false}
                  farge={navColors.navGra40}
                />
              </OverføringWrapper>
            ))}
          </ExpandablePanel>
        </>
      )}
      {senereOverføringer.length > 0 && (
        <>
          <ExpandablePanel
            onClick={() => setVisSenere(current => !current)}
            heading={
              <>
                <GoBackInTimeIcon cssStyle={flipXAxis} />
                <span>
                  {visSenere
                    ? t('overføringer.skjulSenere')
                    : t('overføringer.visSenere')}
                </span>
              </>
            }
            isOpen={visSenere}
          >
            {senereOverføringer.map(overføring => (
              <OverføringWrapper key={overføringKey(overføring)}>
                <Overføring
                  overføring={overføring}
                  defaultOpen={false}
                  farge={navColors.navGra40}
                />
              </OverføringWrapper>
            ))}
          </ExpandablePanel>
        </>
      )}
    </>
  );
};

const OverføringWrapper = styled.div`
  padding-left: 2em;
`;

export default Overføringer;
