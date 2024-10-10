const express = require('express');
const router = express.Router();

// Hardcoded notifications array (simulating database values)
const notifications = [
  { id: 1, userId: 1, message: 'You have been assigned to the Hackathon.', type: 'event', isRead: false },
  { id: 2, userId: 1, message: 'The Hackathon has been rescheduled.', type: 'update', isRead: false },
  { id: 3, userId: 2, message: 'Reminder: Hackathon is tomorrow.', type: 'reminder', isRead: false }
];

// Route to fetch notifications for a specific user
router.get('/', (req, res) => {
  const userId = 1;  // Hardcoding user ID for now
  const userNotifications = notifications.filter(n => n.userId === userId);
  res.json(userNotifications);
});

module.exports = router;

