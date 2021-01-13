/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import styled from 'styled-components/macro';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from '../../components/LoadingIndicator';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HomePageLoadable = lazyLoad(
  () => import('./index'),
  module => module.default,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
