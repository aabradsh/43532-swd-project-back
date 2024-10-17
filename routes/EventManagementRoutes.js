const express = require('express');
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

// Routes for Event Management
router.get('/', getAllEvents); // See all events
router.post('/', createEvent); // Create a new event
router.put('/:id', updateEvent); // Update an existing event
router.delete('/:id', deleteEvent); // Delete an existing event

module.exports = router;
