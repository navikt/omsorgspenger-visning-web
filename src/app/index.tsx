import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import AuthChecker from './containers/AuthChecker';
import OmsorgspengerHeader from './containers/OmsorgspengerHeader/OmsorgspengerHeader';
import { AuthProvider } from './state/auth/AuthProvider';
import ErrorBoundary from './components/errors/ErrorBoundary';

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
        <OmsorgspengerHeader />
        <ErrorBoundary>
          <AuthChecker>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </AuthChecker>
        </ErrorBoundary>
        <GlobalStyle />
      </AuthProvider>
    </BrowserRouter>
  );
}
