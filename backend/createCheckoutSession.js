// backend/routes/createCheckoutSession.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Create or fetch customer
    const customer = await stripe.customers.create({ email });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: [{
        price: 'price_xxx', // 🔁 Replace with your $30 base plan price ID from Stripe
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.VITE_API_URL}/success`,
      cancel_url: `${process.env.VITE_API_URL}/failure`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
