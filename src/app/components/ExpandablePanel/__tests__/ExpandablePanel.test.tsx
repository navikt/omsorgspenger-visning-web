import { axe } from 'jest-axe';
import ExpandablePanel from "../ExpandablePanel";
import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';

describe('<ExpandablePanel>', () => {
  const inneholdIKomponent = 'Dette er innhold';
  const innholdPadding = '1em';

  const ExpandablePanelKomponentVis = (<ExpandablePanel
    heading={(skalViseInnhold) => <>
      <span>
              {skalViseInnhold
                ? 'Skjul'
                : 'Vis'}
            </span>
    </>}
    isOpenAsDefault={true}
    innholdPadding={innholdPadding}
  >
    {inneholdIKomponent}
  </ExpandablePanel>);

  const ExpandablePanelKomponentSkjul = (<ExpandablePanel
    heading={(skalViseInnhold) => <>
      <span>
              {skalViseInnhold
                ? 'Skjul'
                : 'Vis'}
            </span>
    </>}
    isOpenAsDefault={false}
    innholdPadding={innholdPadding}
  >
    {inneholdIKomponent}
  </ExpandablePanel>);

  test('Viser innehold', async () => {
    render(ExpandablePanelKomponentVis);
    const hentetInnehold = screen.getByText(inneholdIKomponent);
    expect(hentetInnehold).toHaveTextContent(inneholdIKomponent);
  });

  test('Viser heading om innehold ska inneholde "Skjul"', async () => {
    render(ExpandablePanelKomponentVis);
    const hentetHeadingText = screen.getByText('Skjul');
    expect(hentetHeadingText).toHaveTextContent('Skjul');
  });

  test('Viser heading som ska inneholde "Vis"', async () => {
    render(ExpandablePanelKomponentSkjul);
    const hentetHeadingText = screen.getByText('Vis');
    expect(hentetHeadingText).toHaveTextContent('Vis');
  });

  test('Den har ingen a11y violations', async () => {
    const {container} =  render(ExpandablePanelKomponentVis);
    const a11yResults = await axe(container);

    // @ts-ignore
    expect(a11yResults).toHaveNoViolations();
  });
});
