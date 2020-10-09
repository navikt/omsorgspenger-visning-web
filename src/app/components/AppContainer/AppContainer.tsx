import styled from 'styled-components/macro';

const AppContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    margin: 1em;
    flex: 1 1 auto;
  }
`;

export default AppContainer;
