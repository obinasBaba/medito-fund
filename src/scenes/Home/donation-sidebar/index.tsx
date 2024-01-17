import { Chip, Skeleton, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import DonationCard from '@/scenes/Home/donation-sidebar/donation-card';
import History from '@/scenes/Home/donation-sidebar/history';
import s from './donation_sidebar.module.scss';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import SimpleBar from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';

import { useTheme } from '@mui/system';

import { motion } from 'framer-motion';

const stripePromise = loadStripe(
  'pk_test_51OZHVcIJ3gOeHcJF5wFuyiGbVr1s1Ue0cdMedEC0NBjIcKSPQCvD6PuprslfNIgotka9ec2yegMkl3EIX1x33fYG00n3UGP9hz',
  {
    stripeAccount: 'acct_1OZHVcIJ3gOeHcJF',
  }
);

const options: StripeElementsOptions = {
  mode: 'payment',
  amount: 200,
  currency: 'usd',
  appearance: {},
};

export const Scrollbar = styled(SimpleBar)``;

const DonationSidebar = (props: any) => {
  const [toolTipInView, setToolTipInView] = useState(true);

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={s.container}>
      <Scrollbar
        // autoHide={false}
        className={s.side_nav}
        sx={{
          height: '80vh',
          '& .simplebar-content': {
            height: '100%',
          },
          '& .simplebar-scrollbar:before': {
            background: 'gray',
          },

          '& .simplebar-track': {
            right: '-1.6rem ',
          },
          ...props?.scrollbar?.sx,
        }}
      >
        <Stack className={s.wrapper}>
          <Stack gap={1}>
            <div className={s.target}>
              <Typography>$ 0</Typography>
              <Typography>$ 14,000</Typography>
            </div>
            <div className={s.progress}>
              <motion.div
                className={s.collected}
                onViewportEnter={() => {
                  setToolTipInView(true);
                }}
                onViewportLeave={() => {
                  setToolTipInView(false);
                }}
              >
                <Skeleton animation="wave" className={s.wave} />
                <Tooltip
                  title={<Typography fontWeight={900}>$4,000</Typography>}
                  // open={match && toolTipInView}
                  open={match && toolTipInView}
                  arrow
                  placement="top"
                  slotProps={{
                    tooltip: {
                      style: {
                        backgroundColor: '#E3CCB5',
                        color: 'black',
                      },
                    },
                    arrow: {
                      style: {
                        // fill: 'red'
                        left: '2px',
                        right: 0,
                      },
                    },
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -10],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <div className={s.tooltip} />
                </Tooltip>
              </motion.div>
            </div>
          </Stack>

          <div className={s.stats}>
            <Chip
              label={
                <Stack direction="row" alignItems="center">
                  Target : &nbsp;
                  <Typography fontWeight={600} variant="subtitle1">
                    $11,00
                  </Typography>
                </Stack>
              }
            />
            <Chip
              label={
                <Stack direction="row" alignItems="center">
                  Day Left : &nbsp;
                  <Typography fontWeight={600} variant="subtitle1">
                    100
                  </Typography>
                </Stack>
              }
            />
            <Chip
              label={
                <Stack direction="row" alignItems="center">
                  Donators : &nbsp;
                  <Typography fontWeight={600} variant="subtitle1">
                    300
                  </Typography>
                </Stack>
              }
            />
          </div>

          <Elements stripe={stripePromise} options={options}>
            <DonationCard />
          </Elements>

          <History />
        </Stack>
      </Scrollbar>
    </div>
  );
};

export default DonationSidebar;
