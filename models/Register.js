const express = require('express');
const router = express.Router();
const User = require('.../models/User');
const Profile = require('.../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const { name, email, password, admin } = req.body;

    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hashing

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            admin
        });

        await newUser.save();

        console.log('User created successfully:', newUser);

        const newProfile = new Profile({ // blank profile
            user: newUser._id,
            fullName: '',
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
            message: 'User registered successfully',
            token,
            userName: newUser.name,
            userId: newUser._id // stored in frontend
        });
    } catch (error) {
        console.error('An error occurred.', error);
        return res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;