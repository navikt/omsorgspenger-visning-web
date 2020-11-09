import { LoadingIndicator } from 'app/components/LoadingIndicator';
import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FlexRow } from '../../components/Flex';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { post } from 'utils/http/request';
import { apiRoutes } from 'utils/http/apiConfig';
import ResponseError from '../../../utils/http/ResponseError';

enum ErrorType {
  NotFound = 'NotFound',
  NotAuthorised = 'NotAuthorised',
  Unknown = 'Unknown',
}

const PersonSøk: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [personIdent, setPersonIdent] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<ErrorType>();
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const har11Siffer = personIdent.length === 11;

  const submitSøk = e => {
    e.preventDefault();
    setHasSearched(true);
    setResponseError(undefined);

    if (har11Siffer) {
      setAwaitingResponse(true);
      post(apiRoutes().HentSaksnummer, {
        identitetsnummer: personIdent,
      })
        .then(({ data }) => {
          const { saksnummer } = data;
          if (saksnummer) {
            history.push(`sak/${saksnummer}`);
          } else {
            setResponseError(ErrorType.Unknown);
          }
        })
        .catch(e => {
          const responseError = e as ResponseError;
          const status = responseError.response.status;

          switch (status) {
            case 403:
              setResponseError(ErrorType.NotAuthorised);
              break;
            case 404:
              setResponseError(ErrorType.NotFound);
              break;
            default:
              setResponseError(ErrorType.Unknown);
              break;
          }
        })
        .finally(() => setAwaitingResponse(false));
    }
  };

  return (
    <form onSubmit={submitSøk}>
      <FlexRow alignItems="flex-start">
        <Input
          value={personIdent}
          onChange={event => {
            setPersonIdent(event.target.value);
          }}
          type="number"
          label={t('personsøk.input.label')}
          bredde="M"
          feil={hasSearched && !har11Siffer && t('personsøk.input.feil')}
          disabled={awaitingResponse}
        />
        <AlignMedInputWrapper>
          <Hovedknapp onClick={submitSøk} htmlType="submit" disabled={awaitingResponse}>
            {t('personsøk.søkeknapp.søk')}
          </Hovedknapp>
        </AlignMedInputWrapper>
      </FlexRow>
      {awaitingResponse && (
        <FlexRow>
          <div><LoadingIndicator/></div>
          <p>Søker på person &hellip;</p>
        </FlexRow>
      )}
      {responseError && <p>{t(`personsøk.response.feil.${responseError}`)}</p>}
    </form>
  );
};

const AlignMedInputWrapper = styled.span`
  padding-top: 30px;
`;

export default PersonSøk;
