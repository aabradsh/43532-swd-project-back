const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hashing

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        console.log('User created successfully:', newUser);

        // blank profile
        const newProfile = new Profile({
            user: newUser._id, 
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            skills: [],
            preferences: '',
            availability: []
        });

        await newProfile.save();
        console.log('Profile created successfully:', newProfile);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            message: 'User registered successfully!',
            token,
            userName: newUser.name,
            userId: newUser._id
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;