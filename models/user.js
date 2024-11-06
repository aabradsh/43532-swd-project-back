const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true },
    events: { type: [String] },
    admin: {type: Boolean, default: false}
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;