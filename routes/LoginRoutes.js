const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // for encrypting passwords
const jwt = require('jsonwebtoken'); // tokens to authenticate users
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) { // finding user in database
      return res.status(400).json({ message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // generating token w user's unique id
    res.json({ 
      token, 
      userId: user._id, 
      userName: `${user.firstName} ${user.lastName}`,
    }); 
  } 
  
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;