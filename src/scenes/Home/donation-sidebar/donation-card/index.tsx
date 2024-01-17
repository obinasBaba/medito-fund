import { Button, CircularProgress, Stack, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import Arrow from '@/components/icons/arrow';
import { AmountDetail } from '@/scenes/Home/donation-sidebar/donation-card/amount-detail';
import { transition, wrapperVariants } from '@/scenes/Home/donation-sidebar/donation-card/variants';
import s from './donationcard.module.scss';
import { VolunteerActivism } from '@mui/icons-material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const steps = [
  {
    name: 'Fill in your personal information',
    Step: (props: any) => <AmountDetail {...props} />,
  },
  {
    name: 'Fill in your personal information',
    Step: () => <PaymentElement />,
  },
];

const DonationCard = () => {
  const [value, setValue] = React.useState(0);

  const [formSteps] = useState(steps);
  const [activeStep, setActiveStep] = useState(0);
  const [dir, setDir] = useState<'RIGHT' | 'LEFT'>();

  const stripe = useStripe();
  const elements = useElements();

  const [currentStep, setCurrentStep] = useState<(typeof formSteps)[number]>({
    ...formSteps[activeStep],
  });

  const handleNext = () => {
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
    setDir('LEFT');
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
    setDir('RIGHT');
  };

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  const formik = useFormik({
    initialValues: {
      amount: '' as any as number,
    },
    onSubmit: async () => {
      if (activeStep < formSteps.length - 1) {
        handleNext();
        return;
      }

      if (elements == null || stripe === null) {
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Show error to your customer
        toast.error(submitError.message ?? 'error', {
          position: 'top-right',
        });
        return;
      }

      // make an api route call to create a payment intent
      const response = await fetch('/api/payment-intent');
      const { client_secret: clientSecret }: any = await response.json();
      // const clientSecret = 'pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH';

      toast.success('Donation Successful');
      // get the curret full url from the browser
      const return_url = window.location.href;

      console.log('return_url : ', return_url);

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${return_url}?success=true`,
        },
        redirect: undefined,
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        toast.error(error?.message ?? 'error confirming', {
          position: 'top-right',
        });
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.

        toast.success('Donation Successful');
      }
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <motion.div className={s.container}>
      <header className={s.header}>
        <Button
          variant="text"
          color="secondary"
          className={s.back}
          startIcon={<Arrow />}
          style={{
            visibility: activeStep === 0 ? 'hidden' : 'visible',
          }}
          onClick={handleBack}
        >
          Back
        </Button>

        <Typography className={s.title}>Make a secure donation</Typography>

        <Tabs value={value} onChange={handleChange} className={s.tab} variant="fullWidth">
          <Tab label="One Time" />
          <Tab label="Monthly" />
        </Tabs>
      </header>

      <Stack gap={3} className={s.content} component={'form'} onSubmit={formik.handleSubmit}>
        <AnimatePresence mode="popLayout">
          <motion.div
            layout={'position'}
            className={s.animator}
            key={currentStep.name}
            variants={wrapperVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            custom={{ direction: dir }}
          >
            <currentStep.Step onReturn={handleBack} formik={formik} />
          </motion.div>
        </AnimatePresence>

        <Tooltip title={!formik.values.amount ? 'Please Select an amount' : ''} placement="top">
          <div>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={s.donate}
              style={{
                cursor: !formik.values.amount ? 'not-allowed' : 'pointer',
              }}
              startIcon={
                formik.isSubmitting ? <CircularProgress size="1rem" color="secondary" /> : <VolunteerActivism />
              }
              disabled={formik.isSubmitting}
            >
              Donate{' '}
              {formik.values.amount?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
              {activeStep === formSteps.length - 1 && ' now'}
            </Button>
          </div>
        </Tooltip>
      </Stack>
    </motion.div>
  );
};

export default DonationCard;
