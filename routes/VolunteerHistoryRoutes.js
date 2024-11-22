const express = require('express');
const router = express.Router();

const {showEvents} = require('../controllers/VolunteerHistoryController');
const authenticateJWT = require('../middleware/authMiddleware');
// Route to get all appropriate events

router.get('/show', authenticateJWT, showEvents);

module.exports = router;