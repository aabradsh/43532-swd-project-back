const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/NotificationsController');
const authenticateJWT = require('../middleware/authMiddleware'); 

// Route to get all notifications for a user
router.get('/', authenticateJWT, getNotifications);

// Route to mark a notification as read
router.put('/:notificationId', authenticateJWT, markAsRead);

module.exports = router;

