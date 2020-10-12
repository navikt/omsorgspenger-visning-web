import { getEnvironmentVariable, getLocation } from './browserUtils';

export const API_URL = () =>
  getEnvironmentVariable('OIDC_AUTH_PROXY_URL') || 'http://localhost:3000';

export const apiRoutes = () => ({
  Me: `${API_URL()}/me`,
  Login: `${API_URL()}/login`,
});

export const loginWithRedirect = () =>
  `${apiRoutes().Login}?redirect_uri=${encodeURIComponent(getLocation())}`;
