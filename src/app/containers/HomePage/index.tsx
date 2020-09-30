import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('homeTitle')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>{t('homeTitle')}</span>
    </>
  );
};

export default HomePage;
