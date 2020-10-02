import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Header from '@navikt/nap-header';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

export function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Omsorgspenger visning"
        defaultTitle="Omsorgspenger visning"
      >
        <meta name="description" content="Omsorgspenger visning" />
      </Helmet>

      <Header title={t('navHeader')} titleHref="/" />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
