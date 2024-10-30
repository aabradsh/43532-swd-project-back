const User = require('./models/User');

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // save the new user
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'Thank you for registering!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});
