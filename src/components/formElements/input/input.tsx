import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

import { InputProps } from '../../../types/common';

const input: React.FC<InputProps> = ({ name, label, margin = 'normal' }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin={margin}
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString()}
        />
      )}
    />
  );
};

export default input;
