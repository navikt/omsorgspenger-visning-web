const express = require('express');
const path = require('path');
const helmet = require('helmet');
const server = express();

const OIDC_AUTH_PROXY_URL = process.env.OIDC_AUTH_PROXY_URL;
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", OIDC_AUTH_PROXY_URL, 'https://sentry.gc.nav.no'],
        fontSrc: ["'self'", 'data:'],
        imgSrc: ["'self'", 'data:'],
        // TODO: Se https://github.com/navikt/omsorgspenger-visning-web/issues/7
        scriptSrc: ["'self'", "'unsafe-inline'"],
        // TODO: samme som over
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }),
);

server.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 8090;

server.get('/isAlive', (req, res) => res.sendStatus(200));
server.get('/isReady', (req, res) => res.sendStatus(200));
server.get('/localapi/env', (req, res) => res.json({ OIDC_AUTH_PROXY_URL }));

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, error => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('Started express server at port ' + PORT);
});
