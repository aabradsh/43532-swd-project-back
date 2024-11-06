const mongoose = require('mongoose');
// Volunteers and Users are the same, going to leave users to user.js
// const volunteerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   skills: { type: [String], required: true },
//   location: { type: String, required: true },
//   availability: { type: String, required: true }
// });

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  location: { type: String, required: true },
  urgency: { type: String },
  details: { type: String },
  eventDate: { type: Date, required: true },
}, {
  timestamps: true 
});

//const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const Event = mongoose.model('Event', eventSchema);

//module.exports = { Volunteer, Event };
module.exports = Event;
