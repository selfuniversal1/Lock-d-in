// server.js
import createSubscriptionSession from '../routes/createSubscriptionSession.js';
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
const bookingRoutes = require('../routes/bookingRoutes.js');
const checkoutRoute = require('./routes/createCheckoutSession.js');
const webhookRoute = require('../routes/webhook.js');
const paymentIntentRoute = require('../routes/paymentIntent.js');
const captureRoute = require('../routes/capturePayment.js');
const updateAndCapturePayment = require('../routes/updateAndCapturePayment.js');


app.use('/', bookingRoutes);
app.use('/', checkoutRoute);
app.use('/webhook', webhookRoute);
app.use('/', paymentIntentRoute);
app.use('/', captureRoute);
app.use('/update-payment', updateAndCapturePayment);
app.use('/create-subscription-session', createSubscriptionSession);

import path from 'path';
import { fileURLToPath } from 'url';

// Needed if you're using ES Modules syntax in parts of your project:
const __filename = fileURLToPath(import.meta.url || '');
const __dirname = path.dirname(__filename || '');

// Serve static files from Vite's build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});






