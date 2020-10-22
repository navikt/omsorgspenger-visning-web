import React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import Collapse from '@material-ui/core/Collapse';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components/macro';

interface BaseProps {
  onClick: () => void;
  headerButton: React.ReactElement;
  isOpen: boolean;
  innholdPadding?: string;
}

export const ExpandablePanelBase: React.FunctionComponent<BaseProps> = ({
  headerButton,
  isOpen,
  children,
  innholdPadding = '1em',
}) => {
  const buttonId = React.useMemo(() => uuid(), []);
  const contentId = React.useMemo(() => uuid(), []);

  if (!React.isValidElement(headerButton)) {
    throw new Error('headerButton må være et ReactElement!');
  }

  const buttonWithId = React.cloneElement(headerButton, {
    // @ts-ignore
    ...headerButton.props,
    id: buttonId,
    'aria-controls': contentId,
  });

  return (
    <>
      {buttonWithId}
      <div role="region" id={contentId} aria-labelledby={buttonId}>
        <Collapse in={isOpen}>
          <Innhold innholdPadding={innholdPadding}>{children}</Innhold>
        </Collapse>
      </div>
    </>
  );
};

interface Props {
  onClick: () => void;
  heading: React.ReactNode;
  isOpen: boolean;
  innholdPadding?: string;
}

const ExpandablePanel: React.FunctionComponent<Props> = ({
  onClick,
  heading,
  isOpen,
  children,
  innholdPadding = '1em',
}) => {
  return (
    <ExpandablePanelBase
      onClick={onClick}
      isOpen={isOpen}
      innholdPadding={innholdPadding}
      headerButton={
        <Flatknapp
          onClick={onClick}
          mini={true}
          kompakt={true}
          htmlType="button"
        >
          {heading}
          <NavFrontendChevron type={isOpen ? 'opp' : 'ned'} />
        </Flatknapp>
      }
    >
      {children}
    </ExpandablePanelBase>
  );
};

const Innhold = styled.div<Pick<BaseProps, 'innholdPadding'>>`
  padding: ${({ innholdPadding }) => innholdPadding};
`;

export default ExpandablePanel;
