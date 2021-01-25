import { axe } from 'jest-axe';
import Fordelingskomponent from "../Fordelingskomponent";
import navColors from "../../../../styles/designSystemColors";
import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';

const gjeldendeFordelinger =  [
  {
    "antallDager": 1,
    "til": "02028920544",
    "gjelderFraOgMed": "2020-01-01",
    "gjelderTilOgMed": "2020-12-31"
  },
  {
    "antallDager": 4,
    "til": "02028920544",
    "gjelderFraOgMed": "2020-01-01",
    "gjelderTilOgMed": "2020-12-31"
  }

  ]
describe('<Fordelingskomponent>', () => {
  const FordelingskomponentTilTest = (<>
    {gjeldendeFordelinger.map((fordeling, key) => (
    <Fordelingskomponent
      {...{fordeling, key}}
      defaultOpen={true}
      farge={fordeling.til ? navColors.navLysBla : navColors.navDypBla}
      />))}

    </>);

  test('Viser riktig personnummer til mottaker to ganger', async () => {
    render(FordelingskomponentTilTest);
    const hentetAntallDager = screen.getAllByText(gjeldendeFordelinger[0].til);
    expect(hentetAntallDager).toBeArrayOfSize(2);
    expect(hentetAntallDager[0]).toHaveTextContent(gjeldendeFordelinger[0].til);
  });

  test('Den har ingen a11y violations', async () => {
    const {container} =  render(FordelingskomponentTilTest);
    const a11yResults = await axe(container);

    // @ts-ignore
    expect(a11yResults).toHaveNoViolations();
  });
});
