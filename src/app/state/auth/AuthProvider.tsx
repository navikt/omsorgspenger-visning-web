import React from 'react';

import { get } from '../../../utils/http/request';
import ResponseError from '../../../utils/http/ResponseError';
import { authReducer, AuthState, initialAuthState } from './AuthState';
import {
  loadUser,
  unknownAuthError,
  userLoaded,
  userUnauthorised,
} from './authActions';
import { apiRoutes } from '../../../utils/http/apiConfig';

// @ts-ignore
const AuthContext = React.createContext<AuthContextProps>();

interface AuthContextRaw {
  state: AuthState;
  dispatch: React.Dispatch<any>; // TODO: any?
}

export interface AuthContextProps extends AuthContextRaw {
  getUserInfo: () => void;
}

export const useAuthContext = (): AuthContextProps => {
  const context = React.useContext<AuthContextRaw>(AuthContext);
  if (!context) {
    throw new Error('useAuthContext kan kun brukes i en AuthProvider');
  }

  const { dispatch } = context;

  const getUserInfo = async () => {
    dispatch(loadUser());

    try {
      const { data } = await get(apiRoutes.Me);

      dispatch(userLoaded(data.name));
    } catch (e) {
      const responseError = e as ResponseError;
      console.log(e);
      if (responseError.response.status === 403) {
        dispatch(userUnauthorised());
      } else {
        dispatch(unknownAuthError());
      }
    }
  };

  return {
    ...context,
    getUserInfo,
  };
};

export const AuthProvider: React.FunctionComponent = props => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthState);
  const value: AuthContextRaw = React.useMemo(() => ({ state, dispatch }), [
    state,
  ]);

  return <AuthContext.Provider value={value} {...props} />;
};
