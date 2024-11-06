const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { userId, firstName, lastName, address1, address2, city, state, zip, skills, preferences, availability } = req.body;

  console.log('Received profile update request:', req.body); 

  try {
    // check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      console.log('User not found with ID:', userId); 
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user); 

    const availabilityDates = availability.map(dateString => new Date(dateString));
    console.log('Converted availability dates:', availabilityDates);

    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      console.log('Updating profile for user:', userId);

      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.address1 = address1;
      profile.address2 = address2 || '';
      profile.city = city;
      profile.state = state;
      profile.zip = zip;
      profile.skills = skills;
      profile.preferences = preferences || '';
      profile.availability = availabilityDates;

      const updatedProfile = await profile.save();
      console.log('Profile updated successfully:', updatedProfile);

      return res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } 
    
    else {
      console.log('Creating new profile for user:', userId); // Log if creating a new profile

      const newProfile = new Profile({
        user: userId,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        skills,
        preferences,
        availability: availabilityDates
      });

      const savedProfile = await newProfile.save();
      console.log('Profile created successfully:', savedProfile);

      return res.status(201).json({ message: 'Profile created successfully', profile: savedProfile });
    }
  } 
  
  catch (error) {
    console.error('Error creating/updating profile:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});


// get profile by id
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId || userId === 'undefined') {
    return res.status(400).json({ message: 'Invalid or missing user ID' });
  }

  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    return res.status(200).json(profile);
  } 
  
  catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;