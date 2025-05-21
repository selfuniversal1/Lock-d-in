const express = require('express');
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Required to parse Stripe payload
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const shopId = session.metadata.shop_id;
    const providerId = session.metadata.provider_id;

    // Call Supabase RPC function to register first provider
    const { error } = await supabase.rpc('add_subscription', {
      p_shop_id: shopId,
      p_provider_id: providerId,
    });

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).send('Supabase insert failed');
    }
  }

  res.status(200).json({ received: true });
});
