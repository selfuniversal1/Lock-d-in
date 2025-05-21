// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const createCheckoutSession = require('./routes/createCheckoutSession');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/create-checkout-session', createCheckoutSession);

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('Lock’d In API is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});





