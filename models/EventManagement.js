//Hardcoded Events
const events = [
    { id: 1, name: 'Hackathon', requiredSkills: ['Cybersecurity', 'Software Design'], location: 'Austin', urgency: 'High', details: '72-hour coding competition' },
    { id: 2, name: 'Workshop', requiredSkills: ['Software Design', 'Organizing'], location: 'Dallas', urgency: 'Medium', details: 'Teaching Game Development' },
    { id: 3, name: 'Career Fair', requiredSkills: ['Organizing', 'Teamwork'], location: 'Houston', urgency: 'Medium', details: 'Career Fair for Computer Science Majors' }
  ];
  
 class Event {
    static getAll() {
      return events;
    }
  
    static create(eventData) {
      const newEvent = { id: events.length + 1, ...eventData };
      events.push(newEvent);
      return newEvent;
    }
  
    static update(id, eventData) {
      const index = events.findIndex(event => event.id === parseInt(id));
      if (index === -1) return null;
  
      events[index] = { id: parseInt(id), ...eventData };
      return events[index];
    }
  
    static delete(id) {
      const index = events.findIndex(event => event.id === parseInt(id));
      if (index === -1) return false;
  
      events.splice(index, 1);
      return true;
    }
  }
  
  module.exports = Event; 
  