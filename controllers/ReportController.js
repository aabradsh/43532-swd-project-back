// const Event = require('../models/Event');
// const User = require('../models/User');
// const AdmZip = require('adm-zip');

// // Function to get all volunteers from the database

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter1 = createCsvWriter({
//     path: 'volunteers.csv',
//     header: [
//         {id: 'VOLUNTEER', title: 'volunteer'},
//         {id: 'EVENTSATTENDED', title: 'Events attended'}

//     ]
// })
// const csvWriter2 = createCsvWriter({
//     path: 'events.csv',
//     header: [
//         {title: 'Event', id: 'EVENT'},
//         {title: 'Event Description', id: 'EVENTDESCRIPTION'},
//         {title: 'Location', id: 'LOCATION'},
//         {title: 'Required Skills', id: 'REQUIREDSKILLS'},
//         {title: 'Urgency', id: 'URGENCY'},
//         {title: 'Event Date', id: 'EVENTDATE'}




//     ]
// });





// const records = [
//     {name: 'Bob',  lang: 'French, English'},
//     {name: 'Mary', lang: 'English'}
// ];
// const path = require('path');

// const parentDir = path.dirname(__dirname);

// console.log(parentDir); 

// const getReport = async (req, res) => {

//     const volunteers = await User.find();
//     const events = await Event.find();

//     const volunteersCsvData = await Promise.all (volunteers.map(
//         async (user) => {
//             const eventNames = await Promise.all( user.events.map( async (eventId)=> {
//                 const event = await Event.findById(eventId)
//                 return(event.name)
//             })); 



//             return({VOLUNTEER: user.firstName + user.lastName, EVENTSATTENDED: eventNames})
//         }
    
//     ))

//     const eventsCsvData = await Promise.all (events.map(
//         async (event) => {
//             return({EVENT: event.name, EVENTDESCRIPTION: event.details, LOCATION: event.location,
//                 REQUIREDSKILLS: event.requiredSkills, URGENCY: event.urgency, EVENTDATE: event.eventDate})
//         }
//     ))

//    await csvWriter1.writeRecords(volunteersCsvData)       // returns a promise
//    await csvWriter2.writeRecords(eventsCsvData)       // returns a promise


//     const zip = new AdmZip();
//     zip.addLocalFile('volunteers.csv');
//     zip.addLocalFile('events.csv');
//     zip.writeZip('./myzipfile.zip'); 
//     res.sendFile(parentDir + '/myzipfile.zip');
// }

// module.exports = {getReport};
const Event = require('../models/Event');
const User = require('../models/User');
const AdmZip = require('adm-zip');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

// Define CSV writers
const csvWriter1 = createCsvWriter({
    path: 'volunteers.csv',
    header: [
        { id: 'VOLUNTEER', title: 'Volunteer' },
        { id: 'EVENTSATTENDED', title: 'Events Attended' },
    ],
});

const csvWriter2 = createCsvWriter({
    path: 'events.csv',
    header: [
        { title: 'Event', id: 'EVENT' },
        { title: 'Event Description', id: 'EVENTDESCRIPTION' },
        { title: 'Location', id: 'LOCATION' },
        { title: 'Required Skills', id: 'REQUIREDSKILLS' },
        { title: 'Urgency', id: 'URGENCY' },
        { title: 'Event Date', id: 'EVENTDATE' },
    ],
});

const getReport = async (req, res) => {
    try {
        // Fetch data from the database
        const volunteers = await User.find();
        const events = await Event.find();

        // Map data for volunteers CSV
        const volunteersCsvData = await Promise.all(
            volunteers.map(async (user) => {
                const eventNames = await Promise.all(
                    user.events.map(async (eventId) => {
                        const event = await Event.findById(eventId);
                        return event.name;
                    })
                );

                return { VOLUNTEER: user.firstName + ' ' + user.lastName, EVENTSATTENDED: eventNames.join(', ') };
            })
        );

        // Map data for events CSV
        const eventsCsvData = events.map((event) => ({
            EVENT: event.name,
            EVENTDESCRIPTION: event.details,
            LOCATION: event.location,
            REQUIREDSKILLS: event.requiredSkills,
            URGENCY: event.urgency,
            EVENTDATE: event.eventDate,
        }));

        // Write CSV files
        await csvWriter1.writeRecords(volunteersCsvData);
        await csvWriter2.writeRecords(eventsCsvData);

        // Create a zip file
        const zip = new AdmZip();
        zip.addLocalFile('./volunteers.csv');
        zip.addLocalFile('./events.csv');

        // Generate ZIP as a buffer
        const zipBuffer = zip.toBuffer();

        // Set response headers
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="report.zip"');

        // Send the zip buffer as the response
        res.send(zipBuffer);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Error generating report');
    } finally {
        // Cleanup temporary files
        fs.unlink('./volunteers.csv', (err) => {
            if (err) console.error('Error deleting volunteers.csv:', err);
        });
        fs.unlink('./events.csv', (err) => {
            if (err) console.error('Error deleting events.csv:', err);
        });
    }
};

module.exports = { getReport };
