const express = require('express');
const {
  GetDashboardData,
  GetVitalsData,
  DisplayVitals,
} = require('../controllers/dataController.js');

const dataRoutes = express.Router();

dataRoutes.get('/', GetDashboardData);
dataRoutes.get('/vitals', GetVitalsData);
dataRoutes.get('/display-vitals', DisplayVitals);

module.exports = dataRoutes;
