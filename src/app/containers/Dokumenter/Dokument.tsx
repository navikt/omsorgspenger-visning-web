import {ExpandablePanelBase} from 'app/components/ExpandablePanel/ExpandablePanel';
import Topplinje from 'app/components/ExpandablePanel/Topplinje';
import PanelWrapper from 'app/components/PanelWrapper/PanelWrapper';
import React from 'react';
import Dokument from '../../types/Dokument';
import styled from "styled-components";
import SendDokument from "../../components/icons/SendDokument";
import DokumentIcon from "../../components/icons/DokumentIcon";
import MottaDokument from "../../components/icons/MottaDokument";

interface Props {
  dokumenter: Dokument[];
}

const Dokumenter: React.FunctionComponent<Props> = ({dokumenter = []}) => {
  return <>
    <DokumenterContainer>
      <DokumentOverskrifter elementWidth={5}>Inn/ut</DokumentOverskrifter>
      <DokumentOverskrifter elementWidth={5}>Dokument</DokumentOverskrifter>
      <DokumentOverskrifter elementWidth={10}>Sendt/mottatt</DokumentOverskrifter>
    </DokumenterContainer>
    {dokumenter.map((b, i) => <Dokumentkomponent {...b} key={`dokument_${i}`}/>)}
  </>;
};

const Dokumentkomponent: React.FunctionComponent<Dokument> = dokument => {
  return <PanelWrapper>
    <DokumentContainer>
      <DokumentOverskrifter elementWidth={5}><MottaDokument/></DokumentOverskrifter>
      <DokumentOverskrifter elementWidth={5}>Samvarsavtale</DokumentOverskrifter>
      <DokumentOverskrifter elementWidth={5}>20.10.2020 - 13:15</DokumentOverskrifter>
      <ÅpneDokument><DokumentIcon/>Åpne dokument</ÅpneDokument>
    </DokumentContainer>
  </PanelWrapper>;
};

const DokumentOverskrifter = styled.div<{ elementWidth: number }>`
   width: elementWidth rem;
   margin-top: 0;
   margin-bottom: 1rem;
   display: flex;
   align-items: center;
   height: 2.5rem;
`;


const DokumenterContainer = styled.div`
  display: flex;
`;

const DokumentContainer = styled.div`
  display: flex;
  background-color: #f3f4f4;
`;


const ÅpneDokument = styled.div`
  flex: 2;
  padding-right: 1rem;
  display: flex;
  align-items: center;
`;


export default Dokumenter;
