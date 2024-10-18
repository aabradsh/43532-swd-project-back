const express = require('express');
const router = express.Router();

const {getEvents} = require('../controllers/VolunteerHistoryController');

// Route to get all appropriate events
router.get('/events', getEvents);

module.exports = router;