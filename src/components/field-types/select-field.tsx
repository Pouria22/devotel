import { FC, useCallback, useMemo } from 'react';
import { FormControl, FormLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { FormField as IFormField } from "../../types/forms.types";

export interface SelectFieldProps {
  field: IFormField;
  register: any;
  control: any;
  errors: any;
  watchAllFields: Record<string, any>;
  dynamicOptions: Record<string, string[]>;
}

export const SelectField: FC<SelectFieldProps> = ({
  field,
	register,
	errors,
	watchAllFields,
	dynamicOptions,
}) => {
  const getOptions = useCallback(() => {
    if (field.dynamicOptions) {
      const stateData = dynamicOptions?.state;
      if (field.id === 'state' && stateData?.states) {
        return stateData.states;
      }
      return [];
    }
    return field.options || [];
  }, [field.dynamicOptions, field.id, dynamicOptions?.state, field.options]);

  const options = useMemo(() => getOptions(), [getOptions]);

	if (field.visibility) {
		const dependentValue = watchAllFields[field.visibility.dependsOn];
		if (dependentValue !== field.visibility.value) {
			return null;
		}
	}
  return (
      <FormControl fullWidth error={!!errors[field.id]}>
        <FormLabel>{field.label}</FormLabel>
        <Select
          {...register(field.id, {
            required: field.required && "This field is required",
          })}
          defaultValue=""
          disabled={
            field.dynamicOptions &&
            !watchAllFields[field.dynamicOptions.dependsOn]
          }
        >
          {Array.isArray(options) && options.length > 0 ? (
            options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </Select>
        {errors[field.id] && (
          <FormHelperText>{errors[field.id].message}</FormHelperText>
        )}
      </FormControl>
  )
}