const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // reference to user doc by unique id
    firstName: { type: String, maxlength: 100 }, 
    lastName: { type: String, maxlength: 100 }, 
    address1: { type: String, maxlength: 100 }, 
    address2: { type: String, maxlength: 100 }, 
    city: { type: String, maxlength: 100 }, 
    state: { type: String, enum: [
        '', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 
        'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 
        'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 
        'WA', 'WV', 'WI', 'WY'
    ], required: false }, 
    zip: { type: String, maxlength: 9 }, 
    skills: [{ type: String, enum: [ // skills for profile
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
    ] }],
    preferences: { type: String }, 
    availability: [{ type: Date }], // volunteer availability stored as array for multiple dates
}, {
    timestamps: true 
});


// profile model from schema
const Profile = mongoose.model('Profile', profileSchema); // allows CRUD ops
module.exports = Profile;