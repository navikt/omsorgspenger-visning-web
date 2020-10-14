import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { Label } from 'nav-frontend-skjema';
import styled, { css } from 'styled-components/macro';

interface Props {
  labelTextId: string;
  value: React.ReactNode;
  retning: 'vertikal' | 'horisontal';
}

const LabelValue: React.FunctionComponent<Props> = ({
  labelTextId,
  value,
  retning,
}) => {
  const valueId = React.useMemo(() => uuid(), []);
  const { t } = useTranslation();

  return (
    <LabelValueStyle retning={retning}>
      <Label htmlFor={valueId}>{t(labelTextId)}</Label>
      <div id={valueId}>{value}</div>
    </LabelValueStyle>
  );
};

const horisontal = css`
  display: flex;
  align-items: baseline;
  & :first-child {
    margin-right: 1em;
    margin-bottom: 0;
  }
`;

const LabelValueStyle = styled.div<Pick<Props, 'retning'>>`
  ${({ retning }) => retning === 'horisontal' && horisontal}
`;

export default LabelValue;
