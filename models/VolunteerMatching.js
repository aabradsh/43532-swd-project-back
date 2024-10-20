/*
// Volunteer class to structure volunteer data
class Volunteer {
    constructor(id, name, skills, location, availability) {
      this.id = id;
      this.name = name;
      this.skills = skills;
      this.location = location;
      this.availability = availability;
    }
  }
  
  // Event class to structure event data
class Event {
    constructor(id, name, requiredSkills, location, urgency, details) {
      this.id = id;
      this.name = name;
      this.requiredSkills = requiredSkills;
      this.location = location;
      this.urgency = urgency;
      this.details = details;
    }
  }
*/

// Example volunteer data
const volunteers = [
    { id: 1, userID: 1, name: 'Jerry Smith', skills: ['Cybersecurity', 'Event Planning'], location: 'Austin', availability: 'Full-time' },
    { id: 2, userID: 2, name: 'Rick Sanchez', skills: ['Software Design', 'Organizing'], location: 'Dallas', availability: 'Part-time' },
    { id: 3, userID: 3, name: 'Morty Smith', skills: ['Computer Engineering', 'Teamwork', 'Cybersecurity', 'Software Design'], location: 'Houston', availability: 'Part-time' }
  ];
  
// Example events data
const events = [
    { id: 1, name: 'Hackathon', requiredSkills: ['Cybersecurity', 'Software Design'], location: 'Austin', urgency: 'High', details: '72-hour coding competition' },
    { id: 2, name: 'Workshop', requiredSkills: ['Software Design', 'Organizing'], location: 'Dallas', urgency: 'Medium', details: 'Teaching Game Development' },
    { id: 3, name: 'Career Fair', requiredSkills: ['Organizing', 'Teamwork'], location: 'Houston', urgency: 'Medium', details: 'Career Fair for Computer Science Majors' }
  ];
  

  module.exports = { volunteers, events };