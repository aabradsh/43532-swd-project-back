require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const fs = require('fs');
// const JWT_SECRET = "not-strong-secret";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const path = require('path');
// const NotificationsRoutes = require('./routes/NotificationsRoutes');
// const VolunteerHistoryRoutes = require('./routes/VolunteerHistoryRoutes');
// const VolunteerMatchingRoutes = require('./routes/VolunteerMatchingRoutes');
// const EventManagementRoutes = require('./routes/EventManagementRoutes');
const User = require('./models/User');
const axios = require('axios');

const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


// connect to mongodb
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const LoginRoutes = require('./routes/LoginRoutes');
const RegisterRoutes = require('./routes/RegisterRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');


app.use('/login', LoginRoutes);
app.use('/register', RegisterRoutes);
app.use('/profile', ProfileRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const authenticateJWT = (req, res, next) => {
//     //const token = req.header('Authorization').split(' ')[1]; // Bearer token
//     const authHeader = req.header('Authorization');
// console.log('authenticate');
//     console.log("header:" + authHeader);
//     console.log(typeof authHeader);
//     if(!authHeader) {
//         return next();
//     }
//     const token = authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         console.log(decoded);
//         req.user = decoded;
//         console.log("decoded: " + decoded);
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// app.use(authenticateJWT);

// // Registering routes
// app.use('/api/notifications', NotificationsRoutes);  // This will handle all notification-related routes
// app.use('/api/volunteerHistory', VolunteerHistoryRoutes);
// app.use('/api/volunteer-matching', VolunteerMatchingRoutes);
// app.use('/api/eventmanagement', EventManagementRoutes);

// // Port of our server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// //login for authentication
// // app.post('/login', (req, res) => {
// //      const { email, password } = req.body;

// //      if (email == 'test@example.com' && password === 'password123') {
// //          return res.status(200).json({ message: 'Login successful' });
// //      }

// //     return res.status(401).json({ error: 'Invalid credentials'});
// // });



// // users information
// const usersFilePath = path.join(__dirname, 'users.json');

// // read from JSON file
// const readUsersFromFile = () => {
//     try {
//         const data = fs.readFileSync(usersFilePath);
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error reading users file: ", error);
//         return [];
//     }
// };

// // write users to JSON file
// const writeUsersToFile = (users) => {
//     try {
//         fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
//     } catch (error) {
//         console.error("Error writing users file: ", error);
//     }
// };


// // registration validation
// // const bodyParser = require('body-parser');
// // app.use(bodyParser.json());

// // const users = []; // temp hold user data

// // app.post('/api/register', (req, res) => {
// //     const { email, password } = req.body;

// //     users.push({ email, password });
// //     res.status(201).json({ message: 'Thank you for registering!'});
// // });


// // email validation
// const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// };


// // password validation
// const validatePassword = (password) => {
//     const errors = [];

//     if (password.length < 6) {
//         errors.push('Password must be at least 6 characters long');
//     }
//     if (!/[A-Z]/.test(password)) {
//         errors.push('Password must contain at least one uppercase letter');
//     }
//     if (!/\d/.test(password)) {
//         errors.push('Password must contain at least one number');
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//         errors.push('Password must contain at least one special character');
//     }

//     return errors;
// };




// // registration endpoint
// app.post('/api/register', (req, res) => {
//     const { email, password } = req.body;
//     const users = readUsersFromFile();

//     // check if the user already exists
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//         return res.status(409).json({ error: 'User already exists' });
//     }

//     // check if the email is valid
//     if (!isValidEmail(email)) {
//         return res.status(400).json({ error: 'Invalid email' });
//     }

//     // validate password
//     const passwordErrors = validatePassword(password);
//     if (passwordErrors.length > 0) {
//         return res.status(400).json({ errors: passwordErrors });
//     }

//     // save the user
//     users.push({ email, password });
//     writeUsersToFile(users);
//     res.status(201).json({ message: 'Thank you for registering! You may now log in to view your account information.' });
// });



// // login endpoint
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;
//     const users = readUsersFromFile();

//     // find the user by email
//     const existingUser = users.find(user => user.email === email);

//     // check if user exists
//     if (!existingUser) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // check if password matches
//     if (existingUser.password !== password) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // successful login
//     const token = jwt.sign({ userId: existingUser.userId }, JWT_SECRET, { expiresIn: '1h' });
//     console.log('token='+token);
//     res.status(200).json({ message: 'Login successful', user: { email: existingUser.email }, token: token });
// });

// // profile management
// app.post('/api/profile', (req, res) => {
//     const { email, profile } = req.body; // assume email and profile data are sent in the request body
//     const users = readUsersFromFile();

//     // find the user by email
//     const userIndex = users.findIndex((user) => user.email === email);
//     if (userIndex === -1) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     users[userIndex].profile = profile;

//     writeUsersToFile(users);

//     return res.status(200).json({ message: 'Profile updated successfully!' });


// });


// /*Alex- Event Management*/

// // Storing event data
// const eventsFilePath = path.join(__dirname, 'events.json');

// console.log('Writing to:', eventsFilePath);  // Confirm the path

// if (!fs.existsSync(eventsFilePath)) {
//     console.error('Error: events.json not found');
// }

// // Reading events
// const readEvents = () => {
//     try {
//         const data = fs.readFileSync(eventsFilePath, 'utf-8');
//         return JSON.parse(data || '[]'); // Return an empty array if the file is empty
//     } catch (error) {
//         console.error('Error reading events', error);
//         return [];
//     }
// };

// // Writing events to the JSON file
// const writeEvents = (events) => {
//     try {
//         fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
//         console.log('Events written successfully');
//     } catch (err) {
//         console.error('Error writing events', err);
//     }
// };


// // Creating new events
// app.post('/events', (req, res) => {
//     console.log(req.body);
//     const { name, date, location, description } = req.body;

//     if (!name || !date || !location) {
//         return res.status(400).json({ error: 'Event name, date, and location are required' });
//     }

//     // Create a new event
//     const newEvent = {
//         id: Date.now(),
//         name,
//         date,
//         location,
//         description,
//     };

//     //Validating data
//     const validateEvent = (event) => {
//         const errors = [];
//         if (!event.name || event.name.trim() === '') errors.push('Event name is required');
//         if (!event.date || isNaN(Date.parse(event.date))) errors.push('Invalid or missing date');
//         else if (new Date(event.date) < new Date()) errors.push('Event date must be in the future');
//         if (!event.location || event.location.trim() === '') errors.push('Event location is required');
//         if (event.description && event.description.length > 500) {
//             errors.push('Event description cannot exceed 500 characters');
//         }
//         return errors;
//     }

//     // Read events, add a new event, and save back to the JSON file
//     const events = readEvents();
//     events.push(newEvent);
//     writeEvents(events);

//     res.status(201).json({ message: 'Event created successfully'});
// });

// // Retreiving all events
// app.get('/events', (req, res) => {
//     const events = readEvents();
//     res.json(events);
// });