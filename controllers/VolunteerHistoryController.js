const Event = require('../models/Event');
const User = require('../models/User');


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

//Function to send the right events to the front end based on the user
const showEvents = async (req, res) => {
    const userId = req.query;
    try {
      // Find the volunteer by ID
      const volunteer = await User.findById(req.params.userId);
      if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
      }
      if (!volunteer.events){
        return res.status(404).json({ message: 'No volunteer history yet!' });
    }

    //Check if the login is an admin
    if (volunteer.admin){
        res.json(events);
    }

    else {
        //Find events attended by volunteers
        const attendedEvents = events.filter(event =>
        volunteer.events.includes(event.name));

        // Send those events to the front end 
        res.json(attendedEvents);
    }
  }
  catch (error) {
    console.error('Error viewing history:', error); // Log any errors encountered
    res.status(500).json({ message: 'Error displaying events' });
  }
};
module.exports = {
    getVolunteers,
    getEvents,
    showEvents
  };