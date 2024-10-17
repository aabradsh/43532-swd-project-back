const express = require('express');
const router = express.Router();

const {
    getEvent,
    getVolunteers,
    displayEvent}
     = require('../controllers/VolunteerHistoryController');

//route to display events
router.get('/display', displayEvents);

// Route to get all events
router.get('/events', getEvents);

//Route to get volunteers (If event doesn't contain volunteer names)
router.get('/volunteers', getVolunteers);

module.exports = router