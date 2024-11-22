const Event = require('../models/Event');
const User = require('../models/User');
const AdmZip = require('adm-zip');

// Function to get all volunteers from the database

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter1 = createCsvWriter({
    path: 'volunteers.csv',
    header: [
        {id: 'VOLUNTEER', title: 'volunteer'},
        {id: 'EVENTSATTENDED', title: 'Events attended'}

    ]
})
const csvWriter2 = createCsvWriter({
    path: 'events.csv',
    header: [
        {title: 'Event', id: 'EVENT'},
        {title: 'Event Description', id: 'EVENTDESCRIPTION'},
        {title: 'Location', id: 'LOCATION'},
        {title: 'Required Skills', id: 'REQUIREDSKILLS'},
        {title: 'Urgency', id: 'URGENCY'},
        {title: 'Event Date', id: 'EVENTDATE'}




    ]
});





const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];
const path = require('path');

const parentDir = path.dirname(__dirname);

console.log(parentDir); 

const getReport = async (req, res) => {

    const volunteers = await User.find();
    const events = await Event.find();

    const volunteersCsvData = await Promise.all (volunteers.map(
        async (user) => {
            const eventNames = await Promise.all( user.events.map( async (eventId)=> {
                const event = await Event.findById(eventId)
                return(event.name)
            })); 



            return({VOLUNTEER: user.firstName + user.lastName, EVENTSATTENDED: eventNames})
        }
    
    ))

   await csvWriter1.writeRecords(volunteersCsvData)       // returns a promise

    const zip = new AdmZip();
    zip.addLocalFile('volunteers.csv');
    //zip.addLocalFile('events.csv');
    zip.writeZip('./myzipfile.zip'); 
    res.sendFile(parentDir + '/myzipfile.zip');
}

module.exports = {getReport};