import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { InputProps } from '../../../types/common';

const TextArea: React.FC<InputProps> = ({ name, defaultValue, label, margin = 'normal' }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin={margin}
          multiline
          rows={4}
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString()}
        />
      )}
    />
  );
};

export default TextArea;
