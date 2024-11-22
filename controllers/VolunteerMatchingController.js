const Event = require('../models/Event');
const User = require('../models/User');
const Profile = require('../models/Profile');
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

const accessVolunteerMatching = async (req, res) => {
  try {
    const userId = req.user.userId; // Ensure JWT contains userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (user.admin) {
      // If admin, return all volunteers and events
      const volunteers = await User.find(); // Fetch all volunteers
      const events = await Event.find(); // Fetch all events
      res.status(200).json({
        message: 'Access granted to Volunteer Matching',
        isAdmin: true,
        volunteers,
        events,
      });
    } else {
      // If not admin, return an error
      res.status(403).json({ message: 'Error: Need to be admin to access Volunteer Matching.' });
    }
  } catch (error) {
    console.error('Error verifying access to Volunteer Matching:', error);
    res.status(500).json({ message: 'Server error verifying access to Volunteer Matching' });
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
    const volunteerProfile = await Profile.findOne({user: volunteerId});
    // Fetch all events from the database
    const events = await Event.find();

    // Calculate a similarity score based on matching skills
    const matchedEvents = events.map(event => {
      const matchingSkills = event.requiredSkills.filter(skill => volunteerProfile.skills.includes(skill));
      return {
        ...event.toObject(), // Convert Mongoose document to a plain JavaScript object
        matchScore: matchingSkills.length // Number of matching skills
      };
    });

    // Sort events by highest matchScore and select the best match
    matchedEvents.sort((a, b) => b.matchScore - a.matchScore);
    const bestMatch = matchedEvents[0]?.matchScore > 0 ? matchedEvents[0] : null;

    if (bestMatch) {
      // Add matched events to the user's events 
      volunteer.events.push(bestMatch);
      await volunteer.save();
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
  accessVolunteerMatching,
  matchVolunteersToEvents
};