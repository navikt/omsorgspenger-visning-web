import styled from 'styled-components/macro';

const RammemeldingOverskrift = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  margin: 0 0 2ex 0;
  color: black;
  font-size: 1.3em;
  padding-bottom: 0.7ex;
  border-bottom: 1px solid;

  svg {
    height: 24px;
    width: 24px;
    margin-right: 0.5em;
    margin-bottom: 0.1ex;
  }
`;

export default RammemeldingOverskrift;
