import React from 'react';
import Header from '@navikt/nap-header';
import UserPanel from '@navikt/nap-user-panel';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../state/auth/AuthProvider';

const OmsorgspengerHeader: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { state } = useAuthContext();

  return (
    <Header title={t('navHeader')} titleHref="https://k9-los-web.nais.adeo.no/">
      <UserPanel name={state.userName || ''} />
    </Header>
  );
};

export default OmsorgspengerHeader;
