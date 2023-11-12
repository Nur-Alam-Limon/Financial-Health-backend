// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

const secureMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const validToken = process.env.YOUR_SECURE_TOKEN; 

  if (token === validToken) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Routes
app.use('/api/data',secureMiddleware, require('../routes/data'));

// Serve a simple message on the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Financial Health API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
