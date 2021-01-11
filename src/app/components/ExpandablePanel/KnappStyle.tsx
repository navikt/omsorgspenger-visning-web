import styled from 'styled-components';
import navColors from 'styles/designSystemColors';

const KnappStyle = styled.span`
  background-color: inherit;
  border: none;
  color: ${navColors.navBla};
  font-size: 0.9rem;
  padding: 0.2em;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

export default KnappStyle;