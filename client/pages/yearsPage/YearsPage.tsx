import React, { useState } from 'react';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { CustomSlider } from 'generalUI/CustomSlider';
import { CustomCheckbox } from 'generalUI/CustomCheckbox';
import { RadioForm } from 'generalUI/RadioForm';
import { PageInfo } from 'generalUI/PageInfo';

// -------------------------------------------------------------------------- //
//                                Page Setup                                  //
// -------------------------------------------------------------------------- //

const pageTitle = 'Years and Ages';

const chipLabels = ['Grade 2', 'Grade 3', 'Addition', 'Subtraction'];

const DescriptionBody = () => (
  <p>
    Generate a worksheet in which students will use <strong>addition </strong>
    and/or <strong>subtraction</strong> to discover unknown ages, years of birth,
    and differences in years.
  </p>
)

const exampleSentences = [
  "1. Breanna is 28. Sandra is 2 years older than Breanna. How old is Sandra?",
  "2. Nick is 24. Maya is 17. How many years older is Nick than Maya?",
  "3. Michael was born in 1996. Emmet is 55 years older than Michael. In what year was Emmet born?"
];

const standard = {
  name: 'CCSS.Math.Content.2.OA.A.1',
  description: 'Use addition and subtraction within 100 to solve one- and two-step word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions, e.g., by using drawings and equations with a symbol for the unknown number to represent the problem.',
  url: 'http://www.corestandards.org/Math/Content/2/OA/'
}

// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

export const YearsPage = () => (
  <React.Fragment>
    <PageInfo
      pageTitle={pageTitle}
      chipLabels={chipLabels}
      exampleSentences={exampleSentences}
      standard={standard}
      descriptionBody={<DescriptionBody />}
    />
    <ConfigurationSection />
  </React.Fragment>
)

// -------------------------------------------------------------------------- //
//                           Configuration Section                            //
// -------------------------------------------------------------------------- //

const ConfigurationSection = () => {
  const [numProblems, setNumProblems] = useState<number>(15);
  const onChangeNumProblems = (e: any, value: number) => {
    setNumProblems(value);
  }

  const [useAnswerSheet, setUseAnswerSheet] = useState<boolean>(false);
  const onChangeUseAnswerSheet = (value: boolean) => {
    setUseAnswerSheet(value);
  }

  const [useComicSans, setUseComicSans] = useState<boolean>(false);
  const onChangeUseComicSans = (value: boolean) => {
    setUseComicSans(value);
  }

  const postForm = () => {
    console.log('Problems: ' + numProblems)
    console.log('Answer Sheet: ' + useAnswerSheet)
    console.log('Comic Sans: ' + useComicSans)
  }

  return (
    <React.Fragment>
      <h2>Configure</h2>
      <ColumnWrapper>
        {/* ----- Column 1 ------------------- */}
        <Column>
          <CustomSlider
            label='Number of Problems'
            min={10}
            max={30}
            defaultValue={15}
            step={5}
            onChange={onChangeNumProblems}
          />
          <CustomCheckbox
            label="Include Answer Sheet"
            defaultState={false}
            onChange={onChangeUseAnswerSheet}
          />
          <CustomCheckbox
            label="Use Comic Sans"
            defaultState={false}
            onChange={onChangeUseComicSans}
          />
        </Column>
        {/* ----- Column 2 ------------------- */}
        <Column>
          <RadioForm
            label='Number Display Type'
            options={['Numbers Only', 'Words Only', 'Numbers and Words']}
          />
          <RadioForm
            label='Math Type'
            options={['Addition Only', 'Subtraction Only', 'Addition and Subtraction']}
          />
        </Column>
        {/* ----- Column 3 ------------------- */}
        <Column>
          <RadioForm
            label='Require Regrouping'
            options={['Never', 'Sometimes', 'Always']}
          />
          <RadioForm
            label='Extra Information'
            options={['Never', 'Sometimes', 'Always']}
          />
        </Column>
      </ColumnWrapper>
      {/* ----- Button Section ------------------- */}
      <ButtonWrapper>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GetAppIcon />}
          onClick={postForm}
        >
          Download PDF
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<OpenInNewIcon />}
        >
          Open PDF in New Tab
        </Button>
      </ButtonWrapper>
    </React.Fragment>
  )
}

// -------------------------------------------------------------------------- //
//                                 Styles                                     //
// -------------------------------------------------------------------------- //

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 250px;
  margin-right: 100px;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.span`
  flex: 1;
  padding: 0 30px;
  & > div {
    margin-bottom: 50px;
  }
`
