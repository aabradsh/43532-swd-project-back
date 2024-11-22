const express = require('express');
const router = express.Router();
const {
  getVolunteers,
  getEvents,
  accessVolunteerMatching,
  matchVolunteersToEvents
} = require('../controllers/VolunteerMatchingController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/access', authenticateJWT, accessVolunteerMatching);

router.get('/volunteers', authenticateJWT, getVolunteers);

router.get('/events', authenticateJWT, getEvents);

router.get('/match', authenticateJWT, matchVolunteersToEvents);

module.exports = router;
