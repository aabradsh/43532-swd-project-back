const {volunteers, events} = require('../models/VolunteerHistory');

exports.getEvents = (req, res)=> {
    const { volunteerId } = req.query;
    const volunteer = volunteers.find(v => v.id === parseInt(volunteerId));


    if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
    }
    //Check if the login is an admin
    if (volunteer.admin){
        res.json(events);
    }

    else {
        //Find events attended by volunteers
        const attendedEvents = events.filter(event =>
        volunteer.events.includes(event.name));

        // Display each event 
        res.json(attendedEvents);
    }
};