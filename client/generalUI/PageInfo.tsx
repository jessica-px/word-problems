import React from 'react';
import styled from 'styled-components'
import { withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import LaunchIcon from '@material-ui/icons/Launch';
import Tooltip from '@material-ui/core/Tooltip';

import { PALETTE } from 'generalUI/styleConstants';


// -------------------------------------------------------------------------- //
//                                Main Component                              //
// -------------------------------------------------------------------------- //
/*
    <PageInfo /> renders the upper "info" portfion of a typical generator page,
    including the title, description, examples, etc.
*/

interface PageInfoProps {
  pageTitle: string,
  standard: {
    name: string,
    description: string,
    url: string
  },
  chipLabels: string[],
  exampleSentences: string[],
  descriptionBody: React.ReactNode;
}


export const PageInfo = (props: PageInfoProps) => (
  <React.Fragment>
    <PageTitle>
      <h1>{props.pageTitle}</h1>
      <StandardsLink
        name={props.standard.name}
        description={props.standard.description}
        url={props.standard.url}
      />
    </PageTitle>
    <Chips chipLabels={props.chipLabels}/>
    <h2>Description</h2>
    {props.descriptionBody}
    <h3>Examples</h3>
    <ExampleCard exampleSentences={props.exampleSentences}/>
  </React.Fragment>
)

// -------------------------------------------------------------------------- //
//                              Sub-Components                                //
// -------------------------------------------------------------------------- //

interface StandardsLinkProps {
  name: string,
  description: string,
  url: string
}

const StandardsLink = ({name, description, url}: StandardsLinkProps) => (
  <LightTooltip title={description} >
    <a href={url} target="_blank">
        {name} <LaunchIcon fontSize="small"/>
    </a>
  </LightTooltip>
)

interface ChipsProps {
  chipLabels: string[]
}

const Chips = ({chipLabels}: ChipsProps) => (
  <ChipContainer>
      {chipLabels.map(label => <Chip label={label} variant="outlined" key={label} />)}
  </ChipContainer>
)

interface ExampleCardProps {
  exampleSentences: string[]
}

const ExampleCard = ({exampleSentences}: ExampleCardProps) => (
  <Card variant="outlined">
    <CardContent>
      {exampleSentences.map((sentence, i) => <p key={i}>{sentence}</p>)}
    </CardContent>
  </Card>
)

// -------------------------------------------------------------------------- //
//                                  Styles                                    //
// -------------------------------------------------------------------------- //

const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChipContainer = styled.div`
  & > * {
    margin-right: 15px;
  }
`

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: PALETTE.background_light,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 2
  },
}))(Tooltip);