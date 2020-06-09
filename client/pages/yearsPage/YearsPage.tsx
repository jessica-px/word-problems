import React, { useState } from 'react';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { CustomSlider, CustomRangeSlider } from 'generalUI/CustomSlider';
import { CustomCheckbox } from 'generalUI/CustomCheckbox';
import { RadioForm } from 'generalUI/RadioForm';
import { PageInfo } from 'generalUI/PageInfo';
import { API } from 'api';

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

interface FormData {
  file_name: string,
  num_problems: number,
  answer_sheet: boolean,
  age_range: number[],
  number_type: string,
  math_type: string,
  regrouping: string,
  extra_info: string
}

const ConfigurationSection = () => {
  const [numProblems, setNumProblems] = useState<number>(8);
  const onChangeNumProblems = (e: any, value: number) => {
    setNumProblems(value);
  }

  const [ageRange, setAgeRange] = useState<number[]>([10, 60]);
  const onChangeAgeRange = (e: any, value: number[]) => {
    setAgeRange(value);
  }

  const [useAnswerSheet, setUseAnswerSheet] = useState<boolean>(false);
  const onChangeUseAnswerSheet = (value: boolean) => {
    setUseAnswerSheet(value);
  }

  const [numberType, setNumberType] = useState<string>('Numbers Only');
  const onChangeNumberType = (value: string) => {
    setNumberType(value);
  }

  const [mathType, setMathType] = useState<string>('Addition Only');
  const onChangeMathType = (value: string) => {
    setMathType(value);
  }

  const [regrouping, setRegrouping] = useState<string>('Never');
  const onChangeRegrouping = (value: string) => {
    setRegrouping(value);
  }

  const [extraInfo, setExtraInfo] = useState<string>('Never');
  const onChangeExtraIndo = (value: string) => {
    setExtraInfo(value);
  }

  const getData = (): FormData => {
    return {
      file_name: 'years_and_ages.pdf',
      num_problems: numProblems,
      answer_sheet: useAnswerSheet,
      age_range: ageRange,
      number_type: numberType,
      math_type: mathType,
      regrouping: regrouping,
      extra_info: extraInfo
    }
  }

  return (
    <React.Fragment>
      <h2>Configure</h2>
      <ColumnWrapper>
        {/* ----- Column 1 ------------------- */}
        <Column>
          <CustomSlider
            label='Number of Problems'
            min={4}
            max={12}
            defaultValue={8}
            step={1}
            markStep={2}
            onChange={onChangeNumProblems}
          />
          <CustomRangeSlider
            label='Age Ranges'
            value={ageRange}
            min={10}
            max={90}
            step={5}
            markStep={10}
            onChange={onChangeAgeRange}
            tooltip='The allowable ages for the people in the problems. Use lower numbers and smaller ranges for earlier grades.'
          />
          <CustomCheckbox
            label="Include Answer Sheet"
            defaultState={false}
            onChange={onChangeUseAnswerSheet}
          />
        </Column>
        {/* ----- Column 2 ------------------- */}
        <Column>
          <RadioForm
            label='Number Display Type'
            options={['Numbers Only', 'Words Only', 'Numbers and Words']}
            onChange={onChangeNumberType}
          />
          <RadioForm
            label='Math Type'
            options={['Addition Only', 'Subtraction Only', 'Addition and Subtraction']}
            onChange={onChangeMathType}
          />
        </Column>
        {/* ----- Column 3 ------------------- */}
        <Column>
          <RadioForm
            label='Require Regrouping'
            options={['Never', 'Sometimes', 'Always']}
            onChange={onChangeRegrouping}
          />
          <RadioForm
            label='Extra Information'
            options={['Never', 'Sometimes', 'Always']}
            onChange={onChangeExtraIndo}
          />
        </Column>
      </ColumnWrapper>
      {/* ----- Button Section ------------------- */}
      <ButtonSection data={getData()} />
    </React.Fragment>
  )
}

// -------------------------------------------------------------------------- //
//                              Button Section                                //
// -------------------------------------------------------------------------- //

interface ButtonSectionProps {
  data: FormData
}

const ButtonSection = ({data}: ButtonSectionProps) => {
  const postAndDownload = () => {
    API.postAndDownload('/api/years', data)
  }

  const postAndOpen = () => {
    API.postAndOpenInNewTab('/api/years', data)
  }

  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GetAppIcon />}
        onClick={postAndDownload}
      >
        Download PDF
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<OpenInNewIcon />}
        onClick={postAndOpen}
      >
        Open PDF in New Tab
      </Button>
    </ButtonWrapper>
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
