import { FC } from 'react';
import { TextField } from '@mui/material';
import { NumberFieldProps } from '../../types/form-field.types';

interface Props extends NumberFieldProps {
  register: any;
  errors: any;
}

export const NumberField: FC<Props> = ({
  id,
  label,
  required,
  validation,
  register,
  errors,
}) => (
  <TextField
    {...register(id, {
      required: required && "This field is required",
      valueAsNumber: true,
      min: validation?.min && {
        value: validation.min,
        message: `Value must be greater than ${validation.min}`
      },
      max: validation?.max && {
        value: validation.max,
        message: `Value must be less than ${validation.max}`
      }
    })}
    type="number"
    label={label}
    fullWidth
    error={!!errors[id]}
    helperText={errors[id]?.message}
  />
);