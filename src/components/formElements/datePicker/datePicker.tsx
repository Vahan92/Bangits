import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Typography } from '@mui/material';

import { InputProps } from '../../../types/common';

const FormDatePicker: React.FC<InputProps> = ({ name, defaultValue, label }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const error = errors[name]?.message?.toString();
        return (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                minDate={new Date()}
                sx={{ width: '100%' }}
                label={label}
                value={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
              />
            </LocalizationProvider>
            {error && (
              <Typography
                sx={{
                  display: 'inline-block',
                  margin: '3px 0 0 14px',
                  color: '#d32f2f',
                  fontSize: '0.75rem',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                {error}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
};

export default FormDatePicker;
