import { createGlobalStyle } from 'styled-components';
import navColors from './designSystemColors';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    font-family: 'Source Sans Pro', Arial, sans-serif;
    line-height: 1.428571429;
    color: ${navColors.navMorkGra};
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
