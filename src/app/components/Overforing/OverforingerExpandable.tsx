import React from 'react';
import styled from 'styled-components/macro';
import { Overføring as OverføringType, overføringKey } from '../../types';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import Overføring from './Overforing';
import navColors from '../../../styles/designSystemColors';

interface Props {
  onClick: () => void;
  vis: boolean;
  heading: React.ReactNode;
  overføringer: OverføringType[];
  innholdPadding?: string;
}

const OverføringerExpandable: React.FunctionComponent<Props> = ({
  onClick,
  vis,
  heading,
  overføringer,
  innholdPadding,
}) => (
  <MarginWrapper>
    <ExpandablePanel
      onClick={onClick}
      heading={heading}
      isOpen={vis}
      innholdPadding={innholdPadding}
    >
      {overføringer.map(overføring => (
        <PadLeft key={overføringKey(overføring)}>
          <Overføring
            overføring={overføring}
            defaultOpen={false}
            farge={navColors.navGra40}
          />
        </PadLeft>
      ))}
    </ExpandablePanel>
  </MarginWrapper>
);

const PadLeft = styled.div`
  padding-left: 2em;
`;

const MarginWrapper = styled.div`
  & + * {
    margin-top: 1em;
  }
`;

export default OverføringerExpandable;
