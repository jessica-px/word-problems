import React from 'react';
import styled, { css } from 'styled-components'
import { withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import LaunchIcon from '@material-ui/icons/Launch';
import Tooltip from '@material-ui/core/Tooltip';


// -------------------------------------------------------------------------- //
//                                Page Setup                                  //
// -------------------------------------------------------------------------- //

const pageTitle = 'Years and Ages';

const chipLabels = ['Grade 2', 'Grade 3', 'Addition', 'Subtraction'];

const DescriptionBody = () => (
  <p>
    Generate a worksheet in which students will use <strong>addition </strong>
    and <strong>subtraction</strong> to discover unknown ages, years of birth,
    and differences in years.
  </p>
)

const exampleSentences = [
  "1. Breanna is 28. Sandra is 2 years older than Breanna. How old is Sandra?",
  "2. Nick is 24. Maya is 17. How many years older is Nick than Maya?",
  "3. Michael was born in 1996. Emmet is 55 years older than Michael. In what year was Emmet born?"
];

const standardName = 'CCSS.Math.Content.2.OA.A.1'
const standardDescription = 'Use addition and subtraction within 100 to solve one- and two-step word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions, e.g., by using drawings and equations with a symbol for the unknown number to represent the problem.'
const standardUrl = 'http://www.corestandards.org/Math/Content/2/OA/'

// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

export const YearsPage = () => (
  <React.Fragment>
    <PageInfo />
  </React.Fragment>
)

// -------------------------------------------------------------------------- //
//                              Sub-Components                                //
// -------------------------------------------------------------------------- //

const PageInfo = () => (
  <React.Fragment>
    <PageTitle>
      <h1>{pageTitle}</h1>
      <StandardsLink
        name={standardName}
        description={standardDescription}
        url={standardUrl}
      />
    </PageTitle>
    <Chips />
    <h2>Description</h2>
    <DescriptionBody />
    <h3>Examples</h3>
    <ExampleCard />
  </React.Fragment>
)

interface StandardsLinkProps {
  name: string,
  description: string,
  url: string
}

const StandardsLink = ({name, description, url}: StandardsLinkProps) => (
  <LightTooltip title={description} >
    <a href={url}>
        {name} <LaunchIcon fontSize="small"/>
    </a>
  </LightTooltip>
)

const Chips = () => (
  <ChipContainer>
      {chipLabels.map(label => <Chip label={label} variant="outlined" key={label} />)}
  </ChipContainer>
)

const ExampleCard = () => (
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
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 2
  },
}))(Tooltip);