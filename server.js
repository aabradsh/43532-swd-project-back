require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const NotificationsRoutes = require('./routes/NotificationsRoutes');
const VolunteerMatchingRoutes = require('./routes/VolunteerMatchingRoutes');
const EventManagementRoutes = require('./routes/EventManagementRoutes');

const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));  


// Registering routes
app.use('/api/notifications', NotificationsRoutes);  // This will handle all notification-related routes
app.use('/api', VolunteerMatchingRoutes);
app.use('/api', EventManagementRoutes);

// Port of our server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// login for authentication
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     if (email == 'test@example.com' && password === 'password123') {
//         return res.status(200).json({ message: 'Login successful' });
//     }

//     return res.status(401).json({ error: 'Invalid credentials'});
// });


// users information
const usersFilePath = path.join(__dirname, 'users.json');

// read from JSON file
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users file: ", error);
        return [];  
    }
};

// write users to JSON file
const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing users file: ", error);
    }
};


// registration validation
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// const users = []; // temp hold user data

// app.post('/api/register', (req, res) => {
//     const { email, password } = req.body;

//     users.push({ email, password });
//     res.status(201).json({ message: 'Thank you for registering!'});
// });


// email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


// password validation
const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return errors;  
};




// registration endpoint
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();

    // check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    // check if the email is valid
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    // validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
        return res.status(400).json({ errors: passwordErrors });
    }

    // save the user
    users.push({ email, password });
    writeUsersToFile(users);
    res.status(201).json({ message: 'Thank you for registering! You may now log in to view your account information.' });
});



// login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();

    // find the user by email
    const existingUser = users.find(user => user.email === email);
    
    // check if user exists
    if (!existingUser) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // check if password matches
    if (existingUser.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // successful login
    res.status(200).json({ message: 'Login successful', user: { email: existingUser.email } });
});

// profile management
app.post('/api/profile', (req, res) => {
    const { email, profile } = req.body; // assume email and profile data are sent in the request body
    const users = readUsersFromFile();
  
    // find the user by email
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    users[userIndex].profile = profile;
  
    writeUsersToFile(users);
  
    return res.status(200).json({ message: 'Profile updated successfully!' });
      
      
});
  








