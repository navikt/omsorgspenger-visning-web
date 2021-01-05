import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import AppContainer from '../../components/AppContainer/AppContainer';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import OverføringerContainer from '../Overforinger/OverforingerContainer';
import { useParams } from 'react-router-dom';
import { FordelingerContainer } from '../Fordelinger/FordelingerContainer';

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
          {process.env.TOGGLE_FORDELINGER && <FordelingerContainer saksnummer={saksnummer}/>}
        </ContentContainer>
      </AppContainer>
    </>
  );
};

export default SakPage;
