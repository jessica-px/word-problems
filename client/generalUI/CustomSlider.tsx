import React from 'react';
import styled, { css } from 'styled-components'
import { withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { COLORS } from 'generalUI/styleConstants';

// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

interface CustomSliderProps {
  min: number,
  max: number,
  defaultValue: number,
  step: number,
  label: string
}

export const CustomSlider = ({min, max, defaultValue, step, label}: CustomSliderProps) => (
  <div>
    <Typography id={`slider-${label}`} gutterBottom>
      {label}
    </Typography>
    <StyledSlider
      defaultValue={defaultValue}
      aria-labelledby={`slider-${label}`}
      valueLabelDisplay="auto"
      min={min}
      max={max}
      marks={getMarks(min, max, step)}
      step={step}
    />
  </div>
)

// -------------------------------------------------------------------------- //
//                                  Helpers                                   //
// -------------------------------------------------------------------------- //

const getMarks = (min: number, max: number, step: number) => {
  const marks = [];
  for (let i = min; i <= max; i+=step) {
    console.log(i)
    if (i % 5 == 0) {
      marks.push({value: i, label: i});
    }
    else {
      marks.push({value: i, label: ''});
    }
  }
  return marks;
}

// -------------------------------------------------------------------------- //
//                                  Styles                                    //
// -------------------------------------------------------------------------- //


const StyledSlider = withStyles({
  track: {
    height: 3,
  },
  rail: {
    height: 3,
    backgroundColor: COLORS.faded_mint,
    opacity: 1,
  },
  mark: {
    height: 8,
    width: 2,
    marginTop: -2,
    backgroundColor: COLORS.faded_mint
  },
  markActive: {
    height: 7,
    width: 2,
    opacity: 1,
    backgroundColor: 'currentColor',
  }
})(Slider)