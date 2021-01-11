import DokumenterContainer from 'app/containers/Dokumenter/DokumenterContainer';
import KoronaverføringerContainer from 'app/containers/Koronaverforinger/KoronaoverforingerContainer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AppContainer from '../../components/AppContainer/AppContainer';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import OverføringerContainer from '../Overforinger/OverforingerContainer';
import { FordelingerContainer } from '../Fordelinger/FordelingerContainer';
import BarnContainer from '../Barn/BarnContainer';
import KvoteContainer from "../Kvote/KvoteContainer";

const SakPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { saksnummer } = useParams<any>();

  const kolonne1 = <>
    {process.env.TOGGLE_KVOTE && <KvoteContainer saksnummer={saksnummer}/>}
    <OverføringerContainer saksnummer={saksnummer}/>
    {process.env.TOGGLE_KORONAOVERFORING && <KoronaverføringerContainer saksnummer={saksnummer}/>}
    {process.env.TOGGLE_FORDELINGER && <FordelingerContainer saksnummer={saksnummer}/>}
    {process.env.TOGGLE_BARN && <BarnContainer saksnummer={saksnummer}/>}
  </>;

  const kolonne2 = <DokumenterContainer saksnummer={saksnummer}/>;

  const skalViseBeggeKolonner = !!process.env.TOGGLE_DOKUMENTER;

  return (
    <>
      <Helmet>
        <title>{t('homeTitle')}</title>
        <meta name="description" content={t('homepage.descr')} />
      </Helmet>
      <AppContainer>
        <ContentContainer {...{skalViseBeggeKolonner}}>
          {skalViseBeggeKolonner
            ? <><div>{kolonne1}</div><div>{kolonne2}</div></>
            : kolonne1}
        </ContentContainer>
      </AppContainer>
    </>
  );
};

export default SakPage;
