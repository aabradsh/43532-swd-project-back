const Event = require('../models/Event');

// Get all events
// const getAllEvents = (req, res) => {
//   console.log('get');

//   const events = Event.getAll();
//   console.log(events);
//   res.status(200).json(events);
// };

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Create a new event
const createEvent = (req, res) => {
  console.log('post');
  const newEvent = Event.create(req.body);
  res.status(201).json(newEvent);
};

// Update an existing event
const updateEvent = (req, res) => {
  console.log('put');
  const updatedEvent = Event.update(req.params.id, req.body);
  if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

  res.status(200).json(updatedEvent);
};

// Delete an event
const deleteEvent = (req, res) => {
  console.log('delete');
  const success = Event.delete(req.params.id);
  if (!success) return res.status(404).json({ message: 'Event not found' });

  res.status(200).json({ message: 'Event deleted successfully' });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
