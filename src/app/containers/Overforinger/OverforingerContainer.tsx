import { LoadingIndicator } from 'app/components/LoadingIndicator';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { apiRoutes } from 'utils/http/apiConfig';
import useGet from '../../../utils/http/useGet';
import { TransferArrowsIcon } from '../../components/icons';
import RammemeldingOverskrift from '../../components/RammemeldingOverskrift/RammemeldingOverskrift';
import Overføringer from './Overforinger';

interface Props {
  saksnummer: string;
}

const OverføringerContainer: React.FunctionComponent<Props> = ({
  saksnummer,
}) => {
  const { t } = useTranslation();

  const { data, error, loading } = useGet(
    `${apiRoutes().Overføringer}?status=Aktiv&saksnummer=${saksnummer}`,
  );

  const errorStatus = error?.response?.status;

  return (
    <>
      <RammemeldingOverskrift>
        <TransferArrowsIcon/>
        {t('overføringer.overskrift')}
      </RammemeldingOverskrift>
      {loading && <LoadingIndicator/>}
      {error && <p>
        {errorStatus === 404
          ? t('sak.feil.404', {saksnummer})
          : t('sak.feil.ukjent')}
      </p>}
      {data !== null && <Overføringer overføringer={data} />}
    </>
  );
};

export default OverføringerContainer;
