import React from 'react';
import { useTranslation } from 'react-i18next';
import { Overføring as OverføringType, overføringKey } from '../../types';
import Overføring from 'app/components/Overforing/Overforing';
import { GoBackInTimeIcon } from '../../components/icons';
import { css } from 'styled-components/macro';
import navColors from '../../../styles/designSystemColors';
import OverføringerExpandable from 'app/components/Overforing/OverforingerExpandable';

interface Props {
  overføringer: {
    gitt: OverføringType[];
    fått: OverføringType[];
  };
}

const Overføringer: React.FunctionComponent<Props> = ({
  overføringer = {gitt: [], fått: []},
}) => {
  const { t } = useTranslation();

  const alleOverføringer = overføringer
    .gitt
    .concat(overføringer.fått)
    .sort((a, b) => {
      if (a.gjelderFraOgMed < b.gjelderFraOgMed) {
        return -1;
      } else if (a.gjelderFraOgMed > b.gjelderFraOgMed) {
        return 1;
      } else {
        return 0;
      }
    });

  const gjeldendeOverføringerNå = React.useMemo(() => {
    const nå = new Date();

    return alleOverføringer.filter(
      ({ gjelderFraOgMed, gjelderTilOgMed }) =>
        new Date(gjelderFraOgMed) <= nå && new Date(gjelderTilOgMed) >= nå,
    );
  }, [alleOverføringer]);

  const tidligereOverføringer = React.useMemo(() => {
    const nå = new Date();

    return alleOverføringer.filter(
      ({ gjelderTilOgMed }) => new Date(gjelderTilOgMed) < nå,
    );
  }, [alleOverføringer]);

  const senereOverføringer = React.useMemo(() => {
    const nå = new Date();

    return alleOverføringer.filter(
      ({ gjelderFraOgMed }) => new Date(gjelderFraOgMed) > nå,
    );
  }, [alleOverføringer]);

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
        <OverføringerExpandable
          overføringer={tidligereOverføringer}
          vis={visTidligere}
          onClick={() => setVisTidligere(current => !current)}
          innholdPadding="1em 1em 0 1em"
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
        />
      )}
      {senereOverføringer.length > 0 && (
        <OverføringerExpandable
          overføringer={senereOverføringer}
          vis={visSenere}
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
        />
      )}
    </>
  );
};

export default Overføringer;
