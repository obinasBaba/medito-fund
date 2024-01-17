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
            Support Rich Henderson&apos;s Family
          </Typography>

          <Typography variant="body1">
            Heroes often go unsung, but their acts of bravery and kindness echo in the hearts of those they&apos;ve
            touched. Richard Henderson, was not only a guardian at the crosswalks of the school where he tirelessly
            worked;
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
