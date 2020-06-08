import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface CustomCheckboxProps {
  label: string,
  defaultState: boolean,
  onChange: any
}

export const CustomCheckbox = ({label, defaultState, onChange}: CustomCheckboxProps) => {
  const [checked, setChecked] = React.useState(defaultState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} name={label} />}
        label={label}
      />
    </div>
  );
}
