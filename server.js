// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const createSubscriptionSession = require('./routes/createSubscriptionSession.js');
const webhookRoute = require('./routes/webhook.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const checkoutRoute = require('./routes/createCheckoutSession.js');
const paymentIntentRoute = require('./routes/paymentIntent.js');
const captureRoute = require('./routes/capturePayment.js');
const updateAndCapturePayment = require('./routes/updateAndCapturePayment.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Inject Supabase into all requests
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
app.use('/', bookingRoutes);
app.use('/', checkoutRoute);
app.use('/webhook', webhookRoute);
app.use('/', paymentIntentRoute);
app.use('/', captureRoute);
app.use('/update-payment', updateAndCapturePayment);
app.use('/create-subscription-session', createSubscriptionSession);

// Serve static files from 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});







