const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/db.js');
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

// Initialize middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // Adjust to your frontend address
    credentials: true,
  })
);

// Define routes
const authRoutes = require('./routes/authRoutes.js');
const dataRoutes = require('./routes/dataRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Fuel prediction route
app.post('/api/fuel-prediction', async (req, res) => {
  try {
    // Extract 'distance' and 'mpg' from the incoming request body
    const { distance, mpg } = req.body;

    if (distance === undefined || mpg === undefined) {
      return res
        .status(400)
        .json({ error: 'Invalid request. Distance and mpg are required.' });
    }

    // Prepare the payload to be sent to the localhost:8000/predict_fuel
    const requestPayload = {
      distance: distance,
      consommation_100km: mpg,
    };

    // Send POST request to the localhost:8000/predict_fuel endpoint
    const predictionResponse = await axios.post(
      'http://192.168.100.52:8000/predict_fuel',
      requestPayload
    );

    // Get the prediction result from the response
    const prediction = predictionResponse.data;

    // Respond with the prediction data back to the frontend
    console.log('==========prediction============:', prediction);
    res.status(200).json({ prediction });
  } catch (error) {
    // Handle errors (e.g., connection issues, invalid responses, etc.)
    console.error(
      'Error making request to localhost:8000/predict_fuel:',
      error
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dataRoutes);
app.use('/api/users', userRoutes);

// Connect to DB and start the server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to DB and running on port ${PORT} 😎😎😎😎`);
  });
});
