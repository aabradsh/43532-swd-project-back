require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
app.use(cors());

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get('/api/hello', async (req, res) => {
    res.send('Hello from Express!');

});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
