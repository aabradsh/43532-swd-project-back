const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], required: true },
    location: { type: String },
    availability: { type: String },
    events: { type: [String] },
    admin: {type: Boolean, default: false}
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;