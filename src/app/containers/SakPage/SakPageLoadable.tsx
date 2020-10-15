/**
 * Asynchronously loads the component for SakPage
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';
import styled from 'styled-components/macro';
import { LoadingIndicator } from '../../components/LoadingIndicator';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SakPageLoadable = lazyLoad(
  () => import('./SakPage'),
  module => module.default,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
