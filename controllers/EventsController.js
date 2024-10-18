const Event = require('../models/eventModel');
const { validateEvent } = require('../utils/validateEvent');

// Get all events
const getAllEvents = (req, res) => {
  const events = Event.getAll();
  res.status(200).json(events);
};

// Create a new event
const createEvent = (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const newEvent = Event.create(req.body);
  res.status(201).json(newEvent);
};

// Update an existing event
const updateEvent = (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedEvent = Event.update(req.params.id, req.body);
  if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

  res.status(200).json(updatedEvent);
};

// Delete an event
const deleteEvent = (req, res) => {
  const success = Event.delete(req.params.id);
  if (!success) return res.status(404).json({ message: 'Event not found' });

  res.status(200).json({ message: 'Event deleted successfully' });
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
