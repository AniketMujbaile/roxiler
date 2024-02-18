 
const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/bar-chart', chartController.getBarChartData);
router.get('/pie-chart', chartController.getPieChartData);

module.exports = router;
