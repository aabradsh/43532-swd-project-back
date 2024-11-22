const express = require('express');
const router = express.Router();

const {getReport} = require('../controllers/ReportController');
const authenticateJWT = require('../middleware/authMiddleware');
// Route to get all appropriate events

router.get('/generateReport', authenticateJWT, getReport);

module.exports = router;