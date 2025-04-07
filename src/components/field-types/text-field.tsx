import { FC } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { TextFieldProps } from '../../types/form-field.types';

interface Props extends TextFieldProps {
  register: any;
  errors: any;
}

export const TextField: FC<Props> = ({
  id,
  label,
  required,
  validation,
  register,
  errors,
}) => (
  <MuiTextField
    {...register(id, {
      required: required && "This field is required",
      pattern: validation?.pattern && {
        value: new RegExp(validation.pattern),
        message: "Invalid format"
      }
    })}
    label={label}
    fullWidth
    error={!!errors[id]}
    helperText={errors[id]?.message}
  />
);