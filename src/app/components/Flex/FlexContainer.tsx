import styled from 'styled-components/macro';
import { FlexProps } from './index';

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: ${({ alignItems }) => alignItems || 'inherit'};
  & > *:not(:last-child) {
    margin-right: ${({ childSpacing }) => `${childSpacing || '1em'};`};
  }
`;

export default FlexContainer;
