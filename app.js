const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const optionRoutes = require('./routes/optionRoutes'); // Option routes dosyasını doğru import edin
const transactionRoutes = require('./routes/transactions'); // Transaction routes dosyasını doğru import edin
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// Enable CORS with default settings
app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  
  // Token varsa logla
  const token = req.header('x-auth-token');
  if (token) {
    console.log(`JWT token: ${token}`);
  } else {
    console.log(`JWT token yok`);
  }
  
  next();
});

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
