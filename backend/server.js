
// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import webhookHandler from './routes/webhook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔒 Strip JSON/body parsing from webhook route completely
app.use('/webhook', webhookHandler);

// ✅ Normal parsing for everything else
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Lock’d In booking backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


