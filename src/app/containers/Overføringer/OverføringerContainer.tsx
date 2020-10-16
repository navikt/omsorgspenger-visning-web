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

  return (
    <>
      <RammemeldingOverskrift>
        <TransferArrowsIcon />
        {t('overføringer.overskrift')}
      </RammemeldingOverskrift>
      {loading && <LoadingIndicator />}
      {error && <div>Det skjedde en feil</div>}
      {data !== null && <Overføringer overføringer={data?.overføringer} />}
    </>
  );
};

export default OverføringerContainer;
