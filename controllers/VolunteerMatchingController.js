const { volunteers, events } = require('../models/VolunteerMatching');

// Function to find matching events for a volunteer based on skills and location
exports.matchVolunteersToEvents = (req, res) => {
  const { volunteerId } = req.query;
  const volunteer = volunteers.find(v => v.id === parseInt(volunteerId));

  if (!volunteer) {
    return res.status(404).json({ message: 'Volunteer not found' });
  }

  // Calculate a similarity score based on matching skills
  const matchedEvents = events.map(event => {
    const matchingSkills = event.requiredSkills.filter(skill => volunteer.skills.includes(skill));
    return {
      ...event,
      matchScore: matchingSkills.length // Number of matching skills
    };
  });

  // Sort events by highest matchScore and select the best match
  matchedEvents.sort((a, b) => b.matchScore - a.matchScore);
  const bestMatch = matchedEvents[0].matchScore > 0 ? matchedEvents[0] : null;

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
