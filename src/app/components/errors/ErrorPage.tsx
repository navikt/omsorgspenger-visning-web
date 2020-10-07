import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hovedknapp } from 'nav-frontend-knapper';

const ErrorPage: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <p>{t('uhåndtertApplikasjonsfeil')}</p>
      <Hovedknapp onClick={() => window.location.reload()}>
        {t('lastInnPåNytt')}
      </Hovedknapp>
    </>
  );
};

export default ErrorPage;
