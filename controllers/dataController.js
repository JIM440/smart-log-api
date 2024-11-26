const { axios } = require('axios');
const sequelize = require('../config/db.js');
const SensorData = require('../models/SensorData.js');

// Function to fetch the latest sensor data (heartbeat, oxygen_saturation) and all rows from smartlog table
const GetDashboardData = async (req, res) => {
  try {
    const [smartlogData, smartlogMetadata] = await sequelize.query(`
        SELECT * FROM smartlog;
      `);

    res.json({
      smartlogData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Controller to handle incoming vitals data from Arduino and store it temporarily
const GetVitalsData = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { temperature, spo2, heartRate } = req.query;

    // Probably handle edge cases for invalid or missing values
    const sensor_data = await SensorData.create({
      temperature,
      oxygen_saturation: spo2,
      heart_rate: heartRate,
    });

    res.status(201).json({ sensorData: sensor_data });
  } catch (error) {
    // If there's an error, respond with a server error
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to fetch the latest vitals data (for frontend display)
const DisplayVitals = async (req, res) => {
  try {
    const data = await SensorData.findAll();
    if (data.length === 0) {
      return res.status(404).json({ error: 'No vitals data available yet' });
    }

    // Send the latest vitals data to the frontend
    res.status(200).json({
      message: 'Latest vitals data',
      data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { GetDashboardData, GetVitalsData, DisplayVitals };
