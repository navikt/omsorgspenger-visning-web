import FileIcon from 'app/components/icons/FileIcon';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import RammemeldingOverskrift from 'app/components/RammemeldingOverskrift/RammemeldingOverskrift';
import Dokumenter from 'app/containers/Dokumenter/Dokument';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { apiRoutes } from 'utils/http/apiConfig';
import useGet from 'utils/http/useGet';
import ChatbubbleQuestionIcon from "../../components/icons/ChatbubbleQuestionIcon";

interface Props {
  saksnummer: string;
}

const UidentifiserteRammemeldingerContainer: React.FunctionComponent<Props> = ({
  saksnummer,
}) => {
  const {t} = useTranslation();

  const {data, error, loading} =
    useGet(`${apiRoutes().UidentifiserteRammemeldinger}?saksnummer=${saksnummer}`);

  const errorStatus = error?.response?.status;

  return (
    <>
      <RammemeldingOverskrift>
        <ChatbubbleQuestionIcon/>
        {t('uidentifiserteRammemeldinger.overskrift')}
      </RammemeldingOverskrift>
      {loading && <LoadingIndicator/>}
      {error && <p>
        {errorStatus === 404
          ? t('sak.feil.404', {saksnummer})
          : t('sak.feil.ukjent')}
      </p>}
      {data !== null && <Dokumenter dokumenter={data}/>}
    </>
  );
};

export default UidentifiserteRammemeldingerContainer;
