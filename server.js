require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));  // Allow requests from your front-end domain

// Connection string for mongoDB
const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Import notification routes
const notificationsRoutes = require('./routes/NotificationsRoutes'); // Adjust the path based on your project structure

// Example route
app.get('/api/hello', async (req, res) => {
    res.send('Hello from Express!');

});

// Registering the notifications route
app.use('/api/notifications', notificationsRoutes);  // This will handle all notification-related routes

// Port of our server
const PORT = 4000;
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


    // error if email already in use with existing account
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }


    // error if email is typed incorrectly
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email'});
    }


    // password validation
    const passwordErrors = validatePassword(password);

    if (passwordErrors.length > 0) {
        return res.status(400).json({ errors: passwordErrors });
    }



    users.push({ email, password});
    writeUsersToFile(users);
    res.status(201).json({ message: 'Thank you for registering! You may now login to view your account information.' });
});


// login endpoint
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
        return res.status(400).json({ errors: passwordErrors });
    }

    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    users.push({ email, password });
    writeUsersToFile(users);
    res.status(201).json({ message: 'Thank you for registering! You may now login to view your account information.' });
});












