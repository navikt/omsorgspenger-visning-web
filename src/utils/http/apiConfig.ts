import { getEnvironmentVariable, getLocation } from './browserUtils';

export const AUTH_PROXY_URL = () =>
  getEnvironmentVariable('OIDC_AUTH_PROXY_URL') || 'http://localhost:3000';

const API_URL = () => `${AUTH_PROXY_URL()}/api`;

export const apiRoutes = () => ({
  Env: '/localapi/env',
  Me: `${AUTH_PROXY_URL()}/me`,
  Login: `${AUTH_PROXY_URL()}/login`,
  Overføringer: `${API_URL()}/overforinger`,
});

export const loginWithRedirect = () =>
  `${apiRoutes().Login}?redirect_uri=${encodeURIComponent(getLocation())}`;
