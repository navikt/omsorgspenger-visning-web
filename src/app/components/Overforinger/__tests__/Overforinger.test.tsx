import { axe } from 'jest-axe';
import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import {isoDateToLocale} from "../../../../utils/timeUtils";
import Overføringer from "../Overforinger";
import {OverføringStatus} from "../../../types";


const overforingerInput = {
  "fått": [
    {
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
    }
  ],
  "gitt": [
    {
      "gjennomført": new Date((new Date()).getDate()),
      "til": {
        "saksnummer": "101112",
        "identitetsnummer": "22"
      },
      "gjelderFraOgMed": "2020-01-01",
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
      "gjelderTilOgMed": "2021-12-31",
      "dagerOverført": 5,
      "dagerØnsketOverført": 10,
      "status": OverføringStatus.Gjeldende
    }
  ]
}

describe('<Overføringer>', () => {
  const OverføringerKomponent =  <Overføringer overføringer={overforingerInput} />

  test('Viser antall dager overført samt skjul/vis innehold', async () => {
    render(OverføringerKomponent);
    const dagerOverført = 'Dager overført';
    const visInnehold = 'Vis innhold';

    const hentetAntallDager = screen.getByText(overforingerInput.gitt[0].dagerOverført.toString());
    expect(hentetAntallDager).toHaveTextContent(overforingerInput.gitt[0].dagerOverført.toString());

    const hentetDagerMottatt = screen.getByText(dagerOverført);
    expect(hentetDagerMottatt).toHaveTextContent(dagerOverført);

    const hentetVisInnehold = screen.getAllByText(visInnehold);
    expect(hentetVisInnehold).toBeArrayOfSize(2);
  });

  test('Viser riktig informasjon i utøket panel', async () => {
    render(OverføringerKomponent);
    const dagerØnsketOverført = 'Antall dager ønsket overført';
    const gyldighetsPeriode = `Gyldighetsperiode`;
    const til = 'Til';

    const hentetDagerØnsketOverført = screen.getByText(dagerØnsketOverført);
    expect(hentetDagerØnsketOverført).toHaveTextContent(dagerØnsketOverført);

    const hentetAntallDagerØnsketOverført = screen.getByText(overforingerInput.gitt[0].til.identitetsnummer.toString());
    expect(hentetAntallDagerØnsketOverført).toHaveTextContent(overforingerInput.gitt[0].til.identitetsnummer.toString());

    const hentetGyldighetsPeriode = screen.getAllByText(gyldighetsPeriode);
    expect(hentetGyldighetsPeriode).toBeArrayOfSize(2);

    const hentetTil = screen.getByText(til);
    expect(hentetTil).toHaveTextContent(til);

    const hentetTilId = screen.getByText(overforingerInput.gitt[0].dagerØnsketOverført.toString());
    expect(hentetTilId).toHaveTextContent(overforingerInput.gitt[0].dagerØnsketOverført.toString());

    const hentetGyldighetsperiode = screen.getByText(`${isoDateToLocale(overforingerInput.gitt[0].gjelderFraOgMed)} - ${isoDateToLocale(overforingerInput.gitt[0].gjelderTilOgMed)}`);
    expect(hentetGyldighetsperiode).toHaveTextContent(`1.1.2020 - 31.12.2021`);
  });

  test('Viser riktig informasjon i grunnlag for resultat', async () => {
    render(OverføringerKomponent);
    const grunnlagForResultat = 'Grunnlag for resultat:';
    const begrunnelserForPeriode = overforingerInput.gitt[0].begrunnelserForPeriode;

    const hentetGrunnlagForResultat = screen.getByText(grunnlagForResultat);
    expect(hentetGrunnlagForResultat).toHaveTextContent(grunnlagForResultat);

    const hentetGyldighetsperiode = screen.getByText(`Fra og med ${isoDateToLocale(begrunnelserForPeriode[0].gjelderFraOgMed)} til og med ${isoDateToLocale(begrunnelserForPeriode[0].gjelderTilOgMed)}`);
    expect(hentetGyldighetsperiode).toHaveTextContent(`Fra og med 1.1.2019 til og med 5.3.2019`);

    const hentetForsteGrunnlagForResultat = screen.getByText(begrunnelserForPeriode[0].begrunnelser[0]);
    expect(hentetForsteGrunnlagForResultat).toHaveTextContent(begrunnelserForPeriode[0].begrunnelser[0]);

    const hentetAndreGyldighetsperiode = screen.getByText(`Fra og med ${isoDateToLocale(begrunnelserForPeriode[1].gjelderFraOgMed)} til og med ${isoDateToLocale(begrunnelserForPeriode[1].gjelderTilOgMed)}`);
    expect(hentetAndreGyldighetsperiode).toHaveTextContent(`Fra og med 3.2.2020 til og med 7.5.2020`);

    const hentetAndreGrunnlagForResultat = screen.getByText(begrunnelserForPeriode[1].begrunnelser[0]);
    expect(hentetAndreGrunnlagForResultat).toHaveTextContent(begrunnelserForPeriode[1].begrunnelser[0]);

    const hentetTredjeGyldighetsperiode = screen.getByText(`Fra og med ${isoDateToLocale(begrunnelserForPeriode[2].gjelderFraOgMed)} til og med ${isoDateToLocale(begrunnelserForPeriode[2].gjelderTilOgMed)}`);
    expect(hentetTredjeGyldighetsperiode).toHaveTextContent(`Fra og med 30.12.2021 til og med 2.2.2022`);

    const hentetTredjeGrunnlagForResultat = screen.getByText(begrunnelserForPeriode[2].begrunnelser[0]);
    expect(hentetTredjeGrunnlagForResultat).toHaveTextContent(begrunnelserForPeriode[2].begrunnelser[0]);
  });

  test('Viser riktig informasjon i tidligere overføringer', async () => {
    render(OverføringerKomponent);
    const skjulTidligareOverføringer = 'Vis tidligere overføringer';
    const fra = 'Fra';
    const dagerMottatt = 'Dager mottatt';
    const overføring = overforingerInput.fått[0];

    const hentetSkjulTidligereOverføringer = screen.getByText(skjulTidligareOverføringer);
    expect(hentetSkjulTidligereOverføringer).toHaveTextContent(skjulTidligareOverføringer);

    const hentetDager = screen.getByText(overføring.dagerOverført);
    expect(hentetDager).toHaveTextContent(overføring.dagerOverført.toString());

    const hentetDagerMottatt = screen.getByText(dagerMottatt);
    expect(hentetDagerMottatt).toHaveTextContent(dagerMottatt);

    const hentetFra = screen.getByText(fra);
    expect(hentetFra).toHaveTextContent(fra);

    const hentetFraIdentitet = screen.getByText(overføring.fra.identitetsnummer);
    expect(hentetFraIdentitet).toHaveTextContent(overføring.fra.identitetsnummer);

    const hentetGyldighetsperiode = screen.getByText(`${isoDateToLocale(overføring.gjelderFraOgMed)} - ${isoDateToLocale(overføring.gjelderTilOgMed)}`);
    expect(hentetGyldighetsperiode).toHaveTextContent(`1.1.2019 - 31.12.2019`);
  });



  test('Den har ingen a11y violations', async () => {
    const {container} =  render(OverføringerKomponent);
    const a11yResults = await axe(container);
    // @ts-ignore
    expect(a11yResults).toHaveNoViolations();
  });
});
