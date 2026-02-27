const express = require('express');
const path = require('path');
require('dotenv').config();

const foodRoutes = require('./routes/foodRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hyper-local-food-trend-agent' });
});

app.use('/api', foodRoutes);
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
