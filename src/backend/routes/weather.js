/* eslint-disable */
const express = require('express');
const router = express.Router();

const { getWeatherData } = require('../controllers/weather.js');

router.get('/', getWeatherData);

module.exports = router;