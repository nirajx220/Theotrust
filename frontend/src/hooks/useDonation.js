import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import apiService from '../services/api';

export const useDonation = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const processDonation = async (donationData) => {
    if (!stripe || !elements) {
      setError('Payment system not ready. Please refresh the page.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create payment intent
      const { clientSecret, paymentIntentId, customerId } = await apiService.donations.createPaymentIntent({
        amount: donationData.amount,
        donationType: donationData.donationType,
        email: donationData.email,
        firstName: donationData.firstName,
        lastName: donationData.lastName,
      });

      // Step 2: Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${donationData.firstName} ${donationData.lastName}`,
            email: donationData.email,
            phone: donationData.phone,
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Step 3: Save donation to database
      await apiService.donations.createDonation({
        ...donationData,
        stripePaymentIntentId: paymentIntentId,
        stripeCustomerId: customerId,
        paymentMethod: {
          type: 'card',
          last4: paymentIntent.payment_method?.card?.last4,
          brand: paymentIntent.payment_method?.card?.brand,
        },
      });

      setSuccess(true);
      setLoading(false);
      return { success: true, paymentIntentId };

    } catch (err) {
      console.error('Donation error:', err);
      setError(err.message || 'An error occurred processing your donation');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const processSubscription = async (donationData, paymentMethodId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiService.donations.createSubscription({
        ...donationData,
        paymentMethodId,
      });
      
      // Save initial donation record
      await apiService.donations.createDonation({
        ...donationData,
        stripeSubscriptionId: result.subscriptionId,
        stripeCustomerId: result.customerId,
      });

      setSuccess(true);
      setLoading(false);
      return { success: true, subscriptionId: result.subscriptionId };

    } catch (err) {
      console.error('Subscription error:', err);
      setError(err.message || 'An error occurred setting up your subscription');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    processDonation,
    processSubscription,
    loading,
    error,
    success,
    setError,
    setSuccess,
  };
};
