import { axe } from 'jest-axe';
import Overføring from "../Overforing";
import navColors from "../../../../styles/designSystemColors";
import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import {OverføringStatus} from "../../../types";
import {isoDateToLocale} from "../../../../utils/timeUtils";

const overføringInput = {
  "gjennomført": new Date((new Date()).getDate()),
  "fra": {
    "saksnummer": "131415",
    "identitetsnummer": "33"
  },
  "gjelderFraOgMed": "2019-01-01",
  "begrunnelserForPeriode": [
    {
      "gjelderFraOgMed": "2019-01-01",
      "gjelderTilOgMed": "2019-03-05",
      "begrunnelser": [
        "En to tre § lov",
        "Samme periode."
      ]
    },
    {
      "gjelderFraOgMed": "2020-02-03",
      "gjelderTilOgMed": "2020-05-07",
      "begrunnelser": [
        "By design"
      ]
    },
    {
      "gjelderFraOgMed": "2021-12-30",
      "gjelderTilOgMed": "2022-02-02",
      "begrunnelser": [
        "Det var som bare.."
      ]
    }
  ],
  "gjelderTilOgMed": "2019-12-31",
  "dagerOverført": 3,
  "status": OverføringStatus.Gjeldende
};

describe('<Overforing>', () => {
  const OverforingKomponent =  <Overføring
    overføring={overføringInput}
    defaultOpen={false}
    farge={navColors.navGra40}
  />;

  test('Viser hvem overføringen kommer ifra ', async () => {
    render(OverforingKomponent);
    const fra = 'Fra';

    const hentetIdentitetsnummer = screen.getByText(overføringInput.fra.identitetsnummer);
    expect(hentetIdentitetsnummer).toHaveTextContent(overføringInput.fra.identitetsnummer);

    const hentetFra = screen.getByText(fra);
    expect(hentetFra).toHaveTextContent(fra);
  });

  test('Viser gyldighetsperiode', async () => {
    render(OverforingKomponent);
    const gyldighetsperiode = `Gyldighetsperiode`;

    const hentetGyldighetsperiode = screen.getByText(`${isoDateToLocale(overføringInput.gjelderFraOgMed)} - ${isoDateToLocale(overføringInput.gjelderTilOgMed)}`);
    expect(hentetGyldighetsperiode).toHaveTextContent(`1.1.2019 - 31.12.2019`);

   const hentetGyldighetsperiodeText = screen.getByText(gyldighetsperiode);
    expect(hentetGyldighetsperiodeText).toHaveTextContent(gyldighetsperiode);
  });

  test('Viser rett header med dager', async () => {
    render(OverforingKomponent);
    const dagerMottatt = 'Dager mottatt';
    const visInnehold = 'Vis innhold';

    const hentetAntallDager = screen.getByText(overføringInput.dagerOverført.toString());
    expect(hentetAntallDager).toHaveTextContent(overføringInput.dagerOverført.toString());

    const hentetDagerMottatt = screen.getByText(dagerMottatt);
    expect(hentetDagerMottatt).toHaveTextContent(dagerMottatt);

    const hentetVisInnehold = screen.getByText(visInnehold);
    expect(hentetVisInnehold).toHaveTextContent(visInnehold);
  });

  test('Den har ingen a11y violations', async () => {
    const {container} =  render(OverforingKomponent);
    const a11yResults = await axe(container);
    // @ts-ignore
    expect(a11yResults).toHaveNoViolations();
  });
});
