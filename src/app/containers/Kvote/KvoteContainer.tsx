import React from 'react';
import {useTranslation} from "react-i18next";
import {apiRoutes} from "../../../utils/http/apiConfig";
import useGet from "../../../utils/http/useGet";
import navColors from "../../../styles/designSystemColors";

import RammemeldingOverskrift from "../../components/RammemeldingOverskrift/RammemeldingOverskrift";
import {LoadingIndicator} from "../../components/LoadingIndicator";

interface Props {
    saksnummer: string;
};

export const KvoteContainer: React.FunctionComponent<Props> = ({saksnummer}) => {
    const {t} = useTranslation();
    const {data, error, loading} = useGet(`${apiRoutes().Kvote}?status=Aktiv&saksnummer=${saksnummer}`);
    const errorStatus = error?.response?.status;
    const date = new Date().getFullYear();

    return (
        <>
            <RammemeldingOverskrift>
                {<span>Overskrift</span>}
            </RammemeldingOverskrift>

            {loading && <LoadingIndicator/>}

            {error && (<p>
                {
                    errorStatus === 404 ? (
                        <>
                            {<span>Feilkode</span>}
                            <code>{`${saksnummer}`}</code>
                        </>
                    ) : (
                        <span>Feil ukjent</span>
                    )
                }
            </p>)
            }

            {data !== null && data.dager !== null && <div>Content</div>}
        </>
    );
}

export default KvoteContainer;