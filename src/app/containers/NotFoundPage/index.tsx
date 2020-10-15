import React from 'react';
import styled from 'styled-components/macro';
import { P } from './P';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('404Page')}</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>404</Title>
        <P>{t('404Page')}</P>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

export default NotFoundPage;
