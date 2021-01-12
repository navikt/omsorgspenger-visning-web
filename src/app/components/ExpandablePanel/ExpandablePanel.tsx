import React, { useState } from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import NavFrontendChevron from 'nav-frontend-chevron';
import Collapse from '@material-ui/core/Collapse';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components/macro';

interface BaseProps {
  headerButton: (
    skalViseInnhold: boolean,
    visEllerSkjulInnhold: () => void
  ) => React.ReactElement;
  isOpenAsDefault: boolean;
  innholdPadding?: string;
}

export const ExpandablePanelBase: React.FunctionComponent<BaseProps> = ({
  headerButton,
  isOpenAsDefault,
  children,
  innholdPadding = '1em',
}) => {
  const [visInnhold, setVisInnhold] = useState<boolean>(isOpenAsDefault);
  const buttonId = React.useMemo(() => uuid(), []);
  const contentId = React.useMemo(() => uuid(), []);

  const visEllerSkjulInnhold = () => setVisInnhold(!visInnhold);

  const generatedHeaderButton = headerButton(visInnhold, visEllerSkjulInnhold);

  const buttonWithId = React.cloneElement(generatedHeaderButton, {
    // @ts-ignore
    ...generatedHeaderButton.props,
    id: buttonId,
    'aria-controls': contentId,
  });

  return (
    <>
      {buttonWithId}
      <div role="region" id={contentId} aria-labelledby={buttonId}>
        <Collapse in={visInnhold}>
          <Innhold innholdPadding={innholdPadding}>{children}</Innhold>
        </Collapse>
      </div>
    </>
  );
};

interface Props {
  heading: (skalViseInnhold: boolean) => React.ReactNode;
  isOpenAsDefault: boolean;
  innholdPadding?: string;
}

const ExpandablePanel: React.FunctionComponent<Props> = ({
  heading,
  isOpenAsDefault,
  children,
  innholdPadding = '1em',
}) => {
  return (
    <ExpandablePanelBase
      isOpenAsDefault={isOpenAsDefault}
      innholdPadding={innholdPadding}
      headerButton={(skalViseInnhold, visEllerSkjulInnhold) => (
        <Flatknapp
          onClick={visEllerSkjulInnhold}
          mini={true}
          kompakt={true}
          htmlType="button"
        >
          {heading(skalViseInnhold)}
          <NavFrontendChevron type={skalViseInnhold ? 'opp' : 'ned'} />
        </Flatknapp>
      )}
    >
      {children}
    </ExpandablePanelBase>
  );
};

const Innhold = styled.div<Pick<BaseProps, 'innholdPadding'>>`
  padding: ${({ innholdPadding }) => innholdPadding};
`;

export default ExpandablePanel;
