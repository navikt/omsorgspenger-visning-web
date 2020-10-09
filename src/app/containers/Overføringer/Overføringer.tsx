import React from 'react';
import RammemeldingOverskrift from '../../components/RammemeldingOverskrift/RammemeldingOverskrift';
import {
  OverføringStatus,
  Overføringer as OverføringerType,
} from '../../types';
import { useTranslation } from 'react-i18next';
import Overføring from '../../components/Overføring/Overføring';

const testoverføringer: OverføringerType = {
  gitt: [
    {
      antallDager: 3,
      gjelderFraOgMed: '2020-09-29',
      gjelderTilOgMed: '2020-12-31',
      til: '01010101010',
      begrunnelser: ['Har utvidet rett for 1 barn', 'Har omsorgen for 3 barn'],
      status: OverføringStatus.Aktiv,
    },
    {
      antallDager: 3,
      gjelderFraOgMed: '2018-09-29',
      gjelderTilOgMed: '2019-12-31',
      til: '01010101010',
      begrunnelser: ['Har utvidet rett for 1 barn', 'Har omsorgen for 3 barn'],
      status: OverføringStatus.Inaktiv,
    },
  ],
  fått: [
    {
      antallDager: 3,
      gjelderFraOgMed: '2020-09-29',
      gjelderTilOgMed: '2020-12-31',
      fra: '01010101010',
      begrunnelser: ['Har utvidet rett for 1 barn', 'Har omsorgen for 3 barn'],
      status: OverføringStatus.Inaktiv,
    },
  ],
};

const Overføringer: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <RammemeldingOverskrift>
        {t('overføringer.overskrift')}
      </RammemeldingOverskrift>
      {testoverføringer.gitt.map(overføring => (
        <Overføring
          overføring={overføring}
          key={`${overføring.til}-${overføring.status}-${overføring.gjelderFraOgMed}-${overføring.gjelderTilOgMed}-${overføring.antallDager}`}
        />
      ))}
      {testoverføringer.fått.map(overføring => (
        <Overføring
          overføring={overføring}
          key={`${overføring.fra}-${overføring.status}-${overføring.gjelderFraOgMed}-${overføring.gjelderTilOgMed}-${overføring.antallDager}`}
        />
      ))}
    </>
  );
};

export default Overføringer;
