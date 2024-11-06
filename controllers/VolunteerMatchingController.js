const Event = require('../models/Event');
const User = require('../models/User');
const { createNotification } = require('./NotificationsController');

// Function to get all volunteers from the database
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
};

// Function to get all events from the database
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Function to match volunteers to events based on skills and location
const matchVolunteersToEvents = async (req, res) => {
  const { volunteerId } = req.query;

  try {
    // Find the volunteer by ID
    const volunteer = await User.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Fetch all events from the database
    const events = await Event.find();

    // Calculate a similarity score based on matching skills
    const matchedEvents = events.map(event => {
      const matchingSkills = event.requiredSkills.filter(skill => volunteer.skills.includes(skill));
      return {
        ...event.toObject(), // Convert Mongoose document to a plain JavaScript object
        matchScore: matchingSkills.length // Number of matching skills
      };
    });

    // Sort events by highest matchScore and select the best match
    matchedEvents.sort((a, b) => b.matchScore - a.matchScore);
    const bestMatch = matchedEvents[0]?.matchScore > 0 ? matchedEvents[0] : null;

    if (bestMatch) {
      // Create a notification for the volunteer
      await createNotification(volunteer._id, `You have been matched to the event: ${bestMatch.name}`);
    }

    res.json(bestMatch ? [bestMatch] : []);
  } catch (error) {
    res.status(500).json({ message: 'Error matching volunteer to events' });
  }
};

module.exports = {
  getVolunteers,
  getEvents,
  matchVolunteersToEvents
};