import Barn from 'app/containers/Barn/Barn';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useGet from '../../../utils/http/useGet';
import { apiRoutes } from 'utils/http/apiConfig';
import RammemeldingOverskrift from '../../components/RammemeldingOverskrift/RammemeldingOverskrift';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { GroupIcon } from '../../components/icons';

interface Props {
  saksnummer: string;
}

const BarnContainer: React.FunctionComponent<Props> = ({
  saksnummer,
}) => {
  const { t } = useTranslation();

  const { data, error, loading } = useGet(
    `${apiRoutes().Barn}?saksnummer=${saksnummer}`,
  );

  const errorStatus = error?.response?.status;

  return (
    <>
      <RammemeldingOverskrift>
        <GroupIcon/>
        {t('barn.overskrift')}
      </RammemeldingOverskrift>
      {loading && <LoadingIndicator/>}
      {error && <p>
        {errorStatus === 404
          ? t('sak.feil.404', {saksnummer})
          : t('sak.feil.ukjent')}
      </p>}
      {data !== null && <Barn barn={data}/>}
    </>
  );
};

export default BarnContainer;
