import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import ApplicationWrapper from './containers/ApplicationWrapper';
import OmsorgspengerHeader from './containers/OmsorgspengerHeader/OmsorgspengerHeader';
import { AuthProvider } from './state/auth/AuthProvider';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Omsorgspenger visning"
        defaultTitle="Omsorgspenger visning"
      >
        <meta name="description" content="Omsorgspenger visning" />
      </Helmet>

      <AuthProvider>
        <ApplicationWrapper>
          <OmsorgspengerHeader />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </ApplicationWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}
