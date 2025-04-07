import { FC } from 'react';
import { FormControl, FormLabel, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';
import { DateFieldProps } from '../../types/form-field.types';

interface Props extends DateFieldProps {
  control: any;
  errors: any;
}

export const DateField: FC<Props> = ({
  id,
  label,
  required,
  control,
  errors,
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormControl fullWidth error={!!errors[id]}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={id}
        control={control}
        rules={{ required: required && "This field is required" }}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={value || null}
            onChange={onChange}
            slotProps={{
              textField: {
                error: !!errors[id],
                helperText: errors[id]?.message,
                fullWidth: true
              }
            }}
          />
        )}
      />
    </FormControl>
  </LocalizationProvider>
);