//Hardcoded Events
/*const events = [
    { id: 1, name: 'Hackathon', requiredSkills: ['Cybersecurity', 'Software Design'], location: 'Austin', urgency: 'High', details: '72-hour coding competition' },
    { id: 2, name: 'Workshop', requiredSkills: ['Software Design', 'Organizing'], location: 'Dallas', urgency: 'Medium', details: 'Teaching Game Development' },
    { id: 3, name: 'Career Fair', requiredSkills: ['Organizing', 'Teamwork'], location: 'Houston', urgency: 'Medium', details: 'Career Fair for Computer Science Majors' }
  ];*/

  const fs = require('fs');

 class Event {
      static getAll() {
    //eventsFilePath = path.join('../events.json');

      // read from JSON file

          try {
              const data = fs.readFileSync('./events.json');
              return data;
          } catch (error) {
              console.error("Error reading users file: ", error);
              return [];
          }

    }

    static create(eventData) {
console.log('create');
let events = JSON.parse(this.getAll());
    const newEvent = { ...eventData };

      console.log(events);
    console.log(newEvent);
    const myArray = events.events;
    myArray.push(newEvent);
    //events.events = myArray
    console.log(JSON.stringify(events));
      try {
          fs.writeFileSync('./events.json', JSON.stringify(events, null, 2));
      } catch (error) {
          console.error("Error writing users file: ", error);
      }



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




  // write users to JSON file
/*  const writeUsersToFile = (users) => {
      try {
          fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      } catch (error) {
          console.error("Error writing users file: ", error);
      }
  };*/