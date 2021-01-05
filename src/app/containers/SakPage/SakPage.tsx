import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AppContainer from '../../components/AppContainer/AppContainer';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import OverføringerContainer from '../Overforinger/OverforingerContainer';
import { FordelingerContainer } from '../Fordelinger/FordelingerContainer';
import BarnContainer from '../Barn/BarnContainer';

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
          {process.env.TOGGLE_BARN && <BarnContainer saksnummer={saksnummer}/>}
        </ContentContainer>
      </AppContainer>
    </>
  );
};

export default SakPage;
