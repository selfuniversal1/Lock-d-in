// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { fileURLToPath } = require('url');
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

// Supabase client setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Inject Supabase into requests
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

// Support for __dirname and __filename in CommonJS
const __filename = fileURLToPath(import.meta.url || '');
const __dirname = path.dirname(__filename || '');

// Serve static frontend files from Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});






