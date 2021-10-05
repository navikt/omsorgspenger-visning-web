import { App } from './app';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
// import 'sanitize.css/sanitize.css';
import './locales/i18n'; // Initialize languages
import { apiRoutes } from './utils/http/apiConfig';
import { get } from './utils/http/request';
import initSentry from './utils/initSentry';

initSentry();

get(apiRoutes().Env).then(({ data = {} }) => {
  // @ts-ignore
  window.appSettings = data;

  const MOUNT_NODE = document.getElementById('root') as HTMLElement;

  interface Props {
    Component: typeof App;
  }
  const ConnectedApp = ({ Component }: Props) => (
    <HelmetProvider>
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    </HelmetProvider>
  );

  const render = (Component: typeof App) => {
    ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
  };

  if (module.hot) {
    // Hot reloadable translation json files and app
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./app', './locales/i18n'], () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      const app = require('./app').App;
      render(app);
    });
  }

  render(App);
});
