require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

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
