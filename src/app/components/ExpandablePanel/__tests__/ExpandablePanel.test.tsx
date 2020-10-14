import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import ExpandablePanel from '../ExpandablePanel';

describe('<ExpandablePanel>', () => {
  test('Den viser innhold når den er åpen', () => {
    const testid = 'testid';
    render(
      <ExpandablePanel
        onClick={() => undefined}
        heading="Trykk på meg"
        isOpen={true}
      >
        <div data-testid={testid} />
      </ExpandablePanel>,
    );

    const innhold = screen.getByTestId(testid);

    expect(innhold).toBeInTheDocument();
  });

  test('Den viser ikke innhold når den ikke er åpen', () => {
    const testid = 'testid';
    render(
      <ExpandablePanel
        onClick={() => undefined}
        heading="Trykk på meg"
        isOpen={false}
      >
        <div data-testid={testid} />
      </ExpandablePanel>,
    );

    const innhold = screen.queryByTestId(testid);

    expect(innhold).not.toBeInTheDocument();
  });

  test('Knappeklikk trigger callback', async () => {
    const onClickCallback = jest.fn();
    render(
      <ExpandablePanel
        onClick={onClickCallback}
        heading="Trykk på meg"
        isOpen={false}
      >
        <div />
      </ExpandablePanel>,
    );

    const knapp = screen.getByRole('button');

    userEvent.click(knapp);

    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });

  test('Den har ingen a11y feil', async () => {
    const { container } = render(
      <ExpandablePanel
        onClick={() => undefined}
        heading="Trykk på meg"
        isOpen={true}
      >
        <div />
      </ExpandablePanel>,
    );

    const a11yResults = await axe(container);

    // @ts-ignore
    expect(a11yResults).toHaveNoViolations();
  });
});
