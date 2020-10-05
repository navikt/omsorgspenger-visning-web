import React, { useEffect } from 'react';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useAuthContext } from '../state/auth/AuthProvider';
import { LoginStatus } from '../state/auth/authActions';

const ApplicationWrapper = ({ children }) => {
  const { getUserInfo, state } = useAuthContext();

  useEffect(() => {
    if (state.loginStatus === LoginStatus.NotloggedIn) {
      getUserInfo();
    }
  });

  if (
    state.loginStatus === LoginStatus.NotloggedIn ||
    state.loginStatus === LoginStatus.LoggingIn
  ) {
    return <LoadingIndicator />;
  }

  return <div>{children}</div>;
};

export default ApplicationWrapper;
