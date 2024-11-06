const express = require('express');
const router = express.Router();
const {
  getVolunteers,
  getEvents,
  matchVolunteersToEvents
} = require('../controllers/VolunteerMatchingController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/volunteers', authenticateJWT, getVolunteers);

router.get('/events', authenticateJWT, getEvents);

router.get('/match', authenticateJWT, matchVolunteersToEvents);

module.exports = router;
