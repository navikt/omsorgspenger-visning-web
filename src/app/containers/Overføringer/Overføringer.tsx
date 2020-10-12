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
      dagerOverført: 8,
      dagerØnsketOverført: 10,
      gjelderFraOgMed: '2020-10-05',
      gjelderTilOgMed: '2020-12-31',
      til: '01010101010',
      begrunnelser: [
        'Har utvidet rett for 1 barn',
        'Har aleneomsorg for 1 barn',
        'Har omsorgen for 3 barn',
        'Har 35 omsorgsdager',
        'Har allerede tatt ut 27 dager i 2020',
      ],
      status: OverføringStatus.Gjeldende,
    },
    {
      dagerOverført: 10,
      dagerØnsketOverført: 10,
      gjelderFraOgMed: '2021-01-01',
      gjelderTilOgMed: '2021-12-31',
      til: '01010101010',
      begrunnelser: [
        'Har utvidet rett for 1 barn',
        'Har aleneomsorg for 1 barn',
        'Har omsorgen for 3 barn',
        'Har 35 omsorgsdager',
      ],
      status: OverføringStatus.Gjeldende,
    },
    {
      dagerOverført: 5,
      dagerØnsketOverført: 10,
      gjelderFraOgMed: '2022-01-01',
      gjelderTilOgMed: '2027-12-31',
      til: '01010101010',
      begrunnelser: ['Har omsorgen for 2 barn', 'Har 20 omsorgsdager'],
      status: OverføringStatus.Gjeldende,
    },
    {
      dagerOverført: 5,
      dagerØnsketOverført: 10,
      gjelderFraOgMed: '2012-01-01',
      gjelderTilOgMed: '2022-12-31',
      til: '01010101010',
      begrunnelser: [
        'Har utvidet rett for 1 barn',
        'Har omsorgen for 2 barn',
        'Har 20 omsorgsdager',
      ],
      status: OverføringStatus.IkkeGjeldende,
    },
  ],
  fått: [
    {
      dagerOverført: 5,
      dagerØnsketOverført: 10,
      gjelderFraOgMed: '2015-09-29',
      gjelderTilOgMed: '2017-12-31',
      fra: '01010101010',
      begrunnelser: ['Har utvidet rett for 1 barn', 'Har omsorgen for 3 barn'],
      status: OverføringStatus.IkkeGjeldende,
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
          key={`${overføring.til}-${overføring.status}-${overføring.gjelderFraOgMed}-${overføring.gjelderTilOgMed}-${overføring.dagerOverført}`}
        />
      ))}
      {testoverføringer.fått.map(overføring => (
        <Overføring
          overføring={overføring}
          key={`${overføring.fra}-${overføring.status}-${overføring.gjelderFraOgMed}-${overføring.gjelderTilOgMed}-${overføring.dagerOverført}`}
        />
      ))}
    </>
  );
};

export default Overføringer;
