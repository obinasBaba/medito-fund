import React, { useState } from 'react';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null || stripe === null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    // const res = await fetch('/create-intent', {
    //   method: 'POST',
    // });
    //
    // const { client_secret: clientSecret } = await res.json();

    const clientSecret = 'pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH';

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,

      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error?.message ?? 'error');
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe(
  'pk_test_51OZHVcIJ3gOeHcJF5wFuyiGbVr1s1Ue0cdMedEC0NBjIcKSPQCvD6PuprslfNIgotka9ec2yegMkl3EIX1x33fYG00n3UGP9hz',
  {
    stripeAccount: 'acct_1OZHVcIJ3gOeHcJF',
  }
);

const options: StripeElementsOptions = {
  mode: 'payment', // ${id}_secret_${secret}
  // clientSecret: 'pi_1OZHVcIJ3gOeHcJF5wFuyiGbVr1s1Ue0cdMedEC0NBjIcKSPQCvD6PuprslfNIgotka9ec2yegMkl3EIX1x33fYG00n3UGP9hz_secret_123',

  amount: 200,
  currency: 'usd', // Fully customizable with appearance API.
  appearance: {},
};

const App = () => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>
);

export default App;
