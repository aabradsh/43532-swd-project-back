const { volunteers, events } = require('../models/VolunteerMatching');

// Function to find matching events for a volunteer based on skills and location
exports.matchVolunteersToEvents = (req, res) => {
  const { volunteerId } = req.query;
  const volunteer = volunteers.find(v => v.id === parseInt(volunteerId));

  if (!volunteer) {
    return res.status(404).json({ message: 'Volunteer not found' });
  }

  // Match events based on location and required skills
  const matchedEvents = events.filter(event =>
    event.location === volunteer.location &&
    event.requiredSkills.some(skill => volunteer.skills.includes(skill))
  );

  // For simplicity, return the first match as the best match
  const bestMatch = matchedEvents[0];
  res.json(bestMatch ? [bestMatch] : []);
};

// Function to get all volunteers (if needed for front-end)
exports.getVolunteers = (req, res) => {
  res.json(volunteers);
};

// Function to get all events (if needed for front-end)
exports.getEvents = (req, res) => {
  res.json(events);
};
