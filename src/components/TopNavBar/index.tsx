'use client';

import { Button, Drawer, Slide, Stack, useMediaQuery, useScrollTrigger } from '@mui/material';
import { useTheme } from '@mui/system';
import Link from 'next/link';
import React, { useState } from 'react';

import DonationSidebar from '@/scenes/Home/donation-sidebar';
import s from './topnavbar.module.scss';
import { VolunteerActivism } from '@mui/icons-material';

export function HideOnScroll(props: any) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <HideOnScroll>
      <nav className={s.container}>
        <div className={s.wrapper}>
          <Link href="/" className={s.logo}>
            <VolunteerActivism fontSize="large" />
          </Link>

          <Stack direction="row" alignItems="center" gap="1.5rem">
            <Link href="mailto:medito@meditation.com">
              <Button className={s.btn} variant="contained">
                Contact
              </Button>
            </Link>

            <Button
              variant="contained"
              color="secondary"
              className={s.donate}
              startIcon={<VolunteerActivism />}
              onClick={() => setIsOpen(true)}
            >
              Donate Now
            </Button>
          </Stack>

          {!match && (
            <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
              <Stack
                sx={{
                  width: '30rem',
                }}
              >
                <DonationSidebar
                  scrollbar={{
                    sx: {
                      height: '100vh',
                    },
                  }}
                />
              </Stack>
            </Drawer>
          )}
        </div>
      </nav>
    </HideOnScroll>
  );
}
