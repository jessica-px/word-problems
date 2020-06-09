import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


interface RadioFormProps {
  label: string,
  options: any,
  onChange: any,
  disabled?: boolean
}

export const RadioForm = ({label, options, onChange, disabled}: RadioFormProps) => {
  const [value, setValue] = React.useState(options[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup aria-label={label} name={label} value={value} onChange={handleChange}>
          {options.map((option: string) => (
            <FormControlLabel value={option} control={<Radio />} label={option} disabled={disabled}/>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}