// backend/routes/paymentIntent.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount, customerId, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: servicePrice * 100 + 100, // Add $1 fee (in cents)
      currency: 'usd',
      capture_method: 'manual',
      customer: stripeCustomerId,
      payment_method: paymentMethodId, // from frontend
      confirm: true


    });

    res.json({ paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

