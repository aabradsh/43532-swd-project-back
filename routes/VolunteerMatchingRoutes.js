const express = require('express');
const router = express.Router();
const {
  matchVolunteersToEvents,
  getVolunteers,
  getEvents
} = require('../controllers/VolunteerMatchingController');

// Route to get matching events for a volunteer
router.get('/match', matchVolunteersToEvents);

// Route to get all volunteers (for populating the dropdown)
router.get('/volunteers', getVolunteers);

// Route to get all events (if needed)
router.get('/events', getEvents);

module.exports = router;
