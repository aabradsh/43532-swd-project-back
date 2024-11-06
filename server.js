require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const axios = require('axios');
const authenticateJWT = require('./middleware/authMiddleware');
const app = express();
const PORT = 4000;


app.use(express.json());
// app.use(cors({ 
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
app.use(cors({ credentials: true })); //allow all cors requests


// connect to mongodb
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const LoginRoutes = require('./routes/LoginRoutes');
const RegisterRoutes = require('./routes/RegisterRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');
const NotificationsRoutes = require('./routes/NotificationsRoutes');
const VolunteerHistoryRoutes = require('./routes/VolunteerHistoryRoutes');
const VolunteerMatchingRoutes = require('./routes/VolunteerMatchingRoutes');
const EventManagementRoutes = require('./routes/EventManagementRoutes');

app.use(authenticateJWT);
// Registering routes
app.use('/login', LoginRoutes);
app.use('/register', RegisterRoutes);
app.use('/profile', ProfileRoutes);
app.use('/api/notifications', NotificationsRoutes);
app.use('/api/volunteerHistory', VolunteerHistoryRoutes);
app.use('/api/volunteer-matching', VolunteerMatchingRoutes);
app.use('/api/eventmanagement', EventManagementRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

