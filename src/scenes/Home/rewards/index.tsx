import { Stack, Typography } from '@mui/material';
import React from 'react';

import s from './rewards.module.scss';

const Rewards = () => {
  return (
    <div className={s.container}>
      <Typography variant="h4" className={s.title}>
        We Saying &quot;Thank You&quot;
      </Typography>

      <Typography variant="body1">We take the time to understand your unique needs</Typography>

      <div className={s.actions}>
        {[1, 2, 3, 4].map((_, i) => (
          <Stack className={s.reward} key={i}>
            <Typography variant="subtitle2" className={s.amount}>
              $12.00
            </Typography>

            <Typography variant="body1" className={s.title}>
              Reward {i + 1}
            </Typography>

            <ul>
              <li>1.5% Cash Back</li>
              <li>2% Crypto Back</li>
            </ul>
          </Stack>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
