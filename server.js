require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const tradeRoutes = require('./src/routes/tradeRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors()); // Allow all origins for now
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trade', tradeRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
