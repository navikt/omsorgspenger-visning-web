import React from 'react';
import { useTranslation } from 'react-i18next';
import useGet from '../../../utils/http/useGet';
import { apiRoutes } from '../../../utils/http/apiConfig';
import RammemeldingOverskrift from '../../components/RammemeldingOverskrift/RammemeldingOverskrift';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import Overføringer from './Overføringer';
import { TransferArrowsIcon } from '../../components/icons';

interface Props {
  saksnummer: string;
}

const OverføringerContainer: React.FunctionComponent<Props> = ({
  saksnummer,
}) => {
  const { t } = useTranslation();

  const { data, error, loading } = useGet(
    `${apiRoutes().Overføringer}?saksnummer=${saksnummer}`,
  );

  const errorStatus = error?.response?.status;

  return (
    <>
      <RammemeldingOverskrift>
        <TransferArrowsIcon />
        {t('overføringer.overskrift')}
      </RammemeldingOverskrift>
      {loading && <LoadingIndicator />}
      {error && (
        <p>
          {errorStatus === 404 ? (
            <>
              {t('sak.feil.404')}
              <code>{`${saksnummer}`}</code>
            </>
          ) : (
            t('sak.feil.ukjent')
          )}
        </p>
      )}
      {data !== null && <Overføringer overføringer={data?.overføringer} />}
    </>
  );
};

export default OverføringerContainer;
