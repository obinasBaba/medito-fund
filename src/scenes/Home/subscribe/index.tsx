import { Button, TextField, Typography } from '@mui/material';
import React from 'react';

import Arrow from '@/components/icons/arrow';
import s from './subscribe.module.scss';

const Subscribe = () => {
  return (
    <div className={s.container}>
      <Typography variant="h4">Shall we keep you in the loop?</Typography>

      <Typography variant="body1">
        Content includes articles, early access to products, and ongoing learnings.
      </Typography>

      <TextField
        variant="outlined"
        label="Your Email"
        className={s.field}
        helperText={
          <Typography variant="subtitle2">
            You&apos;ll be subscriber number <b>500</b>.
          </Typography>
        }
      />

      <Button variant="contained" color="secondary" className={s.btn} startIcon={<Arrow />}>
        Subscribe
      </Button>
    </div>
  );
};

export default Subscribe;
