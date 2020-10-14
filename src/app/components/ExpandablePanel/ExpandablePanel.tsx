import React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import { UnmountClosed } from 'react-collapse';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components/macro';

interface BaseProps {
  onClick: () => void;
  headerButton: React.ReactElement;
  isOpen: boolean;
}

export const ExpandablePanelBase: React.FunctionComponent<BaseProps> = ({
  headerButton,
  isOpen,
  children,
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
    <StyleWrapper>
      {buttonWithId}
      <Innhold
        role="region"
        id={contentId}
        aria-labelledby={buttonId}
        isOpen={isOpen}
      >
        <UnmountClosed isOpened={isOpen}>{children}</UnmountClosed>
      </Innhold>
    </StyleWrapper>
  );
};

const StyleWrapper = styled.section`
  margin: 1em 0;
`;

interface Props {
  onClick: () => void;
  heading: React.ReactNode;
  isOpen: boolean;
}

const ExpandablePanel: React.FunctionComponent<Props> = ({
  onClick,
  heading,
  isOpen,
  children,
}) => {
  return (
    <ExpandablePanelBase
      onClick={onClick}
      isOpen={isOpen}
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

const Innhold = styled.div<Pick<BaseProps, 'isOpen'>>`
  ${({ isOpen }) => isOpen && 'margin: 1em 0;'}
`;

export default ExpandablePanel;
