import { FC } from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { CheckboxFieldProps } from '../../types/form-field.types';

interface Props extends CheckboxFieldProps {
  register: any;
  errors: any;
}

export const CheckboxField: FC<Props> = ({
  id,
  label,
  required,
  options = [],
  register,
  errors,
}) => (
  <FormControl error={!!errors[id]}>
    <FormLabel>{label}</FormLabel>
    <FormGroup>
      {options.map(option => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              {...register(id, {
                required: required && "At least one option must be selected"
              })}
              value={option}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
    {errors[id] && (
      <FormHelperText>{errors[id].message}</FormHelperText>
    )}
  </FormControl>
);