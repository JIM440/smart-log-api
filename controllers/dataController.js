const sequelize = require('../config/db.js');

// Function to fetch the latest sensor data (heartbeat, oxygen_saturation) and all rows from smartlog table
const GetDashboardData = async (req, res) => {
  try {
    const [sensorData, sensorMetadata] = await sequelize.query(`
        SELECT *
        FROM sensor_data
        ORDER BY timestamp DESC
      `);

    const [smartlogData, smartlogMetadata] = await sequelize.query(`
        SELECT * FROM smartlog;
      `);

    res.json({
      sensorData,
      smartlogData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

module.exports = { GetDashboardData };
