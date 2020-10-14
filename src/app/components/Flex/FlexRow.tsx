import styled from 'styled-components/macro';
import FlexProps from './FlexProps';

const FlexRow = styled.div<FlexProps>`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  align-items: ${({ alignItems }) => alignItems || 'inherit'};
  & > *:not(:last-child) {
    margin-right: 1em;
  }
`;

export default FlexRow;
