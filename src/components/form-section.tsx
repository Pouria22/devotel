import { FC } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { FormField } from './form-field';
import { FormField as IFormField } from '../types/forms.types';

interface FormSectionProps {
  fields: IFormField[];
  register: any;
  control: any;
  errors: any;
  watchAllFields: Record<string, any>;
  dynamicOptions: Record<string, string[]>;
}

export const FormSection: FC<FormSectionProps> = ({
  fields,
  register,
  control,
  errors,
  watchAllFields,
  dynamicOptions,
}) => {
  const renderNestedFields = (fields: IFormField[]) => {
    return fields.map((field) => (
      <Box key={field.id} sx={{ mb: 3 }}>
        {field.type === "group" ? (
          <Paper 
            elevation={0} 
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                mb: 2,
                color: 'primary.main',
                fontWeight: 500
              }}
            >
              {field.label}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ pl: 1 }}>
              {renderNestedFields(field.fields ?? [])}
            </Box>
          </Paper>
        ) : (
          <FormField
            field={field}
            register={register}
            control={control}
            errors={errors}
            watchAllFields={watchAllFields}
            dynamicOptions={dynamicOptions}
          />
        )}
      </Box>
    ));
  };

  return <>{renderNestedFields(fields)}</>;
};