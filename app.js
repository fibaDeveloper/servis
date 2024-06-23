// app.js
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const optionRoutes = require('./routes/optionRoutes');
const dotenv = require('dotenv');


dotenv.config();

const app = express();


connectDB();

app.use(express.json());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
