const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../adminControllers/dashboardController');
const isAllowed = require('../middleware/checkPermission');

dashboardRouter.get('/admin/dashboard', isAllowed, dashboardController.dashboard);

module.exports = dashboardRouter;