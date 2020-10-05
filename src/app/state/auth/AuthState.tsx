import { AuthAction, AuthActions, LoginStatus } from './authActions';

export interface AuthState {
  loginStatus: LoginStatus;
  userName?: string;
}

export const initialAuthState: AuthState = {
  loginStatus: LoginStatus.NotloggedIn,
};

export const authReducer = (
  state: AuthState = initialAuthState,
  action: AuthActions,
) => {
  switch (action.type) {
    case AuthAction.LoadUser:
      return {
        ...state,
        loginStatus: LoginStatus.LoggingIn,
      };
    case AuthAction.UserLoaded:
      return {
        ...state,
        loginStatus: LoginStatus.LoggedIn,
        userName: action.userName,
      };
    default:
      return state;
  }
};
