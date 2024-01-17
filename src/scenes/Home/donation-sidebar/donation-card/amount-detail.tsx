import { Button, Checkbox, FormControlLabel, InputAdornment, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import React, { useEffect } from 'react';

import s from '@/scenes/Home/donation-sidebar/donation-card/donationcard.module.scss';
import { RadioButtonChecked } from '@mui/icons-material';

type Props = {
  formik: FormikProps<{ amount: string }>;
};

export const AmountDetail = ({ formik }: Props) => {
  const [selectedValue, setSelectedValue] = React.useState<number>();
  // const [amount, setAmount] = React.useState<number>();

  useEffect(() => {
    setSelectedValue(formik.values.amount ? Number(formik.values.amount) : undefined);
  }, []);

  useEffect(() => {
    if (selectedValue) {
      void formik.setFieldValue('amount', selectedValue);
    }
  }, [selectedValue]);

  return (
    <>
      <div className={s.suggestion}>
        {[50, 100, 250, 500, 1000, 2500].map((amount) => (
          <Button
            key={amount}
            variant="contained"
            color="secondary"
            className={s.btn}
            onClick={() => {
              setSelectedValue(amount);
            }}
            startIcon={selectedValue === amount ? <RadioButtonChecked color="secondary" /> : <></>}
          >
            <small>$</small> {amount}
          </Button>
        ))}
      </div>

      <FormControlLabel control={<Checkbox />} label="Donate Anonymous" />

      <TextField
        required
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: <InputAdornment position="start">USD</InputAdornment>,
        }}
        value={formik?.values.amount ?? ''}
        onChange={(e) => {
          // set the maximum amount to 1,000,000
          if (Number(e.target.value) > 9000000) {
            return;
          }

          // value must be positive
          if (Number(e.target.value) <= 0) {
            // setAmount('' as any);
            void formik.setFieldValue('amount', '');
            return;
          }

          setSelectedValue(undefined);
          void formik.setFieldValue('amount', Number(e.target.value));
        }}
      />
    </>
  );
};
