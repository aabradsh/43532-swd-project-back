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
//Sample volunteers, including a bool for whether user is an admin, as well as events they've attended
const volunteers = [
    { id: 1, name: 'Jerry Smith', admin: false, skills: ['Cybersecurity', 'Event Planning'], location: 'Austin', availability: 'Full-time', events: ['Hackathon'] },
    { id: 2, name: 'Rick Sanchez', admin: true, skills: ['Software Design', 'Organizing'], location: 'Dallas', availability: 'Part-time', events: ['Workshop'] },
    { id: 3, name: 'Morty Smith', admin: false, skills: ['Computer Engineering', 'Leadership'], location: 'Houston', availability: 'Part-time', events: ['Hackathon', 'Career Fair']}
     
  ];
// Sample events
const events = [
    { id: 1, name: 'Hackathon', requiredSkills: ['Cybersecurity', 'Software Design'], location: 'Austin', urgency: 'High', details: '72-hour coding competition', date: new Date('2024-09-01')},
    { id: 2, name: 'Workshop', requiredSkills: ['Software Design', 'Organizing'], location: 'Dallas', urgency: 'Medium', details: 'Teaching Game Development', date: new Date('2024-10-01')},
    { id: 3, name: 'Career Fair', requiredSkills: ['Organizing', 'Teamwork'], location: 'Houston', urgency: 'Medium', details: 'Career Fair for Computer Science Majors', date: new Date('2024-8-07')}
  ];


module.exports = {volunteers, events};