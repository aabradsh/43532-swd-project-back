const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  location: { type: String, required: true },
  availability: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  location: { type: String, required: true },
  urgency: { type: String },
  details: { type: String }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = { Volunteer, Event };
