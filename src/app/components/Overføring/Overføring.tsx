import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import DeleDagerPanel from '../ExpandablePanel/DeleDagerPanel';
import navColors from '../../../styles/designSystemColors';
import { Overføring as OverføringType } from '../../types';
import Dato from '../../types/Dato';
import LabelValue from '../LabelValue/LabelValue';
import Hr from '../Hr/Hr';
import { CheckIcon } from '../icons';
import { FlexRow, FlexContainer } from '../Flex';

interface Props {
  overføring: OverføringType;
  defaultOpen: boolean;
  farge: navColors;
}

const isoDateToLocale = (date: Dato) => new Date(date).toLocaleDateString();

const Overføring: React.FunctionComponent<Props> = ({
  overføring,
  defaultOpen,
  farge,
}) => {
  const {
    til,
    fra,
    gjelderFraOgMed,
    gjelderTilOgMed,
    dagerOverført,
    dagerØnsketOverført,
    begrunnelserForPeriode
  } = overføring;
  const [visDagerGittInnhold, setVisDagerGittInnhold] = useState<boolean>(
    defaultOpen,
  );
  const {t} = useTranslation();

  return (
    <DeleDagerPanel
      visInnhold={visDagerGittInnhold}
      setVisInnhold={() => setVisDagerGittInnhold(current => !current)}
      farge={farge}
      overskrift={{
        antallDager: dagerOverført,
        overskrifttekstId: til ? 'overføring.dagerGir' : 'overføring.dagerFår',
      }}
    >
      <FlexContainer childSpacing="2em">
        {til && (
          <LabelValue
            labelTextId={'overføring.til'}
            value={til}
            retning="vertikal"
          />
        )}
        {fra && (
          <LabelValue
            labelTextId={'overføring.fra'}
            value={fra}
            retning="vertikal"
          />
        )}
        <LabelValue
          labelTextId="overføring.gyldighetsperiode"
          value={`${isoDateToLocale(gjelderFraOgMed)} - ${isoDateToLocale(
            gjelderTilOgMed,
          )}`}
          retning="vertikal"
        />
        <LabelValue
          labelTextId="overføring.ønsketOverført"
          value={dagerØnsketOverført}
          retning="vertikal"
        />
      </FlexContainer>
      {til && (
        <>
          <Hr marginTopPx={16} marginBottomPx={16} />
          <LabelValue
            labelTextId="overføring.grunnlag"
            value={begrunnelserForPeriode.map(periode => <div key={periode.gjelderFraOgMed}>
              <Periodeoverskrift>
                {t('overføring.grunnlag.periodeoverskrift', {
                  fom: isoDateToLocale(periode.gjelderFraOgMed),
                  tom: isoDateToLocale(periode.gjelderTilOgMed)
                })}
              </Periodeoverskrift>
              {periode.begrunnelser.map(begrunnelse => (
                <FlexRow alignItems="baseline" key={`${periode.gjelderFraOgMed} ${begrunnelse}`}>
                  <CheckIcon />
                  <span>{begrunnelse}</span>
                </FlexRow>
              ))}
            </div>)}
            retning="vertikal"
          />
        </>
      )}
    </DeleDagerPanel>
  );
};

const Periodeoverskrift = styled.p`
  border-bottom: 1px solid ${navColors.navGra20};
  margin-bottom: .5rem;
  margin-top: 1rem;
`;

export default Overføring;
