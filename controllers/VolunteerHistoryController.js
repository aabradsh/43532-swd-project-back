const {volunteers, events} = require('../models/VolunteerHistory');

//Function to send the right events to the front end based on the user
exports.getEvents = (req, res)=> {

    //Finds user's id
    const volunteerId = req.user.userId;
    const volunteer = volunteers.find(v => v.id === parseInt(volunteerId));

    console.log("Volunteer ID: " + volunteerId);

    //Error if none found
    if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found.' });
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
};