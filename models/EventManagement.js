const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  location: { type: String, required: true },
  requiredSkills: [{ type: String, required: true, enum: [ // skills for profile
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "SQL",
      "C",
      "HTML",
      "CSS",
      "React",
      "Angular",
      "Excel",
      "Tableau",
      "R Studio",
      "Programming",
      "Web development",
      "Data analysis",
      "Cybersecurity",
      "Networking and IT",
      "Machine Learning",
      "MySQL",
      "MongoDB",
      "Database management",
      "Figma",
      "Adobe XD",
      "UI/UX",
      "Project management",
      "Event coordination",
      "Software testing",
      "Cloud computing",
      "AWS",
      "Azure",
      "Google Cloud",
      "Mobile app development",
      "iOS",
      "Android",
      "Flutter",
      "Technical support"
   ]
   }],
  urgency: { type: String, required: true, enum: [ // skills for profile
    "Low",
    "Medium",
    "High"
 ]
 },
  eventDate: { type: Date, required: true },
     
}, {
  timestamps: true 
});

const Event = mongoose.model('Event', eventSchema); // allows CRUD ops
module.exports = Event;

//Hardcoded Events
/*const events = [
    { id: 1, name: 'Hackathon', requiredSkills: ['Cybersecurity', 'Software Design'], location: 'Austin', urgency: 'High', details: '72-hour coding competition' },
    { id: 2, name: 'Workshop', requiredSkills: ['Software Design', 'Organizing'], location: 'Dallas', urgency: 'Medium', details: 'Teaching Game Development' },
    { id: 3, name: 'Career Fair', requiredSkills: ['Organizing', 'Teamwork'], location: 'Houston', urgency: 'Medium', details: 'Career Fair for Computer Science Majors' }
  ];*/

//   const fs = require('fs');

//  class Event {
//       static getAll() {
//     //eventsFilePath = path.join('../events.json');

//       // read from JSON file

//           try {
//               const data = fs.readFileSync('./events.json');
//               return data;
//           } catch (error) {
//               console.error("Error reading users file: ", error);
//               return [];
//           }

//     }

//     static create(eventData) {
// console.log('create');
// let events = JSON.parse(this.getAll());
//     const newEvent = { ...eventData };

//       console.log(events);
//     console.log(newEvent);
//     const myArray = events.events;
//     myArray.push(newEvent);
//     //events.events = myArray
//     console.log(JSON.stringify(events));
//       try {
//           fs.writeFileSync('./events.json', JSON.stringify(events, null, 2));
//       } catch (error) {
//           console.error("Error writing users file: ", error);
//       }



//       return newEvent;
//     }

//     static update(id, eventData) {
//       const index = events.findIndex(event => event.id === parseInt(id));
//       if (index === -1) return null;

//       events[index] = { id: parseInt(id), ...eventData };
//       return events[index];
//     }

//     static delete(id) {
//       const index = events.findIndex(event => event.id === parseInt(id));
//       if (index === -1) return false;

//       events.splice(index, 1);
//       return true;
//     }
//   }


//   module.exports = Event;




  // write users to JSON file
/*  const writeUsersToFile = (users) => {
      try {
          fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      } catch (error) {
          console.error("Error writing users file: ", error);
      }
  };*/
