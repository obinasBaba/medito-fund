import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

import s from './info.module.scss';
import { Share } from '@mui/icons-material';

const Subscribe = () => {
  return (
    <div className={s.info}>
      <Stack direction="row" gap="1.5rem">
        <div className={s.img} />

        <Stack gap="1rem" className={s.txt}>
          <Typography variant="h2" className={s.title}>
            Transforming ideas into digital results
          </Typography>

          <Typography variant="body1">
            We take the time to understand your unique needs, goals, and audience to create a website that truly
            represents your brand and helps you connect with your customers on a deeper level.
          </Typography>
        </Stack>
      </Stack>

      <div className={s.actions}>
        <Button variant="contained" color="secondary" className={s.btn} startIcon={<Share fontSize="small" />}>
          Stare
        </Button>

        <Typography variant="subtitle2" color="gray">
          May, 15, 2022
        </Typography>
      </div>
    </div>
  );
};

export default Subscribe;
