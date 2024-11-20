const express = require('express');
const { GetDashboardData } = require('../controllers/dataController.js');

const dataRoutes = express.Router();

dataRoutes.get('/', GetDashboardData);

module.exports = dataRoutes;
