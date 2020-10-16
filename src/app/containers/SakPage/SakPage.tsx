import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import AppContainer from '../../components/AppContainer/AppContainer';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import OverføringerContainer from '../Overføringer/OverføringerContainer';
import { useParams } from 'react-router-dom';

const SakPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { saksnummer } = useParams();

  return (
    <>
      <Helmet>
        <title>{t('homeTitle')}</title>
        <meta name="description" content={t('homepage.descr')} />
      </Helmet>
      <AppContainer>
        <ContentContainer>
          <OverføringerContainer saksnummer={saksnummer} />
        </ContentContainer>
      </AppContainer>
    </>
  );
};

export default SakPage;
