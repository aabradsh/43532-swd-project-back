const express = require('express');
const router = express.Router();

//const {getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/EventsController');

const {createEvent, deleteEvent, getAllEvents, updateEvent} = require("../controllers/EventsController");

// Routes for Event Management
router.get('/', getAllEvents); // See all events
router.post('/', createEvent); // Create a new event
router.put('/:id', updateEvent); // Update an existing event
router.delete('/:id', deleteEvent); // Delete an existing event

module.exports = router;
