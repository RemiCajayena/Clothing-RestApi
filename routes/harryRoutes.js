const express = require('express');
const harryController = require('./../controllers/harryController');

const router = express.Router();

router
    .route('/')
    .get(harryController.fetchData)

module.exports = router;