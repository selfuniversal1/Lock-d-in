// server.js
import createSubscriptionSession from './routes/createSubscriptionSession.js';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Supabase client setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Make Supabase client available in routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
const checkoutRoute = require('./routes/createCheckoutSession');
const webhookRoute = require('./routes/webhook');
const paymentIntentRoute = require('./routes/paymentIntent');
const captureRoute = require('./routes/capturePayment');
const updateAndCapturePayment = require('./routes/updateAndCapturePayment');


app.use('/', bookingRoutes);
app.use('/', checkoutRoute);
app.use('/webhook', webhookRoute);
app.use('/', paymentIntentRoute);
app.use('/', captureRoute);
app.use('/update-payment', updateAndCapturePayment);
app.use('/create-subscription-session', createSubscriptionSession);



// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});






