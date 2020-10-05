export enum LoginStatus {
  LoggedIn,
  LoggingIn,
  NotloggedIn,
}

export enum AuthAction {
  LoadUser = 'Auth_LoadUser',
  UserLoaded = 'Auth_UserLoaded',
}

type LoadUserAction = {
  type: AuthAction.LoadUser;
};

type UserLoadedAction = {
  type: AuthAction.UserLoaded;
  userName: string;
};

export const loadUser = (): LoadUserAction => ({ type: AuthAction.LoadUser });

export const userLoaded = (userName: string): UserLoadedAction => ({
  type: AuthAction.UserLoaded,
  userName,
});

export type AuthActions = LoadUserAction | UserLoadedAction;
