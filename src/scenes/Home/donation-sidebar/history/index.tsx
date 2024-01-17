import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { useAppStore } from '@/lib/store';
import s from './history.module.scss';
import { Visibility, VolunteerActivism } from '@mui/icons-material';
import toast from 'react-hot-toast';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const givers = useAppStore((state) => state.givers);
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography variant="h4">Donation History (Givers)</Typography>
      </DialogTitle>
      <Stack className={clsx([s.list, s.all])}>
        {givers.map((item, idx) => (
          <div key={idx} className={s.item}>
            <VolunteerActivism className={s.icon} color="disabled" />
            <Typography className={s.name}>{item.name}</Typography>
            &#8226;
            <Typography variant="subtitle1" className={s.amount}>
              ${item.amount}
            </Typography>
            &#8226;
            <Typography className={s.date}>{10 + idx} hrs</Typography>
          </div>
        ))}
      </Stack>
    </Dialog>
  );
}

function generateRandomInterval() {
  const minInterval = 3000; // 5 milliseconds
  const maxInterval = 7000; // 1 second
  const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
  return randomInterval;
}

const History = () => {
  const givers = useAppStore((state) => state.givers);

  const intervalRef = useRef<any>(null);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const randomInterval = generateRandomInterval();
    const intervalId = setInterval(() => {
      toast.success(`Henok donated - $10.00 - 0hr `, {
        icon: <VolunteerActivism />,
      });
    }, randomInterval);

    intervalRef.current = intervalId;

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []); // Empty dependency array to run the effect only once

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div className={s.container}>
      <Stack className={s.list}>
        {givers.slice(Math.max(givers.length - 3, 0)).map((item, idx) => (
          <div key={idx} className={s.item}>
            <VolunteerActivism className={s.icon} color="disabled" />
            <Typography className={s.name}>{item.name}</Typography>
            &#8226;
            <Typography variant="subtitle1" className={s.amount}>
              ${item.amount}
            </Typography>
            &#8226;
            <Typography className={s.date}>{10 + idx} hrs</Typography>
          </div>
        ))}
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        className={s.btn}
        startIcon={<Visibility />}
        onClick={handleClickOpen}
      >
        See All Donations
      </Button>

      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default History;
