import { FC } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import { RadioFieldProps } from '../../types/form-field.types';

interface Props extends RadioFieldProps {
  register: any;
  errors: any;
}

export const RadioField: FC<Props> = ({
  id,
  label,
  required,
  options = [],
  register,
  errors,
}) => (
  <FormControl error={!!errors[id]}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup>
      {options.map(option => (
        <FormControlLabel
          key={option}
          value={option}
          control={
            <Radio 
              {...register(id, {
                required: required && "This field is required"
              })}
            />
          }
          label={option}
        />
      ))}
    </RadioGroup>
    {errors[id] && (
      <FormHelperText>{errors[id].message}</FormHelperText>
    )}
  </FormControl>
);