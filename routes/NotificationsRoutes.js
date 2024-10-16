const express = require('express');
const router = express.Router();
const notifications = require('../models/Notifications');

// Route to fetch notifications for a specific user
router.get('/', (req, res) => {
  const userId = 1;  // Hardcoding user ID for now
  const userNotifications = notifications.filter(n => n.userId === userId);
  res.json(userNotifications);
});

module.exports = router;

